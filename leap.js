app.input.hands = [];

var controllerOptions = {};

Leap.loop(controllerOptions, function(frame) {

  console.log(app.input.hands);
  var frameString = "Frame ID: " + frame.id  + "<br />"
                  + "Timestamp: " + frame.timestamp + " &micro;s<br />"
                  + "Hands: " + frame.hands.length + "<br />"
                  + "Fingers: " + frame.fingers.length + "<br />"
                  + "_rotation: " + frame.hands.length + "<br />"
                  + "_scaleFactor: " + frame.hands.length + "<br />"
                  + "_translation: " + frame.hands.length + "<br />"
                  + "Hands: " + frame.hands.length + "<br />"
                  + "Hands: " + frame.hands.length + "<br />"

  // Display Hand object data
  var handString = "";
  if (frame.hands.length > 0) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];

      if (storingHand(app.input.hands, hand)) { return; }
      app.input.hands.push({
        id: hand.id,
        palmPosition: hand.palmPosition,
        palmNormal: hand.palmNormal,
        palmDirection: hand.palmDirection,
      });
    }
  }
  removeUntracked(app.input.hands, frame.hands);
});

function storingHand(currentHands, hand) {
  for (var i = 0; i < currentHands.length; i++) {
    if (currentHands[i].id == hand.id) {
      return true;
    }
  }
  return false;
}

function removeUntracked(currentHands, trackedHands) {
  for (var i = 0; i < currentHands.length; i++) {
    var existsInLeap = false;
    for (var j = 0; j < trackedHands.length; j++) {
      if (trackedHands[j].id === currentHands[i].id) {
        existsInLeap = true;
      }
    }
    if (existsInLeap === false) {
      currentHands.splice(i, 1)
    }
  }
}
