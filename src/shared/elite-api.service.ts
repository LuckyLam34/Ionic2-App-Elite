import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EliteApi {
    private baseUrl = "https://elite-app-7e2c1.firebaseio.com/";

    currentTourney: any = {};
    constructor(public http: Http) {

    }

    getTournaments() {
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
            .subscribe(res => resolve(res.json()));
        })
    }

    getTournamentData(tourneyId): Observable<any> {
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map(response => {

                // alert(`${this.baseUrl}/'tournaments-data/${tourneyId}.json`);
                
                this.currentTourney = response.json();
                return this.currentTourney;
            })
    }

    getCurrentTourney() {
        return this.currentTourney;
    }
}