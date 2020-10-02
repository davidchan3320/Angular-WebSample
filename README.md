# Angular-WebSample

### Summary
This project is for learning Angular. Angular is large thing in front-end development. However, it is clear and easy to maintain because it is a MVC framework. Therefore, it is good practice to learn it. 

### Requirement
You have to prepare your MongoDB database. This is a sample JSON format which I used in this project.

```json
{
        "Songs": [
            {
                "_id": "5ef0e0aa972f7214a76ec3fe",
                "title": "War",
                "preview": "https://cdns-preview-7.dzcdn.net/stream/c-7a3fe716b12c754eea91520fcc00568b-4.mp3",
                "artist": {
                    "name": "Sum 41"
                },
                "album": {
                    "title": "13 Voices",
                    "cover_medium": "https://cdns-images.dzcdn.net/images/cover/91c7ab2caeb92eef4d2eb7b7076a02af/250x250-000000-80-0-0.jpg"
                }
            },
            {
                "_id": "5ef0e0ab972f7214a76ec429",
                "title": "Cry Out",
                "preview": "https://cdns-preview-3.dzcdn.net/stream/c-330878ed8272dc620c1e5efebb1e1fcc-2.mp3",
                "artist": {
                    "name": "ONE OK ROCK"
                },
                "album": {
                    "title": "35xxxv (Deluxe Edition)",
                    "cover_medium": "https://cdns-images.dzcdn.net/images/cover/8690fb3799c2df8839b945160c341f1a/250x250-000000-80-0-0.jpg"
                }
            },
            {
                "_id": "5ef0e0ab972f7214a76ec42a",
                "title": "Memories",
                "preview": "https://cdns-preview-c.dzcdn.net/stream/c-c78195c9055e5e84e8caa73917db7f88-6.mp3",
                "artist": {
                    "name": "ONE OK ROCK"
                },
                "album": {
                    "title": "35xxxv (Deluxe Edition)",
                    "cover_medium": "https://cdns-images.dzcdn.net/images/cover/8690fb3799c2df8839b945160c341f1a/250x250-000000-80-0-0.jpg"
                }
            }
}
```

After prepared your data, you need to edit database.js file in NodeJS folder and replace your uri.


### Installation
- Step 1:
download all things
``` sh
$ git clone https://github.com/davidchan3320/Angular-WebSample.git
```

- Step 2:
install [Node.js](https://nodejs.org/en/) and angular cli

For angular cli:
``` sh
$ npm install -g @angular/cli
```

- Step 3:
install all packages

In Angular-WebSample folder
``` sh
$ npm install
$ cd songLibrary
$ npm install
```

- Step 4:
go to SongLibrary folder and run it by cmd / shell

``` sh
$ cd songLibrary
$ ng serve --proxy-config proxy.conf.json --open
```




