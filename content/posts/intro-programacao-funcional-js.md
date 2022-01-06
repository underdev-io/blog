---
title: Introdução a Programação Funcional com JavaScript
date: "2019-09-24T22:12:03.284Z"
description: "Programação funcional (tambem conhecido por FP ou PF) é um _paradigma_ de desenvolvimento que tem sido cada vez mais utilizado nas aplicações ao redor do mundo, principalmente em JavaScript"
cover: "https://images.unsplash.com/photo-1560390816-3400050aab0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
---

Programação funcional (tambem conhecido por FP ou PF) é um _paradigma_ de desenvolvimento que tem sido cada vez mais utilizado nas aplicações ao redor do mundo, principalmente em JavaScript.

Este artigo busca introduzir de maneira amigável e superficial, o universo da programação funcional para iniciantes em JavaScript.

Isso se dá principalmente pelos diversos **benefícios** que este paradigma traz. Nós podemos definir a programação funcional como composições de **funções puras**, que evitam _estados compartilhados, dados mutáveis e efeitos colaterais_. Este paradigma é declarativo, ao invés de imperativo. **Todo o fluxo da aplicação se dá através dessas funções puras.**

A PF _contrasta_ bastante com o paradigma de _orientação a objetos_, que esteve bastante em alta nos últimos anos no ramo de desenvolvimento de softwares. É natural que programadores iniciantes sejam introduzidas inicialmente a ideias imperativas e orientadas a objeto, pela facilidade de adaptar o mundo real ao código.

É, definitivamente, uma forma diferente (e muito divertida) de programar. Depois que você se acostuma com a **"mentalidade funcional"**, você dificilmente voltará atrás. Essa mentalidade funcional desperta um instinto dentro do programador de querer reaproveitar o máximo de lógica e organizar o código de forma que reduz bastante o número de bugs gerado conforme a aplicação é desenvolvida.

Outro benefício da mentalidade funcional, é que o seu código tenderá a estar muito mais conciso, simples de ler e mais fácil de testar. Isso acontece principalmente por conta das funções puras, onde o _output_ da função depende única e exclusivamente dos argumentos em que lhe é passada. Chamar uma função pura com os mesmos argumentos irá **sempre** retornar o mesmo _output_.

É um assunto um pouco complexo de se entender a primeira vista, principalmente por conta do raciocínio matemático que existe por detrás da mentalidade funcional. Mas, se estudado com calma em um material de fácil entendimento, é facilmente reproduzido. É muito mais fácil do que parece, acredite.

Para termos um entendimento geral da programação funcional, precisaremos dominar alguns conceitos gerais. Estes conceitos gerais serão descritos abaixo:

## 1. Funções Puras

Uma função pura, é uma função que dado os mesmos argumentos, irá sempre retornar os mesmos valores. Além disso, ela não deve gerar nenhum efeito colateral.

_Mas o que são efeitos colaterais?_, você provavelmente vai se perguntar. É quando uma função faz uma alteração em um dado que não está presente dentro da função. Exemplo:

```js
let fruta;

const funcaoImpura = () => {
  fruta = "abacate"; // está mudando o valor de uma variável externa a função, ou seja, gerando um efeito colateral
};
```

O mesmo exemplo, para uma função pura, seria:

```js
const funcaoPura = () => {
  const fruta = "abacate";
};
```

## 2. Função composta (composição de funções)

É o processo de transformar duas ou mais funções em uma nova função, semelhante ao conceito matemático. Vou me aprofundar mais neste conceito posteriormente, em um artigo dedicado somente para funções compostas.

## 3. Estado Compartilhado

É qualquer variável/objeto que existe em um escopo compartilhado. Este estado, então, é manipulado em diversos escopos, sejam eles globais ou não. É muito comum este tipo de estado compartilhado em aplicações orientadas a objetos.

Porém, este tipo de estado costuma ocasionar em alguns bugs conhecidos. Por exemplo, imagine uma aplicação onde o usuário troca o seu nome. Enquanto a requisição de troca de nome está sendo feita, o usuário altera a sua foto de perfil.

