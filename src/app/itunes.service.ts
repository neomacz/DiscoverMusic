import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItunesService {

  constructor(private http: HttpClient) { }

  search(term: string) {
    return this.http.get(`itunes/search?term=` + term);
  }
  lookup(id: number, entity?: string) {
    return this.http.get(`itunes/lookup?id=` + id );
  }
}
