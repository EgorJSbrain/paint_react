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
    // this.canvas?.addEventListener('onmouseup', this.mouseUpHandler)
    // this.canvas?.addEventListener('onmousedown', this.mouseDownHandler)
    // this.canvas?.addEventListener('onmousemove', this.mouseMoveHandler)
    // if (this.canvas) {
    //   this.canvas?.onmousedown = this.mouseDownHandler.bind(this)
    // }
    // this.canvas?.onmouseup = this.mouseUpHandler.bind(this)
    // this.canvas?.onmousedown = this.mouseDownHandler.bind(this)
    // this.canvas?.onmousemove = this.mouseMoveHandler.bind(this)
  }

  mouseUpHandler(e: any) {
    this.mouseDown = false
  }

  mouseDownHandler(e: any) {
    debugger
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
    this.ctx?.moveTo(x, y)
    this.ctx?.stroke()
    console.log('------DRAW')
  }
}

export default Brush
