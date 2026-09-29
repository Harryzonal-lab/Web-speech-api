// "use strict";

// const audioContext = new AudioContext();

// const oscillator = audioContext.createOscillator();

// oscillator.frequency.value = 261.63;

// oscillator.connect(audioContext.destination);

// oscillator.start();

// oscillator.stop(audioContext.currentTime + 1)

// console.log(audioContext)"use strict";
"use strict";

const audioContext = new AudioContext();
const activeOscillators = [];
const lyricTimers = [];

const notes = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88
};

const melody = [
//C C G G A A G
  { note: "C4", duration: 0.5 },
  { note: "C4", duration: 0.5 },
  { note: "G4", duration: 0.5 },
  { note: "G4", duration: 0.5 },
  { note: "A4", duration: 0.5 },
  { note: "A4", duration: 0.5 },
  { note: "G4", duration: 1 },

  //F F E E D D C
  { note: "F4", duration: 0.5 },
  { note: "F4", duration: 0.5 },
  { note: "E4", duration: 0.5 },
  { note: "E4", duration: 0.5 },
  { note: "D4", duration: 0.5 },
  { note: "D4", duration: 0.5 },
  { note: "C4", duration: 1 },

  //G G F F E E D
  { note: "G4", duration: 0.5 },
  { note: "G4", duration: 0.5 },
  { note: "F4", duration: 0.5 },
  { note: "F4", duration: 0.5 },
  { note: "E4", duration: 0.5 },
  { note: "E4", duration: 0.5 },
  { note: "D4", duration: 1 },

  //G G F F E E D
  { note: "G4", duration: 0.5 },
  { note: "G4", duration: 0.5 },
  { note: "F4", duration: 0.5 },
  { note: "F4", duration: 0.5 },
  { note: "E4", duration: 0.5 },
  { note: "E4", duration: 0.5 },
  { note: "D4", duration: 1 },

  //C C G G A A G
  { note: "C4", duration: 0.5 },
  { note: "C4", duration: 0.5 },
  { note: "G4", duration: 0.5 },
  { note: "G4", duration: 0.5 },
  { note: "A4", duration: 0.5 },
  { note: "A4", duration: 0.5 },
  { note: "G4", duration: 1 },

  //F F E E D D C
  { note: "F4", duration: 0.5 },
  { note: "F4", duration: 0.5 },
  { note: "E4", duration: 0.5 },
  { note: "E4", duration: 0.5 },
  { note: "D4", duration: 0.5 },
  { note: "D4", duration: 0.5 },
  { note: "C4", duration: 1 }
];

function playNote(note, startTime, duration) {
  const oscillator = audioContext.createOscillator();

  activeOscillators.push(oscillator);

  oscillator.frequency.value = notes[note];

  oscillator.connect(audioContext.destination);

  oscillator.start(startTime);

  oscillator.onended = function () {
    const index = activeOscillators.indexOf(oscillator);

    if (index !== -1) {
      activeOscillators.splice(index, 1);
    }
  };

  oscillator.stop(startTime + duration);
}

//play melody
function playMelody() {
  audioContext.resume().then(function () {
    let startTime = audioContext.currentTime;

    melody.forEach(function (item) {
      playNote(item.note, startTime, item.duration);
      startTime += item.duration;
    });
  });
}


function stopMelody() {
  activeOscillators.slice().forEach(function (oscillator) {
    oscillator.stop();
  });

  activeOscillators.length = 0;
}


const lyrics1 = new SpeechSynthesisUtterance(
  "Twinkle, twinkle, little star"
);

const lyrics2 = new SpeechSynthesisUtterance(
  "How I wonder what you are"
);

const lyrics3 = new SpeechSynthesisUtterance(
  "Up above the world so high"
);


const lyrics4 = new SpeechSynthesisUtterance(
  "Like a diamond in the sky"
);

const lyrics5 = new SpeechSynthesisUtterance(
  "Twinkle, twinkle, little star"
);

const lyrics6 = new SpeechSynthesisUtterance(
  "How I wonder what you are"
);



lyrics6.rate = 0.8;

lyrics5.rate = 0.8;

lyrics4.rate = 0.8;

lyrics3.rate = 0.8;

lyrics1.rate = 0.8;
lyrics2.rate = 0.8;


// play button
const playButton = document.querySelector("#play-btn");

playButton.addEventListener("click", function () {
  stopMelody();
  speechSynthesis.cancel();

  lyricTimers.forEach(function (timer) {
    clearTimeout(timer);
  });

  lyricTimers.length = 0;

  playMelody();

  speechSynthesis.speak(lyrics1);

  const timer2 = setTimeout(function () {
    speechSynthesis.speak(lyrics2);
  }, 4000);

  const timer3 = setTimeout(function () {
    speechSynthesis.speak(lyrics3);
  }, 8000);

  const timer4 = setTimeout(function () {
    speechSynthesis.speak(lyrics4);
  }, 12000);

  const timer5 = setTimeout(function () {
    speechSynthesis.speak(lyrics5);
  }, 16000);

  const timer6 = setTimeout(function () {
    speechSynthesis.speak(lyrics6);
  }, 20000);

  lyricTimers.push(timer2, timer3, timer4, timer5, timer6);
});



//stop button
const stopButton = document.querySelector("#stop-btn");

stopButton.addEventListener("click", function () {
  stopMelody();
  speechSynthesis.cancel();

  lyricTimers.forEach(function (timer) {
    clearTimeout(timer);
  });

  lyricTimers.length = 0;
});