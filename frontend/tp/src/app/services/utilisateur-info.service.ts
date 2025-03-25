import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personne } from '../model/personne';
import { URLS } from '../urls';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurInfoService {
  constructor(private http : HttpClient) { }

  recupererLesPersonnes() {
    return this.http.get<Personne[]>(URLS.listerLesUtilisateur);
   }

  sauvegarderPersonne(personne: Personne) {
        return this.http.post<Personne>(URLS.ajouter, personne);
  }

  modififerUtilisateur(personne: Personne) {
          return this.http.put(`${URLS.modifier}/${personne.id}`, personne);
  }

  supprimerUtilisateur(id: number) {
          return this.http.delete(`${URLS.supprimer}/${id}`);
  }



}
