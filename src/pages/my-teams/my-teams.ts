import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { TournamentsPage, TeamHomePage } from '../pages';
import { EliteApi, UserSettings } from '../../shared/shared';

@Component({
    templateUrl: 'my-teams.html',
    selector: 'page-my-teams'
})

export class MyTeamsPage {
    constructor(private nav: NavController,
        private loadingCtrl: LoadingController,
        private eliteApi: EliteApi,
        private userSettings: UserSettings
    ) { }

    // favourites = [
    //     {
    //         team: {
    //             id: 812,
    //             name: 'HC Elite 7th',
    //             coach: 'Michelotti'
    //         },
    //         tournamentId: '3dd50aaf-6b03-4497-b074-d81703f07ee8',
    //         tournamentName: 'HC NY'
    //     },
    //     {
    //         team: {
    //             id: 829,
    //             name: 'HC Elite',
    //             coach: 'Michelotti'
    //         },
    //         tournamentId: '46ebd526-8839-476a-9ba0-8a9b2c07f3c3',
    //         tournamentName: 'Summer Showdown'
    //     }
    // ];
    favourites = [];

    ionViewDidLoad() {
        this.favourites = this.userSettings.getAllFavorites();
    }

    goToTournaments() {
        this.nav.push(TournamentsPage);
    }

    favoriteTapped($event, favorite) {
        let loader = this.loadingCtrl.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });

        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe(t => {
                this.nav.push(TeamHomePage, favorite.team);
                loader.dismiss();
            })
    }
}