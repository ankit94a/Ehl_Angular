import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechincalManualsComponent } from './techincal-manuals.component';

describe('TechincalManualsComponent', () => {
  let component: TechincalManualsComponent;
  let fixture: ComponentFixture<TechincalManualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechincalManualsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechincalManualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
