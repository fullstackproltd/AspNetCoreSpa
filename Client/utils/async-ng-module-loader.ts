/*
 * Thank to Brandon
 * https://gist.github.com/brandonroberts/02cc07face25886fe142c4dbd8da1340
 */

import { Injectable, NgModuleFactory, NgModuleFactoryLoader, Compiler, Type } from '@angular/core';

class LoaderCallback {
  constructor(public callback: any) {}
}

export let load: Type = (callback: Function) => {
  return new LoaderCallback(callback);
};

/**
 * NgModuleFactoryLoader that uses Promise to load NgModule type and then compiles them.
 * @experimental
 */
@Injectable()
export class AsyncNgModuleLoader implements NgModuleFactoryLoader {
  constructor(private compiler: Compiler) {}

  load(modulePath: string|LoaderCallback): Promise<NgModuleFactory<any>> {
    if (modulePath instanceof LoaderCallback) {
      let loader = (modulePath as LoaderCallback).callback();

      return Promise
          .resolve(loader)
          .then((type: any) => checkNotEmpty(type, '', ''))
          .then((type: any) => this.compiler.compileModuleAsync(type));
    }

    return Promise.resolve(null);
  }
}

function checkNotEmpty(value: any, modulePath: string, exportName: string): any {
  if (!value) {
    throw new Error(`Cannot find '${exportName}' in '${modulePath}'`);
  }
  return value;
}