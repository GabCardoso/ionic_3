import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

@IonicPage()
@Component({
  selector: 'page-detalhes-filme',
  templateUrl: 'detalhes-filme.html',
  providers: [
    MoovieProvider
  ]
})
export class DetalhesFilmePage {

  public filme
  public filmeId
  public loader

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidEnter() {
    this.presentLoading()
    this.filmeId = this.navParams.get("id")
    this.movieProvider.getMovieDetails(this.filmeId).subscribe(data => {
      const response = (data as any)
      this.filme = JSON.parse(response._body)
      this.dismissLoading()
    }, error => {
      console.log(error)
      this.dismissLoading()
    })
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss()
  }
}