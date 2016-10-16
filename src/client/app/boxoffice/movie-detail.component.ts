import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from './movie.service';
import { Movie } from './movie';

@Component({
	selector: 'my-movie-detail',
	template: require('./movie-detail.component.html'),
	// styleUrls: [ require('./movie-detail.component.css').toString() ]
})
export class MovieDetailComponent implements OnInit {
	@Input() movie: Movie;
	movieDetail = null;

	constructor(
		private movieService: MovieService,
		private route: ActivatedRoute,
		private location: Location
	) {

	}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			let movieName = params['movieName'];
			console.log('movieName : ' + movieName);
			this.movieService.getMovieDetail(movieName)
				.subscribe(resp => {
				  console.log('inside subscribe');
				  console.log('movie : ' + resp);
				 this.movieDetail = resp.channel.item[0];
				});
			console.log('ngOnInit');
			// this.movieServie.getMovie(id)
		});
	}

	goBack(): void {
		this.location.back();
	}
}