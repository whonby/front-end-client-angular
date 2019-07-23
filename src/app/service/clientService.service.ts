import { Injectable } from '@angular/core';
import {AppService} from "./appService.service";
import { Client } from "../client/client";
import Swal from 'sweetalert2'
import {map,catchError} from "rxjs/internal/operators";
import {HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 // private listeclient;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private appService:AppService) { }

 allClient(){
    return this.appService.getResourceJava("/api/listeClient").pipe(
      map(response=>response as Client)
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
      map(response=>response as Client)
    )
 }

 updateClient(client:Client){
   console.log("/api/updateClient/"+client.id)
    return this.appService.getResourcePutJava("/api/updateClient/"+client.id,client,{headers: this.httpHeaders})
 }

 deleteClient(id:number){
    return this.appService.getResourceJava("/api/deleteClient/"+id)
 }

}
