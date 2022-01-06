---
title: 'Adicionando, Lendo e Observando dados no Firebase com React'
description: "Aprenda como trabalhar com o Realtime Database do Firebase. O Firebase é uma solução do Google para startups, que desejam entregar recursos em tempo real em tempo recorde."
tags:

- CRUD
- firebase
- react
  cover: cover.png
  author: lhas
  date: 2018-03-18 18:26:12

---

Aprenda como trabalhar com o Realtime Database do Firebase. O Firebase é uma solução do Google para startups, que desejam entregar recursos em tempo real em tempo recorde.

Olá a todos!

Hoje iremos aprender como trabalhar com o Firebase junto do React.

# O que é o Firebase?

O Firebase é uma plataforma de desenvolvimento que atualmente é mantida pelo Google. As principais funcionalidades dele são o _Realtime Database_ e o _Authentication_.

Além destas 2 funcionalidades, o Firebase disponibiliza de outros serviços como Cloud Messaging (para disparar notificações em iOS, Android e Web), Storage (para armazenar arquivos estáticos, uploads, etc), Hosting (semelhante ao AWS S3), entre outros.

# Qual a vantagem em utilizá-lo?

Essa é uma pergunta que muitos desenvolvedores fazem. Qual é o benefício de utilizar o Firebase no seu projeto, ao invés de configurar cada serviço manualmente (um banco de dados, um serviço de hospedagem, etc).

O maior benefício é você poder criar aplicativos/sites com recursos avançados como banco de dados em tempo real, e autenticação com redes sociais, em tempo recorde. Ao invés de você gastar tempo configurando serviços, servidores, entre outros, você foca no desenvolvimento do seu app, e deixa toda a escalabilidade dos serviços na mão do Google.

# Qual a desvantagem em utilizá-lo?

A desvantagem é justamente a mesma coisa que a vantagem. O fato de você "terceirizar" a responsabilidade de infraestrutura para uma empresa terceira, faz com que você se torne "refém" dela. Então, se os serviços do Firebase estiverem fora do ar, consequentemente, o seu aplicativo que depende dele ficará offline.

Existem diversos mecanismos para prevenir que o seu aplicativo mantenha-se funcional mesmo com os serviços offline, mas de longe essa é a maior desvantagem de trabalhar com este tipo de serviço. Você ganha em conforto, agilidade e facilidade, mas perde em termos de cuidados "behind the scenes".

# Iniciando o projeto

Vamos iniciar o projeto utilizando o _create-react-app_. Para isto, basta rodar no seu terminal:

```bash
create-react-app firebase-crud
cd firebase-crud/
yarn start
```

# Pegando credenciais do Firebase

Agora, precisamos cadastrar um novo aplicativo no Firebase, e recuperar as credenciais Web para podermos utilizar no nosso _firebase-crud_.

