---
title: "Usando TypeScript: O que são Interfaces e como usá-las"
date: "2020-02-17T22:12:03.284Z"
description: "Dando continuidade a nossa série de artigos sobre typeScript, no #1postperday de hoje iremos falar sobre as Interfaces: o que são? como usá-las?"
cover: "https://images.unsplash.com/photo-1568164528240-21ad793478dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
---

Dando continuidade a nossa série de artigos sobre [TypeScript](https://www.typescriptlang.org/), no #1postperday de hoje iremos falar sobre as Interfaces: o que são? como usá-las?

## O que são?

A **Interface** é uma definição de contrato usada por uma entidade (seja ela uma variável ou uma função).

Ou seja, ela define as especificações de sintaxe que uma entidade precisa ter.

## Como usá-las?

Imagine uma entidade chamada `Recipe`. Vamos definir um contrato com todos os seus atributos usando a palavra especial `interface`:

```ts
interface Recipe {
  name: string;
  portions: number;
  minutes_to_cook: number;
}
```

Vamos criar um objeto que use essa interface:

```ts
const carbonara: Recipe = {
  name: "Carbonara Spaghetti",
  portions: 5,
  minutes_to_cook: 50,
};
```

Agora, imagine que nosso objeto de `Recipe` deverá sempre ter um método `getIngredients` definido. Este método deverá sempre retornar um array de números. Então, vamos atualizar a interface:

```ts
interface Recipe {
  name: string;
  portions: number;
  minutes_to_cook: number;
  getIngredients(): number[];
}
```

## Atributos opcionais

Se a gente tentar criar um objeto `Recipe` com algum atributo faltando, o TypeScript irá retornar o seguinte erro:

```ts
const ratatouille: Recipe = {
  name: "Ratatouille",
  portions: 5,
};
```

```
Property 'minutes_to_cook' is missing in type '{ name: string; portions: number; }' but required in type 'Recipe'.(2741)
```

Como nosso contrato de `Recipe` exige que o atributo `minutes_to_cook` seja obrigatório, qualquer tentativa de criar um objeto sem esse atributo irá ocasionar um erro semelhante ao de cima.

Podemos resolver isso transformando nosso atributo em **opcional**:

```ts
interface Recipe {
  name: string;
  portions: number;
  minutes_to_cook?: number; // ponto de interrogação aqui
  getIngredients(): number[];
}
```

O `?` no nome do atributo indica que o mesmo é opcional.

## Usando Interfaces dentro de Interfaces

Imagine que o método `getIngredients()`, ao invés de retornar um array de números, como está declarado agora, tivesse que retornar objetos de `Ingredient`.

Nós podemos fazer esse uso de Interfaces dentro de outras Interfaces, como no exemplo abaixo:

```ts
interface Ingredient {
  id: number;
  name: string;
}

interface Recipe {
  name: string;
  portions: number;
  minutes_to_cook?: number;
  getIngredients(): Ingredient[];
}
```

## E quando não sei o que irá retornar?

Em alguns momentos, vai acontecer de você não saber qual deverá ser a assinatura da entidade. Normalmente, isso ocorrerá quando você estiver usando códigos de bibliotecas externas sem definição de tipagem pro TypeScript.

Nesses casos, podemos usar a palavra-chave mágica `any`:

```ts
interface Recipe {
  name: string;
  portions: any;
  minutes_to_cook?: number;
  getIngredients(): Ingredient[];
}
```

Nesse caso, `portions` pode retornar qualquer coisa: `string`, `number`, `null`, `undefined` ou até mesmo uma função.

## Múltiplas opções de assinatura

Você pode indicar múltiplas opções para uma determinada assinatura usando o caractere especial `|`:

```ts
interface Recipe {
  name: string;
  portions: number | string;
  minutes_to_cook?: number;
  getIngredients(): Ingredient[];
}
```

No exemplo acima, `portions` pode retornar um `number` ou uma `string`.

## Herança de Interfaces

Eventualmente, você irá precisar criar uma super-interface, que depende de outra interface.

Mantendo o nosso exemplo de `Recipe`, imagine uma interface de `FeaturedRecipe`. Ela será exatamente como uma `Recipe`, porém, irá contar com alguns atributos extras, como `featured_image` e `featured_description`:

```ts
interface FeaturedRecipe extends Recipe {
  featured_image: string;
  featured_description: string;
}
```

## Usando interfaces em arrays/objetos

Uma interface também pode definir o contrato de um array/objeto, onde você pode definir o tipo da chave assim como o tipo dos valores. Exemplo:

```ts
interface Languages {
  [index: number]: "JavaScript" | "TypeScript" | "Ruby" | "Python";
}

const languages: Languages = ["JavaScript", "Ruby"];
```

## Conclusão

As interfaces são um dos principais fundamentos por de trás do TypeScript.

São amplamente usadas em projetos para declaração de contratos de objetos.

É especialmente útil para você manter a consistência na tipagem dos objetos do seu projeto conforme ele vai escalando.

Aliado a editores de código modernos como [VS Code](https://code.visualstudio.com/), você terá uma experiência de desenvolvimento única no JavaScript, tendo a sua IDE completando sempre que possível o seu código, somente usando as declarações de interfaces da sua aplicação.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/10LKovKon8DENq/giphy.gif)
