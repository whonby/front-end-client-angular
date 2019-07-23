import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

   public hostJava:string="http://localhost:8009"

  constructor(private http:HttpClient) { }

  public getResourceJava(url){
     return this.http.get(this.hostJava+url);
  }
  public getResourcePostJava(url,data,header){
    return this.http.post(this.hostJava+url,data,header);
  }

  public getResourcePutJava(url,data,header){
    return this.http.put(this.hostJava+url,data,header);
  }
}
