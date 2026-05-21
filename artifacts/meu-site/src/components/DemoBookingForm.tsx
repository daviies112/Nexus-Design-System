import { useState, useMemo, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface AvailableSlot { timeSlot: string; available: boolean; }
interface SlotsResponse { availableSlots: Record<string, AvailableSlot[]>; }

interface Props { onSuccess?: () => void; onCancel?: () => void; }

export default function DemoBookingForm({ onSuccess, onCancel }: Props) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: slotsData, isLoading } = useQuery<SlotsResponse>({
    queryKey: ["/api/available-slots"],
    staleTime: 5 * 60 * 1000,
  });

  const availableDates = useMemo(() => {
    if (!slotsData?.availableSlots) return [];
    return Object.entries(slotsData.availableSlots)
      .filter(([, slots]) => slots.some(s => s.available))
      .map(([date]) => ({ value: date, label: format(new Date(date + "T12:00:00"), "EEEE, dd 'de' MMMM", { locale: ptBR }) }))
      .sort((a, b) => a.value.localeCompare(b.value))
      .slice(0, 20);
  }, [slotsData]);

  const availableTimes = useMemo(() => {
    if (!selectedDate || !slotsData?.availableSlots?.[selectedDate]) return [];
    return slotsData.availableSlots[selectedDate].filter(s => s.available).map(s => s.timeSlot);
  }, [selectedDate, slotsData]);

  useEffect(() => { setSelectedTime(""); }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !company || !selectedDate || !selectedTime) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const [h, m] = selectedTime.split(":").map(Number);
      const dt = new Date(selectedDate + "T00:00:00");
      dt.setHours(h, m, 0, 0);
      await fetch("/api/reuniao-prospecto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipoReuniao: "demo", dataAgendada: dt.toISOString(), duracao: 30,
          plataforma: "Google Meet", nomeProspecto: name, emailProspecto: email,
          telefoneProspecto: phone, empresaProspecto: company,
          objetivoReuniao: "Demo Nexus Intelligence — Amanda AI para semijoias",
          notasPreparacao: notes || "Demo agendado via site",
        }),
      });
      toast({ title: "Demo agendado!", description: `${format(dt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}. Você receberá confirmação por email.` });
      if (onSuccess) onSuccess();
    } catch {
      toast({ title: "Erro ao agendar", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0C1A12] border border-[#1E3828] rounded-3xl p-8 max-w-2xl w-full mx-auto">
      <h3 className="font-syne font-extrabold text-2xl text-white mb-2">Agendar demonstração</h3>
      <p className="text-[#7AA88E] text-sm mb-8">Veja a Amanda AI funcionando no seu negócio em 15 minutos.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Nome completo *", value: name, setter: setName, placeholder: "Seu nome" },
            { label: "Empresa *", value: company, setter: setCompany, placeholder: "Nome da empresa" },
            { label: "Email *", value: email, setter: setEmail, placeholder: "seu@email.com", type: "email" },
            { label: "WhatsApp *", value: phone, setter: setPhone, placeholder: "(11) 99999-9999" },
          ].map((f, i) => (
            <div key={i}>
              <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">{f.label}</label>
              <input
                type={f.type || "text"}
                value={f.value}
                onChange={e => f.setter(e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors placeholder-[#4A6A58]"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">Data *</label>
            <select
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              disabled={isLoading || availableDates.length === 0}
              className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors disabled:opacity-50"
            >
              <option value="">{isLoading ? "Carregando..." : "Selecione uma data"}</option>
              {availableDates.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">Horário *</label>
            <select
              value={selectedTime}
              onChange={e => setSelectedTime(e.target.value)}
              disabled={!selectedDate || availableTimes.length === 0}
              className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors disabled:opacity-50"
            >
              <option value="">{!selectedDate ? "Selecione data primeiro" : "Selecione um horário"}</option>
              {availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-[#C4DDD0] text-xs font-semibold block mb-1.5">Observações (opcional)</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Alguma dúvida específica sobre a plataforma ou seu negócio..."
            className="w-full bg-[#060F0A] border border-[#1E3828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF5A1F] transition-colors placeholder-[#4A6A58] resize-none"
          />
        </div>

        <div className="bg-[#060F0A] border border-[#1E3828] rounded-xl p-4 text-xs text-[#7AA88E]">
          Você receberá um email de confirmação com o link do Google Meet. Nossa equipe também entrará em contato via WhatsApp para confirmar.
        </div>

        <div className="flex gap-3">
          {onCancel && (
            <button type="button" onClick={onCancel} className="px-6 py-3 border border-[#1E3828] text-[#7AA88E] rounded-xl hover:border-[#FF5A1F]/40 transition-all text-sm font-medium">
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#FF5A1F] text-[#1A0500] font-extrabold py-3 rounded-xl text-sm hover:bg-[#FF5A1F]/90 transition-all disabled:opacity-60"
          >
            {isSubmitting ? "Agendando..." : "Confirmar demonstração"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
