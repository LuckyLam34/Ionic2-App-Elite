import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import _ from 'lodash';

@Injectable()
export class UserSettings {
  constructor(private storage: Storage,
    private events: Events) {

  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    };

    this.storage.set(team.id.toString(), JSON.stringify(item));
    this.events.publish('favorites:changed');
  }

  unfavoriteTeam(team) {
    this.storage.remove(team.id);
    this.events.publish('favorites:changed');
  }

  isFavoriteTeam(teamId) {
    return this.storage.get(teamId.toString()).then(value => value ? true : false);
  }

  getAllFavorites() {
    let items = [];

    return new Promise<any>(resolve => {
      this.storage.forEach((v, k, i) => items.push(JSON.parse(v))).then(() => resolve(items));
    })
  }
}