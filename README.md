[![Build status](https://ci.appveyor.com/api/projects/status/ilf9yiplb03f1a02?svg=true)](https://ci.appveyor.com/project/asadsahi/aspnetcorespa)
[![Join the chat at https://gitter.im/mgechev/angular2-seed](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aspnetcorespa/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/asadsahi/AspNetCoreSpa.svg)](https://david-dm.org/asadsahi/AspNetCoreSpa)
[![devDependencies Status](https://david-dm.org/asadsahi/AspNetCoreSpa/dev-status.svg)](https://david-dm.org/asadsahi/AspNetCoreSpa?type=dev)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Features

* [ASP.NET Core](http://www.dot.net/)
* [Entity Framework Core](https://docs.efproject.net/en/latest/)
* [Angular 2 RC5](https://angular.io/)
* [Webpack](https://webpack.github.io/)
* [SASS](http://sass-lang.com/) support
* [Best practices](https://angular.io/docs/ts/latest/guide/style-guide.html) in file and application organization for Angular 2.
* Testing Angular 2 code with [Jasmine](http://jasmine.github.io/) and [Karma](https://karma-runner.github.io/0.13/index.html).
* Coverage with [Istanbul](https://github.com/gotwarlost/istanbul) and [Karma](https://karma-runner.github.io/0.13/index.html).
* Type manager with [Typings](https://github.com/typings/typings)
* [HMR](https://webpack.github.io/docs/hot-module-replacement.html) (Hot Module Replacement) with Webpack
* [Typedoc](http://typedoc.io/) for typescript documentation
* [Server](https://github.com/aspnet/dotnet-watch) and [client](https://webpack.github.io/docs/hot-module-replacement.html) watches
* Login and Registration functionality using [Asp.Net Identity](https://docs.asp.net/en/latest/security/authentication/identity.html)
* Lazy loading of all routes, child routes (About page example) with basic animation example (On about page).
* [Angular 2 dynamic forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html) for reusability and to keep html code DRY.
* [Serilog](https://serilog.net/) with [Seq](https://getseq.net/) support to manage structured logging.
* [Swagger](http://swagger.io/) as Api explorer (Visit url **http://localhost:5000/swagger/ui** after running the application)
 
## Pre-requisites

1. [.Net core sdk](https://www.microsoft.com/net/core#windows)
2. Either [VSCode](https://code.visualstudio.com/) with [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) extension OR [Visual studio 2015 update 3](https://www.visualstudio.com/) with [.Net Core tooling](https://www.microsoft.com/net/core#windows)
4. [Nodejs](https://nodejs.org/en/)


## Installation
```
1. Clone the repo
    git clone https://github.com/asadsahi/AspNetCoreSpa
2. Change directory to our repo
    cd AspNetCoreSpa
3. dotnet restore
4. Install global dependencies
    npm install typings rimraf webpack -g
5. npm install
6. typings install
7. Create webpack vendor manifest file for fast webpack rebuils
    webpack --config config/webpack.config.vendor.js
8. Set appropriate environment 
    set ASPNETCORE_ENVIRONMENT=Development
9. Run the app 
    dotnet run (for single run) OR dotnet watch (in watch mode)
10. Browse using http://localhost:5000

```

## Other commands

### run Angular 2 tests
```bash
npm run test
```
### watch and run Angular 2 tests
```bash
npm run watch:test
```
### Typescript documentation
```bash
npm run docs
# this will create documentation in doc folder at the root location (open index.html file) 
```
