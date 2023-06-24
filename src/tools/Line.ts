import Tool from "./Tool"

class Line extends Tool {
  mouseDown: boolean = false
  canvas: HTMLCanvasElement | null = null
  currentX = 0
  currentY = 0
  saved = ''

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
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
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
  }

  mouseUpHandler() {
    this.mouseDown = false
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
}

export default Line
