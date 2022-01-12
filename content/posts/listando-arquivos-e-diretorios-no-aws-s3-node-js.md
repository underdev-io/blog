---
title: "Listando arquivos e diretórios no AWS S3 com Node.JS"
date: "2020-02-03T22:12:03.284Z"
description: "Se faz cada vez mais necessário o armazenamento de arquivos estáticos nos softwares hoje em dia. É muito comum precisar anexar imagens, documentos, vídeos, entre outros, enviados pelo usuário"
cover: "https://images.unsplash.com/photo-1580458245670-6161acf2ee2b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=920&q=80"
---

Se faz cada vez mais necessário o armazenamento de arquivos estáticos nos softwares hoje em dia. É muito comum precisar anexar imagens, documentos, vídeos, entre outros, enviados pelo usuário.

Um ambiente muito comum usado para armazenar estes arquivos é o serviço chamado [Amazon Simple Storage Service](https://aws.amazon.com/pt/s3/), popularmente conhecido como **S3**.

Hoje, vamos aprender como listar todos os diretórios e arquivos presentes em um bucket do S3, usando [Node.JS](https://nodejs.org/en/) para tal finalidade.

Essa feature é facilmente reaproveitada em uma aplicação Node tradicional, como uma API usando [Express.JS](https://expressjs.com/) ou qualquer outra biblioteca.

## 1º Passo: Pegando as credenciais da AWS

Para esta integração, será necessário uma **Access Key ID** e uma **Secret Access Key**.

Você pode descobrir como gerar estas chaves [neste documento](https://aws.amazon.com/pt/blogs/security/how-to-find-update-access-keys-password-mfa-aws-management-console/) da própria Amazon.

## 2º Passo: Estruturando a aplicação

Crie uma pasta para nossa aplicação:

```bash
mkdir aws-s3-node/
cd aws-s3-node/
```

Adicione um arquivo `.env` para declarar nossas credenciais:

```
AWS_ACCESS_KEY_ID="AKIASHBKO2HEEFSWAG2Z"
AWS_SECRET_ACCESS_KEY="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"
```

Vamos instalar as dependências necessárias para o nosso projeto:

```
yarn init
yarn add aws-sdk dotenv
```

Inicialize o nosso script em `src/index.js`.

## 3º Passo: Configurando a aplicação

Você precisará importar a biblioteca de client da AWS para poder se conectar ao S3. Além disso, graças a lib `dotenv`, nós precisamos rodá-la, para que os dados do arquivo `.env` sejam transferidos para `process.env` no código:

```js
const S3Client = require("aws-sdk/clients/s3");

require("dotenv").config();

// A client do S3 é instanciado
const S3 = new S3Client();

// Isolamos o nome do bucket para reutilizá-lo no decorrer do código
const bucketName = "nome-do-bucket-a-ser-usado";
```

## 4º Passo: Listando diretórios

Crie uma função para listar nossos diretórios:

```js
const getAllDirectories = (path = "") => {};
```

Dentro dela, vamos armazenar os parâmetros necessários para a nossa conexão:

```js
const params = {
  Bucket: bucketName,
  MaxKeys: 20,
  Delimiter: "/",
  Prefix: path,
};
```

**Lembrando que**:

- O parâmetro `MaxKeys` define o limite de diretórios que serão retornados. O máximo é de 1,000;
- O parâmetro `Delimiter` indica que queremos iniciar a nossa chamada a partir da raíz do bucket;
- O parâmetro `Prefix` indica qual o caminho final que desejamos chegar, neste caso é a variável `path` da nossa função;

**Obs**: É necessário que as credenciais a serem usadas tenham a permissão de `s3:ListBucket` para que esta chamada funcione.

Agora, vamos retornar uma [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), que é rejeitada em caso de erro, e retorna os dados da requisição se bem sucedida:

```js
return new Promise((resolve, reject) => {
  S3.listObjectsV2(params, (err, data) => {
    if (err) {
      reject(err);
    }

    resolve(data);
  });
});
```

### Rodando a listagem de diretórios

```js
const cb = async () => {
  const directories = await getAllDirectories("uploads/");

  console.log("directories", directories);
};

cb();
```

Rodando o código acima, em um bucket válido com a pasta `uploads` disponível, irá retornar algo semelhante a isto:

```bash
node src/index.js
```

```js
{
  IsTruncated: false,
  Contents: [
    {
      Key: 'uploads/',
      LastModified: 2020-01-21T21:06:06.000Z,
      ETag: '"d41d8cd98f00b204e9800998ecf8427e"',
      Size: 0,
      StorageClass: 'STANDARD'
    }
  ],
  Name: 'nome-do-bucket-a-ser-usado',
  Prefix: 'uploads/',
  Delimiter: '/',
  MaxKeys: 20,
  CommonPrefixes: [ { Prefix: 'uploads/20200122/' } ],
  KeyCount: 2
}
```

Observe que `CommonPrefixes` retorna todos os diretórios disponíveis na nossa pasta de `uploads/`:

![](./Screenshot_20200203_173836.png)

Então você pode simplificar a linha abaixo:

```js
// De
resolve(data);

// Para
resolve(data.CommonPrefixes);
```

## 5º Passo: Listando arquivos

O próximo passo é listar todos os arquivos disponíveis dentro de um diretório.

O processo é bem semelhante ao de listar diretórios. Usaremos apenas um atributo diferente para tal.

Crie uma função para listar nossos arquivos:

```js
const getAllFiles = (path = "") => {};
```

Dentro dela, vamos armazenar os parâmetros necessários para a nossa conexão:

```js
const params = {
  Bucket: bucketName,
  MaxKeys: 20,
  Delimiter: "/",
  Prefix: path,
};
```

E por último, mas não menos importante, vamos retornar nossa Promise com os dados:

```js
return new Promise((resolve, reject) => {
  S3.listObjectsV2(params, (err, data) => {
    if (err) {
      reject(err);
    }

    resolve(data.Contents);
  });
});
```

### Rodando a listagem de arquivos

```js
const cb = async () => {
  const directories = await getAllDirectories("uploads/");
  const files = await getAllFiles(
    "uploads/20200122/06/tacto09/camera02/output/"
  );

  console.log("directories", directories);
  console.log("files", files);
};

cb();
```

Rodando o código acima, veremos que `files` retorna exatamente todos os arquivos disponíveis no caminho selecionado:

```bash
node src/index.js
```

```js
[
  {
    Key: 'uploads/20200122/06/tacto09/camera02/output/',
    LastModified: 2020-01-24T11:22:23.000Z,
    ETag: '"d41d8cd98f00b204e9800998ecf8427e"',
    Size: 0,
    StorageClass: 'STANDARD'
  },
  {
    Key: 'uploads/20200122/06/tacto09/camera02/output/t009_c02_20200122_06_area.csv',
    LastModified: 2020-01-24T11:22:37.000Z,
    ETag: '"07645034deb67a1ee78de46467381b3b"',
    Size: 214573,
    StorageClass: 'STANDARD'
  },
  {
    Key: 'uploads/20200122/06/tacto09/camera02/output/t009_c02_20200122_06_area.mp4',
    LastModified: 2020-01-24T11:22:36.000Z,
    ETag: '"870eb604cfbd3eb548d0a804f4bff185-10"',
    Size: 154763682,
    StorageClass: 'STANDARD'
  }
]
```

![](./Screenshot_20200203_174416.png)

**Obs**: Basta um `.filter(item => item.Size > 0)` para desconsiderar sub-objetos que são, na verdade, diretórios.

## 6º Passo: Retornando caminhos absolutos para os arquivos

Você notará que a propriedade `Key` retorna tão somente o caminho relativo do objeto no bucket.

Para retornar um caminho completo, podemos declarar uma função auxiliar:

```js
const getFilePath = (path) =>
  `https://s3-sa-east-1.amazonaws.com/${bucketName}/${path}`;
```

Podendo ser usada assim:

```js
const paths = files.map((file) => getFilePath(file.Key));
```

O retorno será semelhante a:

```js
[
  "https://s3-sa-east-1.amazonaws.com/nome-do-bucket-a-ser-usado/uploads/20200122/06/tacto09/camera02/output/",
  "https://s3-sa-east-1.amazonaws.com/nome-do-bucket-a-ser-usado/uploads/20200122/06/tacto09/camera02/output/t009_c02_20200122_06_area.csv",
  "https://s3-sa-east-1.amazonaws.com/nome-do-bucket-a-ser-usado/uploads/20200122/06/tacto09/camera02/output/t009_c02_20200122_06_area.mp4",
];
```

## Conclusão

Este artigo mostra, de maneira simplificada, como usar a SDK oficial do AWS S3, para listar arquivos e diretórios usando Node.JS.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/k4ta29T68xlfi/giphy.gif)
