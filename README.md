[![Actions Status Web](https://github.com/asadsahi/aspnetcorespa/workflows/Web/badge.svg)](https://github.com/asadsahi/aspnetcorespa/actions?query=workflow%3AWEB)
[![Actions Status STS](https://github.com/asadsahi/aspnetcorespa/workflows/STS/badge.svg)](https://github.com/asadsahi/aspnetcorespa/actions?query=workflow%3ASTS)
[![Build Status](https://asadsahi.visualstudio.com/playground/_apis/build/status/asadsahi.AspNetCoreSpa?branchName=master)](https://asadsahi.visualstudio.com/playground/_build/latest?definitionId=20&branchName=master)
[![Build status](https://ci.appveyor.com/api/projects/status/35j3sxdi22rhg70c?svg=true)](https://ci.appveyor.com/project/asadsahi/aspnetcorespa)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Features

- [ASP.NET Core 7.0](http://www.dot.net/)
- [Entity Framework Core 7.0](https://docs.efproject.net/en/latest/)
  - Both Sql Server and Sql lite databases are supported (Check installation instrcutions for more details)
- [Identity Server 4](http://identityserver.io/)
- [Angular 15](https://angular.io/)
- [Angular CLI 15](https://cli.angular.io/)
- Secure - with CSP and custom security headers
- [SignalR](https://github.com/aspnet/SignalR/)
- [SASS](http://sass-lang.com/)
- Best [practices](https://angular.io/docs/ts/latest/guide/style-guide.html) for Angular code organisation.
- [Clean Architecture](https://github.com/jasontaylordev/CleanArchitecture) inspired from Jason Taylor.
- [PWA support](https://developers.google.com/web/progressive-web-apps/)
- Fast Unit Testing with [Jest](https://facebook.github.io/jest/).
- E2E testing with [Protractor](http://www.protractortest.org).l
- [Compodoc](https://compodoc.github.io/compodoc/) for Angular documentation
- Login and Registration functionality using [Identity Server implicit flow](http://identityserver.io/)
- Extensible User/Role identity implementation
- Social logins support with token based authentication, using [Identity Server](http://identityserver.io/)
- Angular dynamic forms for reusable and DRY code.
- [Swagger](http://swagger.io/) as Api explorer (Visit url **https://127.0.0.1:5005/swagger** OR whatever port visual studio has launched the website.). More [details](https://github.com/domaindrivendev/Swashbuckle.AspNetCore)

## Pre-requisites

1. [.Net 7.0 SDK](https://www.microsoft.com/net/core#windows)
2. [Visual studio 2019](https://www.visualstudio.com/) OR [VSCode](https://code.visualstudio.com/) with [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) extension
3. [NodeJs](https://nodejs.org/en/) (Latest LTS)
4. [Microsoft SQL Server](https://www.microsoft.com/en-us/sql-server) (Optional: If MS SQL server required instead of Sqlite during development)
5. [Docker](https://www.docker.com/) (Optional: If application will run inside docker container)

## Installation

1. Clone the repo:

   git clone https://github.com/asadsahi/AspNetCoreSpa

2. Change directory:

   cd AspNetCoreSpa

3. Restore packages:

   dotnet restore AspNetCoreSpa.sln

4. Install npm packages:

   - cd src/Presentation/Web/ClientApp:

   - npm install

5. Start Frontend:

   - npm start

6. Run Backend:

   - Using [VSCode](https://code.visualstudio.com/):

     - If you are running for the first time, install dev certificates using command:

     ```
     dotnet dev-certs https --trust
     ```

     - From debug menu select `Web` profile to run api application
     - From debug menu select `STS` profile to run Identity Server application

   - Using [Visual Studio IDE](https://www.visualstudio.com/):
     - Run `Web` and `STS` projects either individually or by setting multiple projects in solutions properties and hit F5

7. Target either Sqlite or Microsoft SQL Server

This project supports both databases OOTB.

- Run with Sqlite: (Already configured to quickly run the project)

  - Project is already setup with Sqlite specific database migrations

- Run with Microsoft SQL Server:
  - Delete `Migrations` folder from src/Infrastructure/Infrastructure/Persistence
  - Change setting in appsettings.json called `useSqLite` from `true` to `false` and change `Web` connection string to your local Sql Server connection string

8. Once the project is running use following test users to login:

   2 Test users:
   Username: admin@admin.com
   Password: P@ssw0rd!
   OR
   Username: user@user.com
   Password: P@ssw0rd!

   Note: For production use Identity server hosted with appropriate configuration.

# Managing Migrations

## Make sure you have ef core global tools installed

`dotnet tool install --global dotnet-ef`

# Web Migrations

## Using command line (from root of the project)

### Create Migration

`dotnet ef migrations add migrationname --startup-project ./src/Presentation/Web --project ./src/Infrastructure/Infrastructure --context ApplicationDbContext -o Persistence/Migrations`

### Update database

`dotnet ef database update --startup-project ./src/Presentation/Web --project ./src/Infrastructure/Infrastructure --context ApplicationDbContext`

### Drop database

`dotnet ef database drop --startup-project ./src/Presentation/Web --project ./src/Infrastructure/Infrastructure --context ApplicationDbContext`

# Localization Migrations

## Using command line (from root of the project)

### Create Migration

`dotnet ef migrations add migrationname --startup-project ./src/Presentation/Web --project ./src/Infrastructure/Infrastructure --context LocalizationDbContext -o Localization/Migrations`

### Update database

`dotnet ef database update --startup-project ./src/Presentation/Web --project ./src/Infrastructure/Infrastructure --context LocalizationDbContext`

### Drop database

`dotnet ef database drop --startup-project ./src/Presentation/Web --project ./src/Infrastructure/Infrastructure --context LocalizationDbContext`

# Identity Migrations

## Using command line (from root of the project)

### Create Migration

`dotnet ef migrations add migrationname --startup-project ./src/Presentation/STS --project ./src/Infrastructure/Infrastructure --context IdentityServerDbContext -o Identity/Migrations`

### Update database

`dotnet ef database update --startup-project ./src/Presentation/STS --project ./src/Infrastructure/Infrastructure --context IdentityServerDbContext`

### Drop database

`dotnet ef database drop --startup-project ./src/Presentation/STS --project ./src/Infrastructure/Infrastructure --context IdentityServerDbContext`

# Other commands

### Angular component scaffolding

Note: You need to run commands from `src/Presentation/Web/ClientApp` directory: More information [here](https://angular.io/cli)

### Angular tests - Using [Jest](https://jestjs.io/en/) and Angular jest [preset](https://github.com/thymikee/jest-preset-angular)

```bash
cd src/Presentation/Web/ClientApp

npm test
```

### Compodoc Angular documentation

- Steps to generate:
  - npm i compodoc -g
  - cd src/Presentation/Web/ClientApp
  - npm run compodoc
  - cd documentation
  - http-server

Compodoc documentation: ![alt text](compodoc.jpg "compodoc documentation")

````
### run end-to-end tests
```bash
# make sure you have your server running in another terminal (i.e run "dotnet run" command)
npm run e2e
````

### run Protractor's elementExplorer (for end-to-end)

```bash
npm run webdriver:start
# in another terminal
npm run e2e:live
```

# Azure Deploy

- You can set an environment variable for azure app deployment password
  Set-Item -path env:AzureAppPass -value passwordhere

```
From powershell:
./deploy-azure.ps1
```

# Deploy to heroku using its container service

### Replace your app name where it is `aspnetcorespa`

- dotnet publish -c release
- docker build -t aspnetcorespa ./bin/release/net7.0/publish
- heroku login
- heroku container:login
- docker tag aspnetcorespa registry.heroku.com/aspnetcorespa/web
- docker push registry.heroku.com/aspnetcorespa/web
  Note: There is a `deploy.heroku.ps1` script included with this project which automates above steps.

# Deploy to Azure as App Service

Set-Item -path env:AzureAppPass -value passwordhere

```
From powershell:
./deploy-azure.ps1
```

---

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RB7XESV8CP7GW)
