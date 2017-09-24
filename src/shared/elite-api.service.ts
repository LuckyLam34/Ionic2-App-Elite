import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EliteApi {
    private baseUrl = "https://elite-app-7e2c1.firebaseio.com/";
    currentTourney: any = {};
    private tourneyData = {};

    constructor(public http: Http) {

    }

    getTournaments() {
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        })
    }

    getTournamentData(tourneyId, forceRefresh: boolean = false): Observable<any> {
        if (!forceRefresh && this.tourneyData[tourneyId]) {
            this.currentTourney = this.tourneyData[tourneyId];
            console.log('No need to call Api, returning data...');
            return Observable.of(this.currentTourney);
        }

        // Don't have data yet
        console.log('Making Http call...');
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map(response => {

                // alert(`${this.baseUrl}/'tournaments-data/${tourneyId}.json`);
                this.tourneyData[tourneyId] = response.json();

                this.currentTourney = this.tourneyData[tourneyId];
                return this.currentTourney;
            });


    }

    getCurrentTourney() {
        return this.currentTourney;
    }

    refreshCurrentTourney() {
        return this.getTournamentData(this.currentTourney.tournament.id, true);
    }
}