import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomDialogComponent } from './symptom-dialog.component';

describe('SymptomDialogComponent', () => {
  let component: SymptomDialogComponent;
  let fixture: ComponentFixture<SymptomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymptomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
