import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundSliceComponent } from './sound-slice.component';

describe('SoundSliceComponent', () => {
  let component: SoundSliceComponent;
  let fixture: ComponentFixture<SoundSliceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundSliceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundSliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
