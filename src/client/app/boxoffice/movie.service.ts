import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import  { Observable } from 'rxjs/Rx';

import { Movie } from './movie';
import { MOVIES } from './mock-movies';

@Injectable()
export class MovieService {
	private moviesUrl = 'api/movies';
	private headers = new Headers({'Content-Type' : 'application/json'});
	// movieList : Movie[] = [];
	// private url = 'http://localhost:9000/api/movies';

	constructor(private http: Http) {
		this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
        this.headers.append('Access-Control-Allow-Methods', 'GET');
        this.headers.append('Access-Control-Allow-Origin', '*');
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	private convert(resp) {
		var obj = resp.json();
		const boxList = obj.boxOfficeResult.dailyBoxOfficeList;
		var movieList : Movie[] = [];

		console.log('convert:boxList.length = ' + boxList.length);
		for (var i=0; i < boxList.length; i++) {
			var movie: Movie = new Movie();
			movie.rank = boxList[i].rank;
			movie.movieName = boxList[i].movieNm;
			movieList.push(movie);
		}
		console.log('convert : movieList.length = ' + movieList.length);
		return movieList;
	}

	getMovies() : Observable<any> {
		console.log('service : getMovies()');
		return this.http.get(this.moviesUrl)
				 .map(response => response.json());
		
	}

	getMovieDetail(name: string) : Observable<any> {
		console.log('service: getMovieDetail');
		return this.http.get(this.moviesUrl + '/' + name)
					.map(response => response.json());
	}

	getMovie(rank: number) : Observable<Movie> {
		return this.getMovies()
			.map(movies => movies.find(movie => movie.rank === rank));
	}
	// getMovies() : Promise<Movie[]> {
	// 	console.log('service : getMovies()');
	// 	// return Promise.resolve(MOVIES);
	// 	return this.http.get(this.moviesUrl, {headers: this.headers})
	// 				.toPromise()
	// 				.then(response => {
	// 					console.log('in then');
	// 					var movieList = this.convert(response);
	// 					console.log('movieList.length = ' + movieList.length);
	// 					return Promise.resolve(movieList);
	// 				})
	// 				// .then(response => {
	// 				// 	var movieList = this.convert(response);
	// 				// 	// response.json().data as Movie[]
	// 				// })
	// 				.catch(this.handleError);
	// }

	// getMovie(rank: number): Promise<Movie> {
	// 	return this.getMovies()
	// 			.then(movies => movies.find(movie => movie.rank === rank));
	// }

}
