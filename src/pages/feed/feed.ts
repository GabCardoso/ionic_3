import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { DetalhesFilmePage } from '../detalhes-filme/detalhes-filme';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public loader
  public refresher
  public isRefresher = false
  public infiniteScroll
  public listaFilmes = new Array<any>();
  public page = 1

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidEnter() {
    this.loadingMovies()
  }

  loadingMovies(newPage: boolean = false) {
    this.presentLoading()
    this.movieProvider.getPopular(this.page).subscribe(
      data => {
        const response = (data as any)
        const objetoRetorno = JSON.parse(response._body)

        if (newPage) {
          this.listaFilmes = this.listaFilmes.concat(objetoRetorno.results)
          this.infiniteScroll.complete()
        } else {
          this.listaFilmes = objetoRetorno.results
        }

        // console.log(objetoRetorno)
        this.dismissLoading()
        if (this.isRefresher) {
          this.refresher.complete()
          this.isRefresher = false
        }
      }, error => {
        console.log(error)
        this.dismissLoading()
        if (this.isRefresher) {
          this.refresher.complete()
          this.isRefresher = false
        }
      }
    )
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    this.loader.present()
  }

  dismissLoading() {
    this.loader.dismiss()
  }

  doRefresh(refresher) {
    this.refresher = refresher
    this.isRefresher = true
    this.loadingMovies()
  }

  abrirDetalhes(filme) {
    this.navCtrl.push(DetalhesFilmePage, { id: filme.id })
  }

  doInfinite(infiniteScroll) {
    this.page++
    this.infiniteScroll = infiniteScroll
    this.loadingMovies(true)
  }
}