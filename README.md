<h1 align="center">Softwrap</h1>

## Requerimentos
1. Inserir conteúdo na tabela
2. Editar o conteúdo da tabela.
3. Remover conteúdo da tabela.
4. Paginar a tabela.

## Coisa que há em cada tabela
- Nome
- Idade
- Estado Civil
- CPF
- Cidade
- Estado

## Tecnologias usadas
Para o front-end será utilizado React com React bootstrap, para o back-end será utilizado Express.js com Body-parser por ser simples de criar rotas e fazer parsing do json que chega na requisição http junto com Jest para testes unitários e de integração. Para testes, o banco de dados utilizado é o Sqlite por ser simples de colocar dentro do Continuous Integration do Github e em ambiente de desenvolvimento e produção é utilizado Postgresql. Os dois bancos de dados são manipulados pela dependencia Sequelize que é um ORM que funciona para diversos bancos de dados. 

