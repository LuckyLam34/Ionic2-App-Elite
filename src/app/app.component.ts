import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EliteApi, UserSettings } from '../shared/shared';

import { MyTeamsPage, TournamentsPage, TeamHomePage } from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamsPage;
  favorites = [];


  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public eliteApi: EliteApi,
    public userSettings: UserSettings,
    public loadingCtrl: LoadingController,
    public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => {
        this.refreshFavorites();
      });
    });
  }

  refreshFavorites() {
    this.userSettings.getAllFavorites().then(data => this.favorites = data);
  }

  goHome() {
    this.nav.push(MyTeamsPage);
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  goToTeam(favorite) {
    let loader = this.loadingCtrl.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });

    loader.present();

    this.eliteApi.getTournamentData(favorite.tournamentId).subscribe(l => {
      this.nav.push(TeamHomePage, favorite.team);
      loader.dismiss();
    });
  }
}
