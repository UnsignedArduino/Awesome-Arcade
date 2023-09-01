import React from "react";
import Layout from "../../../../../components/Layout";
import getAppProps, { AppProps } from "../../../../../components/WithAppProps";

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
