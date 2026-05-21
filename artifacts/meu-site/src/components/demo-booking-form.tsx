import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

// Interface for API response
interface AvailableSlot {
  timeSlot: string;
  available: boolean;
}

interface AvailableSlotsResponse {
  availableSlots: Record<string, AvailableSlot[]>;
  totalDays: number;
  totalSlots: number;
  parameters: {
    startDate: string;
    endDate: string;
    duration: number;
  };
}

// Create dynamic schema function
const createDemoBookingSchema = (availableDates: string[], availableTimeSlots: string[]) => z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email deve ter formato válido"),
  phone: z.string().regex(
    /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?(?:9\d{4}[\-\s]?\d{4}|\d{4}[\-\s]?\d{4})$/,
    "Telefone deve ter formato brasileiro válido (ex: (11) 99999-9999)"
  ),
  company: z.string().min(2, "Nome da empresa é obrigatório"),
  demoDate: z.string().min(1, "Selecione uma data para o demo")
    .refine((date) => availableDates.includes(date), "Data selecionada não está disponível"),
  timeSlot: z.string().min(1, "Selecione um horário")
    .refine((slot) => availableTimeSlots.includes(slot), "Horário selecionado não está disponível"),
  notes: z.string().optional(),
  generateCalendarLink: z.boolean().optional(),
});

type DemoBookingForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  demoDate: string;
  timeSlot: string;
  notes?: string;
  generateCalendarLink?: boolean;
};

interface DemoBookingProps {
  leadId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  className?: string;
}

