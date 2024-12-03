import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AnimeService } from '../../core/services/anime.service';
import { NgFor, NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, MatInputModule,MatIconModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  animeService = inject(AnimeService);

  animeList: any[] = [];
  currentPage: number = 1;
  hasNextPage: boolean = true;
  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((keyword) => {
        this.currentPage = 1;
        this.searchAnime(keyword || '');
      });

    this.searchAnime();
  }

  searchAnime(keyword?: string, page: number = 1): void {
    const searchKeyword = keyword ?? this.searchControl.value ?? '';

    this.animeService.getSearchedAnime(page, searchKeyword).subscribe(
      (response) => {
        console.log(response);

        if (response && response.data) {
          this.animeList = response.data;
          this.hasNextPage = response.pagination.has_next_page;
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error occurred:', error.message);
        if (error.status === 404) {
          console.error('Anime not found.');
        } else if (error.status === 500) {
          console.error('Server error. Please try again later.');
        } else {
          console.error(`Unhandled error status: ${error.status}`);
        }
      }
    );
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchAnime(this.searchControl.value || '', this.currentPage);
    }
  }

  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.searchAnime(this.searchControl.value || '', this.currentPage);
    }
  }
}
