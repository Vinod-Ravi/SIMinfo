import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { 

  }
  postSimInfo(data: any)
  {
   /* console.log(data);*/
    return this.http.post<any>("http://localhost:3000/simInfoList/",data);
  }
  getSimInfo()
  {
    return this.http.get<any>("http://localhost:3000/simInfoList/");
  }
}