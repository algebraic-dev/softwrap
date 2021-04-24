<h1 align="center">Softwrap</h1>

![Demonstração](https://s3.gifyu.com/images/ezgif.com-gif-maker3c3d044c1fb8f568.gif)

## Oque é isso?
Nesse repositório há o front e back end de uma aplicação para cadastrar, editar e remover usuários. 

## Tecnologias usadas
Para o front-end será utilizado React com React bootstrap, para o back-end será utilizado Express.js com Body-parser por ser simples de criar rotas e fazer parsing do json que chega na requisição http, junto com Jest para testes unitários e de integração. Para testes, o banco de dados utilizado é o Sqlite por ser simples de colocar dentro do Continuous Integration do Github e em ambiente de desenvolvimento e produção é utilizado Postgresql. Os dois bancos de dados são manipulados pela dependencia Sequelize que é um ORM que funciona para diversos bancos de dados. 

## Features
- Cadastrar, editar e remover usuários 
- Paginar os usuários

## Como iniciar
É necessário, primeiramente, instalar as dependencias de cada projeto e também ter instalado globalmente o `yarn` e o `npx`.
```
$ yarn install
```
Para migrar a tabela para o banco de dados de desenvolvimento (sqlite):
```
$ yarn migrate:db
```
Para iniciar o front-end com React:
```
$ yarn start:client
```
Para iniciar o back-end:
```
$ yarn start:server
```
O servidor Back-end inicializará na porta 4040 e o front-end na porta 3000. 
