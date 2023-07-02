import Brush from "./Brush"

class Eraser extends Brush {
  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId)
  }

  draw = (x: number, y: number) => {
    this.ctx?.lineTo(x, y)
    this.ctx?.stroke()
  }
}

export default Eraser
