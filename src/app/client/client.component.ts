  import { Component, OnInit } from '@angular/core';
  import {AppService} from "../service/appService.service";
  import Swal from 'sweetalert2'
  import {ClientService} from "../service/clientService.service";
  import {Client} from "./client";
  import {ActivatedRoute} from "@angular/router";

  @Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
  })
  export class ClientComponent implements OnInit {

    client:Client[];

    private clients:Client=new Client();
    private listeclient;
    private errorsAdd:string[];
    private errorsupdate:string[];
    private numeroPage:number;
    paginate:any;
    private str:string;
    //private client=
    private idclient;
  private updateCl:Client=new Client();
    constructor(private clientService:ClientService,private activateRoute:ActivatedRoute) { }

    ngOnInit() {
      this.activateRoute.paramMap.subscribe(param=>{
        let page :number=+param.get("page");
        if(!page){
          page=0;

        }
        this.numeroPage=page;
        this.getAllClient();

      })

    }

    public getAllClient(){
      this.clientService.allClient(this.numeroPage).subscribe(data=>{
        this.listeclient=data.content;
        this.paginate=data;
        //console.log(this.paginate)
      },error => {
        console.log(error)
      })
    }


    //Ajout de client

    public addClient(){

      this.clientService.addClient(this.clients).subscribe(data=>{
        this.getAllClient()
         console.log(data)
       this.clients =new Client();
        Swal.fire({
          type: 'success',
          title: 'Success',
          text:  "Enregistrement effectuer",
        })


      },error => {
       this.errorsAdd=error.error.errors as string[];
       console.error(error.error.errors)
      })

    }

  //Detail Edite user
    public edit(id){
      this.idclient=id;
      this.clientService.detailClient(id).subscribe((updateC) => this.updateCl = updateC,error => {
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
        this.errorsupdate=error.error.errors as string[];
        console.error(error.error.errors)
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
