import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongCreateModalComponent } from './song-create-modal.component';

describe('SongCreateModalComponent', () => {
  let component: SongCreateModalComponent;
  let fixture: ComponentFixture<SongCreateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongCreateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
