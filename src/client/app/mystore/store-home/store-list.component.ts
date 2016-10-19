import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { StoreService } from './store.service';
import { Product } from './product';

@Component({
	moduleId: module.id,
    selector: 'store-list',
    templateUrl: 'store-list.component.html'
  	// styleUrls: [ require('./movies.component.css').toString() 
})
export class StoreListComponent implements OnInit {
	products : Product[];

	constructor(
		private router: Router,
		private storeService : StoreService) {

	}

	ngOnInit(): void {
		this.getProducts();
	}

	getProducts(): void {
		// this.movieService.getMovies().then(movies => this.movies = movies);
		// this.movies = this.movieService.getMovies();
		this.storeService.getProducts().subscribe(products => {
				 	console.log('in subscribe');
				 	this.products = products;
				 	console.log('products.length = ' + this.products.length);
				 });
		console.log('in getMovies()');
	}

}