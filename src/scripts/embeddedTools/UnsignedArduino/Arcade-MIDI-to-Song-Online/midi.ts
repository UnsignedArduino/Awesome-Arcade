// https://github.com/UnsignedArduino/ArcadeMIDIGeneratorOnline/blob/main/src/scripts/ArcadeMIDI%20Generator/generator.ts

import { AnyChannelEvent, AnyEvent, SetTempoEvent } from "midifile-ts";

export const mergeTracks = (tracks: Array<AnyEvent>[]): Array<AnyEvent> => {
  let msgs: Array<AnyEvent> = [];

  const toAbsTime = (messages: Array<AnyEvent>): Array<AnyEvent> => {
    let now = 0;
    const newMessages: Array<AnyEvent> = [];
    for (const message of messages) {
      now += message.deltaTime;
      const newMessage: AnyEvent = structuredClone(message);
      newMessage.deltaTime = now;
      newMessages.push(newMessage);
    }
    return newMessages;
  };

  const toRelTime = (messages: Array<AnyEvent>): Array<AnyEvent> => {
    let now = 0;
    const newMessages: Array<AnyEvent> = [];
    for (const message of messages) {
      const delta = message.deltaTime - now;
      const newMessage: AnyEvent = structuredClone(message);
      newMessage.deltaTime = delta;
      newMessages.push(newMessage);
      now = message.deltaTime;
    }
    return newMessages;
  };

  for (const track of tracks) {
    msgs.push(...toAbsTime(track));
  }

  msgs.sort((a: AnyEvent, b: AnyEvent): number => {
    return a.deltaTime - b.deltaTime;
  });

  msgs = toRelTime(msgs);

  return msgs;
};

export const convertNoteOffToNoteOn = (track: Array<AnyEvent>): void => {
  for (let i = 0; i < track.length; i++) {
    if (
      track[i].type == "channel" &&
      (track[i] as AnyChannelEvent).subtype == "noteOff"
    ) {
      const newNote: AnyChannelEvent = structuredClone(
        track[i]
      ) as AnyChannelEvent;
      newNote.subtype = "noteOn";
      track[i] = newNote;
    }
  }
};

export const fixTempo = (track: Array<AnyEvent>): void => {
  // Python mido library has a great explanation on delta time: https://mido.readthedocs.io/en/latest/midi_files.html#about-the-time-attribute
  const defaultUsPerBeat: number = 500000;
  let usPerBeat: number = defaultUsPerBeat;
  // let ticksPerBeat: number = 480; // I'm not sure what this is

  for (let i = 0; i < track.length; i++) {
    if (
      track[i].type == "meta" &&
      (track[i] as SetTempoEvent).subtype == "setTempo"
    ) {
      usPerBeat = (track[i] as SetTempoEvent).microsecondsPerBeat;
    }
    const newMsg: AnyEvent = structuredClone(track[i]);
    newMsg.deltaTime = Math.round(
      newMsg.deltaTime * (usPerBeat / defaultUsPerBeat)
    );
    track[i] = newMsg;
  }
};
