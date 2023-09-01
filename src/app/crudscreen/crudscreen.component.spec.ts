import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudscreenComponent } from './crudscreen.component';

describe('CrudscreenComponent', () => {
  let component: CrudscreenComponent;
  let fixture: ComponentFixture<CrudscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudscreenComponent]
    });
    fixture = TestBed.createComponent(CrudscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
