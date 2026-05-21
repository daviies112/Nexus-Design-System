import { Router } from "express";

const router = Router();

router.post("/calculate-roi", (req, res) => {
  try {
    const { leads, ticket, hours, businessType } = req.body;
    const lostLeads = Math.round((leads || 0) * 0.68);
    const lostRevenue = lostLeads * (ticket || 0);
    const timeCost = (hours || 0) * 30 * 40;
    const totalSavings = lostRevenue + timeCost;
    const annualSavings = totalSavings * 12;
    const investment = 200 * 12;
    const roi = investment > 0 ? Math.round(((annualSavings - investment) / investment) * 100) : 0;
    res.json({ lostLeads, lostRevenue, timeCost, totalSavings, annualSavings, roi });
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao calcular ROI: " + err.message });
  }
});

router.post("/formulario-personalizado", (req, res) => {
  try {
    const data = req.body;
    let score = 0;
    if (data.tamanhoEmpresa === "small") score += 25;
    else if (data.tamanhoEmpresa === "medium") score += 35;
    else if (data.tamanhoEmpresa === "large") score += 30;
    else score += 15;
    if (data.receita === "medium") score += 30;
    else if (data.receita === "high") score += 35;
    else if (data.receita === "enterprise") score += 25;
    else score += 10;
    if (data.volumeLeads === "medium") score += 25;
    else if (data.volumeLeads === "high") score += 30;
    else if (data.volumeLeads === "enterprise") score += 15;
    else score += 10;
    if (data.timeline === "immediate") score += 20;
    else if (data.timeline === "month") score += 15;
    else if (data.timeline === "quarter") score += 10;
    else score += 5;
    req.log.info({ score }, "Formulário personalizado recebido");
    res.json({
      score,
      message: "Qualificação enviada com sucesso! Entraremos em contato via WhatsApp em até 2 horas.",
    });
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao processar formulário: " + err.message });
  }
});

router.get("/available-slots", (req, res) => {
  try {
    const today = new Date();
    const groupedSlots: Record<string, Array<{ timeSlot: string; available: boolean }>> = {};
    for (let d = 1; d <= 30; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() + d);
      const day = date.getDay();
      if (day === 0 || day === 6) continue;
      const dateStr = date.toISOString().split("T")[0];
      const slots: Array<{ timeSlot: string; available: boolean }> = [];
      for (let h = 9; h <= 17; h++) {
        for (const m of [0, 30]) {
          if (h === 17 && m === 30) continue;
          const hh = h.toString().padStart(2, "0");
          const mm = m.toString().padStart(2, "0");
          slots.push({ timeSlot: `${hh}:${mm}`, available: Math.random() > 0.3 });
        }
      }
      groupedSlots[dateStr] = slots;
    }
    res.json({
      availableSlots: groupedSlots,
      totalDays: Object.keys(groupedSlots).length,
      totalSlots: Object.values(groupedSlots).flat().length,
      parameters: { startDate: today.toISOString().split("T")[0], endDate: "", duration: 30 },
    });
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao buscar horários: " + err.message });
  }
});

router.post("/reuniao-prospecto", (req, res) => {
  try {
    req.log.info({ body: req.body }, "Reunião de prospecto agendada");
    res.json({
      id: Math.random().toString(36).slice(2, 10),
      message: "Reunião agendada com sucesso! Você receberá um email de confirmação em breve.",
      calendarLink: null,
    });
  } catch (err: any) {
    res.status(500).json({ message: "Erro ao agendar reunião: " + err.message });
  }
});

export default router;
