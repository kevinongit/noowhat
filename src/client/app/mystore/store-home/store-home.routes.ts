import { Route } from '@angular/router';
import { StoreListComponent, StoreDetailComponent } from './index';

export const StoreHomeRoutes: Route[] = [
  	{
    	path: 'home',
    	component: StoreListComponent
  	},
	{
		path: 'home/:id',
		component: StoreDetailComponent
	}
];
