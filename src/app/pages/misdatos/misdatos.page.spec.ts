import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisdatosPage } from './misdatos.page';

describe('MisdatosPage', () => {
  let component: MisdatosPage;
  let fixture: ComponentFixture<MisdatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MisdatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
