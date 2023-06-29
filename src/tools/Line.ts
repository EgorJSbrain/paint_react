import { Tools } from "@/constants/global"
import Tool from "./Tool"

class Line extends Tool {
  mouseDown: boolean = false
  canvas: HTMLCanvasElement | null = null
  currentX = 0
  currentY = 0
  lineX = 0
  lineY = 0
  saved = ''

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId)
    this.canvas = canvas
    this.listen()
  }

  listen() {
    this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.currentX = e.pageX - e.target.offsetLeft
    this.currentY = e.pageY - e.target.offsetTop

    this.ctx?.beginPath()
    this.ctx?.moveTo(this.currentX, this.currentY)
    this.saved = this.canvas?.toDataURL() ?? ''
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.lineX = e.pageX - e.target.offsetLeft
      this.lineY = e.pageY - e.target.offsetTop
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
  }

  mouseUpHandler() {
    this.mouseDown = false

    this.socket?.send(
      JSON.stringify({
        method: "draw",
        id: this.sessionId,
        figure: {
          type: Tools.line,
          x: this.currentX,
          y: this.currentY,
          lineX: this.lineX,
          lineY: this.lineY,
          color: this.ctx?.fillStyle
        },
      })
    );
  }

  draw(x: number, y: number) {
    const img = new Image()
    img.src = this.saved

    img.onload = async () => {
      this.ctx?.clearRect(0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0)
      this.ctx?.drawImage(img, 0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0)
      this.ctx?.beginPath()
      this.ctx?.moveTo(this.currentX, this.currentY)
      this.ctx?.lineTo(x, y)
      this.ctx?.stroke()
    }
  }

  static staticDraw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    lineX: number,
    lineY: number,
    color: string
  ) {
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.moveTo(lineX, lineY);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

export default Line
