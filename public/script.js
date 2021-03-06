var player1 = true;
var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

let lastExplosion = +new Date();

function resetBoard() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      document.getElementById(`${i},${j}`).setAttribute("color", "tomato");
    }
  }
  document
    .getElementById("winner")
    .setAttribute(
      "text",
      "value: " + (player1 ? "Blue," : "Green, ") + " make your move!"
    );
  board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

function hasWon() {
  var p1row = 0;
  var p2row = 0;
  var p1col = 0;
  var p2col = 0;
  //iterating through rows
  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 3; i++) {
      if (board[j][i] == 1) {
        p1row += 1;
      }
      if (board[j][i] == -1) {
        p2row += 1;
      }
      if (board[i][j] == 1) {
        p1col += 1;
      }
      if (board[i][j] == -1) {
        p2col += 1;
      }
    }

    if (
      p1row == 3 ||
      p1col == 3 ||
      board[0][0] + board[1][1] + board[2][2] == 3 ||
      board[0][2] + board[1][1] + board[2][0] == 3
    ) {
      console.log("p1 win");
      document
        .getElementById("winner")
        .setAttribute("text", "value: Blue Player Wins!; color:black");
      setTimeout(resetBoard, 4000);
    }
    if (
      p2row == 3 ||
      p2col == 3 ||
      board[0][0] + board[1][1] + board[2][2] == -3 ||
      board[0][2] + board[1][1] + board[2][0] == -3
    ) {
      console.log("p2 win");
      document
        .getElementById("winner")
        .setAttribute("text", "value: Green Player Wins!; color:black");
      setTimeout(resetBoard, 4000);
    } else {
      p1row = 0;
      p2row = 0;
      p1col = 0;
      p2col = 0;
    }
  }
}

function isTied() {
  var numSquaresClicked = 0;
  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < 3; i++) {
      if (board[j][i] != 0) {
        numSquaresClicked++;
      }
    }
  }
  if (numSquaresClicked == 9) {
    document
      .getElementById("winner")
      .setAttribute("text", "value: The Game is a Tie!; color:black");
    setTimeout(resetBoard, 4000);
  }
}

function clicked(box) {
  const explosionSound = document.getElementById("explosion-sound");
  explosionSound.currentTime = 0;
  explosionSound.play();
  lastExplosion = +new Date();
  var boxArr = box.split(",");
  //player 1 is blue and 1
  if (player1 && board[boxArr[0]][boxArr[1]] == 0) {
    document.getElementById(box).setAttribute("color", "dodgerblue");
    board[boxArr[0]][boxArr[1]] = 1;
    player1 = false;
    document
      .getElementById("winner")
      .setAttribute(
        "text",
        "value: " + (player1 ? "Blue," : "Green, ") + " make your move!"
      );
    document
      .getElementById("instructions")
      .setAttribute(
        "text",
        "value: say '" + (player1 ? "blue" : "green") + " on square <num>'"
      );
    isTied();
    hasWon();
    console.log(board);
  }
  //player 2 is green and -1
  else if (board[boxArr[0]][boxArr[1]] == 0) {
    document.getElementById(box).setAttribute("color", "green");
    board[boxArr[0]][boxArr[1]] = -1;
    player1 = true;
    document
      .getElementById("winner")
      .setAttribute(
        "text",
        "value: " + (player1 ? "Blue," : "Green, ") + " make your move!"
      );
    document
      .getElementById("instructions")
      .setAttribute(
        "text",
        "value: say '" + (player1 ? "blue" : "green") + " on square <num>'"
      );
    isTied();
    hasWon();
    console.log(board);
  }
}

function audioHellscape() {
  let light;
  function updateLighting() {
    const timeSinceExplosion = new Date() - lastExplosion;
    const intensity = Math.max(1 - timeSinceExplosion / 500, 0.3);
    light.setAttribute("intensity", intensity);
    setTimeout(updateLighting, 75);
  }
  window.addEventListener("load", function() {
    light = document.getElementById("animated-light");
    updateLighting();
    document.addEventListener("click", function() {
      document.getElementById("soundtrack").play();
    });
  });
}

audioHellscape();
