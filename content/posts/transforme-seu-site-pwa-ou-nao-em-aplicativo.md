---
title: "Transforme seu site (PWA ou não) em aplicativo na Play e App Store"
date: "2020-03-06T22:12:03.284Z"
description: "Hoje você vai aprender uma solução bala de prata pra resolver a dor de muito cliente por aí"
cover: "https://images.unsplash.com/photo-1500621242946-fc62f4875073?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
---

Hoje você vai aprender uma solução bala de prata pra resolver a dor de muito cliente por aí.

"Os usuários vão encontrá-lo na Play/App Store?", o cliente, otimista, pergunta.

Você, com aquela cara de confuso, explica que não, não vai rolar.

**SEUS PROBLEMAS ACABARAM!1!11!**

Hoje, eu vou te dar o caminho das pedras para resolver esse problema de uma vez por todas.

Não é das soluções mais elegantes, com certeza.

Porém, essa solução permite que você faça deploy do seu app nas lojas apenas uma vez (ou mais vezes, caso você queira trocar o ícone e/ou a splash screen do aplicativo).

A sua aplicação em si continua sendo a sua versão Web.

Ter uma base de código única que sirva múltiplas plataformas é o sonho molhado de qualquer desenvolvedor web nos últimos anos.

É a solução oficial de aplicativos como o [Instagram Lite](https://play.google.com/store/apps/details?id=com.instagram.lite&hl=en) e o [Twitter Lite](https://play.google.com/store/apps/details?id=com.twitter.android.lite&hl=en).

## Requisitos

Vamos precisar editar uns arquivos em JavaScript mas você não precisa ser nenhum expert no assunto para entender o que está acontecendo.

Dito isso, precisaremos de:

- [Node.JS](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- [CLI do Expo](https://reactnative.dev/docs/getting-started)

## Iniciando o projeto

Vamos criar a estrutura inicial da nossa aplicação que serviŕa de wrapper para o nosso site:

```bash
$ expo init 01dev # substitua 01dev pelo nome do seu projeto
```

Será solicitado um template a ser usado. Eu recomendo o `blank (TypeScript)` mas pode ser qualquer um..

Após escolher o template, todas as dependências do template serão instaladas.

Vamos rodar o projeto:

```bash
cd 01dev
yarn start
```

O nosso projeto irá rodar o Expo Developer Tools, uma ferramenta no browser que inicializará todos os serviços necessários para que nossa aplicação rode no ambiente de desenvolvimento.

Agora precisaremos rodar o nosso aplicativo. Você pode usar um [emulador Android](https://developer.android.com/studio/run/emulator) ou seu próprio celular baixando o aplicativo do Expo.

Se você optar pelo emulador, esse é o momento para rodá-lo. Com o emulador rodando, vamos clicar em "Run on Android device/emulator..." e o nosso aplicativo será inicializado, como demonstrado abaixo:

![](./gif1.gif)

Com o aplicativo rodando, podemos editar o nosso arquivo `App.tsx`, removendo todo o código desnecessário dele:

```diff
import React from "react"
- import { StyleSheet, Text, View } from "react-native"
+ import { Text, View } from "react-native"

export default function App() {
  return (
-    <View style={styles.container}>
+    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  )
}

- const styles = StyleSheet.create({
-   container: {
-     flex: 1,
-     backgroundColor: "#fff",
-     alignItems: "center",
-     justifyContent: "center",
-   },
})
```

## Instalando o WebView

Para renderizar o nosso site dentro dessa "casca", vamos precisar de um componente chamado `WebView`.

Este componente antigamente fazia parte do core do react-native, porém desde as últimas versões ele foi isolado em uma dependência a parte.

Por conta disso, vamos adicioná-lo a nossa lista de dependências:

```bash
$ expo install react-native-webview
```

## Usando o WebView

Com o nosso componente instalado, vamos usá-lo editando o `App.tsx`:

```diff
import React from "react"
+ import { WebView } from "react-native-webview"
- import { StyleSheet, Text, View } from "react-native"
+ import { View } from "react-native"

export default function App() {
  return (
-    <View>
+    <View style={{ flex: 1 }}>
-       <Text>Open up App.tsx to start working on your app!</Text>
+       <WebView source={{ uri: "https://01dev.codes" }} />
    </View>
  )
}
```

**Pronto!** Nosso WebView já estará funcionando. Porém, nem tudo são flores.

Se você é uma pessoa com TOC que nem eu, você vai notar que as vezes a splash screen vai sumir antes do site terminar de carregar. E esse processo vai mostrar uma tela branca temporária pro nosso usuário final, que não sabe o que está acontecendo.

## Ocultando Splash Screen após site carregar

Existe uma maneira de ocultarmos a SplahScreen programaticamente (ou seja, somente quando nós quisermos).

Além disso, o nosso componente de WebView nos fornece um callback de `onLoadEnd`, que é acionado quando a página termina de concluir 100%.

Pegou a ideia? Vamos unir o útil ao agradável:

```diff
- import React from "react";
+ import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
import { View } from "react-native";
+ import { SplashScreen } from "expo";

export default function App() {

+   useEffect(() => {
+       SplashScreen.preventAutoHide();
+   }, []);

+   const onLoadEnd = () => {
+       SplashScreen.hide();
+   };

  return (
    <View style={{ flex: 1 }}>
-      <WebView source={{ uri: "https://01dev.codes" }} />
+      <WebView source={{ uri: "https://01dev.codes" }} onLoadEnd={onLoadEnd} />
    </View>
  );
}
```

## Deixando em tela cheia

Você vai notar que o WebView está carregando embaixo da StatusBar do Android:

![](./Screenshot_20200306_173813.png)

Uma maneira de resolvermos isso, é pegar a altura do `StatusBar` e adicionar um espaçamento interno na `View` com essa altura:

```diff
import React, { useEffect } from "react";
import { WebView } from "react-native-webview";
- import { View } from "react-native";
+ import { StatusBar, View } from "react-native";
import { SplashScreen } from "expo";

export default function App() {

  useEffect(() => {
      SplashScreen.preventAutoHide();
  }, []);

  const onLoadEnd = () => {
      SplashScreen.hide();
  };

  return (
-    <View style={{ flex: 1 }}>
+    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <WebView source={{ uri: "https://01dev.codes" }} onLoadEnd={onLoadEnd} />
    </View>
  );
}
```

**Resolvido!** Você também pode adicionar um `backgroundColor` para preencher o fundo do StatusBar com alguma cor do seu projeto:

```diff
-    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
+    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: 'rgb(0, 125, 146)' }}>
```

![](./Screenshot_20200306_174346.png)

## Toques finais do app

Você precisa dar um toque final para que as lojas consigam interpretar o seu aplicativo corretamente.

Para isso, vamos editar arquivo de `app.json` na raíz do projeto.

O mais importante a se editar aqui, caso você pretenda gerar um APK para o Android, é adicionar o seguinte:

```diff
{
  "expo": {
    "name": "Blank Template (TypeScript)",
    "slug": "01dev",
    "privacy": "public",
    "sdkVersion": "36.0.0",
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
+    "android": {
+     "package": "com.yourcompany.yourappname",
+     "versionCode": 1
+   }
  }
}
```

Atualize o `package` para um nome único do seu aplicativo.

**Obs:** O `versionCode` deve ser atualizado cada vez que você publicar uma versão nova na Play Store (precisa ser um número inteiro). Se não, a Play Store vai acusar que você está tentando subir a mesma versão.

## Gerando APK (ou IPA)

Para gerar um bundle assinado para o Android (APK), basta rodar na pasta do projeto:

```bash
$ expo build:android
```

Para gerar um bundle assinado para a Apple (IPA), basta rodar na pasta do projeto:

```bash
$ expo build:ios
```

A primeira pergunta que o CLI vai ser no primeiro build é se você gostaria de upar um keystore ou prefere que o próprio Expo cuide disso pra ti.

Como esse é um tutorial para iniciantes, super recomendo manter a opção 1), mantendo o Expo como gerador de keystores.

Em algum momento, o processo de build estará nesse estado:

![](./Screenshot_20200306_180227.png)

É só abrir o link que o Expo te libera ([esse é um link de exemplo](https://expo.io/dashboard/lhas/builds/16ebb738-51cb-41f9-b5b2-b21739165c17)) para que, quando o processo de build esteja 100% concluído, você possa baixar seu APK.

Basta clicar em **Download** para ter acesso ao seu APK:

![](./Screenshot_20200306_180427.png)

## Alterando o ícone e o Splash Screen

Você provavelmente vai querer customizar o ícone e a splash screen do seu aplicativo.

Para o ícone, você precisará de uma imagem no formato PNG com dimensões de 192x192px.

Para a Splash Screen, você precisará de uma imagem no formato PNG com dimensões de 1242x2436px.

Com as imagens em mãos, basta atualizá-las em `assets/icon.png` e `assets/splash.png`, respectivamente.

**Observação**: Você provavelmente vai querer mudar o `resizeMode` da splash screen para `cover` no nosso `app.json`:

```diff
"splash": {
    "image": "./assets/splash.png",
-    "resizeMode": "contain",
+    "resizeMode": "cover",
    "backgroundColor": "#ffffff"
},
```

## Publicando o aplicativo na Play Store

Você precisará de uma conta na [Google Play Console](https://play.google.com/apps/publish).

Na tela de "Todos os apps", basta clicar em "Criar App" e seguir todas as instruções.

Você vai precisar preencher algumas abas que são obrigatórias, como **Gerenciamento de Versão**, **Presença na loja**, **Classificação de Conteúdo**, entre outros.

Com todas as abas preenchidas, basta ir em "Gerenciamento de Versão" -> "Versões de Apps".

Clique em "Gerenciar" na "Faixa de Produção". Depois, clique em "Criar uma versão".

Aqui é onde iremos anexar o nosso arquivo APK gerado pelo Expo:

![](./Screenshot_20200306_181105.png)

## Conclusão

Esse é um dos métodos que permitem que você publique seu site, PWA ou não, nas lojas oficiais da Apple e da Google.

Como a base de código é em React Native, você pode inclusive implementar ferramentas extras, como [Push Notifications](https://firebase.google.com/docs/cloud-messaging) (usando o Firebase).

Espero que tenham gostado e até a próxima! 😺

![](https://media.giphy.com/media/L0O3TQpp0WnSXmxV8p/giphy.gif)
