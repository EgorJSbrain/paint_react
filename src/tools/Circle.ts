import { Tools } from "@/constants/global"
import Tool from "./Tool"

class Circle extends Tool {
  mouseDown: boolean = false;
  canvas: HTMLCanvasElement | null = null;
  startX = 0;
  startY = 0;
  width = 0;
  height = 0;
  radius = 0;
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
      this.radius = Math.sqrt(this.width ** 2 + this.height ** 2);

      this.draw(this.startX, this.startY, this.radius);
    }
  }

  mouseUpHandler() {
    this.mouseDown = false;

    this.socket?.send(
      JSON.stringify({
        method: "draw",
        id: this.sessionId,
        figure: {
          type: Tools.circle,
          x: this.startX,
          y: this.startY,
          radius: this.radius,
          color: this.ctx?.fillStyle,
        },
      })
    );
  }

  draw(x: number, y: number, radius: number) {
    const img = new Image();
    img.src = this.saved;

    img.onload = () => {
      this.ctx?.clearRect(
        0,
        0,
        this.canvas?.width ?? 0,
        this.canvas?.height ?? 0
      );
      this.ctx?.drawImage(
        img,
        0,
        0,
        this.canvas?.width ?? 0,
        this.canvas?.height ?? 0
      );
      this.ctx?.beginPath();
      this.ctx?.arc(x, y, radius, 0, 2 * Math.PI);
      this.ctx?.fill(); // TODO add functionality for filling
      this.ctx?.stroke();
    };
  }

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    radius: number,
    color: string
  ) {
    ctx.fillStyle = color;
    ctx?.beginPath();
    ctx?.arc(width, height, radius, 0, 2 * Math.PI);
    ctx?.fill(); // TODO add functionality for filling
    ctx?.stroke();
  }
}

export default Circle
