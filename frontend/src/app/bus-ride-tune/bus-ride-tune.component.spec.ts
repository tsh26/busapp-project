import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusRideTuneComponent } from './bus-ride-tune.component';

describe('SurveyListComponent', () => {
  let component: BusRideTuneComponent;
  let fixture: ComponentFixture<BusRideTuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusRideTuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusRideTuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
