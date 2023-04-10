import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Symptom } from './symptom';


@Component({
  selector: 'app-symptom',
  templateUrl: './symptom.component.html',
  styleUrls: ['./symptom.component.css']
})
export class SymptomComponent {
  @Input() symptom: Symptom | null = null;
  @Output() edit = new EventEmitter<Symptom>();

  /* sampleMethod() {
    this.symptom?.date.
  } */

}
