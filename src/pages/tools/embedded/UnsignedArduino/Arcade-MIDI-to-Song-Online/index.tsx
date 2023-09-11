import React from "react";
import Layout from "../../../../../components/Layout";
import getAppProps, { AppProps } from "../../../../../components/WithAppProps";
import { MidiFile, read } from "midifile-ts";
import { generateSong } from "@/scripts/embeddedTools/UnsignedArduino/Arcade-MIDI-to-Song-Online";
import { copyTextToClipboard } from "@/scripts/Utils/Clipboard";
import { NotificationType, notify } from "@/components/Notifications";
import getAvailableTracks from "@/scripts/embeddedTools/UnsignedArduino/Arcade-MIDI-to-Song-Online/arcade/tracks";

const pageName = "Arcade MIDI to Song";

export function ArcadeMIDItoSongOnline({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  const [disableUI, setDisableUI] = React.useState(false);
  const [midiFile, setMidiFile] = React.useState<MidiFile | null>();
  const [instrumentID, setInstrumentID] = React.useState(0);
  const [divisor, setDivisor] = React.useState(1);
  const [song, setSong] = React.useState("");

  React.useEffect(() => {
    if (midiFile) {
      setDisableUI(true);
      setTimeout(() => {
        setSong(generateSong(midiFile, instrumentID, divisor));
        notify(
          "Successfully converted MIDI to song!",
          NotificationType.Success
        );
        setDisableUI(false);
      });
    }
  }, [midiFile, instrumentID, divisor]);

  return (
    <Layout title={pageName} currentPage={pageName} appProps={appProps}>
      <h1>Arcade-MIDI-to-Song-Online</h1>
      <p>
        A tool made by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/UnsignedArduino"
        >
          UnsignedArduino
        </a>
        .
      </p>
      <div className="alert alert-warning" role="alert">
        This tool is still a work in progress!
      </div>
      <p>Choose a MIDI file to convert to a MakeCode Arcade song!</p>
      <div>
        <div className="input-group mb-2">
          <input
            type="file"
            className="form-control"
            id="midiFileInput"
            aria-label="Upload"
            disabled={disableUI}
            onChange={(e) => {
              setSong("");

              if (e.target.files === null || e.target.files.length === 0) {
                return;
              }

              const file = e.target.files[0];
              const reader = new FileReader();

              reader.onload = (e) => {
                if (e.target == null) {
                  notify("Failed to read file!", NotificationType.Error);
                  return;
                }
                const buf = e.target.result as ArrayBuffer;
                const midi = read(buf);
                setMidiFile(midi);
              };

              reader.readAsArrayBuffer(file);
            }}
          />
        </div>
        <div className="input-group mb-2">
          <label className="input-group-text" htmlFor="instrumentSelect">
            Instrument
          </label>
          <select
            className="form-select"
            id="instrumentSelect"
            disabled={disableUI}
            defaultValue={instrumentID}
            onChange={(e) => {
              setInstrumentID(e.target.selectedIndex);
            }}
          >
            {getAvailableTracks().map((t, i) => {
              return (
                <option key={t.name} value={i}>
                  {t.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text" aria-label="divisorInput">
            Divisor
          </span>
          <input
            type="number"
            min={0.1}
            className="form-control"
            placeholder="1"
            aria-label="Divisor"
            defaultValue={divisor}
            onBlur={(e) => {
              if (e.target.value != e.target.defaultValue) {
                setDivisor(parseFloat(e.target.value));
              }
            }}
            disabled={disableUI}
            id="divisorInput"
          />
        </div>
        <div>
          <label htmlFor="outputSongTextarea" className="form-label">
            Output song:
          </label>
          <textarea
            className="form-control"
            id="outputSongTextarea"
            rows={3}
            readOnly
            defaultValue={song}
            disabled={song.length === 0 || disableUI}
          />
          <button
            type="button"
            className="btn btn-primary mt-2"
            disabled={song.length === 0 || disableUI}
            onClick={() => {
              if (copyTextToClipboard(song)) {
                notify(
                  "Successfully copied text to clipboard!",
                  NotificationType.Success
                );
              } else {
                notify(
                  "Failed to copy text to clipboard!",
                  NotificationType.Error
                );
              }
            }}
          >
            Copy to clipboard
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: { appProps: AppProps };
}> {
  return {
    props: {
      appProps: await getAppProps(),
    },
  };
}

export default ArcadeMIDItoSongOnline;
