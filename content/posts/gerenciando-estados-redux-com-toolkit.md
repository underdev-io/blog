---
title: "Gerenciando estados no Redux com Toolkit"
date: "2020-02-08T22:12:03.284Z"
description: "Um dos principais desconfortos pelos desenvolvedores que estão usando Redux pela primeira vez, é o quão verboso é usá-lo. Mesmo para estados mais simples, o processo acaba sendo bem extenso."
cover: "https://images.unsplash.com/photo-1485978542216-b956ac966ccf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80"
---

Um dos principais desconfortos pelos desenvolvedores que estão usando [Redux](https://redux.js.org/) pela primeira vez, é o quão verboso é usá-lo. Mesmo para estados mais simples, o processo acaba sendo bem extenso.

Pensando em solucionar esse problema, a equipe do Redux criou uma biblioteca chamada [Redux Toolkit](https://redux-toolkit.js.org/).

Ela é uma excelente alternativa ao já popularmente conhecido [reduxsauce](https://github.com/jkeam/reduxsauce).

## Benefícios de se usar o Toolkit

Existem diversos benefícios, vou listar os principais (para mim):

1. Inicializa a store de forma prática;
2. Funções utilitárias para gerar reducers, actions, etc;
3. Vem com uma pré-configuração de fábrica, trazendo nativamente a integração com bibliotecas como o [redux-devtools](https://github.com/reduxjs/redux-devtools);
4. Propõe design patterns para as camadas de estado, usando slices (fatias, literalmente) do estado.

## Instalando o Redux e o Toolkit

Hoje, vamos aprender a instalar do zero uma camada de Redux em uma típica aplicação React.

O mesmo é válido para outras bibliotecas como [Angular](https://angular.io/), apenas sendo necessário o uso de um wrapper como o [NgRx](https://ngrx.io/).

```bash
yarn add redux react-redux @reduxjs/toolkit
```

## Inicializando a store

Crie um arquivo em `src/store/index.js`:

```js
// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
```

Observe que estamos importando um `rootReducer`, vindo da pasta `slices`. Vamos criá-lo:

```js
// src/store/slices/index.js
import { combineReducers } from "redux";
import auth from "./auth";

export default combineReducers({ auth });
```

Observe também que aqui estamos importando um slice de `auth`.

## O que são slices?

Slices são fatias do seu estado global.

Cada "namespace" do seu estado pode se tornar uma "slice".

A slice é composta de duas partes: `reducer` e `actions`.

## Criando o nosso 1º slice

Por conta disso, criamos a pasta de `slices`, e vamos inicializar o nosso primeiro slice:

```js
// src/store/slices/auth.js
import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    name: "",
    email: "",
    avatar: "",
    token: "",
  },
  reducers: {
    setAuthentication(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setAuthentication } = auth.actions;
export default auth.reducer;
```

Observe que, graças a metaprogramação do Toolkit, ele automaticamente cria métodos em `slice.actions` usando as funções do objeto de `reducers`.

Esse código gerado "automaticamente" é inclusive reconhecido pelo TypeScript e consequentemente o VS Code.

É algo realmente bem interessante e um dos principais motivos para se usar o Toolkit.

**Observação**: É possível [mutar a variável](https://redux-toolkit.js.org/tutorials/intermediate-tutorial#mutable-update-logic) de `state` diretamente, graças a biblioteca [Immer](https://github.com/immerjs/immer) que é usada por debaixo dos panos pelo Toolkit.

## Usando o nosso slice

Dentro do seu container, você poderá importar as **actions** do nosso slice e despachá-las:

```js
import { setAuthentication } from "../store/slices/auth";
import { connect } from "react-redux";
import Component from "../components/exemplo";

const mapDispatchToProps = (dispatch) => ({
  onLogin: () => {
    dispatch(
      setAuthentication({
        isAuthenticated: true,
        name: "lhas",
        email: "luizhrqas@gmail.com",
        avatar: "https://01dev.codes/avatar.jpg",
        token: "Bearer 18239dsafdsa893rfdsaifj",
      })
    );
  },
});

export default connect(null, mapDispatchToProps)(Component);
```

O primeiro parâmetro enviado para a nossa action será automaticamente enviado como `payload` no nosso reducer, sendo acessível via `action.payload`.

### Eu uso redux-persist e aparece um erro, e agora?

O Toolkit, dentro dos seus middlewares padrões, carrega um serializador de objetos.

Como o redux-persist retorna um objeto do LocalStorage, ele entende que não é possível serializá-lo.

Uma maneira muito simples de resolver isso sem causar nenhum impacto no uso do Toolkit é desabilitando a checagem desse serializador:

```js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// ...

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: false, // e é esse o pulo do gato
  }),
});
```

## Conclusão

O Toolkit do Redux é uma biblioteca mantida pelo core team do Redux e veio pra ficar.

Eu já estou utilizando este padrão nos novos projetos e tenho sentido que a dor de se trabalhar com Redux foi embora em 90%.

A slice pattern, graças a programação funcional e metaprogramação, vai reduzir muitas linhas de código do seu projeto e te dar menos dores de cabeça para saber onde está o problema no seu estado.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/5lAtcHWPAYFdS/giphy.gif)
