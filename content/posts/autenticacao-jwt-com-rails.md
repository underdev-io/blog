---
title: "Autenticação JWT com Rails"
date: "2020-02-04T22:12:03.284Z"
description: "Frameworks como Ruby on Rails continuam sendo uma excelente opção para desenvolvedores que precisam construir APIs em tempo recorde."
---

Frameworks como [Ruby on Rails](https://rubyonrails.org/) continuam sendo uma excelente opção para desenvolvedores que precisam construir APIs em tempo recorde.

Graças as funcionalidades nativas e sua poderosa extensão de [Gems](https://rubygems.org/), é possível desenvolver muitas das rotinas de um desenvolvedor em um curto espaço de tempo.

Hoje, um desses exemplos de soluções produtivas com Gems, é criar uma autenticação usando o protocolo
JSON Web Tokens](https://jwt.io/introduction/), vulgo **JWT**, dentro de uma aplicação Rails no modo API.

## Gerar o projeto

O primeiro passo é inicializarmos o projeto:

```bash
rails new jwt_api --api
```

Observe a flag `--api`, ela indica para o generator do Rails que nossa estrutura deve ser enxuta, usando somente dos recursos para se produzir uma API.

## Adicionar dependências

vamos precisar adicionar algumas dependências no `Gemfile`:

```bash
gem 'dotenv-rails', groups: [:development, :test] # Caso você queira isolar variáveis de ambiente no projeto
gem 'devise'
gem 'devise-jwt'
```

Nosso fluxo de autenticação irá girar em torno da gem [Devise](https://github.com/heartcombo/devise).

Ela, nativamente, não suporta mais autenticação via token. Porém, graças a gem `devise-jwt`, nós conseguimos fazer essa autenticação fluir.

Instale as dependências:

```bash
bundle install
```

## Inicializando o Devise

Vamos rodar o generator do Devise para inicializar os arquivos necessários para o funcionamento do mesmo:

```bash
rails generate devise:install
```

Com os arquivos inicializados, vamos gerar um model para nosso `User`:

```bash
rails generate devise User
```

Este comando irá criar arquivos de migração, model, etc, para nosso `User`.

## Adaptando nosso model

Com o model em mãos, precisamos configurá-lo para que ele aceite autenticação via tokens:

```ruby
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :registerable,
         :database_authenticatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self
end
```

Observe que estamos utilizando a estratégia de JTI para Revogação dos tokens. Caso você queira saber mais sobre o que é esse JTI e o que são essas estratégias de revogação, [veja a documentação do devise-jwt aqui](https://github.com/waiting-for-dev/devise-jwt#jtimatcher).

Esta estratégia de JTI é a recomendada por padrão pela biblioteca.

Para o funcionamento desta estratégia, será necessário adicionar uma coluna extra na nossa migração de `User`:

```ruby
t.string :jti, null: false, default: ""
```

## Configurando o Devise

Precisamos adicionar configurações extras para o Devise se comunicar bem com a gem de JWT.

Para isso, vamos editar o arquivo `config/initializers/devise.rb`:

```ruby
Devise.setup do |config|
  # ...
  config.jwt do |jwt|
    jwt.secret = ENV['DEVISE_JWT_SECRET_KEY']
    jwt.dispatch_requests = [
      ['POST', %r{^/login$}]
    ]
    jwt.revocation_requests = [
      ['DELETE', %r{^/logout$}]
    ]
    jwt.expiration_time = 30.day.to_i
  end

  config.navigational_formats = []
end
```

Observe que estamos usando a variável de ambiente `DEVISE_JWT_SECRET_KEY`. Caso você tenha instalado o `dotenv-rails`, basta criar um arquivo `.env` na raíz do seu projeto, rodar `rake secret`, e copiar a chave gerada para esta variável:

```
DEVISE_JWT_SECRET_KEY="e8f4c62d53c1384da98b404c5405bb94aa018f1e227c28af9b5d63b5632f24fff404e8500040dfe21f3074d88f92b0153dff26b405504a96edd3ba6aeaad1590"
```

Nós também declaramos um array vazio para `config.navigational_formats`, para evitar que o Devise envie notificações flash na nossa aplicação.

**Obs**: Você pode alterar o tempo de expiração para o seu token em `jwt.expiration_time`. Por padrão, estou usando 30 dias.
**Obs 2**: Você irá precisar tratar no front-end, quando o token estiver expirado. Neste tipo de situação, a API irá retornar `401 Unauthorized`.

## Liberando endpoint de login/logout

Nós precisamos que os endpoints de login e logout recebam e enviem dados em formato JSON.

Para isto, vamos criar um `SessionsController`:

```bash
rails generate controller sessions
```

```ruby
class SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
    head :no_content
  end
end
```

## Liberando endpoint de cadastro

Nós vamos precisar também de um endpoint para permitir que os usuários se cadastrem, em formato JSON.

Para isto, vamos criar um `RegistrationsController`:

```bash
rails generate controller registrations
```

```ruby
class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    resource.save

    if resource.errors.empty?
      render json: resource
    else
      render json: resource.errors
    end
  end
end
```

Note que estamos us

## Configurando rotas

Nós podemos manter as rotas padrões do Devise, como `/users/sign_in`, `/users/sign_out` ou `/users/sign_up`.

Porém, vamos customizá-las, para simplificar o processo. Basta editar o `config/routes.rb`:

```ruby
devise_for :users,
    path: '',
    path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
    },
    controllers: {
    sessions: 'sessions',
    registrations: 'registrations'
    }
```

Agora, nossos endpoints serão:

**Verbo:** POST
**Endpoint:** /login
**Body:**

```json
{
    "user": {
        "email": "abacate@abacate.com.br",
        "password": "relogio123
    }
}
```

**Verbo:** POST
**Endpoint:** /signup
**Body:**

```json
{
    "user": {
        "email": "abacate@abacate.com.br",
        "password": "relogio123
    }
}
```

**Verbo:** DELETE
**Endpoint:** /logout

Tanto no `/login`, quanto no `/signup`, a API irá retornar um header `Authorization` na resposta com o formato `Bearer`.

## Autorizando endpoints

Com toda a nossa camada de autenticação preparada, nós podemos autorizar nossos endpoints com um simples callback em nosso controller. Exemplo abaixo:

```ruby
class ProtectedController < ApplicationController
before_action :authenticate_user!

    def index
        render json: "Este controller é somente para usuários autenticados."
    end
end
```

## Manipulando dados do usuário logado

Todo endpoint que você proteger com o `:authenticate_user!`, automaticamente terá disponível dentro de si, a variável `current_user`, populada com os dados do usuário logado:

```ruby
class ProtectedController < ApplicationController
before_action :authenticate_user!

    def index
        render json: current_user
    end
end
```

## Conclusão

Hoje aprendemos uma maneira enxuta e diferente de preparar a camada de autenticação em uma típica aplicação Rails (no formato de API).

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/3ohs7KViF6rA4aan5u/giphy-downsized.gif)
