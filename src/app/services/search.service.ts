import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchTerm: string = '';

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  getSearchTerm() {
    return this.searchTerm;
  }
  constructor() { }
}
