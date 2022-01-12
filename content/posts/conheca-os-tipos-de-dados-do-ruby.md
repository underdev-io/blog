---
title: "Conheça os tipos de dados do Ruby"
date: "2020-02-12T22:12:03.284Z"
description: "Uma dos principais assuntos que você precisa dominar em uma linguagem de programação, é quais os tipos de dados esta linguagem trabalha"
cover: "https://images.unsplash.com/photo-1581272408424-5077d06e8322?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80"
---

Uma dos principais assuntos que você precisa dominar em uma linguagem de programação, é quais os tipos de dados esta linguagem trabalha.

No **#1postperday** de hoje, vamos ter uma visão geral sobre os tipos de dados suportados pelo [Ruby](https://www.ruby-lang.org/en/).

## Números

O Ruby inclui 5 classes representativas de números:

![](./Screenshot_20200212_153421.png)

Todos os objetos de número no Ruby são instâncias da classe [Numeric](https://ruby-doc.org/core-2.7.0/Numeric.html).

Todos os números inteiros são instâncias da classe [Integer](https://ruby-doc.org/core-2.7.0/Integer.html).

Os tipos de [Complex](https://ruby-doc.org/core-2.7.0/Complex.html), [BigDecimal](https://ruby-doc.org/stdlib-2.5.1/libdoc/bigdecimal/rdoc/BigDecimal.html) e [Rational](https://ruby-doc.org/stdlib-2.7.0/libdoc/bigdecimal/rdoc/Rational.html) não fazem parte do Ruby em si mas são distribuidos na biblioteca padrão do Ruby.

O `BigDecimal` representa números reais com uma precisão arbitrária, usando uma representação decimal ao invés de uma representação binária.

O `Rational` representa os números racionais, obviamente.

Todos os objetos numéricos são _imutáveis_.

### Pontos flutuantes

Obrigatoriamente, para um número no Ruby ser considerado um ponto flutuante, ele precisa de um dígito antes e depois do `.`. Isso significa que `.1` não funciona, mas `0.1` funciona.

```ruby
0.1
0.493214892
```

## Textos

Os textos no Ruby são instâncias da classe [String](https://ruby-doc.org/core-2.6/String.html).

Objetos de string são objetos mutáveis.

Expressões regulares são representadas no Ruby como objetos de [RegExp](https://ruby-doc.org/core-2.4.0/Regexp.html).

### Strings de aspas simples

```ruby
'O rato roeu a roupa do rei de Roma.'
'O \'rato\' roeu a roupa do rei de Roma.'
```

## Strings de aspas duplas

```ruby
"O rato roeu a roupa do rei de Roma."
"O rato\nroeu a roupa do \"rei\" de Roma."
cidade = "Roma"
"O rato\nroeu a roupa do \"rei\" de #{cidade}."
```

### Symbol

São strings imutáveis, declaradas com um prefixo `:`.

```ruby
:lhas
:rato_de_roma
:fruta_abacate
```

## Arrays

Arrays são uma sequência de valores que permite que os valores sejam acessíveis a partir da sua posição (popularmente conhecido como índice/index).

No Ruby, os Arrays começam a partir do índice `0`.

O último elemento de um array é acessível via `size - 1`.

Se você tentar acessar um valor antes do primeiro índice ou depois do último índice, o Ruby irá retornar `nil`.

Os arrays no Ruby são sem tipagem e mutáveis. Isso significa que os valores de um array não precisam ter o mesmo tipo de dado.

```ruby
[1, 2, 3]
[[1, 2], [3, 4], [5]]
['abacate', 123, {fruta: 'mamão'}]
```

Acima estão exemplos válidos de arrays no Ruby.

## Hashes

Os hashes são uma estrutura de dados que mantém um conjunto de objetos conhecido como chave/key, e associa cada chave com um valor.

Hashes também são conhecidos como _maps_ por que eles mapeiam chaves para valores.

As vezes, são chamados de _arrays associativos_, por que eles associam valores com cada chave.

Existem duas formas de se declarar um hash, o formato antigo e o novo:

```ruby
# Antigo
numbers = { :one => 1, :two => 2, :three => 3 }
# Novo
numbers = { one: 1, two: 2, three: 3 }
```

## Ranges

Objetos de [Range](https://ruby-doc.org/stdlib-2.6.5/libdoc/json/rdoc/Range.html) representa um período inicial e final de valores. Eles são identificados através de dois ou três pontos finais entre o valor inicial e final.

Se forem usados dois pontos, então o range é _inclusivo_ e o valor final faz parte do range.

Se forem usados três pontos, então o range é _exclusivo_ e o valor final não faz parte do range.

```ruby
1..10 # inclusivo, 10 faz parte do range
1...10 # exclusivo, vai somente do 1 ao 9
```

Você pode checar se um valor faz parte de um range usando o método [include?](https://apidock.com/ruby/Range/include%3F):

```ruby
era_vargas = 1930..1945
era_vargas.include? 2020
```

## Conclusão

O [Ruby](https://www.ruby-lang.org/en/) é uma linguagem de tipagem dinâmica com vários tipos de dados bem interessantes. Os destaques ficam para os Symbols, os Hashes e os Ranges, que não costumam aparecer muito nas outras linguagens, ou aparecem usando regras diferentes.

O artigo é apenas uma versão resumida sobre os tipos de dados suportados. Se você quiser aprender mais detalhes sobre os tipos, recomendo a leitura do livro [The Ruby Programming Language](http://shop.oreilly.com/product/9780596516178.do).

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/hoxn9Vo7BW3RTxKRod/giphy.gif)
