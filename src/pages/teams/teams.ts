import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../pages';

import _ from 'lodash';

import { EliteApi } from '../../shared/shared';


/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  private allTeams: any;
  private allTeamDivisions: any;
  private initialList = [];

  teams = [];
  searchText: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public eliteApi: EliteApi, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;

    let loader = this.loadingCtrl.create({
      content: 'Loading teams...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions = _.chain(data.teams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
          .value();

        loader.dismiss();

        this.initialList = this.allTeamDivisions;
      })
    })


  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams() {
    let queryTextLower = this.searchText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });
    // console.log('filterTeams: ' + filteredTeams);
    this.allTeamDivisions = filteredTeams;
  }

  cancelFilter() {
    this.allTeamDivisions = this.initialList;
  }
}
