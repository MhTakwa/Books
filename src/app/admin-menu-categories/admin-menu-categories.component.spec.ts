import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuCategoriesComponent } from './admin-menu-categories.component';

describe('AdminMenuCategoriesComponent', () => {
  let component: AdminMenuCategoriesComponent;
  let fixture: ComponentFixture<AdminMenuCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenuCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
