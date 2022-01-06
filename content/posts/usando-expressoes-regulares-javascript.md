---
title: "Usando Expressões Regulares (Regex) com JavaScript"
date: "2020-02-11T22:12:03.284Z"
description: "Quem nunca precisou usar uma expressão regular que atire a primeira pedra"
cover: "https://images.unsplash.com/photo-1581309553233-a6d8e331c921?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
---

Quem nunca precisou usar uma expressão regular que atire a primeira pedra.

Especialmente em extração e validação de dados, as [expressões regulares](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) são muito usadas. É uma forma algorítmica de dizer para o computador as regras para extrair/validar um dado, de acordo com uma combinação de caracteres.

## Exemplos

Abaixo, estão exemplos de expressões já prontas que são muito encontradas nas aplicações de hoje em dia:

```js
// Email
/[^@]+@[^\.]+\..+/

// CPF
/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/

// CNPJ
/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
```

## Instanciando RegEx

Você tem 2 alternativas para instanciar uma regex no JavaScript:

### 1º Opção

```js
const regexCPF = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
```

### 2º Opção

```js
const regexCPF = new RegExep("^d{3}.d{3}.d{3}-d{2}$");
```

Você irá usar a segunda opção muito provavelmente quando a expressão regular vier preenchida pelo usuário.

Se a expressão for "hardcoded" na aplicação, a 1º opção é a melhor, sem dúvidas.

## Funções

Os objetos de expressão regular permitem que você manipule-os usando as funções abaixo:

### exec()

Roda uma pesquisa da expressão na string. Retorna um array com os dados. Retorna `null` se não encontrar nada.

```js
const regex = RegExp("foo*", "g");
const str = "table football, foosball";

// str vai retornar:
// {
//     0: "foo"
//     groups: undefined
//     index: 6
//     input: "table football, foosball"
//     length: 1
// }
```

### test()

Roda um teste booleano da expressão na string. Retorn `true` ou `false`.

```js
const str = "table football";
const str2 = "abacate";
const regex = /foo*/;

regex.test(str); // true
regex.test(str2); // false
```

### match()

Returna um array contendo todas as combinações, incluindo grupos de captura. Retorna `null` se não encontrar nada.

```js
const frase = "O rato roeu a roupa do rei de Roma.";
const regex = /[A-Z]/g;
const match = frase.match(regex); // ['O', 'R']
```

### matchAll()

Retorna um iterador contendo todas as combinações, incluindo grupos de captura.

É a mesma ideia do `match()`, porém ele retorna um [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators).

```js
const frase = "O rato roeu a roupa do rei de Roma.";
const regex = /[A-Z]/g;
const match = [...frase.matchAll(regex)]; // ['O', 'R']
```

### search()

Roda um teste de combinação da expressão na string. Retorna o índice inicial da combinação. Retorna `-1` se a pesquisa falhar.

```js
const frase = "o rato roeu a roupa do rei de Roma.";
const regex = /[A-Z]/g;
const search = frase.search(regex); // 30
```

### replace()

Roda uma pesquisa de combinação da expressão na string. Em caso positivo, substitui o valor encontrado por uma substring.

```js
const frase = "O rato roeu a roupa do rei de Roma.";
const regex = /rato/;
const replace = frase.replace(regex, "macaco"); // O macaco roeu a roupa do rei de Roma.
```

### split()

Usa uma expressão regular para separar uma string em um array de substrings.

```js
const frase = "O rato roeu a roupa do rei de Roma.";
const regex = /\s/;
const split = frase.split(regex); // ["O", "rato", "roeu", "a", "roupa", "do", "rei", "de", "Roma."]
```

## Conclusão

As expressões regulares continuam sendo uma ferramenta poderosíssima na mão dos desenvolvedores para manipular os dados de maneira consistente.

A garantia na consistência dos dados é fundamental em situações críticas.

Todo desenvolveldor, independente de linguagem de programação, deve saber o que são expressões regulares, como funcionam, como construir uma do zero.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/6uyjJvpDcXss0/giphy.gif)
