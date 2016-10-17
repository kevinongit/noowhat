import { Route } from '@angular/router';



import { MovieListComponent, MovieDetailComponent } from './index';


export const BoxofficeRoutes: Route[] = [
  	{
    	path: 'boxoffice', component: MovieListComponent	
    	// children: [
	    // 	...HomeRoutes,
	    // 	...ChartRoutes,
	    // 	...BSComponentRoutes,
     //    ...TableRoutes,
	    // 	...BlankPageRoutes,
     //    ...FormRoutes,
     //    ...GridRoutes,
     //    ...BSElementRoutes
    	// ]
  	},
	{ path: 'boxoffice/:rank', component: MovieDetailComponent }
];
