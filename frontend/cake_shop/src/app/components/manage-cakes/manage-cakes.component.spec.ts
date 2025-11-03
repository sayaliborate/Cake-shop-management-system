import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCakesComponent } from './manage-cakes.component';

describe('ManageCakesComponent', () => {
  let component: ManageCakesComponent;
  let fixture: ComponentFixture<ManageCakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCakesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