Se tivermos um estado global, quando a foto de perfil terminar de ser alterada, a API irá retornar o nome antigo, pois a primeira requisição não foi finalizada quando a segunda começou. O nome deste tipo de bug é [race condition](https://pt.wikipedia.org/wiki/Condi%C3%A7%C3%A3o_de_corrida).

Uma maneira de evitar este tipo de bug, é estruturar seus dados de forma que suas funções sempre criem dados novos, ao invés de mutar os que já existem. Se você já trabalhou com [Redux](https://redux.js.org/), já deve estar familiarizado com a ideia de criar dados novos ao invés de mutar dados que já existem.

Outro problema comum com estados compartilhados, é que mudar a ordem de chamada das funções, pode causar falhas em cascata, pois elas são dependentes do timing em quando a função foi chamada.

Quando você evita estados compartilhados, o timing e a ordem em que as funções são chamadas não muda o resultado final.

## 4. Imutabilidade

Um objeto imutável é um objeto que não pode ser modificado após ter sido criado. O oposto também é válido: um objeto mutável é um objeto que pode ser modificado após sua criação.

É um dos principais conceitos do paradigma da pogramação funcional.

Iniciantes em JavaScript costumam achar que o `const` seria uma variável imutável. Isso é uma meia verdade. Você não pode alterar a alocação da variável, porém você pode alterar as propriedades de um objeto.

```js
const fruta = { nome: "Abacate", origem: "México" };

// você não pode fazer isso
fruta = { nome: "Morango" };

// mas você pode fazer isso
fruta.nome = "Morango";
```

Isso significa que uma variável `const` ainda assim é uma variável mutável.

Objetos imutáveis não podem ser alterados de forma alguma. O JavaScript tem um método para congelar um objeto, de forma que ele se torne imutável. Porém, ele só faz isso até um nível de profundidade. Isso significa que se você Tiver um objeto filho dentro de um objeto pai, e você congelar o pai, o filho ainda assim será mutável.

O [método](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) para congelar objetos no JavaScript, como descrito acima, é:

```js
Object.freeze(objeto);
```

Existem bibliotecas, como o [Immutable.js](https://github.com/facebook/immutable-js), que permitem que você crie objetos 100% imutáveis. Apesar de serem bibliotecas boas para garantir que seus dados não sejam mutáveis em nenhum momento, elas são totalmente opcionais para você operar com paradigma funcional no JavaScript.

## 5. Efeitos Colaterais

Como comentado acima, efeitos colaterais são qualquer mudança no estado de uma aplicação que ocorrem do lado de fora da função que foi chamada.

É praticamente impossível criar uma aplicação completa sem efeitos colaterais. Uma simples requisição para uma API já é considerado um efeito colateral.

O importante aqui é que você procure evitar causar efeitos colaterais sem necessidade. Isso garantirá que sua aplicação será fácil de entender e testar.

## 6. Reutilização de código (através de High Order Functions, HOFs ou HOCs)

Um dos princípios da mentalidade funcional é reutilizar o máximo de lógica comum em funções utilitárias, de forma que ela possa ser reutilizada e extendida conforme houver necessidade.

Num paradigma de orientação a objetos, o seu objeto está limitado a usar os métodos que pertencem a ele.

Já no paradigma funcional, você pode, através de funções compostas, criar novas funções totalmente extensíveis. Estas funções compostas são chamadas de High Order Functions, ou HOFs. Isso significa que uma HOF é uma função que recebe outra função como parâmetro e retorna uma função totalmente nova. Um exemplo prático:

> Observação: High Order Functions são exatamente a mesma coisa que High Order Components. Para quem já trabalha com bibliotecas como React, já deve estar familiarizado ou ouviu falar em uma destas expressões.

```js
const maiorQue = (num) => (num2) => num2 > num;

const maiorQueDez = maiorQue(10);
const onzeEhMaiorQueDez = maiorQueDez(11);
```

Observe que temos uma função pura chamada `maiorQue`, que permite um parâmetro `num`. Esta função retorna uma nova função, que permite um novo parâmetro que chamamos de `num2`. Sendo assim, temos dinamicamente o `num` e o `num2` para trabalhar.

Graças a esse dinamismo, podemos criar funções utilitárias, puras, que não geram efeito colateral, como foi o caso do `maiorQueDez`. Com esta nova função utilitária, podemos simplesmente fazer infinitas combinações, de forma que cada instancia de `maiorQue`, seja totalmente independente.

## Diferenças entre modo imperativo e modo funcional

Modo imperativo: descreve através do código, todo o fluxo de etapas que deve acontecer para que tenhamos o resultado final desejado, ou seja, como fazer cada coisa.

Modo funcional: funciona de forma mais abstrata, onde ao invés de determinarmos como cada coisa será feita, simplesmente lidamos com todos os cenários possíveis.
O "como fazer" acaba sendo "excluído" da equação.

## Conclusão

Podemos concluir que o paradigma funcional gira em torno de:

- Funções puras;
- Evitar efeitos colaterais e compartilhamento de estados;
- Imutabilidade sob mutabilidade;
- Lógicas genéricas e reutilizáveis, isoladas em funções de forma que elas possam ser compostas em novas funções;
- Raciocínio declarativo ao invés de imperativo (dizemos o que pode ser feito ao invés de como deve ser feito);

As funções nativas do JavaScript mais famosas utilizadas na programação funcional são `.map()`, `.filter()` e `reduce()`.

Sempre que uma função permitir receber outra função como parâmetro, é um forte indício de que você está lidando com este paradigma, como é o caso das funções listadas acima (recebem uma nova função como parâmetro).

[Clique aqui para ler sobre programação funcional na prática com Javascript.](https://01dev.codes/na-pratica-programacao-funcional-js/)

## Recomendações de Leitura

Caso você queira se aprofundar em técnicas de programação funcional com JavaScript, deixo aqui a minha recomendação de dois excelentes livros que contribuiram muito para o crescimento da minha carreira:

- [JavaScript: The Good Parts](https://amzn.to/2nqRxLR)
- [Cangaceiro JavaScript: De padrões a uma abordagem funcional](https://amzn.to/2nwDtR2)

![](https://media.makeameme.org/created/read-book-get.jpg)

### Referências:

- https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0
- https://en.wikipedia.org/wiki/Functional_programming
