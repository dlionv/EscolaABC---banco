import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProfessor } from './modal-professor';

describe('ModalProfessor', () => {
  let component: ModalProfessor;
  let fixture: ComponentFixture<ModalProfessor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalProfessor],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalProfessor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
