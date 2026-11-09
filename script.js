'use strict';

// Destino dos pedidos preparados pelo cliente.
const WHATSAPP_NUMBER = '5511999999999';
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const byId = id => products.find(product => product.id === id);
const minimum = product => product.category === 'festa' ? 2 : 1;
const unit = product => product.category === 'festa' ? 'kg' : product.category === 'docinhos' ? 'cento(s)' : 'un.';
let bag = {};
try {
  const stored = JSON.parse(localStorage.getItem('vo-rosa-sacola') || '{}');
  for (const product of products) {
    const quantity = stored?.[product.id];
    if (Number.isInteger(quantity) && quantity >= minimum(product) && quantity <= 999) bag[product.id] = quantity;
  }
} catch { /* A sacola também funciona com armazenamento local desativado. */ }
let toastTimer;
const dialog = document.querySelector('#bag-dialog');

function renderProducts(category = 'caseiros') {
  const info = categories[category];
  document.querySelector('#category-title').textContent = info.title;
  document.querySelector('#category-description').textContent = info.description;
  document.querySelector('#category-note').textContent = info.note;
  document.querySelectorAll('[data-category]').forEach(button => {
    const selected = button.dataset.category === category;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelector('#products').innerHTML = products.filter(product => product.category === category).map(product => {
    const serving = category === 'caseiros' ? 'Forma 22 cm · 12 fatias' : category === 'festa' ? 'Mínimo de 2 kg' : category === 'docinhos' ? '100 unidades' : 'Consumo no balcão';
    const suffix = category === 'festa' ? '/kg' : '';
    return `<article class="product-card"><div class="product-image"><img src="${product.image}" alt="${product.alt} Foto ilustrativa." width="600" height="400" loading="lazy" decoding="async"><span class="image-disclaimer">Foto ilustrativa</span>${product.badge ? `<span class="pill">${product.badge}</span>` : ''}</div><div class="product-body"><h3>${product.name}</h3><p>${product.description}</p><div class="tags"><span>${serving}</span><span>${product.tag}</span></div><div class="product-bottom"><span class="price"><small>${category === 'docinhos' ? 'Por cento' : category === 'festa' ? 'Por quilo' : 'Valor'} </small>${money(product.price)}${suffix}</span><button class="button" data-add="${product.id}" aria-label="Adicionar ${product.name} à sacola">Adicionar <span aria-hidden="true">＋</span></button></div></div></article>`;
  }).join('') + (category === 'caseiros' ? `<article class="promo-card"><div><span class="promo-icon" aria-hidden="true">♧</span><h3>Um bolo quentinho,<br>uma memória doce</h3><p>Do café da tarde ao encontro em família, nossas receitas caseiras deixam qualquer momento mais especial. Escolha seu favorito e encomende com carinho.</p></div><div class="promo-bottom"><span>Feito especialmente para você</span><a class="button" href="#contato">Planejar minha encomenda <span aria-hidden="true">→</span></a></div></article>` : '');
}
function entries() { return Object.entries(bag).map(([id, quantity]) => ({ product: byId(id), quantity })); }
function totals() {
  const subtotal = Math.round(entries().reduce((sum, { product, quantity }) => sum + product.price * quantity, 0) * 100) / 100;
  const discount = subtotal > 300 ? Math.round(subtotal * 10) / 100 : 0;
  return { subtotal, discount, total: subtotal - discount };
}
function persistBag() {
  try { localStorage.setItem('vo-rosa-sacola', JSON.stringify(bag)); } catch { /* Sem persistência, a seleção continua disponível nesta visita. */ }
  const quantity = Object.values(bag).reduce((sum, count) => sum + count, 0);
  document.querySelector('#bag-count').textContent = quantity;
  document.querySelector('#cart-quantity').textContent = `${quantity} ${quantity === 1 ? 'item' : 'itens'}`;
  document.querySelector('#cart-total').textContent = money(totals().total);
  document.querySelectorAll('[data-send-order]').forEach(button => { button.disabled = quantity === 0; });
}
function notify(message) {
  const toast = document.querySelector('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
}
function renderBag() {
  document.querySelector('#bag-items').innerHTML = entries().map(({ product, quantity }) => `<div class="bag-item"><div><strong>${product.name}</strong><small>${money(product.price)}${product.category === 'festa' ? '/kg' : product.category === 'docinhos' ? '/cento' : '/un.'} · ${money(product.price * quantity)}</small></div><div class="quantity-controls"><button data-quantity="${product.id}" data-change="-1" aria-label="Diminuir quantidade de ${product.name}" ${quantity <= minimum(product) ? 'disabled' : ''}>−</button><span>${quantity} ${unit(product)}</span><button data-quantity="${product.id}" data-change="1" aria-label="Aumentar quantidade de ${product.name}" ${quantity >= 999 ? 'disabled' : ''}>+</button><button class="remove" data-remove="${product.id}" aria-label="Remover ${product.name}">Remover</button></div></div>`).join('') || '<p class="empty-bag">Sua sacola está esperando um pouco de doçura. Escolha seus favoritos no cardápio.</p>';
  const { subtotal, discount, total } = totals();
  document.querySelector('#bag-totals').innerHTML = `<div class="totals"><div><span>Subtotal</span><span>${money(subtotal)}</span></div>${discount ? `<div><span>Desconto de 10%</span><span>− ${money(discount)}</span></div>` : ''}<div class="grand-total"><span>Total estimado</span><span>${money(total)}</span></div><div><span>Sinal de 50%</span><span>${money(total / 2)}</span></div></div>`;
  document.querySelector('#copy-bag').disabled = !entries().length;
  document.querySelector('#plan-order').textContent = entries().length ? 'Continuar encomenda' : 'Explorar cardápio';
  document.querySelector('.summary-label').hidden = true;
  document.querySelector('#copy-status').textContent = '';
}
function openBag() { renderBag(); if (!dialog.open) dialog.showModal(); }
function summary(details = '') {
  const { subtotal, discount, total } = totals();
  const lines = entries().map(({ product, quantity }) => `• ${product.name}: ${quantity} ${unit(product)} — ${money(quantity * product.price)}${product.category === 'balcao' ? ' (consumo no balcão)' : ''}`);
  return ['Olá, Confeitaria Vó Rosa! Gostaria de consultar uma encomenda.', details, ...lines, lines.length ? `Subtotal: ${money(subtotal)}` : '', discount ? `Desconto de 10%: ${money(discount)}` : '', lines.length ? `Total estimado: ${money(total)}\nSinal de 50%: ${money(total / 2)}` : '', 'Entrega grátis em até 5 km. Confirmar disponibilidade, data e entrega ou retirada com a confeitaria.'].filter(Boolean).join('\n\n');
}
async function showSummary(text) {
  const field = document.querySelector('#order-summary');
  field.value = text;
  field.parentElement.hidden = false;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(text);
    document.querySelector('#copy-status').textContent = 'Resumo copiado! O pedido ainda precisa ser combinado com a confeitaria.';
  } catch {
    field.focus(); field.select();
    document.querySelector('#copy-status').textContent = 'Seu resumo está pronto. Copie o texto acima para compartilhar.';
  }
}

document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => renderProducts(button.dataset.category)));
document.querySelector('#products').addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const product = byId(button.dataset.add);
  bag[product.id] = Math.min(999, bag[product.id] ? bag[product.id] + 1 : minimum(product));
  persistBag(); notify('Adicionado à sacola com carinho!');
});
document.querySelectorAll('[data-open-bag]').forEach(button => button.addEventListener('click', openBag));
function whatsappUrl(text = summary()) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
document.querySelectorAll('[data-send-order]').forEach(button => button.addEventListener('click', () => {
  if (!entries().length) { notify('Adicione um item ao carrinho para preparar seu pedido.'); return; }
  window.open(whatsappUrl(), '_blank', 'noopener,noreferrer');
}));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
document.querySelector('#bag-items').addEventListener('click', event => {
  const remove = event.target.closest('[data-remove]');
  const change = event.target.closest('[data-quantity]');
  if (remove) delete bag[remove.dataset.remove];
  else if (change) {
    const product = byId(change.dataset.quantity);
    bag[product.id] = Math.min(999, Math.max(minimum(product), bag[product.id] + Number(change.dataset.change)));
  } else return;
  persistBag(); renderBag();
});
document.querySelector('#plan-order').addEventListener('click', () => { dialog.close(); document.querySelector(entries().length ? '#contato' : '#cardapio').scrollIntoView({ behavior: 'smooth' }); });
document.querySelector('#copy-bag').addEventListener('click', () => showSummary(summary()));
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');
function closeMenu() { navigation.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Abrir menu'); }
menuToggle.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(items => {
    for (const item of items) if (item.isIntersecting) document.querySelectorAll('.navigation a').forEach(link => link.classList.toggle('active', link.hash === '#' + item.target.id));
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main>section').forEach(section => observer.observe(section));
}
const dateField = document.querySelector('input[type="date"]');
const earliest = new Date(); earliest.setDate(earliest.getDate() + 2);
dateField.min = `${earliest.getFullYear()}-${String(earliest.getMonth() + 1).padStart(2, '0')}-${String(earliest.getDate()).padStart(2, '0')}`;
document.querySelector('#order-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const date = String(data.get('date')).split('-').reverse().join('/');
  const details = `Nome: ${String(data.get('name')).trim()}\nTelefone: ${String(data.get('phone')).trim()}\nData prevista: ${date}\nOcasião: ${data.get('occasion')}\nObservações: ${String(data.get('message')).trim() || 'A combinar.'}`;
  const text = summary(details);
  window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
});
document.querySelector('#year').textContent = new Date().getFullYear();
renderProducts(); persistBag();
