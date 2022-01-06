---
title: "Service Objects Pattern com Ruby on Rails"
date: "2020-02-20T22:12:03.284Z"
description: "No início da nossa aplicação, é muito comum acoplarmos regras de negócio dentro dos nossos controllers e/ou models"
cover: "https://images.unsplash.com/photo-1577464849471-8dc8be232176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
---

No início da nossa aplicação, é muito comum acoplarmos regras de negócio dentro dos nossos controllers e/ou models.

Existe uma série de consequências disso. A principal é:

**Múltiplas responsabilidades sob a mesma camada**: O Controller deveria tão somente mapear as nossas requisições HTTP (saiba mais [aqui](https://guides.rubyonrails.org/action_controller_overview.html)).

O Model deveria tão somente mapear as característias da nossa entidade individualmente (saiba mais [aqui](https://guides.rubyonrails.org/active_record_querying.html)).

A partir do momento que injetamos regras de negócio, seja no controller, ou no model, acabamos desvirtuando a responsabilidade das mesmas, quebrando o princípio [SOLID](https://en.wikipedia.org/wiki/SOLID).

Uma das soluções para evitar _fat models_ ou _fat controllers_ é... **Service Objects!**

## O que são Service Objects?

Costumam ser um [Plain Old Ruby Object (PORO)](https://codesthq.com/hi-im-poro-2/) designadas para executar uma (e apenas uma) única tarefa.

Considere o seguinte controller:

```ruby
require 'net/http'

class UsersController < ApplicationController
    def create
        create_user
    end

    private

    def create_user
        # Cria o usuário
        user = User.create(user_params)

        if user.persisted?
            # E-mail: Notifica o usuário
            UserMailer.with(user: user).welcome_email.deliver_now

            # Slack: Notifica o time
            Net::HTTP.post_form(URI.parse('https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'), {text: "User created!"})
        end
    end

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
```

No controller acima, isolamos 3 regras de negócio da nossa requisição `POST /users`:

1. Criamos o nosso usuário na nossa base de dados;
2. Se o usuário for salvo:
   - Envia notificação por e-mail para nosso usuário;
   - Envia notificação por Slack para nosso time;

O problema é que nosso controller acabou ficando meio extenso. Poderíamos mover as duas últimas regras de negócio para a nossa camada de Model, usando o callback [after_create](https://guides.rubyonrails.org/active_record_callbacks.html):

```ruby
class User < ApplicationRecord
    after_create :after_create_user

    def after_create_user
        if persisted?
            # E-mail: Notifica o usuário
            UserMailer.with(user: self).welcome_email.deliver_now

            # Slack: Notifica o time
            Net::HTTP.post_form(URI.parse('https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'), {text: "User created!"})
        end
    end
end
```

Aliviamos o controller, porém nosso Model fica acoplado de regras de negócio desnecessariamente.

## Solução

Vamos criar o nosso primeiro Service Object? Crie a pasta `app/services`. Todas as classes Ruby que estiverem dentro desta pasta serão lidas automaticamente, graças ao [autoload](https://guides.rubyonrails.org/autoloading_and_reloading_constants.html) do Rails.

## Dando nomes aos bois (ou as services)

Um modelo bem interessante proposto pelo [Amin Shah](https://www.toptal.com/ruby-on-rails/rails-service-objects-tutorial) da Toptal, é que o nome das nossas classes de service sejam como se fosse cargos de emprego em uma empresa fictícia.

Seguindo esta convenção, iremos criar o nosso `UserCreator` em `app/services/user_creator.rb`:

```ruby
require 'net/http'

class UserCreator
    def initialize(user)
        @user = user
    end

    def create
        # Cria o usuário
        user = User.create(@user)

        if user.persisted?
            # E-mail: Notifica o usuário
            UserMailer.with(user: user).welcome_email.deliver_now

            # Slack: Notifica o time
            Net::HTTP.post_form(URI.parse('https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'), {text: "User created!"})
        end
    end
end
```

Agora, podemos atualizar o nosso Controller com a nossa Service:

```ruby
class UsersController < ApplicationController
    def create
        UserCreator.new(user_params).create
    end

    private

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
```

Observe como nosso controller ficou bem mais simplificado. Irado, não? :D

## Evitando instanciar as Services

Apesar da nossa solução ter funcionado, é um pouco desagradável ter que escrever `NomeDaService.new().nome_do_metodo` toda vez.

Uma convenção bacana para encurtar esta chamada é criarmos um `ApplicationService`, semelhante ao `ApplicationController` e o `ApplicationRecord` do Rails.

A ideia é que todas as nossas services estendam o `ApplicationService`.

Graças a essa herança, vamos padronizar para que todas as nossas services tenham somente um método público chamado `call`:

```ruby
# app/services/application_service.rb
class ApplicationService
  def self.call(*args, &block)
    new(*args, &block).call
  end
end
```

O `self.call` irá passar automaticamente todos os argumentos para nosso `new()` e irá acionar o método `.call` da nossa Service.

Vamos adaptar o nosso `UserCreator` para o novo padrão?

```ruby
require 'net/http'

class UserCreator < ApplicationService
    def initialize(user)
        @user = user
    end

    def call
        # Cria o usuário
        user = User.create(@user)

        if user.persisted?
            # E-mail: Notifica o usuário
            UserMailer.with(user: user).welcome_email.deliver_now

            # Slack: Notifica o time
            Net::HTTP.post_form(URI.parse('https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'), {text: "User created!"})
        end
    end
end
```

Com o nosso service adaptado, podemos adaptar agora o nosso controller:

```ruby
class UsersController < ApplicationController
    def create
        UserCreator.call(user_params)
    end

    # ...
end
```

## Agrupando as Services (Namespaces)

Eventualmente, você irá criar múltiplas services para uma mesma feature/camada. No nosso caso, poderíamos isolar a integração com e-mail em uma segnda service e a integração com o slack em uma terceira.

Uma abordagem interessante de agrupar essas services é declarando um namespace para as mesmas.

Uma convenção bacana para se utilizar nos nomes dos namespaces é imaginá-los como gerentes da nossa empresa fictícia.

Então os namespaces seriam os `Managers`, ou gerentes de cada seção (ou feature).

E as services seriam os funcionários, ou cargos que atendem aos seus `Managers`, no nosso caso, `SlackNotificator`, `EmailNotificator` e `Creator`.

Observe o exemplo abaixo:

```ruby
module UserManager
    class SlackNotificator < ApplicationService
        # ...
    end
end
```

```ruby
module UserManager
    class EmailNotificator < ApplicationService
        # ...
    end
end
```

```ruby
module UserManager
    class Creator < ApplicationService
        # ...

        def call
            # Cria o usuário
            user = User.create(@user)

            if user.persisted?
                UserManager::EmailNotificator.call(user)
                UserManager::SlackNotificator.call(user)
            end
        end
    end
end
```

E então atualizar o nosso controller:

```ruby
class UsersController < ApplicationController
    def create
        UserManager::Creator.call(user_params)
    end

    # ...
end
```

## O que minha Service deve retornar?

O ideal é que a execução da sua aplicação não seja interrompida caso alguma service seja solicitada.

Uma alternativa bacana para isso é estabelecer um padrão de retorno para as Services:

- **Retornar `true` ou `false`**: Esse é o mais simples. Caso a service funcionou como esperado, retorne `true`; Do contrário, retorne `false`.

- **Retornar um valor**: Caso a sua service precise retornar algum dado, você provavelmente vai querer retorná-lo diretamente (ou `false`, caso não tenha conseguido recuperar o dado):

```ruby
def call
    # ...
    return false unless exchange_rate
    exchange_rate
  end
```

- **Retornar um Enum**: Se a service for um pouco mais complexa, e precisar retornar mais do que 2 estados, você pode usar um Enum para controlar todo esse fluxo:

```ruby
class UserCreator < ApplicationService
    RESPONSES = [
        SUCCESS = :success,
        FAILURE = :failure,
        WAITING_PAYMENT = :waiting_payment
    ]

    def call
        foo = do_something
        return RESPONSES.SUCCESS if foo.success?
        return RESPONSES.WAITING_PAYMENT if foo.waiting_payment?
        return RESPONSES.FAILURE
    end
end

```

Então, você pode tratar cada caso na sua aplicação:

```ruby
    case UserCreator.call
        when UserCreator.RESPONSES.SUCCESS
            do_success
        when UserCreator.RESPONSES.WAITING_PAYMENT
            do_waiting_payment
        when UserCreator.RESPONSES.FAILURE
            do_failure
    end
```

## Quando eu não devo usar um Service Object?

Existem situações onde talvez não seja interessante aplicar esta pattern. Veja se é o seu caso:

1. **Seu código manipula roteamento, parâmetros ou coisas do tipo?** Então seu código deve ficar em um controller.
2. **Você está tentando compartilhar um código entre diferentes controllers** Então seu código deve ficar em um [concern](https://api.rubyonrails.org/v6.0.2.1/classes/ActiveSupport/Concern.html).
3. **Seu código é como um model porém sem persistência**? Use um model que não estenda o `ActiveRecord` então.

## Quando eu devo usar um Service Object?

Seu código está performando alguma regra de negócio da aplicação? Manipulando um arquivo externo? Calculando algo? Integrando com um WebService?

Se o seu código se encaixar nesta categoria, certamente vale refatorá-lo em um Service Object.

## Conclusão

Este é um padrão muito comum, cada vez mais presentes nas aplicações de médio a grande porte em Rails.

É uma excelente maneira, didática para desenvolvedores de outros ecossistemas, de como isolar e reutilizar as regras de negócio da sua aplicação.

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/5wWf7GR2nhgamhRnEuA/giphy.gif)
