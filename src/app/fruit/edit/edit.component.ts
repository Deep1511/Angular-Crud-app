import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { Fruit } from '../fruit';
import { FruitService } from '../fruit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent  implements OnInit{

  formdata : Fruit={
    id:'',
    name:'',
    quantity:0,
    price:0
  }
  constructor(private fruitService:FruitService,private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param)=>{
      let id=Number(param.get('id'))
      this.getById(id)
    })
  }

  getById(id:number){
    this.fruitService.edit(id).subscribe((data)=>{
      this.formdata=data
    })
  }

  update(){
    this.fruitService.update(this.formdata).subscribe({
      next:(data)=>{
        alert("Update Success fully")
        this.router.navigate(["fruit/home"])
      },
      error:(er)=>{
        console.log(er)
      }
    })
  }

}
