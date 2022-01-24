---
title: "Principais Erros com Git: como resolver"
date: "2021-01-20 12:00:00"
description: "dicas e informações úteis sobre git"
tags: ["git", "devops", "gitHub"]
author: pvinig
---

<!-- @format -->

#

Quem nunca esqueceu um arquivo na hora de abrir um _pull request_?
o git é uma ferramenta de controle de versão, a principal utilidade é podermos ter bom acesso ao
histórico de alterações do projeto de software.
Embora seu uso seja simples, até os devs mais experientes as vezes se veem com alguma dúvida.
então bora esclarecer algumas coisas.

## Primeiro vamos criar um repositório para exemplo.

Vamos ao [GitHub](https://github.com/), logamos e no canto esquerdo terá a opção _new_

![](/print/login.JPG)

### Selecionando o botão _New_, vamos para a janela de criação de repositórios.

![](/print/criando-repo.JPG)

Aqui eu criei um repositório [Github-Erros-Comuns](https://github.com/pvinig/Github-Erros-Comuns), adicionei uma descrição a um arquivo _README_.
então eu pego o link para clonar o nosso repositório e vou para o prompt de comando
onde eu vou mudar a pasta na qual estou navegando para onde deixo meus projetos
com o comando `cd` que significa _change directory_ , traduzindo
mudar de pasta.

```powerShell
cd E:\underdev
```

Após, vou clonar o repositório na minha maquina local, para isto eu uso o comando

```powerShell
git clone https://github.com/pvinig/Github-Erros-Comuns.git
```

para fazer o download de outros repositórios, é só adicionar o _clone link_ ao comando `git clone`

![](/print/repo-clone.JPG)

então para fazer a primeira alteração
eu abro o meu editor de código, no meu caso [Visual Studio Code](https://code.visualstudio.com/) e crio o arquivo _index.js_ e escrevo uma simples linha de código nele.

#### obs: a seta branca indica onde voce pode criar um novo arquivo no _Visual Studio Code_

![](/print/new-arq.JPG)

Com o arquivo criado e modificado. Voltamos para o prompt de comando e alteramos o diretório de navegação para dentro do repositório com o comando ` cd \underDev\Github-Erros-Comuns` , após isso vamos pedir um _status_ de como anda o projeto.

```powerShell
git status
```

![](print/git-status.JPG)

Como podemos observar, o prompt nos responde que existe um _Untracked file_, um arquivo que para o git ainda não está no histórico de alterções do git, para adiciona-lo eu farei o comando `add` e pedirei um `status` novamente.

```powerShell
git add index.js
git status
```

agora vou salvar as alterações no NOSSO histórico de alterações do _git_ , vou fazer o commit.

```powerShell
git commit -m "adicionado o arquivi index.js ao repositório no guto"
```

É sempre muito importante escrever menssagens que resumam o que você esta trazendo de novo em cada _commit_, assim no caso de algum _bug_ por exemplo. Você pode saber oq cada _commit_ agrega para o projeto como um todo, e ficando mais facíl de localizar falhas e também fazer atualizações.

Vejam que cometi alguns erros ao fazer este commit, troquei "arquivo" por "arquiivi" assim como "GitHub" por "guto", para corregir isto, usarei o comando ` --amend` para poder reescrever a mensagem.

```powerShell
git commit --amend -m "adicionando o arquivo index.js ao repositório no Git"
```

![](/print/git-ct.JPG)

Pronto! agora nosso commit foi concluido, mas note que ainda não 'enviamos nossas alterações' para o branch main no GitHub, nós ainda não fizemos o ` push`.

<img src="https://media4.giphy.com/media/3ohuPDuPHDuGnVtp5u/giphy.gif?cid=790b76111a8cebce9e1531a68b2a40c9175befd8f2d33a39&rid=giphy.gif&ct=g" width="350">

## Mas digamos que antes de fazer o push, nós precisamos fazer mais algumas alterações no código...

Então vamos criar mais um arquivo e modificar outro. eu...

- Criei o arquivo _app.js_
- importei o arquivo _app.js_ para o arquivo _index.js_, ou seja eu também alterei o arquivo _index.js_

Agora nós vamos pedir ao git um pequeno relatório de como está o fluxo de nosso projeto, vamos fazer um [git log](https://git-scm.com/docs/git-log) e um [git status](https://git-scm.com/docs/git-status).

##### É sempre bom saber por onde andas e aonde queres chegar; alguem...

```git
git log
git status
```

![](/print/log-status-1.JPG)

### O que o _git_ está nos dizendo aqui?

- Em determinado ponto da mensagem que o _git_ nos responde (Leia!), esta escrito _"Your branch is ahead of 'origin/main' by 1 commit."_ . Ou seja, que as alterações que fiz no meu commit, ainda não estão na _branch_ main do projeto
- Observamos também que temos altercações _not staged for commit_ e também _untraked files_ e que não ha nada para _commitar_ ainda.

Então agora eu vou adicionar estas alterações ao meu _commit_, para então, por estas alterações na branch 'main' do projeto, fazer o ` push`.
para isto eu primeiro...

### Adiciono as novas alterações ao _commit_ (sim, todas de uma vez):

```git
git add -A
```

##### OBS: o comando `-A` significa "all", ou seja todos os novos arquivo e novas alterações vão estar prontas para serem commitados.

Agora vamos adicionar estas novas alterações a aquele _commit_ que nós já haviamos feito:
Para isto vamos novamente usar o comando `--amend`.

```git
git commit --amend -m "adicionando os arquivos index.js e app.js ao git"
```

com isto todas as alterações que fizemos até agora estão todas no mesmo commit
![](/print/commit2.JPG)

## Continuando nossa aventura no git senhoras e senhores: [git restore](https://git-scm.com/docs/git-restore)

Contruindo nosso projeto, nos vamos criar o arquivo _lib.js_ que representa uma biblioteca nova ultilizada no projeto.
![](/print/libJs.JPG)

Eu logo já adiciono o novo arquivo la no _git_ e também peço um `status`.

```git
git add lib.js
git status
```

![](/print/addLib.JPG)

##### eu uso _prettier_ no meu VsCode então modificou o arquivo _app.js_ tb mas foi só identação hehe

## E se eu precisar retirar este arquivo do stage? quero excluir o arquivo, como faço?

digamos que um colega tenha nos mostrado uma forma mais simples de resolver o problema que biblioteca _lib.js_ resolve. E agora eu tenho preciso excluir este arquivo.

Nós vamos fazer o comando do _git_, [restore](https://git-scm.com/docs/git-restore).

```git
git restore --staged lib.js
```

E então excluimos o arquivo com o comando `rm`

```git
rm lib.js
git status
```

![](/print/rmLib.JPG)

Antes de fazermos nosso primeiro `push`, nós vamos fazer uma pequena atualização em nossos arquivos...
![](/print/att1.JPG)

No arquivo _index.js_ agora temos uma nova funcao `hello`

```JavaScript
funcition hello () {
    console.log('hello');
}
```

Enquanto que no arquivo _app.js_ eu adiciono algum conteúdo a varíavel `app`

```JavaScript
const app = 'blablabla';
```

Então agora vou _commitar_ as novas alterações, para fazermos então o `push`

```git
git add -A
git commit -m "Atualização os arquivos index.js e app.js"
git status
```

![](/print/commit21.JPG)

Mas antes de fazer o `push`, precavidos, como sempre devemos ser. Fazermos um `diff` para ter certeza que esta tudo bem

```git
git diff origin/HEAD
```

![](/print/gitDiff.JPG)

Ao analizar com mais carinho este `diff`, percebo que não faz sentido a ultima atualização que fiz no arquivo _app.js_, então eu preciso apagar esta parte, retirar do _commit_ o arquivo _app.js_.

Primeiro nós vamos fazer um `log` e vamos nos achar:

```git
git log --oneline
```

![](/print/log1.JPG)

Vemos que existem 2 _commits_ e somente no segundo que está o pedaço de código que desejamos retirar. Vamos usar o comando [git reset](https://git-scm.com/docs/git-reset)

```git
git reset HEAD~1
```

Ou também podemos usar

```git
git reset f50f530
```

###### este número é o rash do commit para qual eu quero voltar

os dois comandos realizam a mesma tarefa.
![](/print/reset1.JPG)

agora o último _commit_ foi desfeito e eu posso subir apenas as alterações que estão em funcionamento. Por isto sempre temos que ser atentos, para não subir para a `branch` principal arquivos com problemas que, evitando que o resto da equipe faça o download de uma versão errado do projeto...

então agora vou _commitar_ apenas o arquivo que esta 100%

```git
git add index.js
git commit -m "atualização do arquivo index.js"
git status
```

![](/print/commit22.JPG)

##### todo mundo as vezes escreve uns comandinhos errado 🤪

Vejam que desta vez o arquivo _app.js_ ficou de fora do _commit_

E agora com os arquivos certos _commitados_, vamos fazer o `push`...

```git
git push
```

![](/print/push11.JPG)

Com isto agora, todos que acessarem o nosso repositorio, terão o acesso a ultima atualização (e algumas mais antigas também) do nosso projeto...😬

## E isto é tudo pessoal...

![](https://media1.giphy.com/media/9D7Jr7o9TjKta/giphy.gif?cid=ecf05e47r67jexfqgqr0tnuf1ucw8i6jkpoxl0psmlck2c4c&rid=giphy.gif&ct=g)

Este é meu primeiro artigo e espero ter ajudado a qualquer um que esteja lendo!

Eu sou Paulo vinicius Pretto, programador back-end
