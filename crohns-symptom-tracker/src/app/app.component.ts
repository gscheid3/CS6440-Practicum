import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Symptom } from './symptom/symptom';
import { SymptomDialogComponent, SymptomDialogResult } from './symptom-dialog/symptom-dialog.component';

const getObservable = (collection: AngularFirestoreCollection<Symptom>) => {
  const subject = new BehaviorSubject<Symptom[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: Symptom[]) => {
    subject.next(val);
  });
  return subject;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  symptomList = getObservable(this.store.collection('symptomList')) as Observable<Symptom[]>;

  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  newSymptom(): void {
    const dialogRef = this.dialog.open(SymptomDialogComponent, {
      width: '270px',
      data: {
        symptom: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: SymptomDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.store.collection('symptomList').add(result.symptom);
      });
  }

  editSymptom(symptom: Symptom): void {
    const dialogRef = this.dialog.open(SymptomDialogComponent, {
      width: '270px',
      data: {
        symptom,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: SymptomDialogResult|undefined) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection('symptomList').doc(symptom.id).delete();
      } else {
        this.store.collection('symptomList').doc(symptom.id).update(symptom);
      }
    });
  }

  
}
