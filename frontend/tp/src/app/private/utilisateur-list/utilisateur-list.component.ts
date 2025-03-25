import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UtilisateurInfoService } from '../../services/utilisateur-info.service';
import { DepartementInfoService } from '../../services/departement-info.service';
import { Departement } from '../../model/departement';

import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { Personne } from '../../model/personne';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FilterService } from 'primeng/api';
import { ModalUtilisateurFormComponent } from '../modal/modal-utilisateur-form/modal-utilisateur-form.component';


interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: 'app-utilisateur-list',
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.scss',
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [
    NgFor,
    NgIf,
    AutoCompleteModule,
    DropdownModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    ToolbarModule,
    DialogModule,
    ReactiveFormsModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    InputNumberModule,
    ModalUtilisateurFormComponent
  ],
  styles: [
    `:host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }`
  ]
})
export class UtilisateurListComponent implements OnInit {
  utilisateurList!: Personne[];
  departementList!: Departement[];
  utilisateurListComplete!: Personne[];
  utilisateurDialogue: boolean = false;
  personne!: Personne;
  utilisateurForm!: FormGroup;
  modifierUtilisateurDialogue: boolean = false;
  submitted: boolean = false;
  ageSelectionne: string | null = null;
  ouvrireDialogue = false;
  filtrerAgeOptions = [
    { label: 'Tous', value: 'tous' },
    { label: 'Mineur', value: 'mineur' },
    { label: 'Majeur', value: 'majeur' },
  ];
  departements!: Departement[];
  departementSelectionne: Departement | undefined;
  suggestions: any[] = [];

  constructor(
    private utilisateurService: UtilisateurInfoService,
    private departementInfoService: DepartementInfoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private filterService: FilterService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.recupererLesPersonnes();
    this.recupererLesDepartements();
    this.initForm();

  }

  initForm() {
    this.utilisateurForm = this.fb.group({
      id: [0],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      departement: [null]
    });
  }


  /**
     * Cette méthode applique un filtre pour afficher uniquement
     * les utilisateurs qui correspondent à l'âge sélectionné (mineur ou majeur).
   * @param event L'événement contenant la sélection de l'âge pour filtrer la liste des utilisateurs.
   */
  filtrerParAge(event: any): void {
    const ageSelectionne = event.value;
    console.log('Filtre sélectionné :', ageSelectionne);

    if (!ageSelectionne || ageSelectionne.value == "tous") {
      this.utilisateurList = [...this.utilisateurListComplete];
      return;
    }
    const filterValue = 18;
    const filterMatchMode = ageSelectionne.value === 'mineur' ? 'lt' : 'gte';

    this.utilisateurList = this.filterService.filter(
      this.utilisateurListComplete,
      ['age'],
      filterValue,
      filterMatchMode
    );

  console.log('Liste filtrée :', this.utilisateurList);
}


  ouvrireModal() {
    this.personne = {id : 0,nom : "",prenom : "", age : 0, departement: ""}
    this.ouvrireDialogue = true;
  }
  fermerModal() {
      this.ouvrireDialogue = false;
  }

  cacherDialogue() {
    this.utilisateurDialogue = false;
    this.modifierUtilisateurDialogue = false;
    this.submitted = false;
  }
/**
 * Cette méthode enregistre ou modifie un utilisateur en fonction de l'état du formulaire.
 * @param personne L'objet Personne contenant les informations de l'utilisateur à sauvegarder.
 */
  sauvegarderPersonne(personne: Personne) {
    this.submitted = true;

      if (this.modifierUtilisateurDialogue) {
        this.utilisateurService.modififerUtilisateur(personne).subscribe({
          next: () => {
            this.ouvrireDialogue = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Utilisateur modifié avec succès',
              life: 3000
            })

          ;
            this.cacherDialogue();
            this.recupererLesPersonnes();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de la modification de l\'utilisateur',
              life: 3000
            });
            console.error("Erreur lors de la modification de l'utilisateur", error);
          },
        });
      } else {
        this.utilisateurService.sauvegarderPersonne(personne).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Utilisateur ajouté avec succès',
              life: 3000
            });
            this.cacherDialogue();
            this.recupererLesPersonnes();
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Erreur lors de l\'ajout de l\'utilisateur',
              life: 3000
            });
            console.error("Erreur lors de l'enregistrement de la personne", error);
          },
        });
      }

  }

  recupererLesPersonnes() {
    this.utilisateurService.recupererLesPersonnes().subscribe({
      next: (data: Personne[]) => {
                console.log(data)

        this.utilisateurList = [...data];
        this.utilisateurListComplete = [...data];
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des utilisateurs", error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de récupérer la liste des utilisateurs',
          life: 3000
        });
      }
    });
  }

  editerUtilisateur(personne: Personne) {
    this.personne = { ...personne };
    console.log(personne);
    this.modifierUtilisateurDialogue = true;
    this.ouvrireDialogue = true;
  }

  /**
   * Cette méthode affiche une confirmation avant de supprimer
   * l'utilisateur de la base de données.
   * @param personne L'objet Personne représentant l'utilisateur à supprimer.
   */
  supprimerUtilisateur(personne: Personne) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer l\'utilisateur ' + personne.nom + ' ?',
      header: 'Confirmer la suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.utilisateurService.supprimerUtilisateur(personne.id).subscribe({
          next: () => {
            this.utilisateurList = this.utilisateurList.filter(val => val.id !== personne.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Utilisateur supprimé',
              detail: 'L\'utilisateur a été supprimé avec succès.',
              life: 3000
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Une erreur est survenue lors de la suppression.',
              life: 3000
            });
            console.error('Erreur lors de la suppression de l\'utilisateur', error);
          }
        });
      }
    });
  }

  recupererLesDepartements() {
    this.departementInfoService.recupererLesDepartements().subscribe({
      next: (data: Departement[]) => {
        this.departementList = [...data];
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des départements", error);
      }
    });
  }


}




















