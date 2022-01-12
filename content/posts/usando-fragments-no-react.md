---
title: "Usando Fragments No React"
date: "2017-12-02T15:53:10-02:00"
description: "Fragments é um recurso novo, adicionado na última versão do React (v16.2). Este recurso permite que nós criemos uma listagem de sub-componentes, sem necessariamente adicionar um componente pai."
tags: ["fragments", "react"]
cover: /covers/usando-fragments-no-react.png
author: lhas
---

Fragments é um recurso novo, adicionado na última versão do React (v16.2). Este recurso permite que nós criemos uma listagem de sub-componentes, sem necessariamente adicionar um componente pai.

Quem já trabalhou com React, sabe como é chato ter que sempre criar uma `<div />` ou algum elemento equivalente, para usá-lo de _componente pai_, e então retornar uma listagem com os _componentes filhos_.

Os Fragments vieram justamente para resolver este tipo de situação.

![](https://media.giphy.com/media/xUA7b7XgQQkWfUIIHC/giphy.gif)

Você pode utilizá-lo através de 2 sintaxes:

# Sintaxe curta

Esta é a maneira mais prática de você utilizar os Fragments. Porém você vai precisar fazer uma pequena configuração no seu Babel, para ele não acusar nenhum tipo de erro. É bem simples, abaixo tem a explicação do procedimento.

```js
<>
  <FilhoA />
  <FilhoB />
  <FilhoC />
</>
```

Uma outro situação que esta sintaxe se aplicaria, seria um componente onde você quer retornar vários textos, sem necessariamente encapsulá-los em outro elemento:

```js
const CommentHeader = ({ comment }) => (
  <>
    Deixe um comentário você também!
    <strong>Nós iremos adorar!</strong>
    Se não quiser, não precisa deixar também. Entendeu?
  </>
);
```

Ou seja, ao invés de ter que separar os textos em `<p />`, e criar um parágrafo para cada frase, nós podemos simplesmente acoplar tudo dentro de um fragment e o React se vira para renderizar.

![](https://media.giphy.com/media/ZZdRSJ6ESGA5G/giphy.gif)

# Sintaxe longa

Este tipo de sintaxe, tem como vantagem, ficar mais explícito que você está utilizando deste recurso;

Além disto, outra vantagem é que você não precisa fazer nenhuma modificação na sua configuração do Babel.

```js
import React, { Fragment } from "react";

<Fragment>
  <FilhoA />
  <FilhoB />
  <FilhoC />
</Fragment>;
```

Caso você precise fazer este processo dentro de um `map()`, você irá precisar declarar a prop `key`. Para declarar a `key` do Fragment, você terá de usá-lo com a sintaxe longa:

```js
this.state.comments.map((comment) => (
  <Fragment key={comment.uuid}>
    <CommentHeader comment={comment} />
    <CommentDescription comment={comment} />
    <CommentForm comment={comment} />
  </Fragment>
));
```

Apesar de parecer que você trocou 6 por meia dúzia, na hora da renderização dos componentes no browser, não haverá nenhum elemento no lugar do fragment.

Isto irá economizar algumas dores de cabeça com Flexbox, e outras situações de estilização que envolvam múltiplos elementos, sem um elemento pai.

# Como instalar os Fragments

Antes de tudo, você irá precisar da [versão 16.2 do React](https://github.com/facebook/react/blob/master/CHANGELOG.md#1620-november-28-2017), que foi lançada dia 28 de novembro de 2017.

```bash
yarn upgrade react@^16.2.0 react-dom@^16.2.0
```

Após atualizar a versão do React para a v16.2, você deverá atualizar seu Babel para versão 7. A sintaxe curta dos Fragments só irá funcionar no Babel a partir da versão 7, ou seja, se você estiver usando a versão 6, deixa de ser ultrapassado e atualiza essa bagaça pra v7. :smile:

```bash
# caso você use preset-react
yarn upgrade @babel/core @babel/preset-react
# ou caso você use transform
yarn upgrade @babel/core @babel/plugin-transform-react-jsx
```

Agora, você irá precisar atualizar o seu ESLint:

```bash
yarn upgrade eslint@3.x babel-eslint@7
```

Agora, no seu `.eslintrc` você deverá adicionar a seguinte linha:

```
"parser": "babel-eslint"
```

O CRA (Create React App) ainda não permite a utilização dos Fragments, em breve eles vão atualizar isso. Mas se for o seu caso, basta você ejetar a aplicação usando `yarn eject`, e fazer o procedimento acima.

# Conclusão

Os Fragments vieram para ficar. Eles já eram bastante utilizados pela equipe do Facebook, através de um addon. Após o amplo uso do time deles, eles resolveram expandir para o público.

Espero que este recurso seja útil nos seus projetos e que você tenha aprendido algo novo hoje! :+1:

![](https://media3.giphy.com/media/3ogsjQvoi63d8PxuUg/giphy.gif)
