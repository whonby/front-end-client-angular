import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'pagination-nav',
  templateUrl: './pagination.component.html',

})
export class PaginationComponent implements OnInit,OnChanges {

  @Input() paginations :any;
  paginate: number[];
  debutPaginate:number;
  finPaginate:number;
  constructor() { }

  ngOnInit() {
  //  console.log(this.paginations)



  }

  ngOnChanges(){
    this.debutPaginate=Math.min(Math.max(1,this.paginations.number-4),this.paginations.totalPages-5);
    this.finPaginate=Math.max(Math.min(this.paginations.totalPages,this.paginations.number+4),6)

    if(this.paginations.totalPages>5){
      this.paginate=new Array(this.finPaginate-this.debutPaginate+1).fill(0).map((_valor ,indice)=>indice + this.debutPaginate);
    }else {
      this.paginate=new Array(this.paginations.totalPages).fill(0).map((_valor ,indice)=>indice + 1);
    }
  }

}
