import { Component, Input, OnInit, ElementRef, ViewChild } from "@angular/core";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { JsonHttpHelper } from '../../shared/common/httpHelper';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NotificationsService } from 'angular2-notifications';

var $ = require('jquery');
require('./ngxModal.css');

@Component({
    selector: 'ng-modal-common',
    templateUrl: './ngxModal.html'
})
export class NgModalCommon{
   @ViewChild('childModal') public childModal:ModalDirective;
   @Input() title?:string;
   @Input() target?:string;
   result : any;
   skuFamily: string = 'ngxModal Hello';

  constructor(private myElement:ElementRef, private callHttp: JsonHttpHelper, private _notificationsService: NotificationsService) {
    try{
      this.target = myElement.nativeElement.attributes.target.value;
    }
    catch(e){
      this.target = 'info';
    }

  }

  show(){
    this.childModal.show();
  }

  hide(){
    this.childModal.hide();
  }

  /* 
    This function will make call http, to do something
    how to know URL ? 
    we get target and add /neteven/{this.target}
  */
  makeCall(callback: (d)=> void, url, data){
    return this.callHttp.post(url, data).subscribe(
                            (res:Response) => callback(res),
                            error => console.warn(error));
  }


  runNotification(result){
    console.warn('action result :',result); 
    // result is format of 
    // state can take : success || error || warn || alert || info || bare || create || html
    this.hide();
    let type = result.state;
    this._notificationsService.success('Evenmarketplaces :','Action a été efféctué avec succés !');
  }


  valid(){
    let validation : Observable<any>;

    if( this.target === 'info'){
      // this modal is just information popUp
      this.hide()
      return;
    }

    console.log('_________________target',this.target);
    let url = './neteven/' + this.target;
    
    //FixeME
    let data = {'items': [125551]};

    this.makeCall((d) => {
                          this.result = d.result;
                          this.runNotification(this.result);
                         }, url,data);
  }

}