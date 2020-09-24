import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SongService } from '../song/song.service';

@Component({
  selector: 'app-song-create-modal',
  templateUrl: './song-create-modal.component.html',
  styleUrls: ['./song-create-modal.component.css']
})
export class SongCreateModalComponent implements OnInit {
  @Output() reset = new EventEmitter();
  cSongForm: FormGroup;

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.cSongForm = new FormGroup(
      {
        'cSong': new FormControl('', [Validators.required]),
        'cArtist': new FormControl('', [Validators.required]),
        'cAlbum': new FormControl('', [Validators.required]),
        'cImage': new FormControl('', [Validators.required]),
        'cAudio': new FormControl('', [Validators.required])
      }
    );
  }

  onSubmit(formValue: any): void {
    if (this.cSongForm.valid) {
      console.log('you submitted value: ', formValue.cSong);
      this.createSong(formValue.cSong, formValue.cArtist, formValue.cAlbum, formValue.cImage, formValue.cAudio);
    } else {
      console.log('errors in form');
    }
  }

  createSong(song: string, artist: string, album: string, image: string, audio: string): void {
    const songName = this.quoteReplace(song);
    const artistName = this.quoteReplace(artist);
    const albumTitle = this.quoteReplace(album);
    const imageUrl = this.quoteReplace(image);
    const audioUrl = this.quoteReplace(audio);
    this.songService.addSong(songName, artistName, albumTitle, imageUrl, audioUrl).subscribe(res => {
      // data is now an instance of type ItemsResponse, so you can do this:
      console.log(res);
      alert("Created!!");
      this.reset.emit(null);
    });
  }

  quoteReplace(str: string): string {
    var result = str.replace(/[/]/gi, "_");
    result = result.replace(/\s/gi, "+");
    return result;
  }
}
