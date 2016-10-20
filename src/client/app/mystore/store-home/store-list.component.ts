import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { StoreService } from './store.service';
import { Product } from './product';

const NUM_OF_COLUMN =4;

@Component({
	moduleId: module.id,
    selector: 'store-list',
    templateUrl: 'store-list.component.html',
  	styleUrls: [ 'store-list.component.css' ] 
})
export class StoreListComponent implements OnInit {
	products : Product[];
	products2 : any[];
	
	constructor(
		private router: Router,
		private storeService : StoreService) {
		this.products2 = [];
	}

	ngOnInit(): void {
		this.getProducts();
	}

	convertDimension(one: Product[]) {
		while(one.length > 0) {
			this.products2.push(one.splice(0,NUM_OF_COLUMN));
		}
		console.log('products2.length :' + this.products2.length);
	}

	getProducts(): void {
		// this.movieService.getMovies().then(movies => this.movies = movies);
		// this.movies = this.movieService.getMovies();
		this.storeService.getProducts().subscribe(products => {
				 	console.log('in subscribe');
				 	this.products = products;
				 	console.log('products.length = ' + this.products.length);
					this.convertDimension(this.products);
				 });
		console.log('in getMovies()');
	}

}