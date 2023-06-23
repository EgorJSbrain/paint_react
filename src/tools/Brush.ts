import Tool from "./Tool"

class Brush extends Tool {
  mouseDown: boolean = false
  canvas: HTMLCanvasElement | null = null

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.canvas = canvas
    this.listen()
  }

  listen() {
    this.canvas?.addEventListener('mouseup', this.mouseUpHandler.bind(this))
    this.canvas?.addEventListener('mousedown', this.mouseDownHandler.bind(this))
    this.canvas?.addEventListener('mousemove', this.mouseMoveHandler.bind(this))
  }

  mouseUpHandler(e: any) {
    this.mouseDown = false
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.ctx?.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
  }

  draw(x: number, y: number) {
    this.ctx?.lineTo(x, y)
    this.ctx?.stroke()
  }
}

export default Brush
