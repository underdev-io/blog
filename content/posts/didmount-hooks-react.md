---
title: "Injetando código no carregamento de um componente usando Hooks"
date: "2019-09-30T22:12:03.284Z"
description: "É uma tarefa comum no dia-a-dia de um desenvolvedor React, precisar chamar uma função assim que um componente é montado no React"
cover: "https://images.unsplash.com/photo-1475518845976-0fd87b7e4e5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1350&q=80"
---

É uma tarefa comum no dia-a-dia de um desenvolvedor React, precisar chamar uma função assim que um componente é montado no React.

Antes do Hooks, resolvíamos isso de uma maneira muito simples:

```js
componentDidMount() {
    funcaoQualquer();
}
```

Entretanto, com a chegada dos [Hooks](https://reactjs.org/docs/hooks-intro.html) na [versão 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html), isso mudou.

Temos uma maneira igualmente simples de fazer o processo, desta vez usando o hook de `useEffect`:

```js
useEffect(() => {
  funcaoQualquer();
}, []);
```

## Nem tudo são flores...

Contudo, se a função está vindo de uma prop (comum quando estamos usando `mapDispatchToProps` ou algo do tipo), você receberá o seguinte warning:

```
React Hook useEffect has a missing dependency: 'funcaoQualquer'. Either include it or remove the dependency array. (react-hooks/exhaustive-deps)
```

O primeiro instinto para tentar resolver o problema, é simplesmente inserir `funcaoQualquer` no array de dependências:

```js
useEffect(() => {
  funcaoQualquer();
}, [funcaoQualquer]);
```

No entanto, você observerá que isso desencadeará um loop infinito no seu componente.

Isso acontece por que, toda vez que o componente é renderizado, ele atualiza o valor da prop de `funcaoQualquer`, mesmo que o valor dela não tenha mudado.

Existe uma maneira muito simples e elegante de resolver este problema: usando o hook de `useCallback`.

## O que é o hook de useCallback

O `useCallback` é um hook que recebe uma função como parâmetro. Ele irá retornar esta função numa versão memoizada.

Memoização é uma técnica de programação que procura aumentar a performance de uma função, cacheando seus valores previamente computados.

Cada vez que uma função memoizada é chamada, seus parâmetros são usados para indexar um cache. Se os parâmetros passados já existirem no cache, o seu resultado é retornado, sem executar a função completamente. Do contrário, se a função ainda não foi executada com aqueles argumentos, então a função é executada e o seu resultado é adicionado no cache.

Graças a memoização, podemos montar uma função que será acionada somente uma vez pelo nosso componente. A não ser que `funcaoQualquer` efetivamente mude de valor.

## useCallBack na prática

Precisamos importá-lo no nosso componente:

```js
import React, { useCallback } from "react";
```

Dentro do nosso componente, iremos usá-lo:

```js
const ComponenteExemplo = ({ funcaoQualquer }) => {
  const doFuncaoQualquer = useCallback(() => {
    funcaoQualquer();
  }, [funcaoQualquer]);

  useEffect(() => {
    doFuncaoQualquer();
  }, [doFuncaoQualquer]);

  return <div>componente de exemplo! :D</div>;
};
```

Ta-da! 🎉

Problema resolvido de forma elegante. Sem warnings, sem desabilitações de eslint.

## Conclusão

Esta alternativa para se injetar código na inicialização do componente é descrita na página do [FAQ de Hooks](https://reactjs.org/docs/hooks-faq.html). Infelizmente, muitos desenvolvedores acabam se livrando do warning apenas desabilitando o `exhaustive-deps`, mas há maneiras mais interessantes de resolver o problema.

## Recomendações de Leitura

Recomendo a página de [FAQ dos Hooks](https://reactjs.org/docs/hooks-faq.html) e o site [usehooks.com](https://usehooks.com/) para aprender mais sobre o que são Hooks e como usá-los corretamente.
