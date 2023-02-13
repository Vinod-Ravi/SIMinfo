import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiminformationComponent } from './siminformation.component';

describe('SiminformationComponent', () => {
  let component: SiminformationComponent;
  let fixture: ComponentFixture<SiminformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiminformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiminformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
