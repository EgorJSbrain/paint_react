class Tool {
  canvas: HTMLCanvasElement | null = null
  ctx: CanvasRenderingContext2D | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  destroyEvents() {
    // this.canvas?.addEventListener('onmouseup', () => {})
    // //@ts-ignore
    // this.canvas?.onmouseup = null
    // //@ts-ignore
    // this.canvas?.onmousedown = null
    // //@ts-ignore
    // this.canvas?.onmousemove = null
  }

}

export default Tool