import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ICategories } from '../../shared/interfaces/categories/Icategories';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
     private readonly categoriesService=inject(CategoriesService);
     cetegoriesData:WritableSignal<ICategories[]>=signal([]);

  ngOnInit(): void {
    this.getCategoriesData();

  }
  getCategoriesData():void{

    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.cetegoriesData.set(res.data);

      }

    })
  }

}
