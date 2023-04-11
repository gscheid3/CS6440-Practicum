import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart } from 'chart.js/auto'
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
export class AppComponent implements OnInit{
  symptomList = getObservable(this.store.collection('symptomList')) as Observable<Symptom[]>;

  stoolChart: any;

  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  ngOnInit(): void {
      this.createChart();
  }

  createChart() {
    let labels = ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5', 'Type 6', 'Type 7'];
    let stoolData = [6, 3, 3, 2, 3, 1, 1];

    this.stoolChart = new Chart('stoolChart', {
      type: 'doughnut',
      data: {
        labels, 
        datasets: [{
          label: 'Stool Type Data',
          data: stoolData
        }]
      }
    });

  }

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
