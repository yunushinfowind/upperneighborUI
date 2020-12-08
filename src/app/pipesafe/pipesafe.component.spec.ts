import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipesafeComponent } from './pipesafe.component';

describe('PipesafeComponent', () => {
  let component: PipesafeComponent;
  let fixture: ComponentFixture<PipesafeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipesafeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipesafeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
