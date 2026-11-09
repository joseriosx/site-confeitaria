'use strict';

// Caminhos relativos ao index.html; funciona sem servidor e após a publicação.
const categories = {
  caseiros: { title: 'Bolos Caseiros', description: 'Receitas de família preparadas artesanalmente com ingredientes frescos e afeto diário.', note: 'Forma de 22 cm · Serve 12 fatias' },
  festa: { title: 'Bolos de Festa', description: 'Camadas de carinho, recheios generosos e sabores para as suas celebrações.', note: 'Preço por quilo · Pedido mínimo de 2 kg por sabor' },
  docinhos: { title: 'Docinhos', description: 'Pequenas delícias para deixar a mesa e os seus momentos ainda mais especiais.', note: 'Valores por cento · 100 unidades' },
  balcao: { title: 'Fatias & Bebidas', description: 'Uma pausa gostosa: bolo caseiro, café coado e suco natural.', note: 'Para consumo no balcão' }
};
const products = [
  { id: 'cenoura', category: 'caseiros', name: 'Bolo de cenoura com cobertura de chocolate', description: 'O clássico da casa, com calda de chocolate meio amargo.', price: 55, tag: 'Chocolate meio amargo', badge: 'Clássico da Casa', image: 'imagens/bolo-cenoura.jpg', alt: "Bolo de cenoura brasileiro com cobertura e granulado de chocolate sobre um prato." },
  { id: 'fuba', category: 'caseiros', name: 'Bolo de fubá com goiabada', description: 'Fofinho, com pedaços de goiabada cascão.', price: 48, tag: 'Goiabada cascão', badge: 'Sabor de Infância', image: 'imagens/bolo-fuba.jpg', alt: "Mesa de café da manhã com bolo de fubá dourado e pães de queijo." },
  { id: 'laranja', category: 'caseiros', name: 'Bolo de laranja', description: 'Massa com suco natural e calda de laranja.', price: 45, tag: 'Suco natural', badge: 'Toque Cítrico', image: 'imagens/bolo-laranja.jpg', alt: "Bolo cítrico com furo no centro e açúcar polvilhado, sobre uma boleira." },
  { id: 'milho', category: 'caseiros', name: 'Bolo de milho cremoso', description: 'Feito com milho verde fresco.', price: 50, tag: 'Milho verde fresco', badge: 'Receita de Vó', image: 'imagens/bolo-milho.jpg', alt: "Fatia dourada de bolo de milho caseiro em um prato decorado." },
  { id: 'banana', category: 'caseiros', name: 'Bolo de banana com canela', description: 'Sem açúcar refinado, adoçado com mel.', price: 52, tag: 'Adoçado com mel', badge: 'Sem Açúcar Refinado', image: 'imagens/bolo-banana.jpg', alt: "Bolo caseiro de banana com fatias cortadas e bananas frescas ao lado." },
  { id: 'brigadeiro-morango', category: 'festa', name: 'Brigadeiro com morango', description: 'Massa de chocolate, recheio de brigadeiro e morangos frescos.', price: 110, tag: 'Chocolate & morango', image: 'imagens/bolo-brigadeiro-morango.jpg', alt: "Bolo de chocolate decorado com morangos e uma fita vermelha." },
  { id: 'ninho', category: 'festa', name: 'Ninho com frutas vermelhas', description: 'Massa branca, creme de leite em pó e geleia de frutas vermelhas.', price: 120, tag: 'Frutas vermelhas', image: 'imagens/bolo-ninho-frutas.jpg', alt: "Bolo com cobertura branca, chocolate e frutas vermelhas no topo." },
  { id: 'prestigio', category: 'festa', name: 'Prestígio', description: 'Massa de chocolate e recheio cremoso de coco.', price: 105, tag: 'Chocolate & coco', image: 'imagens/bolo-prestigio.jpg', alt: "Fatia de bolo de chocolate coberta com lascas de coco." },
  { id: 'nozes', category: 'festa', name: 'Doce de leite com nozes', description: 'Massa amanteigada, doce de leite caseiro e nozes.', price: 125, tag: 'Doce de leite caseiro', image: 'imagens/bolo-doce-leite-nozes.jpg', alt: "Fatia de bolo em camadas com cobertura de caramelo e nozes." },
  { id: 'brigadeiro', category: 'docinhos', name: 'Brigadeiro tradicional', description: 'Chocolate com granulado.', price: 150, tag: 'Chocolate', image: 'imagens/brigadeiro.jpg', alt: "Brigadeiros com granulado de chocolate em uma travessa branca." },
  { id: 'beijinho', category: 'docinhos', name: 'Beijinho', description: 'Coco com cravo.', price: 150, tag: 'Coco', image: 'imagens/beijinho.jpg', alt: "Docinhos redondos cobertos com coco ralado sobre um tecido claro." },
  { id: 'gourmet', category: 'docinhos', name: 'Brigadeiro gourmet sortido', description: 'Pistache, café, limão e churros.', price: 220, tag: 'Sabores sortidos', image: 'imagens/brigadeiro-gourmet.jpg', alt: "Brigadeiros sortidos cobertos com chocolate e castanhas sobre uma mesa de madeira." },
  { id: 'fatia', category: 'balcao', name: 'Fatia de bolo caseiro', description: 'Sabores do dia.', price: 8, tag: 'Por fatia', image: 'imagens/fatia-bolo.jpg', alt: "Fatias de bolo caseiro de banana, com frutas frescas ao lado." },
  { id: 'cafe', category: 'balcao', name: 'Café coado', description: 'Xícara de 150 ml.', price: 5, tag: '150 ml', image: 'imagens/cafe-coado.jpg', alt: "Xícara branca de café preto sobre uma tábua de madeira e um tecido listrado." },
  { id: 'suco', category: 'balcao', name: 'Suco natural', description: 'Laranja ou limão, copo de 300 ml.', price: 9, tag: '300 ml', image: 'imagens/suco-laranja.jpg', alt: "Copos de suco de laranja com rodelas de laranja sobre um fundo branco." }
];

window.CARDAPIO = { categories, products };
