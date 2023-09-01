import React from "react";
import Layout from "../../../../../components/Layout";
import getAppProps, { AppProps } from "../../../../../components/WithAppProps";
import { read } from "midifile-ts";
import { generateSong } from "@/scripts/embeddedTools/UnsignedArduino/Arcade-MIDI-to-Song-Online";
import { copyTextToClipboard } from "@/scripts/Utils/Clipboard";
import { NotificationType, notify } from "@/components/Notifications";

const pageName = "Arcade MIDI to Song";

export function ArcadeMIDItoSongOnline({
  appProps,
}: {
  appProps: AppProps;
}): JSX.Element {
  const [song, setSong] = React.useState("");

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
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            id="midiFileInput"
            aria-label="Upload"
            onChange={(e) => {
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
                setSong(generateSong(midi));
                notify(
                  "Successfully converted MIDI to song!",
                  NotificationType.Success
                );
              };

              reader.readAsArrayBuffer(file);
            }}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="outputSongTextarea" className="form-label">
            Output song:
          </label>
          <textarea
            className="form-control"
            id="outputSongTextarea"
            rows={3}
            readOnly
            defaultValue={song}
            disabled={song.length === 0}
          />
          <button
            type="button"
            className="btn btn-primary mt-2"
            disabled={song.length === 0}
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
