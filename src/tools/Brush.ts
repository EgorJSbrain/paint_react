import { Tools } from "@/constants/global"
import Tool from "./Tool"

class Brush extends Tool {
  mouseDown: boolean = false
  canvas: HTMLCanvasElement | null = null
  color: string = ''

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string, color?: string) {
    super(canvas, socket, sessionId)
    this.canvas = canvas
    this.listen()
    this.color = color ?? ''
  }

  listen() {
    this.canvas!.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas!.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas!.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false

    this.socket!.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
          type: 'finish',
      }
  }))
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.ctx?.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.socket?.send(JSON.stringify({
        method: 'draw',
        id: this.sessionId,
        figure: {
          type: Tools.brush,
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
        }
      }))
    }
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx?.lineTo(x, y)
    ctx?.stroke()
  }
}

export default Brush
