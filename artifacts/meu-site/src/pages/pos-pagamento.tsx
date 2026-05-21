import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import Header from "@/components/Header";

interface FormData {
  // Seção 1: Dados da Empresa
  nomeEmpresa: string;
  setor: string;
  setorOutro: string;
  telefoneWhatsApp: string;
  emailCalendar: string;
  apresentacaoWhatsApp: string;
  horarioFuncionamento: string;
  horarioPersonalizado: string;

  // Seção 2: Produtos e Atendimento
  produtosServicos: string;
  iaInformaValores: string;
  tomComunicacao: string;
  processoQualificacao: string;
  quandoTransferir: string;

  // Seção 3: Agendamento
  tiposReuniao: string;
  duracaoPadrao: string;
  duracaoOutro: string;
  disponibilidadeHorarios: string;
  informacoesNecessarias: string;

  // Seção 4: Follow-up e Automação
  quandoFollowUp: string;
  followUpPersonalizado: string;
  tentativasFollowUp: string;
  tentativasPersonalizado: string;
  situacoesSemFollowUp: string;

  // Seção 5: Integrações e Técnico
  crmAtual: string;
  crmOutro: string;
  compliance: string;
  complianceOutro: string;
  urgenciaImplementacao: string;
}

export default function PosPagamento() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    nomeEmpresa: "",
    setor: "",
    setorOutro: "",
    telefoneWhatsApp: "",
    emailCalendar: "",
    apresentacaoWhatsApp: "",
    horarioFuncionamento: "",
    horarioPersonalizado: "",
    produtosServicos: "",
    iaInformaValores: "",
    tomComunicacao: "",
    processoQualificacao: "",
    quandoTransferir: "",
    tiposReuniao: "",
    duracaoPadrao: "",
    duracaoOutro: "",
    disponibilidadeHorarios: "",
    informacoesNecessarias: "",
    quandoFollowUp: "",
    followUpPersonalizado: "",
    tentativasFollowUp: "",
    tentativasPersonalizado: "",
    situacoesSemFollowUp: "",
    crmAtual: "",
    crmOutro: "",
    compliance: "",
    complianceOutro: "",
    urgenciaImplementacao: ""
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Map onboarding data to formulario-cliente format
      const formularioClienteData = {
        userId: "temp-user-id", // Temporary ID - should be real user ID after authentication
        
        // Informações básicas do cliente (usando dados disponíveis)
        nomeCompleto: "Cliente Pós-pagamento", // Campo não coletado, usar padrão
        emailPrincipal: formData.emailCalendar || "cliente@empresa.com",
        telefoneContato: formData.telefoneWhatsApp || "(11) 99999-9999",
        cargoFuncao: "Responsável pelo projeto", // Campo não coletado, usar padrão
        
        // Dados da empresa cliente
        nomeEmpresa: formData.nomeEmpresa,
        setorAtuacao: formData.setor || formData.setorOutro || "Não informado",
        tamanhoEquipe: "Não informado", // Campo não coletado
        receitaAnual: "Não informado", // Campo não coletado
        principaisConcorrentes: "Não informado",
        
        // Objetivos e necessidades
        objetivosPrincipais: ["Automatizar atendimento WhatsApp", "Melhorar eficiência"], // Array obrigatório
        metasNumericas: [], // Opcional
        prazoImplementacao: formData.urgenciaImplementacao || "30 dias",
        orcamentoDisponivel: "Já definido no plano contratado",
        
        // Situação atual
        ferramentasAtuais: formData.crmAtual ? [formData.crmAtual] : [], // Opcional
        principaisDesafios: "Configuração e implementação da secretária IA",
        processoAtualVendas: formData.processoQualificacao || "Processo tradicional",
        volumeLeadsMensais: "Não informado", // Campo não coletado
        taxaConversaoAtual: "Não informado",
        
        // Configurações técnicas
        integracoesNecessarias: [formData.crmAtual].filter(Boolean), // Opcional
        requisitosTecnicos: formData.compliance || "Padrão",
        equipeResponsavel: ["Equipe interna"], // Opcional
        nivelAutonomia: "médio", // Padrão
        
        // Expectativas e sucesso
        expectativasResultados: "Automatizar atendimento e melhorar conversão",
        indicadoresSuccesso: ["Redução tempo resposta", "Aumento conversão"], // Array obrigatório
        tempoEsperadoRoi: "3 meses",
        
        // Suporte e treinamento
        necessidadeTreinamento: "sim",
        disponibilidadeTreinamento: "horário comercial",
        preferenciaSuporte: "chat", // chat, email, telefone
        
        // Status e acompanhamento
        etapaImplementacao: "configuracao",
        prioridadeImplementacao: formData.urgenciaImplementacao === "urgente" ? "alta" : "media",
        observacoesAdicionais: `
Configurações coletadas no onboarding:
- Apresentação WhatsApp: ${formData.apresentacaoWhatsApp}
- Horário funcionamento: ${formData.horarioFuncionamento}
- Produtos/Serviços: ${formData.produtosServicos}
- Tom comunicação: ${formData.tomComunicacao}
- Follow-up: ${formData.quandoFollowUp}
        `.trim()
      };

      // Enviar dados para o endpoint formulario-cliente
      const response = await fetch("/api/formulario-cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formularioClienteData),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      toast({
        title: "✅ Questionário Enviado!",
        description: result.message || "Nossa equipe entrará em contato em até 24h para iniciar a configuração.",
      });
      
      setIsSubmitting(false);
      
      // Redirecionar para home
      setTimeout(() => {
        setLocation('/');
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao enviar questionário:", error);
      toast({
        title: "❌ Erro ao Enviar",
        description: "Ocorreu um erro ao enviar o questionário. Tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const sections = [
    { id: 1, title: "Dados da Empresa", description: "Informações básicas da sua empresa" },
    { id: 2, title: "Produtos e Atendimento", description: "Como sua empresa atende os clientes" },
    { id: 3, title: "Agendamento", description: "Configurações de agendamento" },
    { id: 4, title: "Follow-up e Automação", description: "Estratégias de acompanhamento" },
    { id: 5, title: "Integrações e Técnico", description: "Aspectos técnicos e integrações" }
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="nomeEmpresa">1. Nome completo da empresa *</Label>
              <Input
                id="nomeEmpresa"
                value={formData.nomeEmpresa}
                onChange={(e) => updateFormData("nomeEmpresa", e.target.value)}
                placeholder="Ex: Clínica ABC Ltda"
                className="mt-2"
              />
            </div>

            <div>
              <Label>2. Setor de atuação *</Label>
              <Select value={formData.setor} onValueChange={(value) => updateFormData("setor", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione seu setor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clinica">Clínica/Consultório médico</SelectItem>
                  <SelectItem value="advocacia">Escritório de Advocacia</SelectItem>
                  <SelectItem value="consultoria">Consultoria B2B</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="imobiliaria">Imobiliária</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {formData.setor === "outro" && (
                <div className="mt-4">
                  <Label htmlFor="setorOutro">Especifique seu setor *</Label>
                  <Input
                    id="setorOutro"
                    value={formData.setorOutro}
                    onChange={(e) => updateFormData("setorOutro", e.target.value)}
                    placeholder="Ex: Veterinária, Contabilidade, Academia..."
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="telefoneWhatsApp">3. Telefone principal do WhatsApp Business *</Label>
              <Input
                id="telefoneWhatsApp"
                value={formData.telefoneWhatsApp}
                onChange={(e) => updateFormData("telefoneWhatsApp", e.target.value)}
                placeholder="Ex: (11) 99999-9999"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="emailCalendar">4. Email para Google Calendar *</Label>
              <Input
                id="emailCalendar"
                type="email"
                value={formData.emailCalendar}
                onChange={(e) => updateFormData("emailCalendar", e.target.value)}
                placeholder="Ex: agenda@empresa.com"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="apresentacaoWhatsApp">5. Como vocês se apresentam no WhatsApp? *</Label>
              <Input
                id="apresentacaoWhatsApp"
                value={formData.apresentacaoWhatsApp}
                onChange={(e) => updateFormData("apresentacaoWhatsApp", e.target.value)}
                placeholder='Ex: "Olá, aqui é a Maria da Clínica ABC"'
                className="mt-2"
              />
            </div>

            <div>
              <Label>6. Horário de funcionamento *</Label>
              <RadioGroup 
                value={formData.horarioFuncionamento} 
                onValueChange={(value) => updateFormData("horarioFuncionamento", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comercial" id="comercial" />
                  <Label htmlFor="comercial">8h-18h (comercial)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="estendido" id="estendido" />
                  <Label htmlFor="estendido">8h-20h (estendido)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="24h" id="24h" />
                  <Label htmlFor="24h">24h (emergência)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personalizado" id="personalizado" />
                  <Label htmlFor="personalizado">Personalizado</Label>
                </div>
              </RadioGroup>
              {formData.horarioFuncionamento === "personalizado" && (
                <div className="mt-4">
                  <Label htmlFor="horarioPersonalizado">Especifique o horário *</Label>
                  <Input
                    id="horarioPersonalizado"
                    value={formData.horarioPersonalizado}
                    onChange={(e) => updateFormData("horarioPersonalizado", e.target.value)}
                    placeholder="Ex: Segunda a sexta 9h-17h, sábado 9h-12h"
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="produtosServicos">7. Principais produtos/serviços *</Label>
              <Textarea
                id="produtosServicos"
                value={formData.produtosServicos}
                onChange={(e) => updateFormData("produtosServicos", e.target.value)}
                placeholder="Ex: consultas médicas, exames, procedimentos estéticos..."
                className="mt-2"
              />
            </div>

            <div>
              <Label>8. Valores que a IA pode informar? *</Label>
              <RadioGroup 
                value={formData.iaInformaValores} 
                onValueChange={(value) => updateFormData("iaInformaValores", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="ia-valores-sim" />
                  <Label htmlFor="ia-valores-sim">Sim, pode informar preços</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="ia-valores-nao" />
                  <Label htmlFor="ia-valores-nao">Não, apenas agendar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="faixas" id="ia-valores-faixas" />
                  <Label htmlFor="ia-valores-faixas">Apenas faixas de preço</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>9. Tom de comunicação preferido *</Label>
              <RadioGroup 
                value={formData.tomComunicacao} 
                onValueChange={(value) => updateFormData("tomComunicacao", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="formal" id="tom-formal" />
                  <Label htmlFor="tom-formal">Formal (Sr./Sra., tratamento respeitoso)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="casual" id="tom-casual" />
                  <Label htmlFor="tom-casual">Casual (oi, tudo bem?, mais descontraído)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tecnico" id="tom-tecnico" />
                  <Label htmlFor="tom-tecnico">Técnico (vocabulário específico do setor)</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="processoQualificacao">10. Processo de qualificação de leads *</Label>
              <Textarea
                id="processoQualificacao"
                value={formData.processoQualificacao}
                onChange={(e) => updateFormData("processoQualificacao", e.target.value)}
                placeholder="Como identificar se é lead qualificado? Ex: orçamento disponível, urgência, interesse real..."
                className="mt-2"
              />
            </div>

            <div>
              <Label>11. Quando transferir para humano *</Label>
              <RadioGroup 
                value={formData.quandoTransferir} 
                onValueChange={(value) => updateFormData("quandoTransferir", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sempre-agendar" id="transferir-sempre" />
                  <Label htmlFor="transferir-sempre">Sempre após agendar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="duvidas-complexas" id="transferir-duvidas" />
                  <Label htmlFor="transferir-duvidas">Para dúvidas complexas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fechamento" id="transferir-fechamento" />
                  <Label htmlFor="transferir-fechamento">Para fechamento de vendas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nunca" id="transferir-nunca" />
                  <Label htmlFor="transferir-nunca">Nunca (IA resolve tudo)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="tiposReuniao">12. Tipos de reunião/consulta *</Label>
              <Textarea
                id="tiposReuniao"
                value={formData.tiposReuniao}
                onChange={(e) => updateFormData("tiposReuniao", e.target.value)}
                placeholder="Ex: consulta inicial, reunião comercial, retorno, avaliação..."
                className="mt-2"
              />
            </div>

            <div>
              <Label>13. Duração padrão dos agendamentos *</Label>
              <RadioGroup 
                value={formData.duracaoPadrao} 
                onValueChange={(value) => updateFormData("duracaoPadrao", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30min" id="duracao-30" />
                  <Label htmlFor="duracao-30">30 minutos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1h" id="duracao-1h" />
                  <Label htmlFor="duracao-1h">1 hora</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="varia" id="duracao-varia" />
                  <Label htmlFor="duracao-varia">Varia por tipo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outro" id="duracao-outro" />
                  <Label htmlFor="duracao-outro">Outro</Label>
                </div>
              </RadioGroup>
              {formData.duracaoPadrao === "outro" && (
                <div className="mt-4">
                  <Label htmlFor="duracaoOutro">Especifique a duração *</Label>
                  <Input
                    id="duracaoOutro"
                    value={formData.duracaoOutro}
                    onChange={(e) => updateFormData("duracaoOutro", e.target.value)}
                    placeholder="Ex: 45 minutos, 1h30min, 2 horas"
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label>14. Disponibilidade de horários *</Label>
              <RadioGroup 
                value={formData.disponibilidadeHorarios} 
                onValueChange={(value) => updateFormData("disponibilidadeHorarios", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manha" id="disp-manha" />
                  <Label htmlFor="disp-manha">Apenas manhã (8h-12h)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tarde" id="disp-tarde" />
                  <Label htmlFor="disp-tarde">Apenas tarde (14h-18h)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="manha-tarde" id="disp-manha-tarde" />
                  <Label htmlFor="disp-manha-tarde">Manhã e tarde</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inclui-noite" id="disp-noite" />
                  <Label htmlFor="disp-noite">Inclui noite/fins de semana</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="informacoesNecessarias">15. Informações necessárias para agendar *</Label>
              <Textarea
                id="informacoesNecessarias"
                value={formData.informacoesNecessarias}
                onChange={(e) => updateFormData("informacoesNecessarias", e.target.value)}
                placeholder="Ex: Nome, telefone, motivo da consulta, plano de saúde..."
                className="mt-2"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>16. Quando fazer follow-up automático *</Label>
              <RadioGroup 
                value={formData.quandoFollowUp} 
                onValueChange={(value) => updateFormData("quandoFollowUp", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="24h" id="follow-24h" />
                  <Label htmlFor="follow-24h">24h após primeiro contato</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3dias" id="follow-3dias" />
                  <Label htmlFor="follow-3dias">3 dias se não responder</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1semana" id="follow-1semana" />
                  <Label htmlFor="follow-1semana">1 semana para reativação</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personalizado" id="follow-personalizado" />
                  <Label htmlFor="follow-personalizado">Personalizado</Label>
                </div>
              </RadioGroup>
              {formData.quandoFollowUp === "personalizado" && (
                <div className="mt-4">
                  <Label htmlFor="followUpPersonalizado">Especifique quando fazer follow-up *</Label>
                  <Input
                    id="followUpPersonalizado"
                    value={formData.followUpPersonalizado}
                    onChange={(e) => updateFormData("followUpPersonalizado", e.target.value)}
                    placeholder="Ex: 2 horas após, 5 dias úteis, toda segunda-feira"
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label>17. Quantas tentativas de follow-up *</Label>
              <RadioGroup 
                value={formData.tentativasFollowUp} 
                onValueChange={(value) => updateFormData("tentativasFollowUp", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-2" id="tentativas-1-2" />
                  <Label htmlFor="tentativas-1-2">1-2 tentativas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-5" id="tentativas-3-5" />
                  <Label htmlFor="tentativas-3-5">3-5 tentativas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ate-responder" id="tentativas-ate" />
                  <Label htmlFor="tentativas-ate">Até responder</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personalizado" id="tentativas-personalizado" />
                  <Label htmlFor="tentativas-personalizado">Personalizado</Label>
                </div>
              </RadioGroup>
              {formData.tentativasFollowUp === "personalizado" && (
                <div className="mt-4">
                  <Label htmlFor="tentativasPersonalizado">Especifique quantas tentativas *</Label>
                  <Input
                    id="tentativasPersonalizado"
                    value={formData.tentativasPersonalizado}
                    onChange={(e) => updateFormData("tentativasPersonalizado", e.target.value)}
                    placeholder="Ex: 7 tentativas, até 10 dias, dependendo da resposta"
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="situacoesSemFollowUp">18. Situações que NÃO devem ter follow-up *</Label>
              <Textarea
                id="situacoesSemFollowUp"
                value={formData.situacoesSemFollowUp}
                onChange={(e) => updateFormData("situacoesSemFollowUp", e.target.value)}
                placeholder='Ex: cliente disse "não tenho interesse", "me tire da lista", palavras de bloqueio...'
                className="mt-2"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label>19. Usa algum CRM atualmente *</Label>
              <Select value={formData.crmAtual} onValueChange={(value) => updateFormData("crmAtual", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione seu CRM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nao-usa">Não usa CRM</SelectItem>
                  <SelectItem value="hubspot">HubSpot</SelectItem>
                  <SelectItem value="rd-station">RD Station</SelectItem>
                  <SelectItem value="pipedrive">Pipedrive</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {formData.crmAtual === "outro" && (
                <div className="mt-4">
                  <Label htmlFor="crmOutro">Especifique seu CRM *</Label>
                  <Input
                    id="crmOutro"
                    value={formData.crmOutro}
                    onChange={(e) => updateFormData("crmOutro", e.target.value)}
                    placeholder="Ex: Salesforce, Monday, ActiveCampaign..."
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label>20. Compliance/Regulamentações especiais *</Label>
              <RadioGroup 
                value={formData.compliance} 
                onValueChange={(value) => updateFormData("compliance", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lgpd-basico" id="compliance-lgpd" />
                  <Label htmlFor="compliance-lgpd">LGPD básico</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cfm" id="compliance-cfm" />
                  <Label htmlFor="compliance-cfm">CFM (médico)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oab" id="compliance-oab" />
                  <Label htmlFor="compliance-oab">OAB (advocacia)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outro" id="compliance-outro" />
                  <Label htmlFor="compliance-outro">Outro</Label>
                </div>
              </RadioGroup>
              {formData.compliance === "outro" && (
                <div className="mt-4">
                  <Label htmlFor="complianceOutro">Especifique a regulamentação *</Label>
                  <Input
                    id="complianceOutro"
                    value={formData.complianceOutro}
                    onChange={(e) => updateFormData("complianceOutro", e.target.value)}
                    placeholder="Ex: ANVISA, CVM, Banco Central, ISO 27001..."
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label>21. Urgência para implementação *</Label>
              <RadioGroup 
                value={formData.urgenciaImplementacao} 
                onValueChange={(value) => updateFormData("urgenciaImplementacao", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="essa-semana" id="urgencia-semana" />
                  <Label htmlFor="urgencia-semana">Essa semana</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2-semanas" id="urgencia-2semanas" />
                  <Label htmlFor="urgencia-2semanas">Próximas 2 semanas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="proximo-mes" id="urgencia-mes" />
                  <Label htmlFor="urgencia-mes">Próximo mês</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sem-pressa" id="urgencia-sem-pressa" />
                  <Label htmlFor="urgencia-sem-pressa">Sem pressa</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isCurrentSectionValid = () => {
    switch (currentSection) {
      case 1:
        const setorValid = formData.setor && (formData.setor !== "outro" || formData.setorOutro);
        const horarioValid = formData.horarioFuncionamento && (formData.horarioFuncionamento !== "personalizado" || formData.horarioPersonalizado);
        return formData.nomeEmpresa && setorValid && formData.telefoneWhatsApp && 
               formData.emailCalendar && formData.apresentacaoWhatsApp && horarioValid;
      case 2:
        return formData.produtosServicos && formData.iaInformaValores && formData.tomComunicacao && 
               formData.processoQualificacao && formData.quandoTransferir;
      case 3:
        const duracaoValid = formData.duracaoPadrao && (formData.duracaoPadrao !== "outro" || formData.duracaoOutro);
        return formData.tiposReuniao && duracaoValid && formData.disponibilidadeHorarios && 
               formData.informacoesNecessarias;
      case 4:
        const followUpValid = formData.quandoFollowUp && (formData.quandoFollowUp !== "personalizado" || formData.followUpPersonalizado);
        const tentativasValid = formData.tentativasFollowUp && (formData.tentativasFollowUp !== "personalizado" || formData.tentativasPersonalizado);
        return followUpValid && tentativasValid && formData.situacoesSemFollowUp;
      case 5:
        const crmValid = formData.crmAtual && (formData.crmAtual !== "outro" || formData.crmOutro);
        const complianceValid = formData.compliance && (formData.compliance !== "outro" || formData.complianceOutro);
        return crmValid && complianceValid && formData.urgenciaImplementacao;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        {/* Header de Agradecimento */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-accent text-3xl"></i>
          </div>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">
            <span className="luxury-text">Pagamento</span><br/>
            <span className="luxury-accent">Confirmado!</span>
          </h1>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Obrigado por escolher nossa plataforma! Nossa equipe entrará em contato em até 24 horas.
            <br/>Para acelerar o processo, responda ao questionário abaixo:
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium ${
                  currentSection === section.id
                    ? "border-accent bg-accent text-accent-foreground"
                    : currentSection > section.id
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-muted bg-muted text-muted-foreground"
                }`}
              >
                {currentSection > section.id ? (
                  <i className="fas fa-check text-xs"></i>
                ) : (
                  section.id
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted h-2 rounded-full">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentSection / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Questionário */}
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="text-2xl font-light">
              {sections[currentSection - 1]?.title}
            </CardTitle>
            <CardDescription>
              {sections[currentSection - 1]?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderSection()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentSection(Math.max(1, currentSection - 1))}
                disabled={currentSection === 1}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Anterior
              </Button>
              
              {currentSection < sections.length ? (
                <Button
                  onClick={() => setCurrentSection(currentSection + 1)}
                  disabled={!isCurrentSectionValid()}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Próximo
                  <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isCurrentSectionValid() || isSubmitting}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Enviar Questionário
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informações de Contato */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Precisa de ajuda? Entre em contato conosco:
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <span><i className="fas fa-envelope mr-2 text-accent"></i> suporte@nexusintelligence.com</span>
            <span><i className="fab fa-whatsapp mr-2 text-accent"></i> (11) 99999-9999</span>
          </div>
        </div>
      </div>
    </div>
  );
}