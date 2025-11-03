import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrdersDashComponent } from './manage-orders-dash.component';

describe('ManageOrdersDashComponent', () => {
  let component: ManageOrdersDashComponent;
  let fixture: ComponentFixture<ManageOrdersDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOrdersDashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOrdersDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
