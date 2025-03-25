import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departement } from '../model/departement';
import { URLS } from '../urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementInfoService {

  constructor(private http : HttpClient) { }

    recupererLesDepartements() {
        return this.http.get<Departement[]>(URLS.listerLesDepartements);
    }

    recupererDepartementsParRecherche(query: string): Observable<Departement[]> {
      return this.http.get<Departement[]>(`${URLS.rechercherLesDepartements}?search=${encodeURIComponent(query)}`);
    }
}
