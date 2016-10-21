import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Product } from './product';
import { PRODUCT_LIST } from './mock-product';


@Injectable()
export class StoreService {


	constructor(private http: Http) {

	}

	getProducts() : Observable<Product[]> {
		console.log(' # of PRODUCT : ' + PRODUCT_LIST.length);
		return Observable.of(PRODUCT_LIST);
	}

	getOneProduct(id:number) : Product {
		let products = PRODUCT_LIST;

		return products.filter(item => item.id === id)[0];
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}