Para isto, basta acessar o [Console do Firebase](https://console.firebase.google.com/u/0/) e clicar em _Adicionar projeto_.

![upload successful](/images/pasted-0.png)

Após criar o projeto, você deverá clicar em _Adicionar o Firebase ao seu aplicativo da Web_ e anotar as credenciais que ele irá te mostrar.

```js
// Minhas credenciais de exemplo
var config = {
  apiKey: "AIzaSyAhY8YyIb5Xfr2Kh2tgTHTEzDW5NOkp6j0",
  authDomain: "fir-crud-2474f.firebaseapp.com",
  databaseURL: "https://fir-crud-2474f.firebaseio.com",
  projectId: "fir-crud-2474f",
  storageBucket: "",
  messagingSenderId: "326727019283",
};
```

# Instanciando o Firebase

Primeiro, vamos precisar adicioná-lo como dependência do nosso projeto.

```bash
yarn add firebase
```

Agora, iremos criar um arquivo chamado `firebase.js`, e iremos instanciá-lo neste arquivo.

```js
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAhY8YyIb5Xfr2Kh2tgTHTEzDW5NOkp6j0",
  authDomain: "fir-crud-2474f.firebaseapp.com",
  databaseURL: "https://fir-crud-2474f.firebaseio.com",
  projectId: "fir-crud-2474f",
  storageBucket: "",
  messagingSenderId: "326727019283",
};

firebase.initializeApp(config);

export default firebase;
```

# Alterando Regras do Database

O banco de dados do Firebase tem 1 estrutura em JSON para definir as regras de segurança do banco.

Através deste JSON, você pode indicar quais são as regras de leitura/escrita para todos os documentos, ou para alguns em específico.

Para alterarmos estas regras, você deverá acessar o console do Database:

![upload successful](/images/pasted-1.png)

Agora, você irá acessar a aba de _Regras_:

![upload successful](/images/pasted-2.png)

Vamos alterar esta regra padrão, para permitir que todos usuários (autenticados ou não) possam ler/escrever dados.

```js
// De
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}

// Para
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```

Após esta mudança, você deverá publicá-la.

# Conceito de demonstração

Para este artigo, vamos utilizar o conceito de _Guestbook_.

Vamos fazer uma página em que os visitantes possam deixar um recado na página. Ou editar/excluir os existentes.

Este recado contará com os atributos de _Nome_, _Comentário_ e _Data de Publicação_.

# Formulário para novos recados

Vamos adicionar um formulário para que os visitantes possam adicionar os recados:

```js
// CommentForm.js
import React from "react";
import PropTypes from "prop-types";

const CommentForm = ({
  name,
  comment,
  onChangeName,
  onChangeComment,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <div>
      <label>Nome</label>
      <br />
      <input type="text" required value={name} onChange={onChangeName} />
    </div>
    <div>
      <label>Comentário</label>
      <br />
      <textarea value={comment} required onChange={onChangeComment} />
    </div>
    <div>
      <button>Salvar</button>
    </div>
  </form>
);

CommentForm.propTypes = {
  name: PropTypes.string,
  comment: PropTypes.string,
  onChangeName: PropTypes.func,
  onChangeComment: PropTypes.func,
  onSubmit: PropTypes.func,
};

CommentForm.defaultProps = {
  name: "",
  comment: "",
  onChangeName: () => {},
  onChangeComment: () => {},
  onSubmit: () => {},
};

export default CommentForm;
```

Agora que temos nosso componente de formulário, vamos aplicá-lo no nosso app. Para isto, basta editar o `App.js`.

Primeiro, vamos importar o formulário:

```js
import CommentForm from "./CommentForm";
```

Precisamos declarar um _state_ para armazenar os dados do formulário:

```js
class App extends Component {
  state = {
    form: {
      name: "",
      comment: "",
    },
  };
  // ...
}
```

Agora nós iremos renderizar o formulário:

```js
  render() {
    const { name, comment } = this.state.form;
    return (
      <div className="App">
        <CommentForm
          name={name}
          comment={comment}
          onChangeName={this.onChangeName}
          onChangeComment={this.onChangeComment}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
```

Após renderizar o formulário, precisamos adicionar os 3 callbacks necessários para nosso componente funcionar: `onChangeName`, `onChangeComment` e `onSubmit`. Primeiramente, iremos inserir os 2 primeiros callbacks:

```js
onChangeName = (event) => {
  const { value } = event.target;
  this.setState({
    form: {
      ...this.state.form,
      name: value,
    },
  });
};

onChangeComment = (event) => {
  const { value } = event.target;
  this.setState({
    form: {
      ...this.state.form,
      comment: value,
    },
  });
};
```

A esta altura, nosso formulário já está quase pronto!

![](Peek 2018-03-18 17-39.gif)

# Salvando dados no Firebase

Agora que nosso formulário já está funcionando, vamos salvar os dados que os usuários preencherem neste formulário!

Para isto, vamos importar o nosso Firebase instanciado:

```js
import firebase from "./firebase";
```

Com o Firebase importado, podemos finalmente desenvolver nosso último callback _onSubmit_:

```js
onSubmit = async (event) => {
  event.preventDefault(); // previne que o browser atualize a página
  // armazenamos um objeto com os dados do state + a data atual
  const comment = {
    ...this.state.form,
    createdAt: new Date().getTime(),
  };
  // mandamos o firebase armazenar no ref "comments", nosso comentário atual
  await firebase.database().ref("comments").push(comment);
  // após o comentário ser adicionado, vamos limpar o formulário
  this.setState({
    form: {
      name: "",
      comment: "",
    },
  });
};
```

Com este callback incluído, caso você tente enviar o formulário agora, você terá o seguinte resultado:

![](Peek 2018-03-18 17-53.gif)

Muito legal, né?

Temos um banco de dados em tempo real sem precisarmos configurar Socket.IO, subir banco de dados, subir backend, etc, etc.

Através do front-end, conseguimos manipular o banco de dados, sem precisar de 1 intermediário. Trazendo produtividade para seu desenvolvimento! :)

# Listando dados do Firebase

Agora que já sabemos como adicionar novos dados, vamos aprender como listá-los.

Para isto, vamos gerar um componente para listagem de comentários:

```js
import React from "react";
import PropTypes from "prop-types";

const CommentList = ({ comments }) => (
  <div style={{ marginTop: 20 }}>
    {comments.map((comment) => (
      <div key={comment.uid}>
        <strong>Nome: {comment.name}</strong>
        <p>Comentário: {comment.comment}</p>
        <em>Postado em {comment.createdAt}</em>
        <hr />
      </div>
    ))}
    {comments.length === 0 && <p>Nenhum comentário encontrado!</p>}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.array,
};

CommentList.defaultProps = {
  comments: [],
};

export default CommentList;
```

