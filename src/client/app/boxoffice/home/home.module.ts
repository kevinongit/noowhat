import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from './movie.service';

@NgModule({
    imports: [CommonModule, CarouselModule, DropdownModule, AlertModule, RouterModule],
    declarations: [MovieListComponent, MovieDetailComponent],
    providers: [MovieService],
    exports: [MovieListComponent, MovieDetailComponent]
})

export class HomeModule { }
