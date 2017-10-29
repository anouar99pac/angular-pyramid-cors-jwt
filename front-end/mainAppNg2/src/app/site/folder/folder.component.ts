import { Component, Input, OnInit, ElementRef } from "@angular/core";
import {MyLogger} from '../../shared/common/logger';
import { TreeNode } from 'primeng/primeng';
import { FolderService } from './folder.service';

// don t work pyramid denied access policy security
//// in your modules just require the stylesheet
// This has the side effect that a <style>-tag is added to the DOM.
// so we should to do require('')
// import '../../../../node_modules/primeng/resources/themes/omega/theme.css';
// import '../../../../node_modules/primeng/resources/primeng.min.css';
// import '../../../../node_modules/font-awesome/css/font-awesome.min.css';

var $ = require('jquery');

@Component({
    selector: 'ng-folder',
    providers: [MyLogger],
    templateUrl: './templates/folder.component.html',
})
export class FoldersComponent implements OnInit {
    items: TreeNode[];
    selectedItem: TreeNode;
    catChecked = false;
    category_model_id = null;

    constructor ( private fservice : FolderService){
    }

    ngOnInit(){
        this.fservice.getFiles().then(items => this.items = items);
    }

    nodeSelect(event){
        //event.node = selected node
        this.category_model_id = event.node.category_model_id;
    }

    confirm(){
        if(! this.selectedItem){
            return;
        }
        let data = {};
        data['folder_id'] = this.selectedItem.data;
        data['assign_model'] = this.catChecked;
        data['category_model_id'] = this.category_model_id;
        console.warn('=======',data);
        // make http call to pyramid for update
        this.fservice.assignToFolder(data);
    }

    cancel(){

    }




}