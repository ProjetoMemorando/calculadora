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
  });
});

/* ===========================
   Sliders -> Outputs
   =========================== */
elPerc1.addEventListener('input', () => (elPerc1Out.textContent = `${elPerc1.value}%`));
elPerc2.addEventListener('input', () => (elPerc2Out.textContent = `${elPerc2.value}%`));

/* ===========================
   Máscaras monetárias
   =========================== */
[elPlano, elDescReais, elValorCheio].forEach((el) => {
  if (!el) return;
  el.addEventListener('input', () => restrictMoneyTyping(el));
  el.addEventListener('blur', () => formatInputAsMoneyOnBlur(el));
});

/* ===========================
   Cálculo: Descontos
   =========================== */
formDesc.addEventListener('submit', (e) => {
  e.preventDefault();
  const base = toNumber(normalizeMoneyText(elPlano.value));
  const p1 = Number(elPerc1.value) / 100;
  const p2 = Number(elPerc2.value) / 100;
  const descReais = toNumber(normalizeMoneyText(elDescReais.value));

  const valorAposP1 = base * (1 - p1);
  const valorAposP2 = valorAposP1 * (1 - p2);
  const valorAposReais = Math.max(0, valorAposP2 - descReais);

  elValorFinal.value = toBRL(valorAposReais).replace('R$ ', '').trim();
});

formDesc.addEventListener('reset', () => {
  setTimeout(() => {
    elPerc1.value = 0;
    elPerc2.value = 0;
    elPerc1Out.textContent = '0%';
    elPerc2Out.textContent = '0%';
    elValorFinal.value = '';
  }, 0);
});

/* ===========================
   Cálculo: Proporcional
   =========================== */
formProp.addEventListener('submit', (e) => {
  e.preventDefault();
  const valor = toNumber(normalizeMoneyText(elValorCheio.value));
  const dias = Number(elDiasUtil.value || 0);
  const diasBase = 30;

  const diasClamped = Math.min(Math.max(dias, 0), diasBase);
  const ajuste = (valor / diasBase) * diasClamped;
  const aPagar = Math.max(0, valor - ajuste);

  elAjusteOut.textContent = toBRL(ajuste);
  elApagarOut.textContent = toBRL(aPagar);
});

formProp.addEventListener('reset', () => {
  setTimeout(() => {
    elAjusteOut.textContent = 'R$ 0,00';
    elApagarOut.textContent = 'R$ 0,00';
  }, 0);
});

/* ===========================
   Toast helper
   =========================== */
let toastTimer = null;
const showToast = (message = 'Copiado!') => {
  toastText.textContent = message;
  toast.hidden = false;
  // força reflow para transição
  // eslint-disable-next-line no-unused-expressions
  toast.offsetHeight;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => (toast.hidden = true), 200);
  }, 1800);
};

/* ===========================
   Memorando: gerar e copiar
   =========================== */
btnMemorando.addEventListener('click', () => {
  const motivo = document.querySelector('input[name="retencao"]:checked')?.value || '';
  const plano = toBRL(toNumber(normalizeMoneyText(elPlano.value)));
  const p1 = `${elPerc1.value}%`;
  const p2 = `${elPerc2.value}%`;
  const reais = toBRL(toNumber(normalizeMoneyText(elDescReais.value)));
  const final = elValorFinal.value ? `R$ ${elValorFinal.value}` : '—';

  const texto = [
    `Memorando de Retenção`,
    `Motivo: ${motivo}`,
    `Valor do plano: ${plano}`,
    `Descontos: ${p1} + ${p2} + ${reais}`,
    `Valor final: ${final}`,
    `Data/Hora: ${new Date().toLocaleString('pt-BR')}`,
  ].join('\n');

  boxMemorando.textContent = texto;
  boxMemorando.hidden = false;
  memorandoTip.hidden = false;
});

/**
 * Clique no memorando -> copia para a área de transferência e mostra toast
 */
boxMemorando.addEventListener('click', async () => {
  const texto = boxMemorando.textContent?.trim();
  if (!texto) return;

  try {
    // Tenta API moderna
    await navigator.clipboard.writeText(texto);
    showToast('Memorando copiado para a área de transferência');
  } catch (err) {
    // Fallback com textarea temporário
    const ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      const ok = document.execCommand('copy');
      if (ok) {
        showToast('Memorando copiado para a área de transferência');
      } else {
        showToast('Não foi possível copiar automaticamente');
      }
    } catch {
      showToast('Não foi possível copiar automaticamente');
    } finally {
      document.body.removeChild(ta);
    }
  }
});
