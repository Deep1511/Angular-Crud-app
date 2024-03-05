import { Component, OnInit } from '@angular/core';
import { FruitService } from '../fruit.service';
import { Router } from '@angular/router';
import { Fruit } from '../fruit';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formdata: Fruit = {
    id: '',
    name: '',
    quantity: 0,
    price: 0
  };

  constructor(private fruitService: FruitService, private router: Router) {}

  ngOnInit(): void {
    this.fruitService.getMaxId().subscribe(maxId => {
      this.formdata.id = (maxId + 1).toString();
    });
  }

  create(): void {
    this.fruitService.creat(this.formdata).subscribe({
      next: (data) => {
        alert("New fruit added successfully")
        this.router.navigate(['/fruit/home']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
