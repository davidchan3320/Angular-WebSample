import { Component, OnInit, Injectable, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Songs } from '../song/songs.model';
import { SongService } from '../song/song.service';

// import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css']
})
export class SongSearchComponent implements OnInit {
  current_page: number = 1;
  records_per_page: number = 20;
  total_result: number = 0;
  isSearch: number = 0;
  isNext: boolean = false;
  isPrev: boolean = true;
  songs: Songs[];
  editSong: Songs;

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.getSong(0, this.records_per_page);
  }

  getSong(skip: number, limit: number): void {
    console.log("loaded!");
    this.songService.getSong(skip, limit)
      .subscribe(
        res => {
          // data is now an instance of type ItemsResponse, so you can do this:
          console.log(res);
          this.songs = res[0].Songs;
          this.total_result = res[1].NumDocs;
          this.btnDis();
        }
      );
  }

  getSearchSong(skip: number, limit: number): void {
    console.log("loaded!");
    this.current_page = 1;
    this.isSearch = 1;
    const song = (<HTMLInputElement>document.getElementById("song_name")).value;
    if (song == "") {
      alert("Please input song name!!");
    } else {
      this.songService.searchSong(skip, limit, song)
        .subscribe(
          res => {
            // data is now an instance of type ItemsResponse, so you can do this:
            console.log(res);
            this.songs = res[0].Songs;
            this.total_result = res[1].NumDocs;
            this.btnDis();
          }
        );
    }
  }

  reset(): void {
    this.current_page = 1;
    this.isNext = false;
    this.isPrev = true;
    this.isSearch = 0;
    this.getSong(0, this.records_per_page);
  }

  nextPage(): void {
    this.current_page++;
    this.btnDis();
    if (this.isSearch == 1) {
      this.getSearchSong((this.current_page - 1) * this.records_per_page, this.records_per_page);
    } else {
      this.getSong((this.current_page - 1) * this.records_per_page, this.records_per_page);
    }
  }

  prevPage(): void {
    this.current_page--;
    this.btnDis();
    if (this.isSearch == 1) {
      // Search(current_page);
    } else {
      this.getSong((this.current_page - 1) * this.records_per_page, this.records_per_page);
    }

  }

  numPages(): number {
    return Math.ceil(this.total_result / this.records_per_page);
  }

  btnDis(): void {
    if (this.current_page <= 1) {
      this.isPrev = true;
      // btn_prev.classList.add("disabled");
    } else {
      this.isPrev = false;
      // btn_prev.classList.remove("disabled");
    }
    if (this.current_page >= this.numPages()) {
      this.isNext = true;
      // btn_next.classList.add("disabled");
    } else {
      this.isNext = false;
      // btn_next.classList.remove("disabled");
    }
  }
}
