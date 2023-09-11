import { AnyEvent } from "midifile-ts";
import { pxt } from "@/scripts/embeddedTools/UnsignedArduino/Arcade-MIDI-to-Song-Online/arcade/music";

export default function midiToSong(
  msgs: AnyEvent[],
  trackToUse: string | number,
  divisor: number
): pxt.assets.music.Song {}
