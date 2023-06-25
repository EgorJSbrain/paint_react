import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: HTMLCanvasElement | null = null
  undoList: string[] = []
  redoList: string[] = []
  userName: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  pushToUndo(data: string) {
    this.undoList.push(data)
  }

  pushToRedo(data: string) {
    this.redoList.push(data)
  }

  undo() {
    let ctx = this.canvas?.getContext('2d')

    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop()

      if (this.canvas?.toDataURL()) {
        this.redoList.push(this.canvas?.toDataURL()) // adding state to redo list
      }
      let img = new Image()

      img.src = dataUrl ?? ''
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0)
        dataUrl && ctx?.drawImage(img, 0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0)
      }
    } else {
      ctx?.clearRect(0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0)
    }
  }

  redo() {
    let ctx = this.canvas?.getContext('2d')

    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop()

      if (!!this.canvas?.toDataURL()) {
        this.undoList.push(this.canvas?.toDataURL()) // adding state to undo list
      }
      let img = new Image()

      img.src = dataUrl ?? ''
      img.onload = () => {
        ctx?.clearRect(0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0)
        dataUrl && ctx?.drawImage(img, 0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0)
      }
    } else {
      ctx?.clearRect(0, 0, this.canvas?.width ?? 0, this.canvas?.height ?? 0)
    }
  }

  setUserName(value: string) {
    this.userName = value
  }
}

export default new CanvasState()