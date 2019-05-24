# The VR board backend

## Deploying
- (first time): `heroku git:remote -a vr-board`
- `cd vr-tic-tac-toe`
- `git subtree push --prefix backend heroku master`

## Usage
```bash
$ curl https://vr-board.herokuapp.com/room/create
{"id":1}
$ curl https://vr-board.herokuapp.com/room/1/play -d '{"player":"X","square":4}' -H 'Content-Type: application/json'
{"board_state":{"board":[null,null,null,null,"X",null,null,null,null],"next_player":"O","winning_player":null},"message":"Success","success":true}
$ curl https://vr-board.herokuapp.com/room/1/play -d '{"player":"O","square":0}' -H 'Content-Type: application/json'
{"board_state":{"board":["O",null,null,null,"X",null,null,null,null],"next_player":"X","winning_player":null},"message":"Success","success":true}
$ curl https://vr-board.herokuapp.com/room/1/state
{"board":["O",null,null,null,"X",null,null,null,null],"next_player":"X","winning_player":null}
```
