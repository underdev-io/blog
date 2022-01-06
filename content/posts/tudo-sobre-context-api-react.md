---
title: "Tudo que você precisa saber sobre Context API no React"
date: "2019-10-07T00:00:00Z"
description: "Com a chegada da versão 16.3 do React, a Context API deixou de ser uma feature experimental e tornou-se estável, pronta para ser usada em ambientes de produção"
layout: post
draft: false
category: "React"
tags:
  - "Context API"
  - "React"
cover: "https://images.unsplash.com/photo-1569493086584-33e0b36f3145?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2002&q=80"
---

Com a chegada da versão 16.3 do React, a Context API deixou de ser uma feature experimental e tornou-se estável, pronta para ser usada em ambientes de produção.

Até então, praticamente qualquer novo projeto que era iniciado em React, automaticamente adicionava um gerenciador de estado, seja ele, [Redux](https://redux.js.org/) ou [MobX](https://mobx.js.org/).

Felizmente, os tempos mudaram. Hoje, caso você esteja planejando iniciar um novo projeto, saiba que não é mais tão necessário um gerenciador de estado externo.

Isso acontece graças a nova (talvez não tão nova assim 😅 Foi lançada em 2018) API para Context.

Ela permite que montemos um gerenciador de estado sem qualquer tipo de dependência, apenas com as funções que são exportada do próprio React.

## Para que serve? 🤔

A Context API serve para quando você precisa trabalhar com dados que serão reutilizados em diversas telas. Ou seja, dados acessíveis a nível global da aplicação.

Exemplos: dados de autenticação de um usuário, carrinho de compras, timezone, idioma, configurações de tema, etc.

## Como usar? 🤨

Primeiro, precisamos criar um contexto novo. Vamos isolá-lo num arquivo `contexts/theme.js`:

```
export default React.createContext();
```

Com nosso contexto inicializado, precisamos fornecer o `Provider` dele para o nosso `App`:

```js
import ThemeContext from "contexts/theme";

const App = ({ children }) => (
  <ThemeContext.Provider value={{ primaryColor: "blue" }}>
    {children}
  </ThemeContext.Provider>
);
```

Agora, podemos ler o `value` do nosso `Provider` em qualquer componente que estiver dentro do `App`, independente do nível que o componente esteja:

```js
import ThemeContext from "contexts/theme";

const Button = () => (
  <ThemeContext.Consumer>
    {(value) => (
      <button style={{ backgroundColor: value.primaryColor }}>
        Botão primário
      </button>
    )}
  </ThemeContext.Consumer>
);
```

Essa simples técnica de Provider e Consumer, já ajuda bastante a organizarmos nosso código. Especialmente em componentes que tem muitos sub-níveis e precisam interagir com dados que estão muitos níveis acima.

Porém, podemos levar esta API de Context a outro nível. 🚀

## Entendendo o `useReducer` hook 🤔

Um dos hooks disponíveis pelo React pode ser bastante útil na construção do nosso próprio gerenciador de estados.

Vamos para um exemplo prático:

```js
import React, { useReducer } from 'react';

const reducer = (state, action) => {
    const actions = {
        increment: () => {
            return { count: state.count + 1 }
        },
    };

    return actions[action.type](); // FP FTW!1!
}

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    const handleClick = () => dispatch({ type: 'increment' });

    return (
        <button onClick={handleClick}>Counter: {state.count}</buttonn>
    )
}
```

Nós criamos uma função redutora chamada `reducer` (semelhante aos que usamos no Redux).

Dentro do nosso componente `Counter`, aplicamos o hook de `useReducer`, enviando nossa função redutora como primeiro argumento, e um estado inicial como segundo argumento.

O hook, por sua vez, retorna um array com dois atributos:

- state: O estado atual do redutor;
- dispatch: Uma função auxiliar para que você possa despachar novas ações para nosso redutor.

Se você já trabalhou com Redux, está bem familiarizado com estes conceitos. 😉

Toda vez que nos despachamos uma ação com `dispatch`, a nossa função redutora `reducer` é chamada, e um novo estado é retornado através dela.

## Unindo o útil ao agradável 🥰

Como é argumentado por um artigo do [Simply](https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c), é possível criarmos um gerenciador de estados tão avançado quanto o Redux em... 10 linhas de código.

Crie um arquivo chamado `contexts/state.js`:

```js
import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
```

- 1. Nós criamos um `StateContext`;

- 2. Nós criamos um novo componente chamado `StateProvider`, que irá estender o `StateContext.Provider`, fornecendo ele para o componente que for passado via `children`;

- 3. Nós enviamos `reducer` e `initialState` dinamicamente via props. Além disso, fornecemos o retorno desse hook como estado do nosso contexto;

- 4. O `useContext` é outro hook que vem com React, que permite que acessemos um contexto, fornecendo somente o objeto do contexto a ser acessado. Ele serve somente para componentes funcionais. Como nós vamos usá-lo por toda aplicação, já criamos esta função utilitária denominada `useStateValue()`. Isso vai facilitar a vida, quando quisermos acessar o estado de forma ágil nos nossos componentes.

## Aplicando o StateContext na aplicação 🤔

Com nosso terreno preparado, podemos implesmente aplicá-lo:

```js
import { StateProvider } from "contexts/state";

// Nosso estado inicial
const initialState = { theme: { primaryColor: "blue" } };

// Todas as actions disponíveis
const actions = (state, payload) => ({
  changeTheme: () => {
    return { ...state, theme: payload };
  },
});

// definimos valores iniciais para `type` e `payload` para evitar erros de runtime
const reducer = (state, action = { type: "", payload: {} }) => {
  // chamamos o callback de actions enviando o estado atual, a ação desejada e o payload para ela
  return actions(state, action.payload)[action.type]();
};

const App = () => (
  <StateProvider>
    {
      // App aqui
    }
  </StateProvider>
);
```

## Usando o StateContext em um componente 🤨

Nós agora temos acesso ao StateContext em qualquer componente que estiver dentro do nosso `StateProvider`. Exemplo:

```js
// src/components/Button.js

import { useStateValue } from "../contexts/state";

const Button = () => {
  const [state, dispatch] = useStateValue();

  const handleClick = () => {
    const type = "changeTheme";
    const payload = {
      primaryColor: "green",
    };

    dispatch({
      type,
      payload,
    });
  };
  return (
    <button
      style={{ background: state.theme.primaryColor }}
      onClick={handleClick}
    >
      Botão
    </button>
  );
};

export default Button;
```

**Observação:** O nosso hook `useStateValue()` só funciona dentro de componentes funcionais.

Caso você queira ler nosso `StateContext` dentro de um componente de classes, é só declarar a propriedade estática de `contextType`, exemplo:

```js
import { StateContext } from "../contexts/state"

class Button extends React.Component {
  static contextType = StateContext

  render() {
    const [state, dispatch] = this.context;

    return (
      // Resto do componente aqui
    )
  }
}
```

## Sugestão de arquitetura 🧐

No mundo real, você não vai querer conectar seus componentes dummies em contextos externos. Para resolver esse problema, você pode seguir a mesma arquitetura sugerida pelo Redux, de criar uma camada de Containers. No exemplo do nosso botão, o componente ficaria dummy desta forma:

```js
// src/components/Button.js

const Button = ({ theme, onChangeColor, children }) => {

  const handleClick = () => {
    onChangeColor();
  }
  return (
    <button
      style={{ background: theme.primaryColor }}
      onClick={handleClick}
    >
      {children}
    </button>
  )
```

E o container do nosso botão ficaria assim:

```js
// src/containers/Button.js
import Button from "../components/Button";
import { useStateValue } from "../contexts/state";

const ButtonContainer = ({ children }) => {
  const [state, dispatch] = useStateValue();

  const onChangeColor = () => {
    const type = "changeTheme";
    const payload = {
      primaryColor: "green",
    };

    dispatch({
      type,
      payload,
    });
  };

  return (
    <Button theme={state.theme} onChangeColor={onChangeColor}>
      {children}
    </Button>
  );
};

export default ButtonContainer;
```

## Aplicando Middlewares 🤔

Numa típica aplicação de Redux, é comum precisarmos injetar alguns middlewares na nossa camada de store.

Esses middlewares são, basicamente, funções que podem receber ou não dados da store.

Em virtude dos fatos mencionados, podemos simplesmente acionar estas funções no nosso `reducer`:

```js
// definimos valores iniciais para `type` e `payload` para evitar erros de runtime
const reducer = (state, action = { type: "", payload: {} }) => {
  // AQUI: Podemos chamar qualquer tipo de "middleware" aqui, podendo enviar o estado ou a action para o mesmoo

  // chamamos o callback de actions enviando o estado atual, a ação desejada e o payload para ela
  return actions(state, action.payload)[action.type]();
};
```

## Conclusão

Pela observação dos aspectos analisados, podemos concluir que a nova API de Context é extremamente poderosa, útil e estável.

A Context API fornece 2 componentes:

➡️ `Provider`: Será o nosso fornecedor global de estado;

➡️ `Consumer`: Será nosso utilitário sempre que desejarmos consumir algo do nosso fornecedor (Provider).

Graças a esses dois poderosos componentes, a Context API pode substituir facilmente gerenciadores de estado, que costumam poluir bastante o código, especialmente em projetos de pequeno/médio porte.

Ou simplesmente, facilitar a organização de estados que não precisam estar a nível global (no Redux), mas que vão ser bastante trabalhados por sub-níveis de componentes.

Espero que gostem do artigo.

**Não deixa de inscrever seu e-mail abaixo para receber nossos artigos novinhos em folha antes de todo mundo.**
