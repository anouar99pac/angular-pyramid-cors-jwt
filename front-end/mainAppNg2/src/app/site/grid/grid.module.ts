import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';

import { GridService } from "./grid.service";

@NgModule({
  	providers: [GridService]
  })
	export class GridModule {
		constructor (@Optional() @SkipSelf() parentModule: GridModule) {
		    if (parentModule) {
		      throw new Error(
		        'CoreModule is already loaded. Import it in the AppModule only');
		    }
	 	}
	static forRoot(): ModuleWithProviders {
	    return {
	      	ngModule: GridModule,
	      	providers: [GridService]
	    };
	}
}
