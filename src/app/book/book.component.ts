import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServiceService } from '../book-service.service';
import { Book } from '../models/book'; 

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  id: number = 0;
  book: Book = new Book();


  constructor(public bookService: BookServiceService, private route: ActivatedRoute, private router: Router) {   }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.params['id']); 
    if(isNaN(this.id)) {
      this.id = 0;
    }

    this.loadBook();
  }

  loadBook() {
    this.bookService.searchBook(this.id)
    .subscribe((data: Book) => {
      this.book = data || new Book();
    }, (error: any) => {
      if(error.status != 200) {
        alert("this book cannot be deleted"); 
        this.router.navigate(['/books']);
      }
    })
  }

  deleteBook() {
    this.bookService.deleteBook(this.id)
    .subscribe((data: any) => {
      this.router.navigate(['/books']);
    }, (error: any) => {
      if(error.status != 200) {
        alert("this book cannot be deleted"); 
      }
    });
  }

  saveBook() {
    this.bookService.saveBook(this.book).subscribe((data: any) => {
      this.router.navigate(['/books']);
    }, (error: any) => {
      if(error.status != 200) {
        alert("this book cannot be saved");
      }
    });
    
  }
}
