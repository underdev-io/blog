---
title: "Usando TypeScript: Tipos de Dados"
date: "2020-02-25T22:12:03.284Z"
description: "Dando continuidade a nossa série de artigos sobre TypeScript, no #1postperday de hoje iremos falar sobre os tipos de dados básicos que compõem o TypeScript."
cover: "https://images.unsplash.com/photo-1581509363848-bc8aba1d70e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80"
---

Dando continuidade a nossa série de artigos sobre [TypeScript](https://www.typescriptlang.org/), no #1postperday de hoje iremos falar sobre os tipos de dados básicos que compõem o TypeScript.

No artigo anterior, falamos de Interfaces, [dá um confere lá](https://01dev.codes/usando-typescript-interfaces/).

## Introdução

Um dos principais aspectos de uma linguagem de programação é quais os tipos de dados que ela suporta.

No caso do TypeScript, não é diferente. Existem uma série de tipos de dados suportados.

## Boolean

Esse é o tipo mais simples, serve apenas para indicar se um tipo é `true` ou `false`:

```ts
const isUserFriendly: boolean = true;
```

## Number

Todos os números no TypeScript são considerados números de ponto flutuante. Isso significa que todos os tipos que se referem a números podem usar o tipo de `number`. Hexadecimais, binários e octais estão inclusos:

```ts
const users: number = 1;
const pi: number = 3.14;
const hex: number = 0xf00d;
const binary: number = 0b1010;
const octal: number = 0o744;
```

## String

Certamente, um dos tipos de dados mais usados na programação. No TypeScript, podemos declarar strings usando tanto aspas simples `'` como aspas duplas `"`:

```ts
const name: string = "Fulano de Tal";
```

Você também pode usar _template strings_, Elas suportam múltiplas linhas e expressões em TypeScript:

```Js
const fullName: string = `SR. ${name.toUpperCase()} ${lastName.toUpperCase()}`;
```

## Array

Existem duas maneiras de declarar a tipagem para arrays no TypeScript:

```ts
const users: number[] = [1, 2, 3];
const recipes: Array<number> = [4, 5, 6];
```

## Tuplas

As tipagens de tuplas permitem que você defina um array com um número fixo de elementos com tipos específicos:

```ts
let users: [string, number];

users = ["John Doe", 666]; // OK
users = [10, "John Doe"]; // Erro!
```

Tentar acessar um elemento fora do índice de tipos da tupla irão ocasionar em erro:

```ts
let users: [string, number];

users[2] = "John Doe"; // Erro: propriedade `2` não existe em `[string, number]`
```

## Enum

Um dos tipos novos que o TypeScript traz, é o `Enum`. Ele é muito comum em linguagens mais tradicionais como C# e Java. O `Enum` serve especialmente para trazer um uso mais amigável para uma combinação de valores (numéricos ou não):

```ts
enum Color {
  Red,
  Green,
  Blue,
}

let green: Color = Color.Green; // 1
```

Por padrão, eles irão começar a partir do `0`. Nós podemos alterar seus valores:

```ts
enum Color {
  Red = 1,
  Green = "green",
  Blue = 3,
}
```

## Any

Eventualmente, você precisará declarar a tipagem de uma variável. Porém, você não vai ter certeza de qual tipo será usado naquela variável. Isso geralmente ocorre quando estamos manipulando dados externos ou bibliotecas de terceiros.

Para este tipo de situação, podemos simplesmente declarar nosso tipo como `any`:

```ts
let color: any = "blue";

color = 1;
color = [1, 2, 3];
```

É especialmente útil em arrays com tipos variados:

```ts
let colors: any[] = [1, "blue", { name: "green" }];
```

## Void

O `void` serve num sentido oposto ao `any`: indica a abstinência de precisar ter um tipo. É muito comum vê-la mais em funções:

```ts
const initializeApplication = (): void => {
  console.log("Application initialized!");
};
```

## Null e Undefined

No TypeScript, `null` e `undefined` são tipos diferentes. Não costumam ser tão frequentes em aplicações de TypeScript, mas eventualmente são utilizados:

```ts
let user: undefined;
let recipe: null;
```

Por padrão, `null` e `undefined` são subtipos de todos os outros tipos.

Isso significa que você pode declarar uma variável `number` como `null` ou `undefined`.

## Object

O tipo de `object` serve para representar todos os tipos não-primitivos. Tudo que não for um `number`, `string`, `boolean`, `bigint`, `symbol`, `null` ou `undefined` será considerado um `object`:

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

create(42); // Error
create("string"); // Error
```

## Checagem de tipos

As vezes, acontece de você querer checar a tipagem de uma variável num formato diferente da sua declaração atual. Esta checagem não tem impacto nenhum no código final, é tão somente usada pelo compilador do TypeScript.

Uma da formas de fazer esta checagem de tipos é:

```ts
let name: any = "John Doe";

let nameLength: number = (<string>name).length;
```

Uma segunda forma muito comum de aplicar esta checagem de tipo é:

```ts
let name: any = "John Doe";

let nameLength: number = (name as string).length;
```

## Conclusão

Um dos principais pilares do TypeScript são os tipos suportados pelo mesmo.

São tipos muito comuns nas linguagens de programação mais modernas, especialmente tipagens como `Enum` ou `Object`.

Um bom desenvolvedor TypeScript precisa ter estes conceitos consolidados de forma bem sólida na sua cabeça.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/5oGIdt1xapQ76/giphy.gif)
