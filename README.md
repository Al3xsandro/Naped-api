<h2 align="center">Naped API 🎥</h2>

<p align="center">
  <a href="/">Tecnologias 🖥️</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 
  <a href="/">Layout 🎨</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="/">Como executar ▶️</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="/">Licença 📖</a>
</p>

Demo: <a href="https://naped-project.herokuapp.com">`https://naped-project.herokuapp.com/api`</a>
  

## Rotas

   - Swagger

      `[GET]` /api

   - Usuários :rocket:

      `[POST]` /users/create
       - Criar um novo usuário

              {
                email: "example@example.com",
                username: "example",
                password: "hardpassword"
              }
      `[POST]` /users/auth
      - Obter token jwt

            {
              email: "example@example.com",
              password: "hardpassword"
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

       `[GET]` /users/{username}
       - Obter informação de um usuário em especifico

              {
                username: "example",
                created_at: "2021-09-28T14:26:24.414Z"
              }
   
   - Notícias :rocket:
   
      `[GET]` /news
      - Retorna todas as notícias presentes no banco de dados
      
            {
              id: "",
              title: "",
              description: "",
              likes: "",
              views: "", 
              thumbnail: "",
              categorie: "",
              created_at: ""
            }
            
     `[POST]` /news/create
     - Criar nova notícia

            {
              title: "",
              description: "",
              thumbnail: "",
              categorie: ""
            }
            
     `[PUT]` /news/like
      - Favoritar noticia

             {
                "likes": 1
             }
            

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
