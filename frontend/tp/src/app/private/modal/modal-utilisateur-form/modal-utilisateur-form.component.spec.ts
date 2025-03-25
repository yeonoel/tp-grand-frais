import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUtilisateurFormComponent } from './modal-utilisateur-form.component';

describe('ModalUtilisateurFormComponent', () => {
  let component: ModalUtilisateurFormComponent;
  let fixture: ComponentFixture<ModalUtilisateurFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUtilisateurFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUtilisateurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
