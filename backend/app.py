from flask import Flask, request, jsonify
from datetime import datetime
app = Flask(__name__)

"""
Board:
0 1 2
3 4 5
6 7 8
"""
winning_sets = [
    # Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    # Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    # Diagonal
    [1, 4, 8],
    [2, 4, 6],
]

class Board:
    def __init__(self):
        self.squares = [None] * 9
        self.next_player = 'X'
        self.win_state = None

    def advance_next_player(self):
        if self.next_player == 'X':
            self.next_player = 'O'
        else:
            self.next_player = 'X'

    def check_end_conditions(self):
        for winning_set in winning_sets:
            pieces = [self.squares[i] for i in winning_set if i is not None]
            if len(pieces) == 3 and len(set(pieces)) == 1:
                self.win_state = pieces[0]
                return
        if all([space for space in self.squares]):
            self.win_state = 'cat'

    def place_piece(self, player, square):
        if square < 0 or square >= len(self.squares):
            return False, "Invalid square, must be an integer from 0-8"
        if player != self.next_player:
            return False, "It's not your turn."
        if self.squares[square] is not None:
            return False, "A piece is already at that space."
        self.squares[square] = player
        self.advance_next_player()
        self.check_end_conditions()
        return True, "Success"

    def json(self):
        return {
            'board': self.squares,
            'next_player': self.next_player,
            'winning_player': self.win_state
        }

rooms = {
    1337: Board()
}
room_index = 0

@app.route('/room/create')
def create_room():
    global room_index
    room_index = (room_index + 1) % 1000
    rooms[room_index] = Board()
    return jsonify({
        "id": room_index
    })

@app.route('/room/<int:room_id>/state')
@app.errorhandler(404)
def get_state(room_id):
    return jsonify(rooms[room_id].json())

@app.route('/room/<int:room_id>/play', methods=['POST'])
@app.errorhandler(404)
def play(room_id):
    req = request.json
    success, message = rooms[room_id].place_piece(req['player'], req['square'])
    return jsonify({
        "success": success,
        "board_state": rooms[room_id].json(),
        "message": message
    })


@app.route('/')
def homepage():
    the_time = datetime.now().strftime("%A, %d %b %Y %l:%M %p")

    return """
    <h1>Hello heroku</h1>
    <p>It is currently {time}.</p>
    """.format(time=the_time)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)