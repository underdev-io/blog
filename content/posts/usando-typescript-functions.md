---
title: "Usando TypeScript: Declarando Functions"
date: "2020-03-11T22:12:03.284Z"
description: "As funções são uma parte fundamental de qualquer linguagem de programação."
cover: "https://images.unsplash.com/photo-1582832172472-c1ce8ec9c3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
---

As funções são uma parte fundamental de qualquer linguagem de programação.

São elas que dão vida as nossas regras de negócio e nos permitem manipular os dados como queremos.

No TypeScript, apesar de termos todo um ecossistema rico de classes, namespaces e módulos, as funções ainda assim tem um papel primordial.

Além disso, o TypeScript acrescenta algumas funcionalidades extras nos comportamentos das funções do JavaScript.

## O que são?

Para começar, assim como no JavaScript, as funções no TypeScript podem ser **funções nomeadas** ou **funções anônimas**.

```ts
// nomeada
function soma(x, y) {
  return x + y;
}

// anônima
const soma2 = function (x, y) {
  return x + y;
};
```

Assim como no JavaScript, as funções podem usar variáveis fora do seu escopo:

```ts
const z = 777;

function soma(x, y) {
  return x + y + z;
}
}
```

## Tipando uma Função

Usando o exemplo acima, vamos adicionar uma tipagem para os nossos parâmetros:

```ts
function soma(x: number, y: number): number {
  return x + y;
}
```

No código acima, entendemos que `x` e `y` deverão sempre ser um `number`.

Além disso, `: number` indica a tipagem do conteúdo a ser retornado pela função, que no nosso caso também é um `number`.

### Herança de tipos

Se retirarmos a parte do `: number`, o TypeScript ainda assim entenderá implicitamente que o tipo de retorno é `number`.

Isso acontece graças a herança de tipos que existe nativamente no TypeScript.

Ele checa o conteúdo que é retornado pela função e, se possível, tenta descobrir auto-magicamente qual a tipagem a ser retornada. No nosso exemplo, como `x` e `y` são `number`, e o retorno é `x + y`, então implicitamente sabemos que o retorno da função será um `number`:

```ts
// ainda assim, funciona
function soma(x: number, y: number) {
  return x + y;
}
```

## Parâmetros opcionais

Por padrão, no TypeScript, todos os parâmetros são entendidos como obrigatórios.

Contudo, você também pode declarar parâmetros como opcionais.

No JavaScript, por padrão, todos os parâmetros são opcionais. Isso pode causar um pouco de confusão para quem está vindo do JS agora e nunca trabalhou com nenhuma linguagem fortemente tipada.

Para transformar nosso parâmetro como opcional, basta adicionar um `?` após a sua declaração:

```ts
function soma(x: number, y?: number) {
  return x + y;
}
```

Todos os parâmetros declarados como opcionais, caso estejam vazios, retornarão `undefined`.

No caso, `y` pode ser `number` ou `undefined`.

## Valor padrão para os parâmetros

No TypeScript, nós podemos declarar um valor padrão para um parâmetro. Isso significa que ele será opcional e, caso não receba nenhum valor, será usado o valor padrão. Exemplo:

```ts
function soma(x: number, y = 777) {
  return x + y;
}
```

Graças a herança de tipos, o TypeScript sub-entenderá que `y` tem a tipagem de `number` pois `777` é um `number`.

## Parâmetros infinitos (ou Rest Parameters)

Eventualmente, você vai precisar lidar com funções que tem infinitos parâmetros, ou que você não sabe quais são todos os parâmetros a serem usados.

Uma forma bacana de lidar com isso, é usar um spread operator no último parâmetro. Exemplo:

```ts
function nomeCompleto(primeiroNome: string, ...restoDoNome: number[]) {
  return `${primeiroNome} ${restoDoNome.join(" ")}`;
}

const fulanoDeTal = nomeCompleto("Fulano", "de", "tal"); // retornará "Fulano de tal"
```

## Overloads

A natureza do JavaScript é de uma linguagem muito dinâmica. Esse dinamismo permite que a mesma função possa ter múltiplas assinaturas.

Existe uma forma de declarar a tipagem para estas múltiplas assinaturas de uma mesma função, ou seja, declarar um overload:

```ts
function nomeCompleto(primeiroNome: string): string;
function nomeCompleto(primeiroNome: string, ...restoDoNome: number[]);
function nomeCompleto(primeiroNome: string): any {
  return `${primeiroNome} ${restoDoNome.join(" ")}`;
}
```

## Conclusão

Como podemos ver no artigo, as funções no TypeScript são uma ferramenta poderosíssima.

Acrescentar tipagens e múltiplas assinaturas para os parâmetros agregam e muito a produtividade dos desenvolvedores de um projeto.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/f8ywYgttpGzzVPH5AO/giphy.gif)
