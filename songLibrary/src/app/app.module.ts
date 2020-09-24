import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SongComponent } from './song/song.component';
import { SongSearchComponent } from './song-search/song-search.component';
import { SongCardComponent } from './song-card/song-card.component';
import { SongModalComponent } from './song-modal/song-modal.component';
import { SongService } from './song/song.service';
import { SongCreateModalComponent } from './song-create-modal/song-create-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    SongSearchComponent,
    SongCardComponent,
    SongModalComponent,
    SongCreateModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SongService],
  bootstrap: [AppComponent]
})
export class AppModule { }
