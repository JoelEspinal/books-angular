import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { Router } from '@angular/router';

import { Book } from '../models/book';
import { BookComponent } from "../book/book.component";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books?: Array<any> = [];
  searchedBook: string = "";

  constructor(public bookService: BookServiceService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.loadBooks();
    console.log("books", this.books)
  
  }

  loadBooks() {
    this.bookService.getBooks()
    .subscribe((data: any) => this.books = data);
  }

  searchBook() {
    if (this.searchedBook == "") {
      this.loadBooks();
    } else {
      let bookId: number = parseInt(this.searchedBook);
      if(isNaN(bookId)) {
        bookId = 0;
      }

      this.bookService.searchBook(bookId)
      .subscribe((data: any) => this.books = (data == null)? [] : [data]);
    }
  }

  // bookDetail(id: number){
  //   this.router.navigate(['book', id]);
  // }
}
