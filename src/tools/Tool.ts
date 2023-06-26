class Tool {
  canvas: HTMLCanvasElement | null = null
  ctx: CanvasRenderingContext2D | null = null
  socket: WebSocket | null = null
  sessionId: string = ''

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    this.canvas = canvas
    this.socket = socket
    this.sessionId = sessionId
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  set fillColor(color: string) {
    this.ctx!.fillStyle = color
  }

  set strokeColor(color: string) {
    this.ctx!.strokeStyle = color
  }

  set lineWidth(width: number) {
    this.ctx!.lineWidth = width
  }

  destroyEvents() {
    this.canvas!.onmousemove = null
    this.canvas!.onmousedown = null
    this.canvas!.onmouseup = null
  }

}

export default Tool