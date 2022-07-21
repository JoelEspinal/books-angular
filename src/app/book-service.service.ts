import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

   ApiUrl: string = "https://localhost:7035/api/Books";

  constructor(private httpClient: HttpClient) {

  }

  getBooks()  {
   return this.httpClient.get<Book[]>(this.ApiUrl)
  }

  searchBook(id: number)  {
    let url = this.ApiUrl + "/" + id;
    return this.httpClient.get<Book>(url)
   }

   deleteBook(id: number)  {
    let url = this.ApiUrl + "/" + id;
    let headers: HttpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*')
     return this.httpClient.delete<any>(url, {headers: headers})
   }

   saveBook(book: Book) {
    if(book.id > 0) {
      let url = this.ApiUrl + "/" + book.id;
      return this.httpClient.put(url, book);
    }else {
      return this.httpClient.post(this.ApiUrl, book);
    }
   }
}
