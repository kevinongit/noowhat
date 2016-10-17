import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';


import { MovieListComponent } from './movie-list.component';
import { MovieService } from './movie.service'

// import {TopNavComponent} from '../shared/index';
// import {SidebarComponent} from '../shared/index';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	DropdownModule,
        ModalModule,
    ],
    declarations: [MovieListComponent],
    providers: [MovieService],
    exports: [MovieListComponent]
})

export class BoxofficeModule { }
