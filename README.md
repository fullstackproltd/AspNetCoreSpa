[![Build status](https://asadsahi.visualstudio.com/_apis/public/build/definitions/a1519ab8-9104-47eb-96cc-6c37519c8b69/7/badge)](https://asadsahi.visualstudio.com/playground/_build/index?context=allDefinitions&path=%5C&definitionId=7&_a=completed)
[![Build status](https://ci.appveyor.com/api/projects/status/xm3d3c8wens0ee1b?svg=true)](https://ci.appveyor.com/project/asadsahi/aspnetcorespa)
[![Join the chat at https://gitter.im/aspnetcorespa/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/aspnetcorespa/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

## Features

* [ASP.NET Core](http://www.dot.net/)
* [Entity Framework Core](https://docs.efproject.net/en/latest/)
* [Angular](https://angular.io/)
* [Webpack 2](https://webpack.github.io/)
* [Bootstrap 4](http://v4-alpha.getbootstrap.com/)
* [ng-bootstrap](https://ng-bootstrap.github.io/)
* [ng2-translate](https://github.com/ocombe/ng2-translate)
* [Typescript 2](http://www.typescriptlang.org/)
* [SASS](http://sass-lang.com/) support
* [Best practices](https://angular.io/docs/ts/latest/guide/style-guide.html) in file and application organization for Angular.
* Testing Angular code with [Jasmine](http://jasmine.github.io/) and [Karma](https://karma-runner.github.io/0.13/index.html).
* End-to-end Angular code using [Protractor](http://www.protractortest.org).
* [Istanbul](https://github.com/gotwarlost/istanbul) for test coverage
  * with [Remap Istanbul](https://github.com/SitePen/remap-istanbul) for remapping Javascript to TypeScript coverage
* [HMR](https://webpack.github.io/docs/hot-module-replacement.html) (Hot Module Replacement) with Webpack
* Webpack DLL support for fast rebuilds (~ < 0.5 second)
* [compodoc](https://github.com/compodoc/compodoc) for better angular documentation
* [Typedoc](http://typedoc.io/) for typescript documentation
* [Server](https://github.com/aspnet/dotnet-watch) and [client](https://webpack.github.io/docs/hot-module-replacement.html) watches
* Login and Registration functionality using [Asp.Net Identity & JWT](https://docs.asp.net/en/latest/security/authentication/identity.html)
* Token based authentication using [Openiddict](https://github.com/openiddict/openiddict-core)
     * Get public key acess using: http://localhost:5000/.well-known/jwks
* Extensible User/Role identity implementation
* Various social login support, Follow [this](https://github.com/asadsahi/AspNetCoreSpa/wiki/Social-Login-Setup) wiki page to see how it will work.
* Lazy loading with pre loading all modules for fast navigation.
* [Angular dynamic forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html) for reusability and to keep html code DRY.
* [Serilog](https://serilog.net/) with [Seq](https://getseq.net/) support to manage structured logging.
* [Swagger](http://swagger.io/) as Api explorer (Visit url **http://localhost:5000/swagger/ui** after running the application)
 
## Pre-requisites

1. [.Net core sdk](https://www.microsoft.com/net/core#windows)
2. Either [VSCode](https://code.visualstudio.com/) with [C#](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) extension OR [Visual studio 2015 update 3](https://www.visualstudio.com/) with [.Net Core tooling](https://www.microsoft.com/net/core#windows)
3. [Nodejs](https://nodejs.org/en/)

**Make sure you have Node version >= 6.0 and NPM >= 3**

## Installation
```
1. Clone the repo
    git clone https://github.com/asadsahi/AspNetCoreSpa
2. Change directory to our repo
    cd AspNetCoreSpa
3. dotnet restore
4. Install global dependencies
    npm install protractor rimraf -g
5. npm install
6. Run the app (Development mode):
    i) One way:
        F5 (This will automatically launch browser)
    ii) Another way
        set ASPNETCORE_ENVIRONMENT=Development
        `dotnet run` (for single run) OR `dotnet watch run` (in watch mode)
        Browse using http://localhost:5000 or http://localhost:5001 
7. Run the app (Production mode):
    npm run build:prod
    set ASPNETCORE_ENVIRONMENT=Production
    `dotnet run` (for single run) OR `dotnet watch run` (in watch mode)
    Browse using http://localhost:5000 or http://localhost:5001 

```

## Other commands

### run Angular tests
```bash
npm test
# this will also create coverage remaped to typescript files in coverage folder after test run completes
```
### watch and run Angular tests
```bash
npm run test:watch
```
### Typescript documentation

 * Steps to generate:
    * npm run docs
    * cd docs
    * http-server

### Compodoc Angular documentation

 * Steps to generate:
    * npm i compodoc -g
    * npm run compodoc
    * cd documentation
    * http-server

```
### run end-to-end tests
```bash
# make sure you have your server running in another terminal (i.e run "dotnet run" command)
npm run e2e
```

### run webdriver (for end-to-end)
```bash
npm run webdriver:update
npm run webdriver:start
```

### run Protractor's elementExplorer (for end-to-end)
```bash
npm run webdriver:start
# in another terminal
npm run e2e:live
```

# [AOT - Ahead of time](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) compilation DON'TS

## The following are some things that will make AOT compile fail.

* Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
* Don’t use default exports.
* Don’t use form.controls.controlName, use form.get(‘controlName’)
* Don’t use control.errors?.someError, use control.hasError(‘someError’)
* Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
* Inputs, Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

# How to run in docker on windows: [more info](http://www.hanselman.com/blog/ExploringASPNETCoreWithDockerInBothLinuxAndWindowsContainers.aspx)
* Install docker for windows (this will install HyperV linux host on windows)
* npm run build:prod
* dotnet publish
* docker build bin\Debug\netcoreapp1.1\publish -t aspnetcorespa
* docker run -it -d -p 85:80 aspnetcorespa
* Navigate http://localhost:85

# Compatability
 * This project is supported in everygreen browsers and IE10+
 * IE8 & IE9 aren't supported since Bootstrap 4 is supported in IE10+ [explained here](http://v4-alpha.getbootstrap.com/getting-started/browsers-devices/).

# Azure MSDeploy command
* Use your site url, username, password
```
"C:\\Program Files\\IIS\\Microsoft Web Deploy V3\\msdeploy.exe" -verb:sync -enableRule:AppOffline -source:contentPath="%USERPROFILE%\AspNetCoreSpa\bin\release\netcoreapp1.1\publish" -dest:contentPath="aspnetcorespa",ComputerName="https://yoursitename.scm.azurewebsites.net/msdeploy.axd",UserName='yourusername',Password='yourpassword',AuthType='Basic'
```
