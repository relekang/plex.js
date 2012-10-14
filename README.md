# Plex.js
A plex remote in javascript

## Requirements
*   jQuery

## Usage
    var remote = new PlexRemote();

### Playback commands

    remote.play()
    remote.pause()
    remote.stepForward()
    remote.stepBack()
    remote.playMediaItem(id)

*id* in playMediaItem() is the rating-key of the item in plex