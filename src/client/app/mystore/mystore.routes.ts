import { Route } from '@angular/router';

import { StoreHomeRoutes } from './store-home/index';
import { MystoreComponent } from './index';


export const MystoreRoutes: Route[] = [
  	{
    	path: 'mystore', component: MystoreComponent,
		children : [
			...StoreHomeRoutes
		]
  	}
];
