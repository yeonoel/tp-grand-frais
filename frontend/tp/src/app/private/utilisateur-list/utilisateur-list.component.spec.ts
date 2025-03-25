import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilisateurListComponent } from './utilisateur-list.component';
import { UtilisateurInfoService } from '../../services/utilisateur-info.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Personne } from '../../model/personne';
import { FormsModule } from '@angular/forms';

describe('UtilisateurListComponent', () => {
  let component: UtilisateurListComponent;
  let fixture: ComponentFixture<UtilisateurListComponent>;
  let utilisateurService: jasmine.SpyObj<UtilisateurInfoService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;

  beforeEach(async () => {
    const utilisateurServiceSpy = jasmine.createSpyObj('UtilisateurInfoService', ['recupererLesUtilisateurs', 'enregistrerUtilisateur', 'modififerUtilisateur', 'supprimerUtilisateur']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    const confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', ['confirm']);

    await TestBed.configureTestingModule({
      declarations: [UtilisateurListComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: UtilisateurInfoService, useValue: utilisateurServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: ConfirmationService, useValue: confirmationServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilisateurListComponent);
    component = fixture.componentInstance;
    utilisateurService = TestBed.inject(UtilisateurInfoService) as jasmine.SpyObj<UtilisateurInfoService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    confirmationService = TestBed.inject(ConfirmationService) as jasmine.SpyObj<ConfirmationService>;
    fixture.detectChanges();
  });

  // test pour recuperer les utilisateurs
  it('doit récupérer la liste des utilisateurs', () => {
    const utilisateursMock: Personne[] = [
      { id: 1, nom: 'Yeo', prenom: 'Noel', age: 30 },
      { id: 2, nom: 'Martin', prenom: 'Paul', age: 25 }
    ];
    utilisateurService.recupererLesUtilisateurs.and.returnValue(of(utilisateursMock));

    component.recupererLesUtilisateurs();

    expect(utilisateurService.recupererLesUtilisateurs).toHaveBeenCalled();
    expect(component.utilisateurList).toEqual(utilisateursMock);
    expect(component.utilisateurListComplete).toEqual(utilisateursMock);
  });

  // test pour filtrer par âge
  it('doit filtrer les utilisateurs par âge (mineur)', () => {
    const utilisateursMock: Personne[] = [
      { id: 1, nom: 'Yeo', prenom: 'Noel', age: 16 },
      { id: 2, nom: 'Martin', prenom: 'Paul', age: 25 }
    ];
    component.utilisateurListComplete = utilisateursMock;

    component.filtrerParAge({ value: 'mineur' });

    expect(component.utilisateurList).toEqual([{ id: 1, nom: 'Yeo', prenom: 'Noel', age: 16 }]);
  });

  it('doit filtrer les utilisateurs par âge (majeur)', () => {
    const utilisateursMock: Personne[] = [
      { id: 1, nom: 'Yeo', prenom: 'Light', age: 29 },
      { id: 2, nom: 'Paul', prenom: 'Yao', age: 25 }
    ];
    component.utilisateurListComplete = utilisateursMock;

    component.filtrerParAge({ value: 'majeur' });

    expect(component.utilisateurList).toEqual([{ id: 2, nom: 'Kambou', prenom: 'Paul', age: 25 }]);
  });

  // test pour ouvrir la modal de création d'un utilisateur
  it('doit ouvrir la modal pour ajouter un nouvel utilisateur', () => {
    component.openNew();

    expect(component.personne).toEqual({ id: 0, nom: '', prenom: '', age: 0 });
    expect(component.utilisateurDialogue).toBeTrue();
  });

  // test pour cacher la modal de ajouter/modifier utilisateur
  it('doit fermer la modal de l\'utilisateur', () => {
    component.utilisateurDialogue = true;
    component.modifierUtilisateurDialogue = true;

    component.cacherDialogue();

    expect(component.utilisateurDialogue).toBeFalse();
    expect(component.modifierUtilisateurDialogue).toBeFalse();
    expect(component.submitted).toBeFalse();
  });

  // test pour enregistrer un utilisateur
    it('doit ajouter un nouvel utilisateur', () => {
    const newPersonne: Personne = { id: 0, nom: 'Lemoine', prenom: 'Marie', age: 30 };
    component.personne = newPersonne;
    utilisateurService.enregistrerUtilisateur.and.returnValue(of(newPersonne));

    component.enregistrerUtilisateur();

    expect(utilisateurService.enregistrerUtilisateur).toHaveBeenCalledWith(newPersonne);
    expect(component.utilisateurList).toContain(newPersonne);
  });

  it('doit modifier un utilisateur existant', () => {
    const existingPersonne: Personne = { id: 1, nom: 'Yeo', prenom: 'Noel', age: 30 };
    component.personne = existingPersonne;
    component.modifierUtilisateurDialogue = true;
    utilisateurService.modififerUtilisateur.and.returnValue(of(existingPersonne));

    component.enregistrerUtilisateur();

    expect(utilisateurService.modififerUtilisateur).toHaveBeenCalledWith(existingPersonne);
  });

  // test pour supprimer un utilisateur
  it('doit supprimer un utilisateur', () => {
    const utilisateurToDelete: Personne = { id: 1, nom: 'Yeo', prenom: 'Noel', age: 30 };
    component.utilisateurList = [utilisateurToDelete];
    utilisateurService.supprimerUtilisateur.and.returnValue(of({}));

    component.supprimerUtilisateur(utilisateurToDelete);

    expect(utilisateurService.supprimerUtilisateur).toHaveBeenCalledWith(utilisateurToDelete.id);
    expect(component.utilisateurList).not.toContain(utilisateurToDelete);
  });

  it('doit modififer un utilisateur', () => {
    const utilisateurToEdit: Personne = { id: 1, nom: 'Yeo', prenom: 'Noel', age: 30 };

    component.editerUtilisateur(utilisateurToEdit);

    expect(component.personne).toEqual(utilisateurToEdit);
    expect(component.utilisateurDialogue).toBeTrue();
    expect(component.modifierUtilisateurDialogue).toBeTrue();
  });

});
