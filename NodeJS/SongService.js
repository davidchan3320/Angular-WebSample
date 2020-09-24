var songDatabase = require(__dirname + "/database");
const database = "ATWD2";
const collection = "Song";
const client = songDatabase.database;
const assert = songDatabase.assert;
const url = songDatabase.url;
const ObjectId = songDatabase.ObjectId;

exports.song_get = song_get;

function song_get(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var skip = parseInt(req.params.skip);
    var limit = parseInt(req.params.limit);
    client.connect(url, async function (err, db) {
        if (err) {
            res.status(500).json({
                messages: "connection failed"
            });
        } else {
            var array = [];
            try {
                var col = db.db(database).collection(collection);
                var result = await col.find({}).sort({
                        "album.title": 1,
                        "artist.name": 1
                    }).project({
                        _id: 1,
                        title: 1,
                        "artist.name": 1,
                        "album.title": 1,
                        "album.cover_medium": 1,
                        preview: 1
                    })
                    .skip(skip).limit(limit).toArray();
                array.push({
                    Songs: result
                });
                result = await col.find({}).sort({
                    "artist.name": 1
                }).toArray();
                console.log(result.length);
                array.push({
                    NumDocs: result.length
                });
                res.status(200).end(JSON.stringify(array));
            } catch (err) {
                console.log(err);
                res.status(404).json({
                    messages: "Not Found"
                });
            } finally {
                await db.close();
            }
        }
    })
}

exports.song_search_get = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var skip = parseInt(req.params.skip);
    var limit = parseInt(req.params.limit);
    var song = req.params.song;
    client.connect(url, async function (err, db) {
        if (err) {
            res.status(500).json({
                messages: "connection failed"
            });
        } else {
            var array = [];
            var col = db.db(database).collection(collection);
            await col.find({
                title: new RegExp(song, 'i')
            }).sort({
                "album.title": 1,
                "artist.name": 1
            }).project({
                _id: 1,
                title: 1,
                "artist.name": 1,
                "album.title": 1,
                "album.cover_medium": 1,
                preview: 1
            }).skip(skip).limit(limit).toArray(function (err, docs) {
                if (err) {
                    res.status(404).json({
                        messages: "Not Found"
                    });
                } else {
                    console.log("Found the following records");
                    console.log(docs);
                    array.push({
                        Songs: docs
                    });
                }
            });
            await col.find({
                title: new RegExp(song, 'i')
            }).sort({
                "artist.name": 1
            }).toArray(function (err, docs) {
                if (err) {
                    res.status(404).json({
                        messages: "Not Found"
                    });
                } else {
                    console.log("Found the following records");
                    console.log(docs.length);
                    array.push({
                        NumDocs: docs.length
                    });
                    res.status(200).end(JSON.stringify(array));
                }
            })
            await db.close();
        }
    })
}

exports.song_put = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    // var skip = parseInt(req.params.skip);
    // var limit = parseInt(req.params.limit);
    var oid = ObjectId(req.params.oid);
    const song = quoteReplace(req.params.song);
    const artist = quoteReplace(req.params.artist);
    const album = quoteReplace(req.params.album);
    const imgUrl = quoteReplace(req.params.imgUrl);
    const audUrl = quoteReplace(req.params.audUrl);
    client.connect(url, function (err, db) {
        if (err) {
            res.status(500).json({
                messages: "connection failed"
            });
        } else {
            var col = db.db(database).collection(collection);
            col.updateOne({
                _id: oid
            }, {
                $set: {
                    title: song,
                    "artist.name": artist,
                    "album.title": album,
                    "album.cover_medium": imgUrl,
                    preview: audUrl
                }
            }, function (err, docs) {
                if (err) {
                    res.status(404).json({
                        messages: "Not found"
                    });
                } else {
                    console.log(docs.result.nModified + " document(s) updated");
                    res.status(200).json({
                        messages: "updated"
                    });
                }
            });
        }
        db.close();
    })
}

exports.song_post = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    // var skip = parseInt(req.params.skip);
    // var limit = parseInt(req.params.limit);
    var song = quoteReplace(req.params.song);
    var artist = quoteReplace(req.params.artist);
    var album = quoteReplace(req.params.album);
    var imgUrl = quoteReplace(req.params.imgUrl);
    var audUrl = quoteReplace(req.params.audUrl);

    var artistArr = {
        name: artist
    };

    var albumArr = {
        title: album,
        cover_medium: imgUrl
    }

    client.connect(url, function (err, db) {
        if (err) {
            res.status(500).json({
                messages: "connection failed"
            });
        } else {
            var col = db.db(database).collection(collection);
            col.insertOne({
                title: song,
                artist: artistArr,
                album: albumArr,
                preview: audUrl
            }, function (err, docs) {
                if (err) {
                    res.status(404).json({
                        messages: "Not found"
                    });
                } else {
                    console.log(docs.insertedCount + " document(s) inserted");
                    res.status(200).json({
                        messages: "inserted"
                    });
                }

            });
        }
        db.close();
    })
}

exports.song_delete = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    // var skip = parseInt(req.params.skip);
    // var limit = parseInt(req.params.limit);
    var oid = ObjectId(req.params.oid);
    client.connect(url, function (err, db) {
        if (err) {
            res.status(500).json({
                messages: "connection failed"
            });
        } else {
            var col = db.db(database).collection(collection);
            col.deleteOne({
                _id: oid
            }, function (err, docs) {
                if (err) {
                    res.sendStatus(404);
                    res.json({
                        messages: "Not found"
                    });
                } else {
                    console.log(docs.deletedCount + " document(s) deleted");
                    res.status(200).json({
                        messages: "deleted"
                    });
                }
            });
        }
        db.close();
    })
}

function quoteReplace(str) {
    var result = str.replace(/[_]/gi, "/");
    result = result.replace(/[+]/gi, " ");
    return result;
}