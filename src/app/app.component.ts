import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  session: any;
   dataset: Numbers = {
     numbers: [],
     order: ''
   };

   constructor(private http: HttpClient) {
   }

   onSubmit() {
     this.http.post<Numbers>('http://localhost:8080/numbers/sort-command', this.dataset, {responseType: 'text' as 'json'}).subscribe(
       res => {
         this.dataset = res;

         localStorage.setItem('session', JSON.stringify(res))
         window.location.reload();
       }
     )
   }

   get local(): any {
     return localStorage.getItem('session');
   }

  ngOnInit(): void{
  }

}

interface Numbers {
  numbers: Array<number>;
  order: string;
}
