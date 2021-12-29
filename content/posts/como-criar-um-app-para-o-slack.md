---
title: "Como criar um app para o Slack"
date: "2020-02-04T22:12:03.284Z"
description: "No #1postperday de hoje, iremos aprender como criar um app interativo para o Slack, semelhante ao exemplo abaixo:"
---

No #1postperday de hoje, iremos aprender como criar um app interativo para o Slack, semelhante ao exemplo abaixo:

![](./Screenshot_20200303_145048.png)

Nosso app terá 2 features:

- Enviar mensagens automaticamente para os canais do Slack;
- Responder a comandos acionados pelo usuário.

## Cadastrando o app

A primeira etapa para darmos vida ao nosso app é cadastrá-lo dentro do nosso workspace. [Você pode criá-lo aqui](https://api.slack.com/apps?new_app=1).

![](./Screenshot_20200303_145908.png)

## Ativando a 1ª feature

Para enviarmos mensagens externamente para o Slack, vamos usar a funcionalidade de **Incoming Webhooks**.

### O que são Incoming Webhooks?

São endpoints únicos para o nosso app, disponibilizados pelo Slack. Toda vez que você executar uma requisição POST para esse endpoint, o Slack irá automaticamente enviar uma mensagem para o Slack através do usuário do seu App.

Vá em "Features" -> "Incoming Webhooks" e ative-o:

![](./gif1.gif)

![](./gif2.gif)

Após indicar qual o canal que você quer que as mensagens sejam enviadas, você terá acesso a um **Webhook URL** semelhante a este:

```
https://hooks.slack.com/services/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
```

**Observação**: Os links são sempre relacionados a um canal. Se você quiser que seu app mande uma mensagem em outro canal, você deverá gerar um novo _Incoming Webhook_.

Com o Webhook URL em mãos, basta uma simples requisição POST para esta URL, com o Header de `Content-Type` igual a `application/json` e um body semelhante ao objeto abaixo, que a nossa mensagem será enviada:

```json
{
  "text": "Hello, 01dev!"
}
```

![](./gif3.gif)

A mensagem chegará assim:

![](./Screenshot_20200303_150929.png)

Um caso de uso interessante para os **Incoming Webhooks**, é notificar o resto do time quando um usuário novo é cadastrado ou quando uma venda é feita no seu software.

É uma maneira bem simples e muito produtiva de notificar a todos que algum evento ocorreu no seu software.

## Ativando a 2ª feature (Slash Commands)

Vá em "Features" -> "Slash Commands" e crie um novo comando.

**Observação**: Você provavelmente vai precisar redefinir as permissões do app após criar um novo Slash Command. O Slack irá exibir uma barra em amarelo na tela de configuração do app para você reinstalá-lo no seu workspace.

No nosso exemplo, iremos criar o comando `/bitcoin`. Ele irá retornar a cotação atual do Bitcoin usando a [API do Coindesk](https://api.coindesk.com/v1/bpi/currentprice.json):

![](./Screenshot_20200303_155627.png)

## Como funciona os Slash Commands?

Toda vez que um usuário usar o comando `/bitcoin`, o Slack irá automaticamente fazer uma requisição POST com alguns parâmetros para o **Request URL** definido na configuração do comando.

Você pode investigar quais parâmetros são enviados nessa requisição [aqui](https://api.slack.com/interactivity/slash-commands).

Dado toda essa especificação, eu criei um endpoint POST usando o [Sinatra](http://sinatrarb.com/) e hospedei no Heroku.

Aqui, a tecnologia fica a seu critério. Você pode usar a tecnologia que for do seu agrado: PHP, Ruby, Node.JS, Python, etc.

O importante é:

- Ter um endpoint HTTP no verbo POST;
- Ele aceitar requisições com `Content-Type` igual a `application/x-www-form-urlencoded`;
- Ele responder um objeto JSON semelhante ao objeto abaixo:

```ruby
slack_response = {
    'channel': 'geral',
    'response_type': 'in_channel',
    'blocks': [
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': "1 BTC está valendo #{price} #{currency} 🦄"
        }
      }
    ]
  }
```

Você pode descobrir o que mais pode retornar neste objeto para customizá-lo [aqui](https://api.slack.com/interactivity/slash-commands).

Segue o código-fonte para descobrirmos o preço do Bitcoin usando o Ruby (com o Sinatra):

```ruby
require 'sinatra'
require 'sinatra/json'
require 'httparty'

post '/' do
  request = HTTParty.get('https://api.coindesk.com/v1/bpi/currentprice.json')
  response = JSON.parse(request.body)
  currency = params[:text].strip.upcase
  price = response['bpi'][currency]['rate_float']

  slack_response = {
    'channel': 'geral',
    'response_type': 'in_channel',
    'blocks': [
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': "1 BTC está valendo #{price} #{currency} 🦄"
        }
      }
    ]
  }

  json slack_response
end
```

Você pode observar que nós usamos o parâmetro `text` para ler qual a moeda o usuário deseja a cotação. Este parâmetro `text` é todo o conteúdo que vem acompanhado do comando. Exemplo:

```
/bitcoin USD
/bitcoin EUR
```

Nos exemplos acima, `params[:text]` seriam iguais a `USD` e `EUR`.

Após subir esta nossa micro-aplicação no Heroku e alterar o Request URL para o mesmo nas configurações do nosso Slack Command e atualizar suas permissões no nosso workspace, podemos simplesmente usar o nosso comando no Slack:

![](./gif4.gif)

## Conclusão

É muito simples criar um app no Slack. O raciocínio é bem similar para os apps no Telegram, WhatsApp, entre outros.

Uma ferramenta bacana que pode fazer o seu app evoluir para um chatbot é uma biblioteca chamada [BotKit](https://botkit.ai/).

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/KPGLbBdxRbehi/giphy.gif)
