---
title: "Async/Await com JavaScript"
date: "2020-02-06T22:12:03.284Z"
description: "Você certamente já se deparou com uma linha de código assíncrona no JavaScript. Async/await são uma ferramenta poderosíssima para lidar com Promises."
cover: "https://images.unsplash.com/photo-1580465446156-0a5b3eee11ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"
---

Você certamente já se deparou com uma linha de código assíncrona no JavaScript.

Quem nunca escreveu `.then()` ou entrou num ciclo de [callback hell](http://callbackhell.com/), definitivamente não programou com JavaScript.

## O que é?

Async/await são uma ferramenta poderosíssima para lidar com [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (leia-se: funções assíncronas).

É uma sintaxe que permite que a legibilidade do código flua de forma simples.

## O que são funções assíncronas?

Toda função que envolver uma Promise, mesmo que internamente não faça nenhuma operação de fato assíncrona, é considerado uma função assíncrona.

Uma Promise é um código que não pôde ser processado imediamente pela linguagem. Uma requisição para a API é um exemplo de Promise, pois ela precisa aguardar que a API retorne os dados. Enquanto a API não retornar os dados, a [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) fica pendente.

## Transformando funções síncronas em assíncronas

Uma maneira muito simples de fazer com que o JavaScript entenda que sua função é assíncrona, é simplesmente declarando a palavra-chave `async` no início da declaração de uma função:

```js
async function getPost() {}

// ou

const getPost = async () => {};
```

A função `getPost` então retornará sempre uma [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## Estados de Promises

Uma promise tem 3 estados: **Pending**, **Rejected** (mal-sucedida), **Fulfilled** (bem-sucedida).

Assim que a função é acionada, o primeiro estado dela é ser `Pending`.

Se alguma exceção for lançada dentro da sua execução, ela irá para `Rejected`.

Do contrário, se ela for "resolvida", ou seja, concluída, ela irá para `Fulfilled`.

## Problema das Promises

A linha imediata após a função que aciona uma [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), é rodada logo após o início da Promise.

Isso significa que, se a segunda linha do seu código depender de alguma informação da Promise, ela terá problemas. Exemplo:

```js
const fetchPostData = () => {
  const post = getPost();
  const comments = getComments(post.id); // `post.id` ainda não existe, pois `getPost()` ainda estará sendo executado
};
```

## Resolvendo o problema

Para resolver o nosso dilema, usaremos uma segunda palavra-chava chamada `await`:

```js
const fetchPostData = async () => {
  const post = await getPost();
  const comments = getComments(post.id); // `post.id` agora existe, pois o JS irá aguardar a conclusão de `getPost()` antes de seguir para a próxima linha
};
```

**Observação**: Você só pode declarar um `await` dentro de uma Promise (usando `async` antes da declaração da função).

## Capturando erros

Como vimos acima, a nossa Promise pode retornar o estado de `Rejected`.

Isso acontece pois algum código na sua execução lançou uma exceção.

No exemplo da requisição da nossa API, se o endpoint estiver incorreto, ou retornar 500/40x, ela irá retornar `Rejected` com o seu erro anexado.

Uma forma de capturar esta situação é usar um bloco de `try..catch`:

```js
const fetchPostData = async () => {
  try {
    const post = await getPost();
    const comments = getComments(post.id); // essa linha só será chamada se `getPost()` ser `Fulfilled`
  } catch (e) {
    alert("Problema ao carregar o post.");
  }
};
```

## Lidando com múltiplas Promises

Eventualmente, você precisará "aguardar" a finalização de múltiplas Promises, de uma só vez.

Para resolver isto, o JavaScript nos fornece o método [Promise.all()](). Exemplo:

```js
const fetchPostData = async () => {
  const requests = [getPosts(), getComments(), getUser()];
  const response = await Promise.all(requests);
  console.log("Hello, world!"); // esta linha só será acionada quando as 3 promises serem fulfilled/rejected
};
```

## Conclusão

Async/await é uma sintaxe simples, de fácil entendimento, e muito poderosa.

É uma técnica muito utilizada por programadores JavaScript mais experientes. Pode economizar muitas dores de cabeça e facilitar na geração de recursões.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/TdfyKrN7HGTIY/giphy.gif)
