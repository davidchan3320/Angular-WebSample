var express = require('express');
var server = express();
var cors = require('cors');
var fs = require('fs');
var SongService = require(__dirname + '/SongService');

const corsOptions = {
    origin: "*",
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};

server.use(cors(corsOptions));

server.get("/api/song/:skip/:limit", SongService.song_get);

server.get("/api/song/:skip/:limit/:song", SongService.song_search_get);

server.put("/api/song/:oid/:song/:artist/:album/:imgUrl/:audUrl", SongService.song_put);

server.post("/api/song/:song/:artist/:album/:imgUrl/:audUrl", SongService.song_post);

server.delete("/api/song/:oid", SongService.song_delete);

server.listen(3000, function () {
    console.log("Server started on 3000 port");
});