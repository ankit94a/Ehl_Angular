import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySidebarComponent } from './policy-sidebar.component';

describe('PolicySidebarComponent', () => {
  let component: PolicySidebarComponent;
  let fixture: ComponentFixture<PolicySidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicySidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
