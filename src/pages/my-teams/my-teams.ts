import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TournamentsPage } from '../pages';

@Component({
    templateUrl: 'my-teams.html'
})

export class MyTeamsPage {
    constructor(private nav: NavController){}

    goToTournaments() {
        this.nav.push(TournamentsPage);
    }
}