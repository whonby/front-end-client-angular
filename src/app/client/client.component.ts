import { Component, OnInit } from '@angular/core';
import {AppService} from "../service/appService.service";
import Swal from 'sweetalert2'
import {ClientService} from "../service/clientService.service";
import {Client} from "./client";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client:Client[];

  private clients:Client=new Client();
  private listeclient;
  //private client={name:"", email:"", telephone:"", username:""}
  private idclient;
private updateCl:Client=new Client();
  constructor(private appService:AppService,private clientService:ClientService) { }

  ngOnInit() {
    this.getAllClient()
  }

  public getAllClient(){
    this.clientService.allClient().subscribe(data=>{
      this.listeclient=data
      //console.log(this.listeclient)
    },error => {
      console.log(error)
    })
  }


  //Ajout de client

  public addClient(){

    this.clientService.addClient(this.clients).subscribe(data=>{
      this.getAllClient()
       console.log(data)
     this.clients ={}
      Swal.fire({
        type: 'success',
        title: 'Success',
        text:  "Enregistrement effectuer",
      })


    },error => {
      console.log(error)
    })

  }

//Detail Edite user
  public edit(id){
    this.idclient=id;
    this.clientService.detailClient(id).subscribe(data=>{
      this.updateCl=data;
      //console.log(this.updateCl)
    },error => {
      console.log(error)
    })

    //this.appService.getResourceJava("/api/detaiclient/"+id).subscribe()
  }

  //update client
  public ClientUpdate(){
//console.log(this.updateCl)
    this.clientService.updateClient(this.updateCl).subscribe(data=>{
      this.getAllClient()

      Swal.fire({
        type: 'success',
        title: 'Success',
        text:  "Modification effectuer",
      })

    },error => {
      console.log(error)
    })
    //this.appService.getResourcePutJava("/api/updateClient/"+this.idclient,cl)
  }
  //Suppression de client

  public deleteClient(id){
    Swal.fire({
      title: 'Suppression',
      text: "Voullez vous effectuer la suppresion !!!",
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui'
    }).then((result) => {
      if (result.value) {

        this.clientService.deleteClient(id).subscribe(data=>{
          this.getAllClient()

        },error => {
          console.log(error)
        })

       // this.appService.getResourceJava("/api/deleteClient/"+id)

        Swal.fire(
          'Supprimer!',
          'Suppression effectuer.',
          'success'
        )
      }
    })


  }



}
