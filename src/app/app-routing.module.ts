import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '',  redirectTo: '/books', pathMatch: 'full' },
  { path: 'book/:id', component: BookComponent},
  { path: 'books', component: BookListComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
