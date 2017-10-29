import { Component, Input, OnInit, ElementRef } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import {MyLogger} from '../../shared/common/logger'
import {Export} from './exports.class';

var $ = require('jquery');


@Component({
  selector: 'export-items',
  template: `Export Inventaire **:
            <button type="button" (click)="valid()" class="btn btn-info">Show
            </button>`,
})
export class ExportItems {
  valid() {
    console.info('items items items items');
  }
}


@Component({
    selector: 'ng-exp',
    providers: [MyLogger],
    templateUrl: './templates/exports_views.html',
})
export class ExportsComponent implements OnInit {
    /*
        Component generic will used to show export view. We need to put a new attribute type export in in the balise
        like that : <ng-exp target="ExportType" id===></ng-exp> exportType = IN ["exportItems --- look the switch block"]
    */
    export : Export;
    bindings : any = {text : "exportTasksFeeder"};
    template = ``;
    data : string;

    constructor( private logger : MyLogger, private myElement: ElementRef, private http: Http ){
      // console.log('************',myElement.nativeElement.attributes.target);
      let target:string = myElement.nativeElement.attributes.target.value;
      this.bringingView(target)
    };

    bringingView(target: string){
        switch(target){

          case "exportItems":{
            console.log('case items');
            this.template=`<div class="form">
                                <export-items> </export-items>
                           </div>`;
            break;
          }
          case "exportOrders":{
            break;
          }
          case "exportListings":{

            break;
          }
          case "exportPublimates":{
            break;
          }
          default:{
              this.template= ``;
              break;
          }
        }

    }
    
    valid(){
        // directly i get an object export
        this.logger.warn('validation OKOKOKOKOK ************');
        console.log('this data IS',this.export)
    }

    cancel(){
        this.logger.info('Canceling okokokokok ****');
    }
    

    ngOnInit() {

      this.export = {
          header:"fr",
          langue: "fr",
          encoding: "cp1252",
          separator: "semicolon",
          delimator: "none"
      };
    }

    ngOnChange() {

    }

}