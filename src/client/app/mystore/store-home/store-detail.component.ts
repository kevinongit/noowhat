import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { StoreService } from './store.service';
import { Product } from './product';

@Component({
	moduleId: module.id,
	selector: 'store-detail',
	templateUrl: 'store-detail.component.html'
	// styleUrls: [ require('./movie-detail.component.css').toString() ]
})
export class StoreDetailComponent implements OnInit {
	// @Input() movie: Movie;
	// movieDetail = null;
	productDetail : Product = null;
	constructor(
		private storeService: StoreService,
		private route: ActivatedRoute,
		private location: Location
	) {

	}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			let id = params['id'];
			console.log('id : ' + id);
			this.productDetail = this.storeService.getOneProduct(id);
			console.log('Movie Detail : ' + JSON.stringify(this.productDetail));

		});
	}

	goBack(): void {
		this.location.back();
	}
}
