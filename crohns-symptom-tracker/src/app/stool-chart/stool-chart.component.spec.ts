import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoolChartComponent } from './stool-chart.component';

describe('StoolChartComponent', () => {
  let component: StoolChartComponent;
  let fixture: ComponentFixture<StoolChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoolChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoolChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
