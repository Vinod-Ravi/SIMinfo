import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcountrycodeComponent } from './dialogcountrycode.component';

describe('DialogcountrycodeComponent', () => {
  let component: DialogcountrycodeComponent;
  let fixture: ComponentFixture<DialogcountrycodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcountrycodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogcountrycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
