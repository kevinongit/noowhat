import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { MovieService } from './movie.service';

@Component({
	// moduleId: module.id,
    selector: 'movie-list',
    template: './movie.component.html'
  	// styleUrls: [ require('./movies.component.css').toString() 
})
export class MovieListComponent implements OnInit {
	movies : any[];

	constructor(
		private router: Router,
		private movieService : MovieService) {

	}

	ngOnInit(): void {
		this.getMovies();
	}

	getMovies(): void {
		// this.movieService.getMovies().then(movies => this.movies = movies);
		// this.movies = this.movieService.getMovies();
		this.movieService.getMovies().subscribe(boxInfo => {
				 	console.log('in subscribe');
				 	this.movies = boxInfo.movies;
				 	console.log('movies.length = ' + this.movies.length);
				 });
		console.log('in getMovies()');
	}

}