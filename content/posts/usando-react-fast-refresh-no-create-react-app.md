---
title: "Usando React Fast Refresh no create-react-app"
date: "2020-02-24T22:12:03.284Z"
description: "Se você já trabalhou com React, certamente já usou o React Hot Loader em algum projeto. A proposta do _React Hot Loader_ é a de atualizar seus componentes em tempo real, durante o desenvolvimento."
cover: "https://images.unsplash.com/photo-1477466535227-9f581b3eec21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
---

Se você já trabalhou com [React](https://reactjs.org/), certamente já usou o [React Hot Loader](http://gaearon.github.io/react-hot-loader/) em algum projeto. A proposta do _React Hot Loader_ é a de atualizar seus componentes em tempo real, durante o desenvolvimento.

Apesar da proposta interessante, ele acabou tendo alguns problemas com as últimas versões do React, especialmente para lidar com _hooks_ e _componentes funcionais_.

Sabendo de todos os _side effects_ do **React Hot Loader**, [Dan Abramov](https://github.com/gaearon), um dos autores do React, resolveu criar uma nova ferramenta chamada...

**React Fast Refresh**! 🚀

## Benefícios

Uma das principais vantagens de se utilizar o Fast Refresh ao invés do Hot Loader, é o fato dele suportar nativamente o recarregamento de componentes, mesmo os funcionais e que fazem uso extenso de hooks.

Além disso, ele traz um tratamento de erros diferente do que estamos acostumados a ver na configuração padrão do [create-react-app](https://github.com/facebook/create-react-app):

![](./Screenshot_20200224_115911.png)

Ele também tende a suportar de forma mais eficiente componentes conectados com store do Redux.

## Como usá-lo

O [create-react-app](https://github.com/facebook/create-react-app) não tem suporte nativo para o Fast Refresh (ainda).

Acredita-se que nas próximas releases do [create-react-app](https://github.com/facebook/create-react-app), o mesmo será suportado oficialmente, mas por enquanto, não temos previsão para isso.

Porém, é possível dar um jeitinho bem simples de manter o [create-react-app](https://github.com/facebook/create-react-app) e usá-lo no nosso projeto.

Para fazer isso, vamos precisar usar o [react-app-rewired](https://github.com/timarney/react-app-rewired).

### O que é o react-app-wired?

É uma biblioteca que permite customizar as configurações padrões do [create-react-app](https://github.com/facebook/create-react-app). Permite que você injete código nas configurações do Webpack do mesmo, por exemplo. Sem precisar ejetar a aplicação.

Vamos instalá-lo em nossa aplicação:

```bash
yarn add react-app-rewired
```

Com o react-app-wired instalado, vamos precisar adicionar mais duas dependências.

Elas são bem pequenas e trazem uma espécie de snippet com toda a configuração necessária para adicionar suporte ao Fast Refresh:

```bash
yarn add customize-cra customize-cra-react-refresh
```

Com todas as nossas dependências instaladas, vamos configurá-las?

## Configurando o Fast Refresh

Você irá precisar criar um arquivo chamado `config-overrides.js` na raíz da sua aplicação. É através dele que iremos injetar código no Webpack do nosso [create-react-app](https://github.com/facebook/create-react-app).

O conteúdo final deste arquivo será assim:

```js
const { override } = require("customize-cra");
const { addReactRefresh } = require("customize-cra-react-refresh");

module.exports = override(
  addReactRefresh({
    disableRefreshCheck: true,
  })
);
```

## Rodando a aplicação

Com as dependências instaladas e a configuração feita, vamos rodar a aplicação?

Para isto, será necessário atualizar o nosso `package.json`, para que nosso projeto use os scripts do `react-app-wired` ao invés do script nativo do [create-react-app](https://github.com/facebook/create-react-app):

```diff
  "scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test --env=jsdom",
+   "start": "react-app-rewired start",
+   "build": "react-app-rewired build",
+   "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
}
```

Agora é só rodar `yarn start` e ser feliz.

## Conclusão

Você irá notar um incrível ganho de produtividade em usar uma ferramenta como essa no seu ambiente de desenvolvimento.

A experiência de editar seus componentes e vê-los sendo atualizados em tempo real é muito gratificante. Faz você se sentir em 2020, heheh.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/f31DK1KpGsyMU/giphy.gif)
