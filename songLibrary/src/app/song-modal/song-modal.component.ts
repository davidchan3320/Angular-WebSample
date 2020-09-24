import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Songs } from '../song/songs.model';
import { Artists } from '../song/artist.model';
import { Albums } from '../song/album.model';
import { SongService } from '../song/song.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-song-modal',
  templateUrl: './song-modal.component.html',
  styleUrls: ['./song-modal.component.css']
})
export class SongModalComponent implements OnInit {
  @Input() song: Songs;
  @Input() artist: Artists;
  @Input() album: Albums;
  @Input() index: string;
  @Output() reset = new EventEmitter();
  songForm: FormGroup;

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.songForm = new FormGroup(
      {
        'oid': new FormControl(this.song._id),
        'song': new FormControl(this.song.title, [Validators.required]),
        'artist': new FormControl(this.artist.name, [Validators.required]),
        'album': new FormControl(this.album.title, [Validators.required]),
        'image': new FormControl(this.album.cover_medium, [Validators.required]),
        'audio': new FormControl(this.song.preview, [Validators.required])
      }
    );
  }

  onSubmit(formValue: any): void {
    if (this.songForm.valid) {
      console.log('you submitted value: ', formValue.oid);
      this.updateSong(formValue.oid, formValue.song, formValue.artist, formValue.album, formValue.image, formValue.audio);
    } else {
      console.log('errors in form');
    }
  }

  updateSong(oid: string, song: string, artist: string, album: string, image: string, audio: string): void {
    console.log("loaded!");
    const songName = this.quoteReplace(song);
    const artistName = this.quoteReplace(artist);
    const albumTitle = this.quoteReplace(album);
    const imageUrl = this.quoteReplace(image);
    const audioUrl = this.quoteReplace(audio);

    this.songService.updateSong(oid, songName, artistName, albumTitle, imageUrl, audioUrl).subscribe(
      res => {
        // data is now an instance of type ItemsResponse, so you can do this:
        console.log(res);
        alert("Updated!!");
        this.reset.emit(null);
      }
    )
  }

  quoteReplace(str: string): string {
    var result = str.replace(/[/]/gi, "_");
    result = result.replace(/\s/gi, "+");
    return result;
  }
}
