import { Artists } from './artist.model';
import { Albums } from './album.model';

export interface Songs {
    _id: string;
    title: string;
    artist: Artists;
    album: Albums;
    preview: string;
}