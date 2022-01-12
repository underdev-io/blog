---
title: "Na Prática: Programação Funcional com JavaScript"
date: "2019-09-28T22:12:03.284Z"
description: "como funciona o paradigma de programação funcional com JavaScript, vamos aprender a usá-lo na prática"
cover: "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
---

[Continuando o nosso artigo introdutório](https://01dev.codes/intro-programacao-funcional-js/) sobre como funciona o paradigma de programação funcional com JavaScript, hoje vamos aprender a usá-lo na prática.

## O que vamos aprender

Irei apresentar a você algumas das principais funções funcionais que você usará no seu dia-a-dia como desenvolvedor JavaScript:

- Como usar `map()`;
- Como usar `filter()`;
- Como usar `reduce()`;
- O que é _currying_ e como aplicá-lo.

## Como usar map()

É comum no dia-a-dia de desenvolvimento, precisarmos pegar um _array_ e transformá-lo em um novo array, incluindo, ocultando ou apenas modificando os dados originais. O `map()` serve exatamente para isso.

Para quem vem de um paradigma mais imperativo, está bastante acostumado a utilizar `forEach()`. O `map()` é um irmão sem efeito colateral do `forEach()`. Isso acontece por que ele irá iterar individualmente em cada um dos elementos do array, num formato semelhante ao `forEach()`. A diferença é que ele irá retornar um array completamente novo.

Lembra sobre o que comentamos no artigo introdutório, que a principal característica de uma função funcional, é receber uma função como parâmetro. O `map()` se encaixa nessa característica. Vamos vê-lo na prática:

Temos um array de usuários:

```js
const users = [
  {
    id: 1,
    name: "Luiz Almeida",
    nickname: "lhas",
    birthDate: "1995-04-28",
    score: 10,
    books: [
      "A Revolta de Atlas - Ayn Rand",
      "Os Axiomas de Zurique - Max Gunther",
      "Anatomia do Estado - Murray Rothbard",
    ],
  },
  {
    id: 2,
    name: "John Doe",
    nickname: "john_doe",
    birthDate: "1993-04-28",
    score: 5,
    books: ["Anatomia do Estado - Murray Rothbard"],
  },
];
```

Digamos que nós precisamos de um array novo, somente com os IDs do usuários. Podemos fazer isso facilmente com o `map()`:

```js
const ids = users.map((user) => user.id);
```

Outro exemplo: queremos injetar no nosso array de usuários, a sua idade, além da sua data de aniversário:

```js
const usersWithAge = users.map((user) => {
  const age = calculateAge(user.birthDate); // ps: calculateAge() é uma função fictícia

  return {
    ...user, // object spread operator aqui
    age,
  };
});
```

O resultado será:

```js
const usersWithAge = [
  {
    id: 1,
    name: "Luiz Almeida",
    nickname: "lhas",
    birthDate: "1995-04-28",
    score: 10,
    age: 24,
    books: [
      "A Revolta de Atlas - Ayn Rand",
      "Os Axiomas de Zurique - Max Gunther",
      "Anatomia do Estado - Murray Rothbard",
    ],
  },
  {
    id: 2,
    name: "John Doe",
    nickname: "john_doe",
    birthDate: "1993-04-28",
    score: 5,
    age: 26,
    books: ["Anatomia do Estado - Murray Rothbard"],
  },
];
```

Nos dois exemplos acima, primeiro mostramos uma aplicação comum, que é de filtrar o conteúdo do array, e o segundo de adicionar conteúdo extra. Nós usamos a técnica de [object spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), para injetar a propriedade de `age`.

## Como usar filter()

O `filter()` tem um comportamento bem semelhante ao `map()`. Ele irá iterar cada um dos elementos do array. A diferença é que você deve retornar uma condição booleana nessa iteração. Se o retorno for `true`, o `filter()` irá retornar o elemento no novo array. Vamos para um exemplo prático, usando o nosso `usersWithAge`:

```js
const usersWithAgeAbove24 = usersWithAge.filter((user) => user.age > 24);
```

Outro exemplo, desta vez usando uma string como parâmetro:

```js
const usersWithUnderscore = usersWithAge.filter((user) =>
  user.nickname.includes("_")
);
```

O exemplo acima irá retornar todos os usuários que o nickname contenha underline (\_).

Esta função é muito útil, especialmente em situações de filtro de busca. Você pode do lado do cliente, fazer diversas filtragens sem depender de uma API para isso. :)

