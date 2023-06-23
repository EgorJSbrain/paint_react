class Tool {
  canvas: HTMLCanvasElement | null = null
  ctx: CanvasRenderingContext2D | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  destroyEvents() {
    this.canvas?.removeEventListener('mouseup', () => {})
    this.canvas?.removeEventListener('mousedown', () => {})
    this.canvas?.removeEventListener('mousemove', () => {})
  }

}

export default Tool