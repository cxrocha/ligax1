# DOC

# ADD: ENV

- Instalar a lib ```react-native-dotenv``` e a tipagem ```@types/react-native-dotenv``` 

- Adicionar estas informações ao babel.config.js
```js
plugins: [
  'module:react-native-dotenv', {
    "moduleName": "react-native-dotenv"
  }
]
```

- Criar pasta ``types`` e dentro dela criar o arquivo env.d.ts com as informações abaixo:
```js
declare module 'react-native-dotenv' {
  export const USER_LOCAL_STORAGE_KEY: string; // Nome da variável
  export const ENV: 'dev' | 'prod'; // Caso tenha tenha informações diferentes para dev e prod
}
```

- Importar dentro do arquivo do projeto onde deseja acessar as variável
```js
import { USER_LOCAL_STORAGE_KEY } from 'react-native-dotenv'; 
```