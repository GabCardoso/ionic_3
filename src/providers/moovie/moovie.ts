import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {
  private apiKey = "api_key=e366a163a85d8484c2dd575ebb91452f"
  private urlBase = "https://api.themoviedb.org/3"

  constructor(public http: Http) {
  }

  getLatestMoovies(page = 1) {
    return this.http.get(this.urlBase + `/movie/latest?page=${page}&` + this.apiKey)
  }

  getPopular(page = 1) {
    return this.http.get(this.urlBase + `/movie/popular?page=${page}&` + this.apiKey)
  }

  getMovieDetails(filmeId) {
    return this.http.get(this.urlBase + `/movie/${filmeId}?` + this.apiKey)
  }
}