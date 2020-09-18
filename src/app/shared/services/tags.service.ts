import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor (
    private apiService: ApiService
  ) {}

  getAll(): Observable<[string]> {
    return this.apiService.get('/tags')
           .pipe(map(data => data.tags));
  }

}
