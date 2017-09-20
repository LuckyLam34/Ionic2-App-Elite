import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import _ from 'lodash';

@Injectable()
export class UserSettings {
  constructor(private storage: Storage) {

  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    };

    this.storage.set(team.id.toString(), JSON.stringify(item));
  }

  unfavoriteTeam(team) {
    this.storage.remove(team.id);
  }

  isFavoriteTeam(teamId) {
    return this.storage.get(teamId.toString()).then(value => value ? true : false);
  }

  getAllFavorites() {
    let items = [];

    // _.forIn(window.localStorage, (v, k) => {
    //   items.push(JSON.parse(v));
    // });

    // console.log(window);

    this.storage.forEach((value, key, index) => {
      items.push(JSON.parse(value));

    });

    console.log(items);

    return items.length ? items : null;
  }
}