export default function DemoBookingForm({ leadId, onSuccess, onCancel, className }: DemoBookingProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [calendarLink, setCalendarLink] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch available slots from API
  const { data: slotsData, isLoading: slotsLoading, error: slotsError } = useQuery<AvailableSlotsResponse>({
    queryKey: ["/api/available-slots"],
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  // Process available dates and time slots
  const availableDates = useMemo(() => {
    if (!slotsData?.availableSlots) return [];
    
    return Object.entries(slotsData.availableSlots)
      .filter(([date, slots]) => slots.some(slot => slot.available))
      .map(([date]) => ({
        value: date,
        label: format(new Date(date), "EEEE, dd 'de' MMMM", { locale: ptBR })
      }))
      .sort((a, b) => a.value.localeCompare(b.value));
  }, [slotsData]);

  // Get time slots for selected date
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate || !slotsData?.availableSlots?.[selectedDate]) return [];
    
    return slotsData.availableSlots[selectedDate]
      .filter(slot => slot.available)
      .map(slot => ({
        value: slot.timeSlot,
        label: `${slot.timeSlot} - ${format(new Date(`2000-01-01T${slot.timeSlot}:00`), 'HH:mm')}`
      }))
      .sort((a, b) => a.value.localeCompare(b.value));
  }, [selectedDate, slotsData]);

  // Create dynamic schema with current available values
  const demoBookingSchema = useMemo(() => {
    const availableDateValues = availableDates.map(d => d.value);
    const availableTimeValues = availableTimeSlots.map(t => t.value);
    return createDemoBookingSchema(availableDateValues, availableTimeValues);
  }, [availableDates, availableTimeSlots]);

  const form = useForm<DemoBookingForm>({
    resolver: zodResolver(demoBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      demoDate: "",
      timeSlot: "",
      notes: "",
      generateCalendarLink: false,
    },
  });

  // Handle date change and clear time slot if needed
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "demoDate" && value.demoDate !== selectedDate) {
        setSelectedDate(value.demoDate || "");
        // Clear time slot when date changes
        if (value.timeSlot) {
          // Check if current time slot is still available for the new date
          const newTimeSlots = value.demoDate && slotsData?.availableSlots?.[value.demoDate]
            ? slotsData.availableSlots[value.demoDate]
                .filter(slot => slot.available)
                .map(slot => slot.timeSlot)
            : [];
          
          if (!newTimeSlots.includes(value.timeSlot)) {
            form.setValue("timeSlot", "");
          }
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, selectedDate, slotsData]);


  const onSubmit = async (data: DemoBookingForm) => {
    setIsSubmitting(true);
    try {
      // Combine date and time into scheduled timestamp
      const [hours, minutes] = data.timeSlot.split(':').map(Number);
      const scheduledDate = new Date(data.demoDate + 'T00:00:00');
      scheduledDate.setHours(hours, minutes, 0, 0);

      // Set default demo type
      const tipoReuniao = 'demo';
      const duracao = 30;

      // Prepare data for reuniao-prospecto endpoint
      const reuniaoData = {
        leadId: leadId || null,
        tipoReuniao: tipoReuniao,
        dataAgendada: scheduledDate.toISOString(),
        duracao: duracao,
        plataforma: "Google Meet", // Default platform
        nomeProspecto: data.name,
        emailProspecto: data.email,
        telefoneProspecto: data.phone,
        cargoProspecto: "Não informado", // Not collected in demo form
        empresaProspecto: data.company,
        objetivoReuniao: 'Demonstração da Secretária IA',
        pontosDiscussao: [
          "Apresentação da plataforma",
          "Configuração personalizada",
          "ROI específico para o negócio",
          "Integração com WhatsApp Business"
        ],
        notasPreparacao: data.notes || "Demo agendado via formulário web"
      };

      const response = await apiRequest("POST", "/api/reuniao-prospecto", reuniaoData);

      // Get calendar link from response if user requested it
      let generatedCalendarLink = null;
      if (data.generateCalendarLink && response.calendarLink) {
        generatedCalendarLink = response.calendarLink;
        setCalendarLink(generatedCalendarLink);
      }

      const successMessage = generatedCalendarLink 
        ? `Seu demo foi agendado para ${format(scheduledDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}. Você receberá um email de confirmação em breve e pode adicionar o evento ao seu calendário usando o link fornecido.`
        : `Seu demo foi agendado para ${format(scheduledDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}. Você receberá um email de confirmação em breve.`;

      toast({
        title: "Demo agendado com sucesso!",
        description: successMessage,
      });

      // Reset form
      form.reset();
      
      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message || "Erro desconhecido";
      toast({
        title: "Erro ao agendar demo",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-2xl text-center" data-testid="demo-booking-title">
          <i className="fas fa-calendar-plus text-primary mr-2"></i>
          Agendar Demonstração Personalizada
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Escolha o melhor horário para ver a Secretária IA funcionando no seu negócio
        </p>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Information */}
            {!leadId && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} data-testid="input-demo-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da empresa" {...field} data-testid="input-demo-company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} data-testid="input-demo-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp *</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-9999" {...field} data-testid="input-demo-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Error State */}
            {slotsError && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
                <p className="text-sm text-destructive">
                  <i className="fas fa-exclamation-triangle mr-1"></i>
                  Erro ao carregar horários disponíveis. Tente recarregar a página.
                </p>
              </div>
            )}

            {/* Date and Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="demoDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data da Demonstração *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={slotsLoading || !!slotsError || availableDates.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-demo-date">
                          <SelectValue 
                            placeholder={
                              slotsLoading 
                                ? "Carregando datas..." 
                                : slotsError 
                                ? "Erro ao carregar" 
                                : availableDates.length === 0
                                ? "Nenhuma data disponível"
                                : "Selecione uma data"
                            } 
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableDates.map((date) => (
                          <SelectItem key={date.value} value={date.value}>
                            {date.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={slotsLoading || !!slotsError || !selectedDate || availableTimeSlots.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-demo-time">
                          <SelectValue 
                            placeholder={
                              slotsLoading 
                                ? "Carregando horários..." 
                                : slotsError 
                                ? "Erro ao carregar" 
                                : !selectedDate
                                ? "Selecione uma data primeiro"
                                : availableTimeSlots.length === 0
                                ? "Nenhum horário disponível"
                                : "Selecione um horário"
                            } 
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableTimeSlots.map((slot) => (
                          <SelectItem key={slot.value} value={slot.value}>
                            {slot.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Alguma informação específica sobre seu negócio ou dúvidas que gostaria de esclarecer..."
                      className="resize-none"
                      {...field}
                      data-testid="textarea-demo-notes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Google Calendar Option */}
            <FormField
              control={form.control}
              name="generateCalendarLink"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-calendar-link"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      Gerar link para adicionar ao meu Google Calendar
                    </FormLabel>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    Você receberá um link para adicionar o evento diretamente ao seu calendário pessoal
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Display Calendar Link if Generated */}
            {calendarLink && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-calendar-plus text-green-600 mr-2"></i>
                  <h3 className="text-sm font-medium text-green-800">
                    Link do Google Calendar Gerado!
                  </h3>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  Clique no link abaixo para adicionar este evento ao seu Google Calendar:
                </p>
                <a
                  href={calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <i className="fas fa-external-link-alt mr-2"></i>
                  Adicionar ao Google Calendar
                </a>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between gap-4">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                  data-testid="button-cancel-demo"
                >
                  Cancelar
                </Button>
              )}
              
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
                disabled={isSubmitting || slotsLoading || !!slotsError}
                data-testid="button-schedule-demo"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Agendando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calendar-check mr-2"></i>
                    Agendar Demonstração
                  </>
                )}
              </Button>
            </div>

            {/* Help Text */}
            <div className="bg-muted/30 border border-border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">
                <i className="fas fa-info-circle mr-1 text-primary"></i>
                Você receberá um email de confirmação com o link da reunião. 
                Também entraremos em contato via WhatsApp para confirmar o agendamento.
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}