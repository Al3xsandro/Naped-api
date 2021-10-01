<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Descrição

  - Naped API

  - Rotas 🚀
    
    `[POST]` /users/create
     - Criar um novo usuário

            {
              email: "`example@example.com`",
              username: "`example`",
              password: "`hardpassword`"
            }
    `[POST]` /users/auth
    - Obter token jwt

          {
            email: "`example@example.com`",
            password: "`hardpassword`"
          }
          
     `[GET]` /users/me
     - Obter informações do usuário

           {
              id: "75659bcc-b2c1-4eae-82f1-788259ae3022",
              email: "example@example.com",
              username: "example",
              isVerified: false,
              isAdmin: false,
              created_at: "2021-09-28T14:26:24.414Z"
           }

## Instalação

```bash
$ yarn
```

## Iniciando a aplicação

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# tests 
$ yarn test
```

## License

Nest is [MIT licensed](LICENSE).