Precisamos importá-lo no nosso `App.js`:

```js
import CommentList from "./CommentList";
```

E atualizar o state para armazenar a listagem de comentários:

```js
state = {
  form: {
    name: "",
    comment: "",
  },
  comments: [], // nova linha
};
```

Vamos atualizar a camada de visualização, para renderizar o componente de listagem de comentários:

```js
  render() {
    const { comments, form } = this.state;
    const { name, comment } = form;
    return (
      <div className="App">
        <CommentForm
          name={name}
          comment={comment}
          onChangeName={this.onChangeName}
          onChangeComment={this.onChangeComment}
          onSubmit={this.onSubmit}
        />
        <CommentList comments={comments} />
      </div>
    );
  }
```

E agora, iremos ler os dados em tempo real do nosso documento de `comments`.

Para isto, iremos utilizar o callback `componentDidMount`. Caso queira aprender mais sobe o ciclo de vida de um componente React, [veja nosso artigo sobre o assunto](http://0e1dev.com/post/ciclo-de-vida-de-um-componente-em-react/).

```js
  componentDidMount() {
    firebase
      .database()
      .ref("comments")
      .on("value", snapshot => {
        const response = snapshot.val();
        const comments = !!response
          ? Object.keys(response).map(uid => ({
              ...response[uid],
              uid
            }))
          : [];
        this.setState({
          comments
        });
      });
  }
```

No código acima, primeiramente nós "plugamos" a nossa conexão com o _ref_ (de referência) de _comments_.

O callback `.on('value')` irá ser acionado toda vez que a referência for atualizada. Seja esta atualização, uma exclusão, alteração, ou inserção de um novo registro. Toda vez, que algo ocorrer, o callback será acionado.

Quando o callback é acionado, ele passa como parâmetro um snapshot (uma cópia idêntica ao estado atual da referência no banco).

Com o snapshot, nós formatamos os dados para ele tornar-se um array, e aplicamos o mesmo no estado local do app.

Esta aplicação ao estado local, fará com que a listagem de comentários fique sincronizada em tempo real com os comentários do banco de dados. Legal, né? Dá uma olhada no exemplo abaixo:

![](Peek 2018-03-18 18-24.gif)

# Excluindo dados

Para permitirmos que nosso usuário exclua um comentário, vamos precisar inserir um botão de exclusão.

Você poderá adicioná-lo no `<CommentList />`:

```js
<button onClick={() => onRemove(comment.uid)}>Excluir</button>
```

Agora, devemos inserir um callback para `onRemove`. Ele será assim:

```js
onRemove = (uid) => {
  const commentRef = firebase.database().ref(`comments/${uid}`);
  commentRef.remove();
};
```

Uma alternativa, caso você não queira aplicar esta interpolação de string:

```js
onRemove = (uid) => {
  const commentRef = firebase.database().ref("comments").child(uid);
  commentRef.remove();
};
```

Vamos declarar o callback como prop do nosso componente:

```js
<CommentList comments={comments} onRemove={this.onRemove} />
```

Pronto! Nosso botão de exclusão deverá estar funcionando como o esperado:

![](Peek 2018-03-18 19-02.gif)

# Editando dados

Por último, mas não menos importante, vamos editar nossos dados!

Para isto, primeiro vamos adicionar um botão de Editar:

```js
<button onClick={() => onEdit(comment.uid)}>Editar</button>
```

Agora, devemos inserir um callback para `onEdit`. Ele será assim:

```js
onEdit = (uid) => {
  const commentRef = firebase.database().ref(`comments/${uid}`);
  commentRef.update({
    name: "Nome editado",
    comment: "Comentário editado",
  });
};
```

Vamos declarar o callback como prop do nosso componente:

```js
<CommentList
  comments={comments}
  onRemove={this.onRemove}
  onEdit={this.onEdit}
/>
```

Pronto! Nosso botão de edição deverá estar funcionando como o esperado.

Lembrando que estamos editando os atributos manualmente, pela simplicidade do artigo. Em um contexto real, você renderizaria um formulário para o usuário poder editar os dados dinamicamente.

Veja ele funcionando:

![](Peek 2018-03-18 19-07.gif)

# Conclusão

Este artigo foi simples, mas espero agregar um grande valor ao seu conhecimento.

Facilitadores como Firebase vieram pra ficar, e auxiliar times ágeis a desenvolverem soluções cada vez mais sólidas e rápidas, com alto poder de escalabilidade.

Espero que tenham gostado! Dúvidas, deixem nos comentários.

Você pode encontrar o exemplo desta publicação aqui: https://lhas.github.io/firebase-crud-0e1dev/

E poderá consultar o código-fonte final aqui: https://github.com/lhas/firebase-crud-0e1dev

Abraços!
