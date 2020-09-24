import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Songs } from '../song/songs.model';
import { Artists } from '../song/artist.model';
import { Albums } from '../song/album.model';
import { SongService } from '../song/song.service';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit {
  @Input() song: Songs;
  @Input() artist: Artists;
  @Input() album: Albums;
  @Input() index: string;
  @Output() reset = new EventEmitter();

  constructor(private songService: SongService) { }

  ngOnInit(): void {
  }

  deleteSong(oid: string): void {
    console.log("loaded!" + oid);
    this.songService.deleteSong(oid).subscribe(
      res => {
        // data is now an instance of type ItemsResponse, so you can do this:
        console.log(res);
        alert("Deleted!!");
        this.reset.emit(null);
      }
    )
  }

  callReset():void{
    this.reset.emit(null);
  }
}
