// app.js — versão com cópia do memorando + toast

/* ===========================
   Utilitários de moeda (BRL)
   =========================== */
const toNumber = (v) => {
  if (typeof v !== 'string') return Number(v) || 0;
  return Number(v.replace(/\./g, '').replace(',', '.')) || 0;
};

const toBRL = (n) =>
  (isFinite(n) ? n : 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

const normalizeMoneyText = (text) => {
  if (!text) return '0,00';
  const normalized = text.replace(/\./g, ',').replace(/[^\d,]/g, '');
  const parts = normalized.split(',');
  const intPart = (parts[0] || '').replace(/\D/g, '') || '0';
  let decPart = (parts[1] || '').replace(/\D/g, '');
  decPart = decPart.slice(0, 2).padEnd(2, '0');
  return `${intPart},${decPart}`;
};

const formatInputAsMoneyOnBlur = (input) => {
  if (!input.value) return;
  const normalized = normalizeMoneyText(input.value);
  input.value = toBRL(toNumber(normalized)).replace('R$ ', '').replace('R$', '').trim();
};

const restrictMoneyTyping = (input) => {
  const pos = input.selectionStart;
  const cleaned = input.value.replace(/[^\d.,]/g, '');
  input.value = cleaned;
  requestAnimationFrame(() => {
    input.selectionStart = input.selectionEnd = pos;
  });
};

/* ===========================
   Seletores
   =========================== */
// Desconto
const elPlano = document.getElementById('valor-plano');
const elPerc1 = document.getElementById('perc1');
const elPerc2 = document.getElementById('perc2');
const elPerc1Out = document.getElementById('perc1-out');
const elPerc2Out = document.getElementById('perc2-out');
const elDescReais = document.getElementById('desc-reais');
const elValorFinal = document.getElementById('valor-final');
const formDesc = document.getElementById('form-desconto');

// Proporcional
const formProp = document.getElementById('form-prop');
const elValorCheio = document.getElementById('valor-cheio');
const elDiasUtil = document.getElementById('dias-util');
const elAjusteOut = document.getElementById('ajuste-out');
const elApagarOut = document.getElementById('apagar-out');

// Memorando + toast
const btnMemorando = document.getElementById('btn-memorando');
const boxMemorando = document.getElementById('memorando-result');
const memorandoTip = document.getElementById('memorando-tip');
const toast = document.getElementById('toast');
const toastText = document.getElementById('toast-text');

/* ===========================
   Presets de porcentagem
   =========================== */
document.querySelectorAll('.chips .chip').forEach((btn) => {
  btn.addEventListener('click', () => {
    const pct = Number(btn.dataset.preset || 0);
    const wrap = btn.closest('.field');
    const slider = wrap.querySelector('input[type="range"]');
    const out = wrap.querySelector('output');
    if (slider && out) {
      slider.value = pct;
      out.textContent = `${pct}%`;
    }

    else {
        document.getElementById("resultadoMemo").value = `Cliente retido com oferta de ${value1}% + ${value2}% + R$ ${descontoReais1} + R$ ${descontoReais2} do débito automático (caso tenha), ficando no valor de ${calcFinalAgoraVai}, cliente ciente da fidelidade por 12 meses.`;
    }

    document.getElementById("resultadoMemo").style.display = "block";
    document.getElementById("resultadoMemo").select();
    document.execCommand('copy');
    alert("MEMORANDO COPIADO");
}
