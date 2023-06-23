import Tool from "./Tool"

class Rect extends Tool {
  mouseDown: boolean = false
  canvas: HTMLCanvasElement | null = null
  startX = 0
  startY = 0
  saved = ''

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

    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop

    this.saved = this.canvas?.toDataURL() ?? ''
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft
      let currentY = e.pageY - e.target.offsetTop
      let width = currentX - this.startX
      let height = currentY - this.startY

      this.draw(this.startX, this.startY, width, height)
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image()
    img.src = this.saved

    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0)
      this.ctx?.drawImage(img, 0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0)
      this.ctx?.beginPath()
      this.ctx?.rect(x, y, w, h)
      this.ctx?.fill()
      this.ctx?.stroke()
    }
  }
}

export default Rect
