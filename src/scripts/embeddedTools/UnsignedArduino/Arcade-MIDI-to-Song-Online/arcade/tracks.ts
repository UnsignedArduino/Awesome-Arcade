import { pxt } from "@/scripts/embeddedTools/UnsignedArduino/Arcade-MIDI-to-Song-Online/arcade/music";

export default function getAvailableTracks(): pxt.assets.music.Track[] {
  return [
    {
      id: 0,
      name: "Dog",
      notes: [],
      iconURI: "music-editor/dog.png",
      instrument: {
        waveform: 1,
        octave: 4,
        ampEnvelope: {
          attack: 10,
          decay: 100,
          sustain: 500,
          release: 100,
          amplitude: 1024,
        },
        pitchLFO: {
          frequency: 5,
          amplitude: 0,
        },
      },
    },
    {
      id: 1,
      name: "Duck",
      notes: [],
      iconURI: "music-editor/duck.png",
      instrument: {
        waveform: 15,
        octave: 4,
        ampEnvelope: {
          attack: 5,
          decay: 530,
          sustain: 705,
          release: 450,
          amplitude: 1024,
        },
        pitchEnvelope: {
          attack: 5,
          decay: 40,
          sustain: 0,
          release: 100,
          amplitude: 40,
        },
        ampLFO: {
          frequency: 3,
          amplitude: 20,
        },
        pitchLFO: {
          frequency: 6,
          amplitude: 2,
        },
      },
    },
    {
      id: 2,
      name: "Cat",
      notes: [],
      iconURI: "music-editor/cat.png",
      instrument: {
        waveform: 12,
        octave: 5,
        ampEnvelope: {
          attack: 150,
          decay: 100,
          sustain: 365,
          release: 400,
          amplitude: 1024,
        },
        pitchEnvelope: {
          attack: 120,
          decay: 300,
          sustain: 0,
          release: 100,
          amplitude: 50,
        },
        pitchLFO: {
          frequency: 10,
          amplitude: 6,
        },
      },
    },
    {
      id: 3,
      name: "Fish",
      notes: [],
      iconURI: "music-editor/fish.png",
      instrument: {
        waveform: 1,
        octave: 3,
        ampEnvelope: {
          attack: 220,
          decay: 105,
          sustain: 1024,
          release: 350,
          amplitude: 1024,
        },
        ampLFO: {
          frequency: 5,
          amplitude: 100,
        },
        pitchLFO: {
          frequency: 1,
          amplitude: 4,
        },
      },
    },
    {
      id: 4,
      name: "Car",
      notes: [],
      iconURI: "music-editor/car.png",
      instrument: {
        waveform: 16,
        octave: 4,
        ampEnvelope: {
          attack: 5,
          decay: 100,
          sustain: 1024,
          release: 30,
          amplitude: 1024,
        },
        pitchLFO: {
          frequency: 10,
          amplitude: 4,
        },
      },
    },
    {
      id: 5,
      name: "Computer",
      notes: [],
      iconURI: "music-editor/computer.png",
      instrument: {
        waveform: 15,
        octave: 2,
        ampEnvelope: {
          attack: 10,
          decay: 100,
          sustain: 500,
          release: 10,
          amplitude: 1024,
        },
      },
    },
    {
      id: 6,
      name: "Burger",
      notes: [],
      iconURI: "music-editor/burger.png",
      instrument: {
        waveform: 1,
        octave: 2,
        ampEnvelope: {
          attack: 10,
          decay: 100,
          sustain: 500,
          release: 100,
          amplitude: 1024,
        },
      },
    },
    {
      id: 7,
      name: "Cherry",
      notes: [],
      iconURI: "music-editor/cherry.png",
      instrument: {
        waveform: 2,
        octave: 3,
        ampEnvelope: {
          attack: 10,
          decay: 100,
          sustain: 500,
          release: 100,
          amplitude: 1024,
        },
      },
    },
    {
      id: 8,
      name: "Lemon",
      notes: [],
      iconURI: "music-editor/lemon.png",
      instrument: {
        waveform: 14,
        octave: 2,
        ampEnvelope: {
          attack: 5,
          decay: 70,
          sustain: 870,
          release: 50,
          amplitude: 1024,
        },
        pitchEnvelope: {
          attack: 10,
          decay: 45,
          sustain: 0,
          release: 100,
          amplitude: 20,
        },
        ampLFO: {
          frequency: 1,
          amplitude: 50,
        },
        pitchLFO: {
          frequency: 2,
          amplitude: 1,
        },
      },
    },
  ];
}
