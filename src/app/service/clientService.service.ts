import { Injectable } from '@angular/core';
import {AppService} from "./appService.service";
import { Client } from "../client/client";
import Swal from 'sweetalert2'
import {map,catchError} from "rxjs/internal/operators";
import {HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";
import { Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 // private listeclient;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private appService:AppService,private router:Router) { }

 allClient(page :number):Observable<any>{
    return this.appService.getResourceJava("/api/listeClient/page/"+page).pipe(
      map((response:any)=>{
        (response.content as Client)
        return response;
      })

    )
 }

 addClient(client:Client){
    return this.appService.getResourcePostJava("/api/saveClients/", client,{headers: this.httpHeaders}).pipe(
      catchError(e=>{
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: e.error.message
        })

        return throwError(e)
      })
    )
 }

 detailClient(id){
    return this.appService.getResourceJava("/api/detaiclient/"+id).pipe(


      catchError(e=>{
        //this.router.navigate([""])

        if(e.status==400){
          return throwError(e)
        }
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: e.error.message
        })

        return throwError(e)
      })
    ) as Observable<Client>
 }

 updateClient(client:Client){
   console.log("/api/updateClient/"+client.id)
    return this.appService.getResourcePutJava("/api/updateClient/"+client.id,client,{headers: this.httpHeaders}).pipe(
      catchError(e=>{

        if(e.status==400){
          return throwError(e)
        }

        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: e.error.message
        })

        return throwError(e)
      })
    )
 }

 deleteClient(id:number){
    return this.appService.getResourceJava("/api/deleteClient/"+id)
 }

}
