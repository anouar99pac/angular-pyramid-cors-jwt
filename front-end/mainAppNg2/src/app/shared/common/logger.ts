import { Injectable } from '@angular/core';
import { provide, Provider } from 'angular2/core';

@Injectable()
export class MyLogger {
    public log (logMsg: string){
        console.log(logMsg);
    }

    public warn (logMsg: string){
        console.warn(logMsg);
    } 

    public error (logMsg: string){
        console.error(logMsg);
    } 

    public info (logMsg: string){
        console.info(logMsg);
    } 

    public table (logMsg: any){
        console.table(logMsg);
    }

    public exception (logMsg: any){
        console.exception(logMsg);
    }

    public debug (logMsg: any){
        console.debug(logMsg);
    } 

}

export var LOGGING_PROVIDERS:Provider[] = [
      provide(MyLogger, {useClass: MyLogger}),
];