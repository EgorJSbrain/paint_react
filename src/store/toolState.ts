import { makeAutoObservable } from "mobx";

class ToolState {
  tool: any | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool: any) {
    this.tool = tool
  }

  setFillColor(color: string) {
    this.tool!.fillColor = color
  }

  setStrokeColor(color: string) {
    this.tool!.strokeColor = color
  }


  setWidthLine(width: string) {
    console.log('---', this.tool)
    this.tool!.lineWidth = width
  }
}

export default new ToolState()
