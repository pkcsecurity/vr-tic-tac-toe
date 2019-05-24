var player1 = true;
var board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

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
      setTimeout(resetBoard, 5000);
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
      setTimeout(resetBoard, 5000);
    } else {
      p1row = 0;
      p2row = 0;
      p1col = 0;
      p2col = 0;
    }
  }
}

function clicked(box) {
    var boxArr = box.split(",")
        //player 1 is blue and 1
    if (player1 && board[boxArr[0]][boxArr[1]] == 0) {
        document.getElementById(box).setAttribute("color", "dodgerblue")
        board[boxArr[0]][boxArr[1]] = 1
        player1 = false
        document.getElementById('winner').setAttribute("text", "value: " + (player1 ? 'Blue,' : 'Green, ') + " make your move!");
        document.getElementById('instructions').setAttribute("text", "value: say '" + (player1 ? 'blue' : 'green') + " on square <num>'");
        hasWon()
        console.log((board))
    }
    //player 2 is green and -1
    else if (board[boxArr[0]][boxArr[1]] == 0) {
        document.getElementById(box).setAttribute("color", "green")
        board[boxArr[0]][boxArr[1]] = -1
        player1 = true
        document.getElementById('winner').setAttribute("text", "value: " + (player1 ? 'Blue,' : 'Green, ') + " make your move!");
        document.getElementById('instructions').setAttribute("text", "value: say '" + (player1 ? 'blue' : 'green') + " on square <num>'");
        hasWon()
        console.log(board)
    }
}

(function() {
  console.log('starting audio context')
  const context = new AudioContext();
  let maxAmp = 0.5;
  let minAmp = 0.3;

  // Here's where most of the work happens
  function processAudio(e) {
    const light = document.getElementById('animated-light');
    const buffer = e.inputBuffer.getChannelData(0);
    const out = e.outputBuffer.getChannelData(0);
    let amp = 0;

    // Iterate through buffer to get the max amplitude for this frame
    for (let i = 0; i < buffer.length; i++) {
      const loud = Math.abs(buffer[i]);
      if(loud > amp) {
        amp = loud;
      }
      // write input samples to output unchanged
      out[i] = buffer[i];
    }
    minAmp = Math.min(minAmp, amp);
    maxAmp = Math.max(maxAmp, amp);
    const scaledAmp = (amp - minAmp) / (maxAmp - minAmp);
    light.setAttribute('intensity', scaledAmp);
    //console.log('amplitude ' + amp + ' scaled ' + scaledAmp);
  }

  window.addEventListener('load',function() {
    console.log('adding audio listeners')
    // Add an audio element
    const audio = document.getElementById('soundtrack');


    //audio.addEventListener('canplaythrough',function() {
    console.log('audio canplaythrough')
    const node = context.createMediaElementSource(audio);

    // create a node that will handle the animation, but won't alter the audio
    // in any way
    const processor = context.createScriptProcessor(0,1,1);
    processor.onaudioprocess = processAudio;

    // connect the audio element to the node responsible for the animation
    node.connect(processor);

    // connect the "animation" node to the output
    processor.connect(context.destination);

    // play the sound
    audio.play();
    //});
  });
})();