## Como usar reduce()

O `reduce()` é o mais complicado, porém o mais poderoso destas 3 funções. Ele é bem flexível e versátil e pode ser usado em infinitos cenários. Descrevendo de forma técnica, o `reduce()`, aplica uma função em cada elemento do array, na expectativa de retornar um valor único.

Na nossa função enviada ao `reduce()`, nós temos acesso a alguns parâmetos, vou listar os mais importantes:

- accumulator: Este é o valor final no momento que o elemento está sendo iterado no array;
- currentValue: Este é o elemento atual que está send interado no array.

Além disso, podemos passar um segundo parâmetro, além da função de callback, o `initialValue`. Ele é especialmente útil quando queremos que o resultado final seja de uma tipagem específica. Por exemplo, se setarmos o `initialValue` como um objeto vazio, nós saberemos que o `accumulator` no callback desde o primeiro elemento será um objeto. O mesmo vale para as outras tipagens do JavaScript (array, number, etc).

Vamos para alguns exemplos práticos:

### 1) Somar valores

É comum no dia-a-dia de um desenvolvedor, precisarmos somar os valores de um array, principalmente para fórmulas e dados estatísticos. Uma forma de fazer isto é com o `reduce()`. Um exemplo, usando nosso `users`, vamos somar o score de todos os usuários:

```js
const totalScore = users.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.score;
}, 0);
```

Uma forma mais objetiva de reproduzir o mesmo código:

```js
const totalScore = users.reduce((acc, user) => acc + user.score, 0);
```

No nosso caso, o resultado será `15`.

### 2) Criar uma lista

Outro exemplo bem comum, é quando precisamos criar um array com dados de sub-propriedades de objetos.

Usando o `users`, vamos criar uma lista com todos os livros de todos os usuários:

```js
const books = users.reduce((accumulator, currentValue) => {
  return [...accumulator, ...currentValue.books];
}, []);
```

O nosso resultado será:

```js
const books = [
  "A Revolta de Atlas - Ayn Rand",
  "Os Axiomas de Zurique - Max Gunther",
  "Anatomia do Estado - Murray Rothbard",
  "Anatomia do Estado - Murray Rothbard",
];
```

## 3) Valores únicos de uma lista

Você vai ter notado que o último livro aparece duas vezes. Isso acontece por que dois usuários diferentes tem o mesmo livro. A nossa amiga `reduce()` pode nos ajudar a retornar os valores únicos desse array:

```js
const uniqueBooks = books.reduce((accumulator, currentValue) => {
  if (!accumulator.includes(currentValue)) {
    return [...accumulator, currentValue];
  }

  return accumulator;
}, []);
```

É mágico, não é?! :3

Como eu comentei anteriormente, existem infinitos exemplos para o `reduce()`. Você poder ver mais alguns exemplos interessantes [aqui](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Examples).

## O que é _currying_ e como aplicá-lo

Apresentado as nossas 3 queridinhas, vamos estudar agora na prática um conceito bastante utilizado na programação funcional, que é o **currying**.

Não, não estamos falando do tempero indiano. :P

O currying é o processo de transformar uma função com múltiplos argumentos em uma sequência de funções aninhadas.

Esse processo faz com que ele continue retornando uma função nova, até que o último argumento seja executado.

Vou dar um exemplo prático de currying, somente com dois argumentos. Este exemplo é uma otimização muito comum em aplicações de JavaScript, para poder reutilizar um trecho de código que é repetido diversas vezes (principalmente em gerenciamento de estados):

```js
const handleNameChange = (event) => {
  setState({
    name: event.target.value,
  });
};

const handleEmailChange = (event) => {
  setState({
    email: event.target.value,
  });
};
```

Observe as duas funções acima. Elas tem praticamente o mesmo código. A única diferença é o valor da chave usada no `setState`.

Podemos então, através da técnica de currying, criar uma nova função, que retornará uma função que aplica o `setState`:

```js
const handleChange = (field) => (event) => {
  setState({ [field]: value });
};
```

Isso significa que se usarmos essa função, ela irá retornar uma nova função:

