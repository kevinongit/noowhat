import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from './movie.service';
// import { Movie } from './movie';

@Component({
	moduleId: module.id,
	selector: 'my-movie-detail',
	templateUrl: 'movie-detail.component.html'
	// styleUrls: [ require('./movie-detail.component.css').toString() ]
})
export class MovieDetailComponent implements OnInit {
	// @Input() movie: Movie;
	// movieDetail = null;
	movieDetail : any = null;
	constructor(
		private movieService: MovieService,
		private route: ActivatedRoute,
		private location: Location
	) {

	}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			let rank = params['rank'];
			console.log('rank : ' + rank);
			this.movieDetail = this.movieService.getOneMovie(rank);
			console.log('Movie Detail : ' + JSON.stringify(this.movieDetail));
		// 	this.movieService.getMovieDetail(movieName)
		// 		.subscribe(resp => {
		// 		  console.log('inside subscribe');
		// 		  console.log('movie : ' + resp);
		// 		 this.movieDetail = resp.channel.item[0];
		// 		});
		// 	console.log('ngOnInit');
		// 	// this.movieServie.getMovie(id)
		// 
		});
	}

	goBack(): void {
		this.location.back();
	}
}