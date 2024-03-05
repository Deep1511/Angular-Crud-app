import { Component, OnInit } from '@angular/core';
import { Fruit } from '../fruit';
import { FruitService } from '../fruit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  allfruits:Fruit[]=[];
  constructor(private fruitService:FruitService){}

  ngOnInit(): void {
    this.fruitService.getAll().subscribe((data)=>{
      this.allfruits=data;
    })
  }


  deleteItem(id: string): void {
      this.fruitService.delete(+id).subscribe({
        next: () => {
          console.log('Fruit deleted successfully:', id);
          this.allfruits = this.allfruits.filter(fruit => fruit.id !== id.toString());

        },
      error: (err) => {
        console.error('Error deleting fruit:', err);
        // Display error information in the UI or log it for debugging
      }
    });
  }
  

}
