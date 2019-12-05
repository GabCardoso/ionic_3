import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public nomeUsuario: String = 'Gab Cardoso'

  public feed = {
    titulo: "Gab Cardoso",
    data: "November 5, 1955",
    descricao: "Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.",
    qtd_likes: 12,
    qtd_comments: 4,
    time_comment: "11h ago"
  }

  public listaFilmes = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MoovieProvider
  ) {
  }

  ionViewDidLoad() {
    this.movieProvider.getPopular().subscribe(
      data => {
        const response = (data as any)
        const objetoRetorno = JSON.parse(response._body)
        this.listaFilmes = objetoRetorno.results
        console.log(objetoRetorno)
      }, error => {
        console.log(error)
      }
    )
  }

}
