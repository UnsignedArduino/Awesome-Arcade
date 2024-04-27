type MakeCodeArcadeBlockRendererParams = {
  code: string;
  id: string;
  packageId?: string;
  snippetMode?: boolean;
  callback: (result: MakeCodeArcadeBlockRendererResult) => void;
};

export type MakeCodeArcadeBlockRendererResult = {
  uri: string;
  width: number;
  height: number;
};

export class MakeCodeArcadeBlockRenderer {
  private renderer: HTMLIFrameElement;
  private rendererReady: boolean = false;
  private paramQueue: MakeCodeArcadeBlockRendererParams[] = [];
  private nextID: number = 0;

  public constructor() {
    this.renderer = this.prepareRenderer();
    window.addEventListener("message", (event) => {
      const msg = (event as MessageEvent).data;
      if (msg.source != "makecode") {
        return;
      }
      console.log(`Received message from renderer of type ${msg.type}`);
      switch (msg.type) {
        case "renderready": {
          console.log("Renderer is ready");
          this.rendererReady = true;
          this.paramQueue.forEach((params) => {
            this.pushToRenderer(params);
          });
          break;
        }
        case "renderblocks": {
          console.log("Renderer has finished code");
          const result: MakeCodeArcadeBlockRendererResult = {
            uri: msg.uri,
            width: msg.width,
            height: msg.height,
          };
          this.paramQueue.splice(
            this.paramQueue.findIndex((params) => {
              if (params.id == msg.id) {
                params.callback(result);
                return true;
              }
              return false;
            }),
            1,
          );
          break;
        }
      }
    });
  }

  public renderBlocksToSVG(
    js: string,
    packageId?: string,
    snippetMode?: boolean,
  ): Promise<MakeCodeArcadeBlockRendererResult> {
    return new Promise((resolve) => {
      const params = {
        code: js,
        id: `${this.nextID++}`,
        packageId,
        snippetMode,
        callback: (result: MakeCodeArcadeBlockRendererResult) => {
          resolve(result);
        },
      };
      this.paramQueue.push(params);
      console.log(`Queueing code ${params.id}`);
      if (this.isRendererReady()) {
        this.pushToRenderer(params);
      }
      // setTimeout(() => {
      //   console.log(`Timeout for ${params.id}`);
      //   reject();
      //   this.paramQueue.splice(
      //     this.paramQueue.findIndex((p) => {
      //       return params.id == p.id;
      //     }),
      //     1,
      //   );
      // }, 10000);
    });
  }

  private prepareRenderer(): HTMLIFrameElement {
    const r = document.getElementById(
      "makeCodeArcadeBlockRenderer",
    ) as HTMLIFrameElement | null;
    if (r) {
      console.log("Found renderer");
      this.renderer = r;
      return r;
    }
    console.log("Preparing renderer");
    this.renderer = document.createElement("iframe") as HTMLIFrameElement;
    this.renderer.id = "makeCodeArcadeBlockRenderer";
    this.renderer.style.position = "absolute";
    this.renderer.style.right = "0px";
    this.renderer.style.bottom = "0px";
    this.renderer.style.width = "1px";
    this.renderer.style.height = "1px";
    this.renderer.src = "https://arcade.makecode.com/--docs?render=1";
    document.body.appendChild(this.renderer);
    return this.renderer;
  }

  private isRendererReady(): boolean {
    return this.renderer.contentWindow !== null && this.rendererReady;
  }

  private pushToRenderer(params: MakeCodeArcadeBlockRendererParams) {
    console.log(`Pushing code ${params.id} to renderer`);
    this.renderer.contentWindow!.postMessage(
      {
        type: "renderblocks",
        id: params.id,
        code: params.code,
        options: {
          packageId: params.packageId,
          snippetMode: params.snippetMode,
        },
      },
      "https://arcade.makecode.com/",
    );
  }
}
