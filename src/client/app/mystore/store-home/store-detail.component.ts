import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { StoreService } from './store.service';
import { Product } from './product';

@Component({
	moduleId: module.id,
	selector: 'store-detail',
	templateUrl: 'store-detail.component.html',
	styleUrls: [ 'store-list.component.css' ]
})
export class StoreDetailComponent implements OnInit {
	// @Input() movie: Movie;
	// movieDetail = null;
	product : Product = null;
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
			this.product = this.storeService.getOneProduct(id);
			console.log('Product Detail : ' + JSON.stringify(this.product));

		});
	}

	goBack(): void {
		this.location.back();
	}
}
