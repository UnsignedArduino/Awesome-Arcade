import { MidiFile } from "midifile-ts";
import {
  convertNoteOffToNoteOn,
  fixTempo,
  mergeTracks,
} from "@/scripts/embeddedTools/UnsignedArduino/Arcade-MIDI-to-Song-Online/midi";

export function generateSong(
  midi: MidiFile,
  instrumentID: string | number,
  divisor: number
): string {
  console.log("Generating song");

  const msgs = mergeTracks(midi.tracks);
  console.log(`Merged ${midi.tracks.length} tracks to ${msgs.length} messages`);
  convertNoteOffToNoteOn(msgs);
  fixTempo(msgs);

  return `SONG USING INSTRUMENT ${instrumentID} AND DIVISOR ${divisor}`;
}
