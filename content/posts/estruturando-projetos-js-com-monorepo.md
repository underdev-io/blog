---
title: "Estruturando projetos JavaScript com Monorepo"
date: "2020-01-04T22:12:03.284Z"
description: "A arquitetura monorepo está sendo cada vez mais comum nos softwares modernos, especialmente em linguagens como JavaScript"
cover: "https://images.unsplash.com/photo-1577255714682-69db9b067fda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
---

A arquitetura **monorepo** está sendo cada vez mais comum nos softwares modernos, especialmente em linguagens como JavaScript.

São diversos projetos _open-source_ que usufruem desta arquitetura. Podemos listar alguns de exemplo: [Angular](https://github.com/angular/angular/tree/master/packages), [Babel](https://github.com/babel/babel/tree/master/packages), [Cucumber](https://github.com/cucumber/cucumber), [create-react-app](https://github.com/facebook/create-react-app/tree/master/packages), [LoopBack](https://github.com/strongloop/loopback-next/tree/master/packages), [Material UI](https://github.com/mui-org/material-ui/tree/master/packages) e [NestJS](https://github.com/nestjs/nest/tree/master/packages) são apenas alguns exemplos de bibliotecas famosas que usam este padrão em seus repositórios.

Além de projetos _open-sources_, esta arquitetura é muito comum em empresas como Facebook, Google, Uber, Microsoft, Airbnb, entre outros.

O motivo está nos benefícios que este tipo de organização pode trazer para o projeto.

## Vantagens

As principais vantagens são:

- **Facilidade em reutilizar código**: Funcionalidades comuns dentro do projeto podem ser abstraídas para um nível acima e serem facilmente importadas por todo o projeto;
- **Gerenciamento de depêndencias simplificado**: As versões recentes do Yarn (1.0+) trouxeram uma feature chamada [Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/), que permite gerenciar as dependências de todo o projeto de modo simplificado. Se uma dependência de mesma versão é utilizada em múltiplos pacotes, ela é instalada somente uma vez na raíz do repositório. Além disso, basta um simples comando para instalar as dependências de todos os pacotes do projeto.
- **Commits atômicos**: Em projetos polyrepo (você provavelmente já trabalhou em um projeto assim), é necessário manter uma sincronia manual entre as versões que estão sendo usadas entre si. Ter a garantia de que um commit haverá uma sincronia entre as versões das dependências locais evita este tipo de problema. Você terá certeza que aquele commit irá rodar sempre, pois todas as mudanças que são necessárias para que ele rode estão na mesma árvore de arquivos.

## Desvantagens

Nem tudo são flores e junto das vantagens listadas acima, nós trazemos também algumas perdas:

- **Exige mais espaço físico**: Mesmo que você queira alterar apenas um pacote do seu repositório, você terá de clonar todo o projeto para fazer uma mudança. Além disso, em cenários de Integração de Código (CI), todo o projeto precisará ser baixado para rodar seus respectivos processos;
- **Exige mais processamento**: Se você utiliza um editor de códigos moderno como o VS Code (provavelmente é o seu caso), você irá notar que, em bases de código maiores, o editor irá consumir mais processamento para iterar entre todos os pacotes. Em máquinas high-end isso quase não é sentido, mas se você está trabalhando em um computador mais antigo e seu projeto é bem grande, você irá sentir um pouco;
- **Permissão de repositórios enfraquecida**: Se todos os pacotes do projeto estão no mesmo repositório, você precisará autorizar todo o repositório para seus colaboradores. Em algumas situações, isso pode ser um problema, já que nem sempre queremos que um colaborador tenha acesso a todos os pacotes do projeto.

## Como aplicar

Crie uma pasta para o nosso projeto:

```
- /my-awesome-app
```

Inicialize o projeto com o Yarn:

```bash
yarn init
```

Com o nosso `package.json` gerado, vamos transformá-lo em um **Workspace**. Vamos adicionar 2 propriedades:

```json
  "private": true,
  "workspaces": [
    "packages/*"
  ]
```

Observe que a propriedade de `workspaces` permite [glob patterns](<https://en.wikipedia.org/wiki/Glob_(programming)>). Você pode indicar um caminho físico ou usar wildcards de expressões regulares (como no exemplo acima).

**Pronto!** Podemos dizer que nosso projeto já permite múltiplos pacotes. Basta você criá-los dentro da pasta `my-awesome-app/packages`.

Cada pacote terá seu respectivo `package.json`.

As dependências em comum em múltiplos pacotes serão armazenadas em `my-awesome-app/node_modules`.

As dependências individuais de cada pacote serão armazenadas em `my-awesome-app/packages/<nome_do_pacote>/node_modules`.

## Adicionando nosso primeiro pacote

Nosso primeiro pacote será uma API REST feita com ExpressJS:

```
- /my-awesome-app
- - /packages
- - - /api
```

Dentro da pasta de `my-awesome-app/packages/api`, nós iremos inicializar o pacote, adicionando o Express como dependência e um endpoint de Hello World:

```js
// my-awesome-app/packages/api/index.js
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
```

```json
// my-awesome-app/packages/api/package.json
{
  "name": "@my-awesome-app/api",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.1"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

Observe que usamos um prefixo `@my-awesome-app` no `name` do nosso pacote. Este prefixo é o `scope` do nosso pacote. Adicionar scopes nos pacotes do monorepo é opcional. Entretanto, é considerado uma boa prática. Um dos motivos é que ele deixa todos os pacotes centralizados dentro da pasta do `scope` no `node_modules`, facilitando eventuais debugs.

**Observação:** No processo de instalação de dependências do seu projeto (usando **yarn install**), o Yarn irá identificar os pacotes que fazem parte do projeto (de acordo com a propriedade `worspaces`, lá do nosso `package.json` pai). Esta identificação irá fazer com que sua instalaçõ seja um simples `symlink` da pasta do pacote no projeto.

O fato de ser um `symlink` permite que editores de códigos modernos como o VS Code identifiquem qualquer eventual modificação no código dos pacotes.

## Adicionando nosso segundo pacote

Nosso segundo pacote será um simples centralizador de funções comuns a respeito do nosso projeto. Ele será utilizado por vários pacotes (no nosso exemplo, a API e o front-end que virá na sequência). Vamos repetir o processo acima, criando uma pasta para nosso pacote chamado `my-awesome-app/packages/common` e inicializar com 2 arquivos (**index.js** e **package.json**):

```js
// my-awesome-app/packages/common/index.js
const project = {
  name: "My Awesome APP",
  website: "http://01dev.codes/",
  authors: ["Luiz Almeida"],
};

const getAuthors = () => project.authors.join(", ");

module.exports = { project, getAuthors };
```

```json
// my-awesome-app/packages/common/package.json
{
  "name": "@my-awesome-app/common",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

## Listando como dependência na API

Vamos atualizar o `package.json`, listando `@my-awesome-app/common` como uma dependência:

```json
{
  // ...
  "dependencies": {
    "express": "^4.17.1",
    "@my-awesome-app/common": "1.0.0"
  }
}
```

Rodemos um `yarn install` para que o symlink seja gerado.

## Usando nossa dependência

Vamos editar o `my-awesome-app/packages/api/index.js` para usar nosso `common`:

```js
const { project, getAuthors } = require("@monorepo-sample/common"); // Importamos nosso pacote

app.get(
  "/",
  (req, res) => res.send(`Hello ${project.name} from ${getAuthors()}!`) // Usamos ele
);
```

**Pronto!** Agora você já conhece um novo método para abstrair funções em comum de um projeto.

![](https://media.giphy.com/media/ZF9HkMVwg7sPjXRkl2/giphy.gif)

## Adicionando nosso terceiro (e último) pacote

Vamos adicionar um front-end para mostrar o que talvez seja o recurso mais poderoso deste formato de arquitetura: rodar múltiplos pacotes com apenas um simples comando.

Vá até a pasta de `packages` e inicialize um projeto com o `create-react-app`:

```bash
cd packages/
npm i -g create-react-app
create-react-app frontend
```

Atualize o seu `name`, incluindo o nosso `scope` e liste o `common` como dependência:

```json
// package.json
{
  "name": "@my-awesome-app/frontend",
  // ....
  "dependencies": {
    // ...,
    "@my-awesome-app/common": "1.0.0"
  }
}
```

**Dica:** Você pode usar a mesma versão sempre ou usar o wildcard `*` para indicar a versão a ser usada do pacote.

## Usando o common no nosso front-end

Vamos editar o `App.js` do create-react-app, usando os objetos exportados do pacote de `common`:

```js
import { project, getAuthors } from "@monorepo-sample/common";

// ...
return (
  <p>
    {project.name} from {getAuthors()}
  </p>
);
```

**Ta-da!** Eis o nosso resultado final:

![Resultado final](./frontend.png)

Código disponível em: https://github.com/lhas2/monorepo-sample

## Sugestões de Leitura

Nós aprendemos como estruturar o projeto usando apenas o Workspaces, que é uma API mais "baixo nível" para organizar monorepos.

Eventualmente, você pode precisar de soluções extras como o [Lerna](https://github.com/lerna/lerna) para organizar ainda mais o seu projeto.

## Conclusão

A arquitetura monorepo veio definitivamente pra ficar. Em projetos descentralizados que compartilham excessivamente de funções em comum, este modelo de repositório se encaixa perfeitamente.

Não é à toa que esta é a abordagem preferida por grandes empresas. :)

Até a próxima!

![](https://media.giphy.com/media/IdZpAop5IISbK2iePU/giphy.gif)