```js
const handleNamechange = handleChange("name");
const handleEmailchange = handleChange("email");
```

Bacana, não é mesmo? Esse é um exemplo simples, vamos agora para um exemplo mais avançado. Imagine uma função de multiplicação:

```js
const multiply = (a, b) => a * b;
```

Nós podemos usá-la da seguinte maneira:

```js
const twoMultipliedByFour = multiply(2, 4);
```

Até então, essa é uma função simples com dois parâmetros. Vamos aplicar o conceito de currying nela?

```js
const multiply = (a) => (b) => a * b;
```

Ou seja, nós transformamos `multiply(2, 4)` em `multiply(2)(4)`. Ao invés de uma função com 2 parâmetros, agora temos 2 funções de 1 parâmetro.

> > A ideia do currying é que nós consigamos pegar uma função e transformá-la em uma função mais especializada.

Isso significa que podemos criar uma função utilitária, para sempre reproduzir os mesmos argumentos.

Por exemplo, imagine que você está montando um e-commerce e você tem uma função para calcular desconto:

```js
const discount = (price, discount) => price * discount;
```

É natural que em diversas partes do seu código, você precise aplicar um mesmo valor de desconto (10%, p.e.), mudando apenas o preço do produto.

Vamos transformar essa função em um currying:

```js
const discount = (discount) => (price) => price * discount;
```

Agora, podemos criar uma função utilitária que sempre irá calcular o mesmo desconto:

```js
const blackFridayDiscount = discount(0.2);
```

E podemos usá-la simplesmente onde quisermos:

```js
const price = 100;
const totalDiscount = blackFridayDiscount(price); // irá retornar: 20
const priceWithDiscount = price - totalDiscount; // irá retornar: 80
```

## Conclusão

Estes são alguns dos conceitos básicos aplicados na prática de programar numa mentalidade funcional. Ainda temos outros conceitos mais avançados para explorar, como **compose** e **recursividade**, que serão abordados no próximo artigo.

## Recomendações de Leitura

Caso você queira se aprofundar em técnicas de programação funcional com JavaScript, deixo aqui a minha recomendação de dois excelentes livros que contribuiram muito para o crescimento da minha carreira:

- [JavaScript: The Good Parts](https://amzn.to/2nqRxLR)
- [Cangaceiro JavaScript: De padrões a uma abordagem funcional](https://amzn.to/2nwDtR2)

Além disso, se você ficou curioso com os livros usados de exemplo no artigo, vou deixá-los aqui embaixo. Não tem a ver com programação, mas são leituras super agradáveis que podem fazer você mudar seu ponto de vista sobre o mundo e te gerar insights sobre o comportamento da sociedade atual:

<a target="_blank"  href="https://www.amazon.com.br/gp/product/8580417589/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=8580417589&linkCode=as2&tag=01dev-20&linkId=cc1052c8608f2a63515bb8c3c7fe6428"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=BR&ASIN=8580417589&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=01dev-20" ></a><img src="//ir-br.amazon-adsystem.com/e/ir?t=01dev-20&l=am2&o=33&a=8580417589" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
<a target="_blank"  href="https://www.amazon.com.br/gp/product/8593751466/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=8593751466&linkCode=as2&tag=01dev-20&linkId=349d4fbd1048fa613431e07e3ae65b22"><img border="0" src="//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=BR&ASIN=8593751466&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=01dev-20" ></a><img src="//ir-br.amazon-adsystem.com/e/ir?t=01dev-20&l=am2&o=33&a=8593751466" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
<a target="_blank"  href="https://www.amazon.com.br/gp/product/8568905153/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=8568905153&linkCode=as2&tag=01dev-20&linkId=f6421994a3b233d2bf39673cbbebd770"><img border="0" src="https://images-na.ssl-images-amazon.com/images/I/51KvteW9AWL._SX342_BO1,204,203,200_.jpg" style="width:155px;height:250px;" ></a><img src="//ir-br.amazon-adsystem.com/e/ir?t=01dev-20&l=am2&o=33&a=8568905153" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

![](https://media.makeameme.org/created/read-book-get.jpg)

### Referências

- https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339
- https://medium.com/jsguru/javascript-functional-programming-map-filter-and-reduce-846ff9ba492d
