# Notas

# Sobre erros

## Erro de login do expo
- Erro: "Not found" ao tentar fazer o login na aplicação no expo. 
- Solução: Execute o comando em seu terminal: 
```bash
$ expo login
```
Após insira suas informações de login do expo. Após isso reinicie a aplicação.

## Como adicionei o env
- Instalei o modulo ``react-native-dotenv``;
- Criei um arquivo chamado ``@types/env.d.ts`` dentro da pasta ``src``.
- Dentro deste arquivo do arquivo ``env.d.ts``, adicionei as varariáveis como abaixo:

```ts
declare module 'react-native-dotenv' {
  export const USER_LOCAL_STORAGE_KEY: string;
  export const EXPO_REDIRECT_URI: string;
  export const GOOGLE_CLIENT_ID: string;
  export const GOOGLE_AUTH_RESPONSE_URL: string;
  export const GOOGLE_AUTH_URL: string;
  export const GOOGLE_RESPONSE_TYPE: string;
  export const GOOGLE_SCOPE: string;
  export const GOOGLE_RESPONSE_ALT: string;
  export const ENV: 'dev' | 'prod'; // para caso vá usar variáveis diferentes para dev e produção
}
```
> **Nota**: o nome das variáveis, deve estar iguais aos nomes usados dentro do arquivo ``.env``

- Criei o arquivo na raiz do seu projeto com o nome ``.env`` com os nomes de variáveis iguais ao do arquivo criado anteriormente.

```json
USER_LOCAL_STORAGE_KEY=
EXPO_REDIRECT_URI=

GOOGLE_CLIENT_ID=
GOOGLE_AUTH_RESPONSE_URL=https://www.googleapis.com/oauth2/v1/userinfo
GOOGLE_AUTH_URL=https://accounts.google.com/o/oauth2/v2/auth
GOOGLE_RESPONSE_TYPE=token
GOOGLE_SCOPE=profile email
GOOGLE_RESPONSE_ALT=json
```
- Chamei as variáveis em qualquer arquivo que necessário, apenas importando como abaixo: 
```ts
import {
    GOOGLE_AUTH_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_AUTH_RESPONSE_URL,
    EXPO_REDIRECT_URI,
    GOOGLE_RESPONSE_TYPE,
    GOOGLE_SCOPE,
    GOOGLE_RESPONSE_ALT
} from 'react-native-dotenv';
```
- Configure o carregamento do módulo no ``babel.config.js``;
```ts
  module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
            [
                'module:react-native-dotenv', {
                    "moduleName": "react-native-dotenv"
                }
            ]
        ]
    };
};
```
> Mais informações, acesse a [página oficial no github](https://github.com/goatandsheep/react-native-dotenv).

> **NOTA**: Você pode fazer de forma mais simplificada, usando o plugin do babel chamado: ``inline-dotenv``. Apenas instalando ele e configurando para o babel carregá-lo: 

- Instale o plugin
```bash 
$ yarn add babel-plugin-inline-dotenv
```
- Configurar no arquivo ``babel.config.js``

```ts
  module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: ['inline-dotenv']
    };
  };
``` 

- Importe no arquivo desejado usando o modelo baixo: 
```ts
const { VARIABLE_NAME } = process.env;
```

> Acesse mais detalhes na [página oficial no github](https://github.com/brysgo/babel-plugin-inline-dotenv#readme).