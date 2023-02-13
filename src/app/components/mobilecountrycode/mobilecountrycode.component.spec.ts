import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilecountrycodeComponent } from './mobilecountrycode.component';

describe('MobilecountrycodeComponent', () => {
  let component: MobilecountrycodeComponent;
  let fixture: ComponentFixture<MobilecountrycodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilecountrycodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilecountrycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
