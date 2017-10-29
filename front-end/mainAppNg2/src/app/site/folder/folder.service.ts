import { Injectable } from '@angular/core';
import { provide, Provider } from 'angular2/core';
import { Http, RequestOptions, Headers, Response} from '@angular/http';
import { TreeNode } from 'primeng/primeng';
import '../../imports/rxjs-operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FolderService {
    constructor(private http: Http) {}
    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    getFiles() {
        return this.http.get('./neteven/folders-classification')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().result.data);
    }

    assignToFolder(data){

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('./neteven/assign-to-folders',data)
            .toPromise()
            .then()
            .catch(this.handleError)
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}