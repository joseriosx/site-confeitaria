# Confeitaria Vó Rosa

Site estático e responsivo de uma confeitaria, desenvolvido em HTML, CSS e JavaScript puro, sem frameworks ou etapa de compilação. O visual usa os arquivos fornecidos na pasta de referência, e o cardápio reúne os 15 produtos do PDF didático.

## Como abrir

1. Baixe ou copie o projeto completo.
2. Abra `index.html` diretamente em um navegador moderno.
3. Navegue pelas categorias e clique em **Adicionar** para montar o pedido.

Não é necessário instalar dependências ou iniciar um servidor. Fotos e fontes estão salvas localmente, permitindo navegar pelo site offline. O encaminhamento para o WhatsApp precisa de internet.

## Funcionalidades

- Layout adaptado para celular, tablet e computador.
- Quatro categorias: bolos caseiros, bolos de festa, docinhos e fatias e bebidas.
- Imagens locais com textos alternativos e molduras uniformes.
- Carrinho fixo com quantidade e total atualizado.
- Consulta, alteração de quantidades e remoção de produtos no carrinho.
- Persistência dos produtos e quantidades em `localStorage`.
- Abertura do WhatsApp com a lista de itens, quantidades, valores e total preenchidos.
- Formulário que acrescenta os dados do cliente e do evento à mensagem.

## Estrutura

| Arquivo ou pasta | Conteúdo |
| --- | --- |
| `index.html` | Estrutura da página e cartões iniciais do cardápio. |
| `style.css` | Estilos, responsividade e apresentação do carrinho. |
| `cardapio.js` | Categorias, produtos, preços, imagens e textos alternativos. |
| `script.js` | Interações, cálculo do carrinho, persistência e WhatsApp. |
| `imagens/` | Fotos do banner, produtos e ateliê. |
| `imagens/CREDITOS.md` | Origem das fotografias utilizadas. |
| `assets/fonts.css` | Declarações das fontes locais. |
| `assets/` | Fontes e arquivos de imagem preservados da primeira versão. |
| `Referência/` | Material visual original exportado do Stitch. |
| `LEIA-ME.md` | Guia resumido do projeto. |

## Configurar o WhatsApp

O destino atual é **5511999999999**. Para alterá-lo, edite esta constante no início de `script.js`:

```js
const WHATSAPP_NUMBER = '5511999999999';
```

Use apenas dígitos, incluindo código do país e DDD. Atualize também o telefone exibido em `index.html`.

O botão **Enviar pedido no WhatsApp** abre uma conversa com a mensagem pronta. O cliente revisa o texto e confirma o envio no WhatsApp; abrir a conversa não confirma a encomenda.

## Atualizar o cardápio e as imagens

Edite os produtos em `cardapio.js`. Cada produto contém identificador, categoria, nome, descrição, preço numérico, imagem e texto alternativo. Preserve os identificadores dos produtos existentes para manter a compatibilidade com carrinhos salvos.

Coloque novas fotos em `imagens/` e use caminhos relativos, por exemplo:

```js
image: 'imagens/bolo-cenoura.jpg',
alt: 'Bolo de cenoura com cobertura de chocolate sobre um prato.'
```

Os cinco cartões iniciais também estão presentes em `index.html` para exibição sem JavaScript. Ao alterar esses produtos, atualize essa versão do HTML. Com JavaScript ativo, os cartões são reconstruídos a partir de `cardapio.js`.

Mantenha `cardapio.js` antes de `script.js` no HTML, ambos com `defer`.

## Regras do pedido

- Bolos caseiros: forma de 22 cm, com rendimento de 12 fatias.
- Bolos de festa: preço por quilo, com mínimo de 2 kg por sabor.
- Docinhos: preço por cento, com 100 unidades.
- Fatias e bebidas: para consumo no balcão.
- Desconto de 10% quando o subtotal for **maior que R$ 300,00**.
- Sinal de 50% calculado sobre o total após o desconto.
- Encomendas com 48 horas de antecedência.
- Entrega grátis em até 5 km, a combinar com a confeitaria; o site não calcula distâncias ou frete fora desse raio.

Todos os produtos podem conter traços de leite, ovos, glúten e castanhas.

## Armazenamento no navegador

O carrinho usa a chave `vo-rosa-sacola` em `localStorage` e restaura os produtos ao recarregar a página no mesmo navegador e origem. Se o armazenamento estiver bloqueado, a seleção continua funcionando durante a visita, mas poderá ser perdida após recarregar.

Os dados preenchidos no formulário não são gravados pelo site. Eles são incluídos no link do WhatsApp ao solicitar o encaminhamento. O projeto não possui servidor, banco de dados ou processamento de pagamentos.

## Publicação

Copie `index.html`, `style.css`, `cardapio.js`, `script.js` e as pastas `imagens/` e `assets/` para uma hospedagem de arquivos estáticos, preservando a estrutura e os nomes. Não há comando de build.

As imagens usam caminhos relativos e não dependem de pastas do computador de desenvolvimento ou de links externos para carregar.

## Verificação

A sintaxe dos scripts pode ser conferida com Node.js, caso esteja instalado:

```sh
node --check cardapio.js
node --check script.js
```

Para conferir o funcionamento no navegador:

1. Abra as quatro categorias e confira as imagens e os botões **Adicionar**.
2. Adicione produtos, altere quantidades e remova itens.
3. Recarregue a página e confira se o carrinho foi restaurado.
4. Confira o mínimo de 2 kg e o desconto apenas acima de R$ 300,00.
5. Abra o WhatsApp e confira o destinatário, os produtos e o total antes de enviar.
6. Confira o layout em uma tela estreita e em um computador.

Foram verificados por código os recursos locais, os dados dos 15 produtos, os cálculos, a persistência e a URL gerada para o WhatsApp. A conferência visual automatizada não foi concluída porque o navegador integrado bloqueou URLs `file://`.

## Material de referência

O cardápio original é fictício e destinado a fins didáticos. As fotos são ilustrativas. Consulte `imagens/CREDITOS.md` para a origem das fotos da referência Stitch e das fotos gratuitas do Pexels.
