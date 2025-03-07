import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../shared/interfaces/brands/ibrand';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  private readonly brandsService=inject(BrandsService);
    // Store brands data
    brandsData: WritableSignal<Ibrand[]> = signal([]);

    // Pagination metadata
    currentPage = signal(1);
    totalPages = signal(1);
    resultsPerPage = 8; // Limit per page

    ngOnInit(): void {
      this.fetchBrands(this.currentPage());
    }

    fetchBrands(page: number): void {
      this.brandsService.getBranda(page, this.resultsPerPage).subscribe({
        next: (res) => {
          console.log(res);
          this.brandsData.set(res.data);
          this.currentPage.set(res.metadata.currentPage);
          this.totalPages.set(res.metadata.numberOfPages);
        },
        error: (err) => {
          console.error("Error fetching brands:", err);
        }
      });
    }

    // Change page
    changePage(newPage: number): void {
      if (newPage >= 1 && newPage <= this.totalPages()) {
        this.fetchBrands(newPage);
      }
    }
}
