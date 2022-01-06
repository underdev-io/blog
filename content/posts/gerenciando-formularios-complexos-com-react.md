---
title: "Gerenciando formulários complexos com React"
date: "2020-02-05T22:12:03.284Z"
description: "Quem nunca teve que mexer em um formulário complexo que atire a primeira pedra"
cover: "https://images.unsplash.com/photo-1580808603682-8432a1eee613?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
---

Quem nunca teve que mexer em um formulário complexo que atire a primeira pedra.

As dores, para este tipo de desenvolvimento, são generalizadas.

Mas, graças a evolução do React e seus Hooks, hoje em dia, temos bibliotecas excelentes como [react-hook-form](https://react-hook-form.com/).

Hoje, vamos aprender como gerenciar o estado de um formulário complexo (incluindo validação) usando esta gloriosa biblioteca.

## Instalando dependência

```bash
yarn add react-hook-form
```

## Criando campos simples

Vamos adicionar campos simples para o nosso formulário:

```js
<form>
  <input name="firstName" placeholder="First Name" />
  <input name="lastName" placeholder="Last Name" />
  <input name="email" type="email" placeholder="E-mail" />
  <button type="submit">Save User</button>
</form>
```

Observe que sempre declaramos uma prop de `name` para nossos inputs.

Esta propriedade `name` será usada como chave primária por nosso hook.

## Instanciando o react-hook-form

Vamos importar a biblioteca:

```js
import { useForm } from "react-hook-form";
```

E inicializá-la dentro de nosso componente:

```js
const { register, handleSubmit, errors } = useForm();
```

Com a biblioteca instanciada, podemos alterar o callback de `onSubmit` do nosso formulário.

Este callback só será acionado caso a validação seja bem-sucedida:

```js
<form onSubmit={handleSubmit(onSubmit)}>...</form>
```

## Registrando campos simples e validando-os

Precisamos fazer uma pequena mudança na declaração dos nossos campos, para que o react-hook-form os enxergue como campos válidos e consequentemente valide-os:

```js
<input name="firstName" placeholder="First Name" ref={register} />
```

A função de `register` é usada pelo react-hook-form para gerenciar o estado do campo internamente, lendo por debaixo dos panos, o valor da propriedade `name` e usando-o como chave primária no estado.

Caso queiramos adicionar validações de HTML5 como `required`, `minLength`, entre outros, basta passar como parâmetro um objeto ao callback de `register`:

```js
<input
  name="email"
  type="email"
  placeholder="E-mail"
  ref={register({ required: true, minLength: 6 })}
/>
```

## Mostrando erros de validação

Graças ao nosso hook, nós temos acesso a um objeto chamado `errors`. Todos os erros de validação estarão presentes dentro deste objeto, usando sempre o `name` como chave primária.

Então, para mostrar o erro da validação embaixo de um campo simples, basta:

```js
<input
  name="firstName"
  placeholder="First Name"
  ref={register({ required: true })}
/>;
{
  errors.firstName && <p>First name is required</p>;
}
```

## Nested fields

Eventualmente, você irá querer isolar alguns campos dentro de um objeto.

Graças ao react-hook-form, você pode usar a sintaxe tradicional do HTML5 na propriedade `name`:

```js
<input name="address.street" placeholder="Street" ref={register} />
// { address: { street: "Rua Luzitana" } }
```

```js
<input name="address[street]" placeholder="Street" ref={register} />
// { address: { street: "Rua Luzitana" } }
```

```js
<input name="addresses[0].street" placeholder="Street" ref={register} />
// { addresses: [{ street: "Rua Luzitana" }] }
```

## CRUD de Nested Fields

É comum em formulários complexos a necessidade de se reproduzir uma espécie de "CRUD" de uma sub-entidade.

Ou seja, o usuário pode adicionar novas linhas, editar as já existentes, ou simplesmente as remove-las.

Uma forma prática de resolver isso, é declarando um array para armazenar os índices dos nossos sub-campos. Exemplo:

```js
const [skills, setSkills] = useState([]);

const handleAddNewSkill = () => {
  const newSkill = skills.length > 0 ? skills.slice(-1).pop() : 0;
  const newSkills = [...skills, newSkill + 1];
  setSkills(newSkills);
};

const handleRemoveSkill = (value) => {
  const newSkills = skills.filter((index) => index !== value);
  setSkills(newSkills);
};
```

O `skills` será sempre um array de inteiros, onde cada inteiro é o índice atual do elemento a ser persistido.

O callback de `handleAddNewSkill()`, verifica se `skills` tem algum valor. Se tiver, ele pega o último elemento do array. Do contrário, ele simplesmente retorna 0. Com esse inteiro em mãos, nós somamos um, para termos uma ordem crescente de índices.

O callback de `handleRemoveSkill` simplesmente filtra os `skills`, retornando apenas os índices que não são iguais ao índice a ser removido.

### Botão de "Adicionar"

Vamos adicionar um botão para permitir que o usuário adicione novas skills:

````js
<h2 style={{ display: "flex", justifyContent: "space-between" }}>
        Skills
        <button type="button" onClick={handleAddNewSkill}>
          Add New Skill
        </button>
      </h2>
      ```
````

## Listando os registros

Podemos listar todas as skills simplesmente iterando `skills` e usando seus valores como índice para os campos e suas respectivas validações:

```js
<ul>
  {skills.map((index) => (
    <li key={index}>
      <input
        name={`skills[${index}].name`}
        placeholder="Name"
        ref={register({ required: true })}
      />
      {errors.skills && errors.skills[index] && errors.skills[index].name && (
        <p>Name is required</p>
      )}
      <input
        name={`skills[${index}].level`}
        placeholder="Level"
        ref={register({ required: true })}
      />
      {errors.skills && errors.skills[index] && errors.skills[index].level && (
        <p>Level is required</p>
      )}
    </li>
  ))}
</ul>
```

## Botão de "Remover"

Basta usar o callback de `handleRemoveSkill`, passando o nosso índice atual como parâmetro para que o mesmo seja removido corretamente:

```js
<button onClick={() => handleRemoveSkill(index)}>Remove</button>
```

## Resultado final

Como dito anteriormente, o callback de `onSubmit` só será acionado quando todas as validações estiverem corretas:

![](./Screenshot_20200205_215732.png)

Você pode visualizar o formulário funcionando [clicando aqui](https://build-9rqb7ilv0.now.sh/).

## Conclusão

Hoje, aprendemos uma maneira simples e eficiente de administrar múltiplos campos em um formulário usando React.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/l41JU9pUyosHzWyuQ/giphy.gif)
