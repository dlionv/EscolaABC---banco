import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEndereco } from './form-endereco';

describe('FormEndereco', () => {
  let component: FormEndereco;
  let fixture: ComponentFixture<FormEndereco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEndereco],
    }).compileComponents();

    fixture = TestBed.createComponent(FormEndereco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
