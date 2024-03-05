  import { HttpClient } from '@angular/common/http';
  import { Injectable,inject } from '@angular/core';
  import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
  import { Fruit } from './fruit';

  @Injectable({
    providedIn: 'root'
  })
  export class FruitService {
    apiUrl="https://localhost:7179";
    http=inject(HttpClient)
    constructor() { }
      // getAll(){
      //   return this.httpClient.get<Fruit[]>(this.apiUrl+'/api/Fruit')
      // }

      getAll(){
        return this.http.get<Fruit[]>(this.apiUrl+"/api/Fruit")
      }
      getMaxId(): Observable<number> {
        return this.getAll().pipe(
          map(fruits => Math.max(...fruits.map(fruit => Number(fruit.id)))),
          catchError(error => {
            console.error(error);
            return of(0); // Return 0 if there is an error (e.g., no fruits in the list)
          })
        );
      }
      
      creat(data:Fruit){
        return this.http.post(this.apiUrl+'/api/Fruit',data)
      }

      edit(id:number){
        return this.http.get<Fruit>(this.apiUrl+`/api/Fruit/${id}`)
      }

      update(data:Fruit){
        return this.http.put<Fruit>(this.apiUrl+`/api/Fruit/${data.id}`,data)
      }

      delete(id:number):Observable<Fruit>{
        return this.http.delete<Fruit>(this.apiUrl+`/api/Fruit/${id}`)
      }

      
      
    
  }