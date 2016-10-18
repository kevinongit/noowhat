import { Route } from '@angular/router';
import { MovieListComponent, MovieDetailComponent } from './index';

export const HomeRoutes: Route[] = [
  	{
    	path: 'home',
    	component: MovieListComponent
  	},
	{ 
		path: 'home/:rank',
		component: MovieDetailComponent
	}
];
