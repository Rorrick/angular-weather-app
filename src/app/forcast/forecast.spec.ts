import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forcast } from './forecast';

describe('Forcast', () => {
  let component: Forcast;
  let fixture: ComponentFixture<Forcast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forcast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Forcast);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
