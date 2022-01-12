---
title: "Ciclo de vida de um componente em React"
tags: ["ciclo de vida", "react", "componente"]
description: "componentes React. Especificamente, os seus ciclos de vida"
cover: /covers/ciclo-de-vida-de-um-componente-em-react.png
author: lhas
date: "2017-11-28T14:20:47-02:00"
---

Olá a todos!

Hoje o assunto a ser tratado no **0e1dev** será componentes React. Especificamente, os ciclos de vida deles.

É um assunto deveras simples, apesar de gerar bastante dúvida para os iniciantes.

Componentes para o React tem um ciclo de vida comum, como qualquer ser vivo do nosso planeta.

Assim como nós, humanos, temos a fase da infância, adolescência, e velhice, os componentes tem a fase do _componentDidMount_, _componentWillMount_, _componentWillReceiveProps_, etc.

A única coisa que muda, é o parâmetro deste ciclo.

No nosso caso, é bem simples, tempo.

![](https://media.giphy.com/media/YBSmU4HWkaamk/giphy.gif)

Já no caso de componentes React, esses parâmetros já são um pouco mais complexos e vão depender de outros fatores, p.e., se o usuário entrou/saiu de uma rota, ou se o usuário interagiu com alguma parte da interface que impactou nos ciclos de diversos componentes.

O primeiro callback a ser chamado quando o componente é carregado:

# componentWillMount

Os callbacks do ciclo de vida tendem a ter três palavras no seu nome:

**component** + **auxiliar (prefixo)** + **evento**

Neste caso, o auxiliar é o _will_ (ou seja, irá) e o evento é o _mount_ (ou seja, carregar).

Todo componente em React, antes de ser renderizado (`<Exemplo />`), irá acionar o seu respectivo `componentWillMount`.

Apesar deste ser o primeiro callback, ele é um dos mais inúteis. As razões são:

- Ele equivale ao `constructor()`;
- Após a versão 16, ele pode ser chamado várias vezes pela engine antes de, de fato, carregar o componente.

Ele servia quando nós ainda construíamos nossos componentes com `React.createClass()`, pois como não eram classes de verdade, era impossível declarar algo dentro do seu constructor. Porém, no ECMAScript 6 (vulgo ES6), os componentes são declarados como classes, ou seja, perfeitamente tranquilo usar o constructor, se necessário.

A maior utilidade deste callback aqui será caso você precise fazer qualquer tipo de manipulação _server-side_. Pois no lado do servidor, o `didMount` (ciclo ideal para ações assíncronas/com efeito colateral) não é chamado, sendo chamado no lado do servidor somente o `willMount`.

![](https://media.giphy.com/media/1X5kmAFCKmFry/giphy.gif)

# componentDidMount

Este é a menina dos olhos de qualquer desenvolvedor React.

Ele é o nosso personagem especial, que serve justamente para qualquer tipo de ação assíncrona, que envolva efeitos colaterais no nosso componente, seja alterando o estado do mesmo, ou enviando uma requisição para um ambiente externo.

Use-o e abuse-o para qualquer tipo de colateralidade e manipulação de **DOM**.

Quando ocorrer algum tipo de mudança no **estado** (state) do componente, estas mudanças irão engatilhar outros callbacks.

```js
componentDidMount: () => {
  // use e abuse! C&A
};
```

# shouldComponentUpdate

O primeiro callback a ser acionado quando ocorre alguma mudança no componente é o `shouldComponentUpdate`.

Ele permite que você indique se o componente deve ou não aplicar uma re-renderização.

Você deve sempre retornar um valor booleano, caso você use-o.

Por padrão, este callback irá sempre retornar verdadeiro, ou seja, todo componente que tiver mudança de estado (seja state ou prop) irá acionar este callback, e consequentemente a re-renderização do mesmo por padrão.

```js
shouldComponentUpdate: () => {
  // você deve sempre retornar um booleano
  // ao usá-lo (por padrão ele sempre retornará true)
  return true;
};
```

# componentWillUpdate

Assim que o `shouldComponentUpdate` é finalizado, caso o valor de retorno dele seja `true`, o `componentWillUpdate` irá ser acionado em seguida.

Ele recebe 2 parâmetros: `nextProps` e `nextState`.

```js
componentWillUpdate: (nextProps, nextState) => {
  // prefira usar o `componentDidUpdate` pelos motivos abaixo
};
```

Ele é bem semelhante ao `componentWillMount`, no sentido de que não é interessante que você utilize-o para aplicar efeitos colaterais ou manipulações de DOM.

O `componentWillUpdate` só deve ser usado para fazer algum tipo de "preparação" pré-atualização. Se tu aplicar uma nova atualização aqui (seja com `setState()` ou acionando uma prop que irá modificar algo), ele irá desencadear outro `componentWillUpdate`, o que irá gerar uma recursão indesejada, causando o famoso loop infinito.

Existem maneiras de previnir esse loop, mas não seria o correto do ponto de vista da arquitetura.

# componentDidUpdate

Para qualquer tipo de ação com efeito colateral ou manipulação, você pode (e deve) usar o `componentDidUpdate`, que funciona bem parecido com o `componentDidMount`, com a diferença de que este só é chamado em alguma atualização após a primeira renderização do componente.

Se tu quiser fazer alguma manipulação de DOM, consultar a API, etc, este é o (segundo) cara!

Ele recebe 2 parâmetros: `prevProps` e `prevState`.

```js
componentDidUpdate: (prevProps, prevState) => {
  // use e abuse! C&A pt 2
};
```

![](https://media.giphy.com/media/o6Tkep8B99ydG/giphy.gif)

Depois que nosso componente foi renderizado com sucesso em nossa aplicação, nosso usuário resolver iterar com algum botão.

Uma simples interação como um clique ou até mesmo um scroll do mouse, sob algum elemento, pode ocasionar em mudanças em alguns componentes.

Isto significa que estas mudanças podem disparar outras mudanças nas **props** dos seus componentes e respectivos filhos.

Exemplo prático: Temos um formulário de cadastro e um botão de enviar:

```js
class SignUpForm extends React.Component {
  state = {
    submitted: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <SubmitButton submitted={this.state.submitted} />
      </form>
    );
  }
}
```

```js
class SubmitButton extends React.Component {
  componentWillReceiveProps(nextProps, oldProps) {
    console.log("Usuário acabou de enviar o formulário!");
  }

  render() {
    return (
      <button type="submit">
        {this.props.submitted ? "Enviado! :D" : "Enviar"}
      </button>
    );
  }
}
```

O usuário resolve enviar o formulário.

Ao clicar no botão de enviar, `<SubmitButton />` irá acionar a prop `onSubmit` do `<form />`.

Isto irá fazer com que `submitted` se torne `true`.

`submitted` está sendo enviado como `prop` para o `SubmitButton`.

Quando o formulário é enviado e o valor de `submitted` é alterado no `state`, a prop também é alterada. Antes dela ser alterada, ela irá acionar:

# componentWillReceiveProps

Este é o callback utilizado para detectar possíveis mudanças nas props de um componente.

Ela recebe sempre 2 parâmetros: `nextProps` e `oldProps`.

Este callback **NÃO** é acionado na renderização inicial, somente quando após o componente já foi renderizado, alguma prop foi alterada.

No caso do nosso exemplo acima, assim que o formulário fosse enviado, o `componentWillReceiveProps` do `<SubmitButton />` iria ser acionado.

Este callback é extremamente útil, principalmente quando você trabalha muito com vários componentes filhos ou com Redux, onde todo o estado do componente é enviado via prop para ele.

Você pode (e deve) checar se alguma prop foi alterada comparando ela entre o `nextProps` e o `oldProps`.

```js
componentWillReceiveProps: (nextProps, oldProps) => {
  if (nextProps.submitted !== oldProps.submitted) {
    // nosso exemplo entraria aqui
  }
};
```

Continuando nosso exemplo, digamos que nosso usuário resolva sair da página de cadastro, e retornar a página inicial.

A partir do momento que o nosso usuário clicou em "Home" e o [React Router](https://reacttraining.com/react-router/) (ou [UI Router](https://ui-router.github.io/react/)) detectou a mudança da rota, o componente do `<SignUpForm />` vai ser **DESMONTADO**.

# componentWillUnmount

Isto significa que este callback será acionado.

Este tipo de callback é especialmente útil quando precisamos desconstruir algo que nós construimos quando o componente foi renderizado.

Exemplo prático: digamos que tenhamos criado um Timer de 1 minuto no cadastro. Na tela, vai mostrar pro usuário este timer de forma decrescente, diminuindo a cada segundo. Este timer foi criado utilizando `setInterval()`.

Funções como `setInterval()` ou `setTimeout()` ficam armazenadas na memória do navegador do usuário.

Mesmo que o componente que gerou aquele timer seja desmontado, o timer irá continuar rodando na memória do mesmo.

Graças a isso, você deverá utilizar o `componentWillUnmount` para remover este timer.

Exemplo prático:

```js
componentWillUnmount: () => {
  clearInterval(this.interval);
};
```

Isto irá fazer o nosso serviço de "garbage collector". Este é só um exemplo, existem outras situações que você vai querer fazer esta limpeza de dados.

# Conclusão

Este assunto é deveras importante para qualquer desenvolvedor que esteja se aventurando no mundo do React.

Apesar de ser importante, você quando está aprendendo React, espera instintivamente que ele tenha este tipo de recurso. É um recurso muito bacana, onde você pode alocar determinadas ações de acordo com o comportamento da sua interface.

Em outras bibliotecas, mais antigas, isso era praticamente impossível de ser feito. Esse é uma das principais razões para esta lib ter se tornado tão famosa.

Espero que tenham gostado e até a próxima!

![](https://media.giphy.com/media/l2R07TjNiUfpU5LdC/giphy.gif)
