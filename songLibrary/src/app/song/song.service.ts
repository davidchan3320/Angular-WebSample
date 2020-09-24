import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Songs } from './songs.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class SongService {
    Url = 'api/song';  // URL to web api
    // private handleError: HandleError;

    constructor(private http: HttpClient) { }

    getSong(skip: number, limit: number): Observable<any> {
        const url = `${this.Url}/${skip}/${limit}`;
        return this.http.get<any>(url);
    }

    searchSong(skip: number, limit: number, song: string): Observable<any> {
        const url = `${this.Url}/${skip}/${limit}/${song}`;
        return this.http.get<any>(url);
    }

    addSong(song: string, artist: string, album: string, imgUrl: string, audUrl: string): Observable<any> {
        const url = `${this.Url}/${song}/${artist}/${album}/${imgUrl}/${audUrl}`;
        console.log(url);
        return this.http.post<any>(url, httpOptions);
    }

    deleteSong(oid: string): Observable<any> {
        const url = `${this.Url}/${oid}`;
        return this.http.delete(url, httpOptions);
    }

    updateSong(oid: string, song: string, artist: string, album: string, imgUrl: string, audUrl: string): Observable<any> {
        const url = `${this.Url}/${oid}/${song}/${artist}/${album}/${imgUrl}/${audUrl}`;
        console.log(url);
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'my-new-auth-token');
        return this.http.put<any>(url, httpOptions);
    }
}