import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor() { }

  url='https://api.jikan.moe/v4/anime';

  http= inject(HttpClient)

  limit:number=21;

  getSearchedAnime(page?:number, q?:string){
    return  this.http.get<any>(`${this.url}?limit=${this.limit}&page=${page}&sfw=true&q=${q}`);
  }
}
