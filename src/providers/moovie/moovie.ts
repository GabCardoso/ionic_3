import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {
  private apiKey = "?api_key=e366a163a85d8484c2dd575ebb91452f"
  private urlBase = "https://api.themoviedb.org/3"

  constructor(public http: Http) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatestMoovies() {
    return this.http.get(this.urlBase + "/movie/latest" + this.apiKey)
  }

  getPopular() {
    return this.http.get(this.urlBase + "/movie/popular" + this.apiKey)
  }
}
