import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasGuruHomeComponent } from './gas-guru-home.component';

describe('GasGuruHomeComponent', () => {
  let component: GasGuruHomeComponent;
  let fixture: ComponentFixture<GasGuruHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasGuruHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasGuruHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
