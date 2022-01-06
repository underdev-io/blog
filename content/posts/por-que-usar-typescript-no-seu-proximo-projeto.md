---
title: "Por que usar TypeScript no seu próximo projeto"
date: "2020-02-15T22:12:03.284Z"
description: ""
cover: "https://images.unsplash.com/photo-1580465446156-0a5b3eee11ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"
---

A ascensão do [TypeScript]() nos últimos anos é indiscutível. Cada vez mais os projetos de JavaScript, especialmente os de front-end, estão usando este incrível superset.

## Por que algumas pessoas não gostam de TypeScript

Existe um enorme volume de programadores que começaram suas carreiras usando linguagens de tipagem dinâmica.

Linguagens como [Ruby](https://www.ruby-lang.org/en/), [PHP](https://www.php.net/) e JavaScript foram as primeiras linguagens de programação para muita gente (eu me incluo nesse grupo).

É muito comum essa _"rixa"_ entre os desenvolvedores que curtem/usam linguagens [estaticamente tipadas]() x [dinamicamente tipadas]().

O principal motivo para que alguns desenvolvedores _não gostem_ de TypeScript (e por consequência qualquer linguagem dinamicamente tipada) é o tanto de código que você precisa escrever para definir todas as tipagens necessárias.

É um código volumoso e que **não** irá para produção. Então ele naturalmente sofre uma repressão, da mesma forma que os testes unitários, pois os POs e os usuários não irão ter "contato" com esse código escrito.

Em resumo, esses são os principais argumentos que as pessoas não gostam de TypeScript usam:

- aumenta o tempo de imersão de novos colaboradores;
- aumenta o tempo de manutenção dos projetos;
- aumenta o tempo de desenvolvimento;
- pode deixar de existir num futuro breve (o JS pretende implementar [tipagens estáticas nativamente](https://github.com/tc39));
- mão de obra mais escassa.

## Por que algumas pessoas AMAM o TypeScript

Em resumo, esses são os argumentos das pessoas amam usá-lo:

### Facilita o debug do código

Durante o processo de debug de um pedaço de código, algumas perguntas naturalmente vem: _quais argumentos essa função aceita?_ _Qual tipo de valor ela retorna?_ Essas perguntas são bem complicadas de serem respondidas num cenário de tipagem dinâmica. Imagine um argumento `value` numa função aleatória. O que é exatamente o `value`? É um objeto? uma string? Se for um objeto, eu posso assumir que seus atributos sempre irão existir? Para responder essas perguntas, você provavelmente vai adicionar um `console.log()`. Já com TypeScript é **diferente**, você irá ver a tipagem da variável `value` e automaticamente já vai saber o que pode e o que não pode, o que vem e o que não vem.

### Integração com VS Code

Toda essa análise de tipos é feita automaticamente pelo [VS Code](https://code.visualstudio.com/). Isso faz com que a gente ganhe muito tempo, sem precisar abrir debugger, console, etc. O próprio editor já irá lhe indicar a documentação daquela função, seus argumentos e seus respectivos tipos.

### Agilidade na implementação de novos componentes/funções

No processo de criação de um novo componente ou de uma nova função, você eventualmente precisará declarar as propriedades externas (ou os argumentos) que eles receberão. Com o TypeScript, você usará as interfaces dos objetos que você precisa. E isso vai fazer você ganhar muito tempo, pois saberá exatamente quando/onde/como, o que você pode e o que não pode fazer com aqueles objetos.

### Facilidade na refatoração

Pelo fato de você identificar mais facilmente quais são os tipos a serem usados nos argumentos das funções, num eventual cenário de refatoração de código, basta um simples Search no código para você saber onde todos os objetos daquele tipo estão no projeto.

### Seu código terá menos bug

A maior parte dos bugs no front-end é algum typo ou uma tentativa do código de acessar um atributo nested que ainda não existe em um objeto. Graças ao compilador do TypeScript, erros como esse são reduzidos e muito. Isso significa que você o compilador irá adiantar para você todos os possíveis bugs que o seu código pode ter.

## Desvantagens do TypeScript

### Camada extra de compilação na sua aplicação

É um pouco chato a ideia de precisar transformar arquivos `*.ts/*.tsx` em `*.js`, mesmo que nós já estejamos acostumados a usar compiladores como o [Babel]().

Além disso, em projetos de grande porte, que envolvam centenas/milhares de arquivos `*.ts/*.tsx`, o compilador pode demorar um pouco para compilar todo o projeto.

### Curva na inserção de novas dependências

Toda vez que você adiciona uma nova dependência no seu projeto, você precisará fazer uma das seguintes opções:

1. **Adicionar o typedef da dependência**: A maior parte das dependências mais famosas tem um [projeto de definição de tipagem open-source](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types). Você adiciona, junto da dependência, a sua dependência de tipagem. Exemplo:

```
yarn add lodash
yarn add @types/lodash --dev
```

2. **Criar um declaration file para dependência**: Eventualmente, você vai precisar usar dependências que não tem uma tipagem própria declarada. Então você irá precisar fazer isso você mesmo. Para isso, basta criar um arquivo `nome-da-dependencia.d.ts`:

```ts
declare module "lodash";
```

## Usando TypeScript no React

O CLI do [create-react-app](https://github.com/facebook/create-react-app) permite que você crie projetos com suporte nativo a TypeScript:

```
yarn create react-app my-app --template typescript
```

## Links

- [TypeScript at Lyft](https://eng.lyft.com/typescript-at-lyft-64f0702346ea)
- [TypeScript at Slack](https://slack.engineering/typescript-at-slack-a81307fa288d)
- [How we migrated a 200K+ LOC project to TypeScript and survived to tell the story](https://hashnode.com/post/how-we-migrated-a-200k-loc-project-to-typescript-and-survived-to-tell-the-story-ciyzhikcc0001y253w00n11yb)
- [Converting 600k lines to TypeScript in 72 hours - Lucidchart](https://www.lucidchart.com/techblog/2017/11/16/converting-600k-lines-to-typescript-in-72-hours/)

## Conclusão

É possível ter uma dimensão dos superpoderes que esse incrível superset trouxe para o ecossistema do JavaScript.

A sua adoção em projetos front-end tem sido cada vez mais presente. As vagas de emprego cada vez mais o pedem.

Talvez esse seja um bom momento para você refatorar o seu projeto para o TypeScript.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/yoJC2Pa5O4yhG9Gg24/giphy.gif)
