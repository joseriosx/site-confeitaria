# Confeitaria Vó Rosa

Abra `index.html` diretamente no navegador. Não precisa instalar nada nem iniciar um servidor.

- `index.html`: estrutura e conteúdo da página.
- `style.css`: visual e adaptações para celular, tablet e computador.
- `cardapio.js`: categorias, produtos, preços, imagens e textos alternativos.
- `script.js`: filtros de categoria, sacola e resumo do orçamento.
- `assets/`: fontes locais.
- `imagens/`: banner, fotos de todos os produtos e foto do ateliê. Créditos em `imagens/CREDITOS.md`.

Mantenha as duas pastas junto dos arquivos HTML, CSS e JavaScript.

Os 15 produtos, preços, endereço, horários e condições comerciais seguem o PDF fornecido. A identidade visual segue os arquivos da pasta de referência. Todos os produtos possuem fotos ilustrativas locais, com caminhos relativos e textos alternativos descritivos.

O carrinho fixo mostra a quantidade e o total com o desconto aplicável. O botão “Enviar pedido no WhatsApp” abre uma conversa com `5511999999999`, com produtos, quantidades, valores e total preenchidos. A mensagem pode ser revisada antes do envio. O formulário também usa esse destino e acrescenta os dados do evento. Para mudar o destino, altere `WHATSAPP_NUMBER` em `script.js`.

A sacola salva somente os produtos e quantidades no armazenamento local do navegador, quando disponível. Os dados do formulário não são salvos pelo site.

Validação realizada: sintaxe JavaScript, links e recursos locais, quantidade e preços dos produtos, categorias, mínimo de 2 kg, desconto estritamente acima de R$ 300 e cálculo do sinal. A visualização automatizada não foi possível porque o navegador integrado bloqueia URLs `file://`.
