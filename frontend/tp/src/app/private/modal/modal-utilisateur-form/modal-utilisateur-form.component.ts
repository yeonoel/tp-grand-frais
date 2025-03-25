import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Personne } from '../../../model/personne';
import { MessageService } from 'primeng/api';
import { Departement } from '../../../model/departement';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DepartementInfoService } from '../../../services/departement-info.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FilterService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';



interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-modal-utilisateur-form',
  standalone: true,
  imports: [
    AutoCompleteModule,
    NgIf,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    DialogModule ],
  templateUrl: './modal-utilisateur-form.component.html',
  styleUrl: './modal-utilisateur-form.component.scss'
})
export class ModalUtilisateurFormComponent implements OnInit {
  @Input() visible! : boolean;
  @Input() personne!: Personne;
  @Input() departements: Departement[] = [];
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Personne>();

  utilisateurForm!: FormGroup;
  submitted: boolean = false;
  departement: Departement | undefined;
  departementList!: Departement[];
  suggestions: Departement[] = [];
  searchSubject = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private departementInfoService: DepartementInfoService,
) {}


  ngOnInit() {
    this.initForm();
    this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => this.departementInfoService.recupererDepartementsParRecherche(query))
      ).subscribe({
        next: (data) => {
          this.suggestions = data;
        },
        error: (error) => {
          console.error("Erreur lors de la récupération des départements", error);
          this.suggestions = [];
        }
      });
  }

  /**
     * Détecte les changements sur les inputs et met à jour le formulaire si nécessaire.
     * @param changes Les changements détectés sur les propriétés d'entrée.
     */
  ngOnChanges(changes: SimpleChanges) {
      if (changes['personne'] && this.utilisateurForm) {
        console.log("Personne modifiée:", this.personne);
        this.mettreAjourForm();
      }
    }

   /**
   * Initialise le formulaire avec les valeurs de `personne`.
   */
  initForm() {
    this.utilisateurForm = this.fb.group({
      id: [this.personne?.id || 0],
      nom: [this.personne?.nom || '', Validators.required],
      prenom: [this.personne?.prenom || '', Validators.required],
      age: [this.personne?.age || null, [Validators.required, Validators.min(1)]],
      departement: [this.personne?.departement || null, Validators.required]
    });
  }

  /**
  * Met à jour le formulaire lorsqu'une personne est modifiée.
  */
  mettreAjourForm() {
        if (this.personne) {
          this.utilisateurForm.patchValue({
            id: this.personne.id,
            nom: this.personne.nom,
            prenom: this.personne.prenom,
            age: this.personne.age,
            departement: this.personne.departement
          });
        }
      }

    /**
    * Filtre les départements dépuis la bd selon la recherche de l'utilisateur.
    * @param event L'événement contenant la requête de recherche.
    */
    suggestionParRechercheDepartement(event: AutoCompleteCompleteEvent) {
      const query = event.query.trim();
      if (query) {
        this.searchSubject.next(query);
      } else {
        this.suggestions = [];
      }
    }

//   suggestionParRechercheDepartement(event: AutoCompleteCompleteEvent) {
//       const query = event.query.trim();
//       if (query) {
//           this.departementInfoService.recupererDepartementsParRecherche(query).subscribe({
//               next: (data: Departement[]) => {
//                   this.suggestions = data;
//               },
//               error: (error) => {
//                   console.error("Erreur lors de la récupération des départements", error);
//                   this.suggestions = [];
//               }
//           });
//       } else {
//           this.suggestions = [];
//       }
//   }



  /**
  * Met à jour le champ département lorsqu'un département est sélectionné.
  * @param event L'événement contenant la valeur sélectionnée.
  */
  selectionnerDepartement(event: any) {
      this.utilisateurForm.get('departement')?.setValue(event.value.departement);
    }



  /**
  * Ferme la boîte de dialogue et émet un événement pour informer le parent.
  */
  cacherDialogue() {
    this.onClose.emit();
  }

  /**
  * Enregistre l'utilisateur en validant le formulaire et en émettant un événement.
  */
  enregistrerUtilisateur() {
    this.submitted = true;
    console.log(this.utilisateurForm.value);
    console.log(this.personne);
    this.personne = this.utilisateurForm.value
    this.personne.departement = this.utilisateurForm.value.departement.designation;
        console.log(this.personne);

    if (this.utilisateurForm.valid) {
      this.onSave.emit(this.personne);
      this.cacherDialogue();
      this.initForm();
    }
  }

   /**
     * Getters pour accéder aux contrôles du formulaire plus facilement.
     */
  get nomControl() { return this.utilisateurForm.get('nom'); }
  get prenomControl() { return this.utilisateurForm.get('prenom'); }
  get ageControl() { return this.utilisateurForm.get('age'); }
  get departementControl() { return this.utilisateurForm.get('departement'); }

}
