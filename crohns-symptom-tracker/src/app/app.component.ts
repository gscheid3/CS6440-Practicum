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
  painChart: any;

  constructor(private dialog: MatDialog, private store: AngularFirestore) {}

  ngOnInit(): void {
      this.createStoolChart();
      this.createPainChart();
  }

  createStoolChart() {
    let labels = ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5', 'Type 6', 'Type 7'];
    let stoolData: number[] = [0, 0, 0, 0, 0, 0, 0];

    this.symptomList.subscribe( (symptoms: Symptom[]) => {
      if (this.stoolChart) {
        this.stoolChart.destroy();
        stoolData = [0, 0, 0, 0, 0, 0, 0];
      }
      
      symptoms.forEach( (symptom: Symptom) => {
        if (symptom.stool) {
          const stoolType = parseInt(symptom.stool);
          stoolData[stoolType - 1]++;
        }
      });

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
    });
  }

  createPainChart() {
    let labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    let painData: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.symptomList.subscribe( (symptoms: Symptom[]) => {
      if (this.painChart) {
        this.painChart.destroy();
        painData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      
      symptoms.forEach( (symptom: Symptom) => {
        if (symptom.pain) {
          const painType = parseInt(symptom.pain);
          painData[painType - 1]++;
        }
      });

      this.painChart = new Chart('painChart', {
        type: 'bar',
        data: {
          labels, 
          datasets: [{
            label: 'Pain Level Data',
            data: painData
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 10
            }
          },
          aspectRatio: 1
        }
      });
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
