---
title: "Usando styled-components no React"
date: "2020-02-10T22:12:03.284Z"
description: "E se pudessémos unir o poder do ES6+ com o CSS?"
cover: "https://images.unsplash.com/photo-1577262243046-9a09d4eb6483?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
---

E se pudessémos unir o poder do ES6+ com o CSS?

**Prazer, [styled-components](https://styled-components.com/)!** 💅

## Benefícios

1. **Code split**: Apenas o CSS dos componentes que estão sendo renderizados é carregado pelo usuário;
2. **Nomes de classe únicos**: O [styled-components](https://styled-components.com/) gera nomes de classe únicos para seus elementos. Você provavelmente nunca mais vai precisar usar um `!important` na vida;
3. **Fácil detecção de código CSS não-utilizado**: Todo e qualquer componente que estiver sendo exportado e não estiver sendo usado pode ser considerado um elemento inútil e portanto pode ser removido. Uma das maiores dores de se escrever CSS comum é que você nunca saber se uma determinada estilização está sendo usada por alguém;
4. **Estilização dinâmica simplificada**: Adaptar a estilização de um componente baseado nos valores de uma prop é muito mais simples e intuitivo do que gerenciar múltiplas classes de CSS;
5. **Prefixos automáticos**: Esqueça o SASS, Less, entre outros. O [styled-components](https://styled-components.com/) já automatiza os prefixos para todos os tipos de browser automaticamente.

## Instalação

```bash
yarn add styled-components @types/styled-components # o @types é somente se você usa TypeScript
```

## Criando o primeiro componente

O styled-components usa [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) para definir a estilização do seu componente.

Além disso, você usa um elemento do HTML5 como método para indicar qual o tipo de elemento deverá ser renderizado. Exemplo:

```js
import styled from "styled-components";

const ImportantArticle = styled.article`
  background: red;
`;
```

Você pode usá-lo como um componente comum:

```js
<section>
  <ImportantArticle>
    <h1>Título</h1>
  </ImportantArticle>
</section>
```

## Adaptando componente as suas props

Você pode customizar a sua estilização de acordo com o valor das props do seu componente.

Uma das formas de se fazer isso é passando uma função para o valor da propriedade.

Exemplo: imagine uma propriedade `hoverable`:

```js
<ImportantArticle hoverable>
  <h1>Título</h1>
</ImportantArticle>
```

### 1º opção

```js
const ImportantArticle = styled.article`
  background: red;
  cursor: ${(props) =>
    props.hoverable &&
    css`
    pointer
  `};
`;
```

### 2º opção

```js
const ImportantArticle = styled.article`
  background: red;
  cursor: ${(props) => (props.hoverable ? `pointer` : `default`)};
`;
```

### 3º opção

```js
const ImportantArticle = styled.article`
  background: red;

  ${(props) =>
    props.hoverable &&
    css`
      color: white;
      cursor: pointer;
    `};
`;
```

## Estendendo (herança de estilos)

Eventualmente, você vai desejar aplicar o conceito de herança nos seus componentes de estilo.

Nós conseguimos aplicar a herança nos nossos componentes usando o `styled` como função:

```js
const BasicArticle = styled.article`
  background: gray;
  font-size: 12px;
  font-weight: 400;
`;

const ImportantArticle = styled(BasicArticle)`
  background: red;
  font-weight: 600;
`;
```

No caso, o `ImportantArticle` irá herdar toda a estilização de `BasicArticle`, sobrescrevendo apenas os que foram declarados pela segunda vez.

**Observação**: este método de extensão irá funcionar com todos os tipos de componentes, desde que eles anexem a prop `className` em algum elemento DOM. Exemplo:

```js
const Link = ({ className, children }) => (
  <a className={className}>{children}</a>
);
```

## Aplicando polimorfia nos componentes

Em alguns cenários, você irá precisar rodar o mesmo componente, porém, em um elemento diferente.

Graças a propriedade `as`, nós podemos aplicar esse polimofirsmo no nosso componentes sem menores problemas:

```js
const Button = styled.button`
  background: blue;
  border-radius: 10px;
`

<Button as="a" href="https://google.com">Google</Button>
```

## Pseudo-elementos, pseudo-seletores e nesting

O styled-components usa um pré-processador chamado [stylis](https://github.com/thysultan/stylis.js).

A sintaxe dele permite praticamente todos os recursos do SCSS.

A flag `&` pode ser utilizada para referenciar o componente principal.

## Criando estilos globais

Basta importar o helper `createGlobalStyle` e usá-lo:

```js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
`;
```

## Usando no React-Native

O funcionamento e a dependência são os mesmos, modificando apenas o caminho do import:

```js
import styled from "styled-components/native";

const StyledView = styled.View`
  background-color: red;
`;
```

## Temas

O styled-componentes já vem com suporte nativo para temas, através do `ThemeProvider`.

Todos os componentes que forem filhos do `ThemeProvider`, irão herdar acesso as propriedades do tema atual. Exemplo:

```js
import { ThemeProvider } from "styled-components"

const Button = styled.button`
  color: ${props => props.theme.primary};
  border: 2px solid ${props => props.theme.primary};
`;

Button.defaultProps = {
    theme: {
        primary: 'red'
    }
};

const theme = {
    primary: 'green'
}

const App = () => (
<Button>Botão sem tema</Button>
<ThemeProvider theme={theme}>
    <Button>Botão dentro do tema</Button>
</ThemeProvider>
)
```

## Lendo o tema fora do styled-components

Você pode usar o HOC [withTheme](https://styled-components.com/docs/advanced#via-withtheme-higherorder-component) do styled-components. Exemplo:

```js
import { withTheme } from "styled-components";

const MyComponent = ({ theme }) => {
  console.log("Tema atual: ", theme);
};

export default withTheme(MyComponent);
```

## Conclusão

O styled-components hoje em dia é a melhor alternativa para você usar na camada de estilos da sua aplicação React.

Através desta poderosa biblioteca, você pode estilizar seus componentes unindo código JSX com CSS. É um SASS com esteróides! 💪

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/mIZ9rPeMKefm0/giphy.gif)
