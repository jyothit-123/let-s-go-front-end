import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LetsgoService {

  constructor(private http:HttpClient) { }

  baseUrl="http://localhost:4000/"
  signup(data:any):Observable<any>{
     return this.http.post(this.baseUrl+'signup', data)
  }
}
