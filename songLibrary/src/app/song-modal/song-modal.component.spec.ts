import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongModalComponent } from './song-modal.component';

describe('SongModalComponent', () => {
  let component: SongModalComponent;
  let fixture: ComponentFixture<SongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
