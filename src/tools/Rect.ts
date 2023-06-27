import { Tools } from "@/constants/global"
import Tool from "./Tool"

class Rect extends Tool {
  mouseDown: boolean = false;
  canvas: HTMLCanvasElement | null = null;
  startX = 0;
  startY = 0;
  width = 0;
  height = 0;
  saved = "";

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId);
    this.canvas = canvas;
    this.listen();
  }

  listen() {
    this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e: any) {
    this.mouseDown = false;

    this.socket?.send(
      JSON.stringify({
        method: "draw",
        id: this.sessionId,
        figure: {
          type: Tools.rect,
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          color: this.ctx?.fillStyle
        },
      })
    );
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true;
    this.ctx?.beginPath();

    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;

    this.saved = this.canvas?.toDataURL() ?? "";
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;

      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;

    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0);
      this.ctx?.drawImage(
        img,
        0,
        0,
        this.canvas?.width ?? 0,
        this.canvas?.height ?? 0
      );
      this.ctx?.beginPath();
      this.ctx?.rect(x, y, w, h);
      this.ctx?.fill();
      this.ctx?.stroke();
    };
  }

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
  ) {
    ctx.fillStyle = color
    ctx?.beginPath();
    ctx?.rect(x, y, w, h);
    ctx?.fill();
    ctx?.stroke();
  }
}

export default Rect
