import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Symptom } from '../symptom/symptom';

@Component({
  selector: 'app-symptom-dialog',
  templateUrl: './symptom-dialog.component.html',
  styleUrls: ['./symptom-dialog.component.css']
})
export class SymptomDialogComponent {
  private backupSymptom: Partial<Symptom> = { ...this.data.symptom };

  constructor(
    public dialogRef: MatDialogRef<SymptomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SymptomDialogData
  ) {}

  cancel(): void {
    this.data.symptom.date = this.backupSymptom.date;
    this.data.symptom.stool = this.backupSymptom.stool;
    this.data.symptom.bleeding =this.backupSymptom.bleeding;
    this.data.symptom.pain = this.backupSymptom.pain;
    this.data.symptom.notes = this.backupSymptom.notes;
    this.dialogRef.close(this.data);
  }
}

export interface SymptomDialogData {
  symptom: Partial<Symptom>;
  enableDelete: boolean;
}

export interface SymptomDialogResult {
  symptom: Symptom;
  delete?: boolean;
}
