import { Component , OnInit} from '@angular/core';

import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { GridService } from "./grid.service";

@Component({
  // 	moduleId: module.id,
  selector: 'grid',
  // outputs: ['commandes'],
  // providers:[CommandesService],
  // templateUrl: './grid.component.html'
  template:'grid template'
})
export class GridComponent implements OnInit {

	public data: String[];
	mode = 'Observable';

	constructor(
	    public gridService: GridService,
		private route: ActivatedRoute,
		private location: Location
	) {
		console.log("create instance of grid component")
	}

	

	ngOnInit(): void {
	  	console.log('init grid');		
		this.getData();

	}	
	getData(): void{
		console.log("getData)")
	 	 this.gridService.getData().subscribe(orders => { this.data = orders;  this.gridService.data = orders});
	 	console.log(this.data)
	}
		

	goBack(): void {
  		this.location.back();
	}
}
