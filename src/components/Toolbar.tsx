import {
  BrushIcon,
  CircleIcon,
  EraserIcon,
  RectIcon,
  LineIcon,
  UndoIcon,
  RedoIcon,
  SaveIcon,
} from "@/assets/icons";

import Brush from "@/tools/Brush";
import canvasState from "@/store/canvasState";
import toolState from "@/store/toolState";
import Rect from "@/tools/Rect";
import Circle from "@/tools/Circle";
import Line from "@/tools/Line";
import Eraser from "@/tools/Eraser";
import { Tools } from "@/constants/global";

import "../styles/toolbar.scss";
import { useCallback } from "react";

const Toolbar = () => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toolState.setFillColor(e.target.value)
    toolState.setStrokeColor(e.target.value)
  }

  const setTool = (toolType: Tools) => () => {
    let tool;

    if (canvasState.canvas && canvasState.socket) {
      const canvas = canvasState.canvas
      const socket = canvasState.socket
      const sessionId = canvasState.sessionId

      switch(toolType) {
        case Tools.brush:
          tool = new Brush(canvas, socket, sessionId)
          break;
        case Tools.rect:
          tool = new Rect(canvas, socket, sessionId)
          break;
        case Tools.circle:
          tool = new Circle(canvas)
          break;
        case Tools.line:
          tool = new Line(canvas)
          break;
        case Tools.eraser:
          tool = new Eraser(canvas)
          break;
        default:
          return undefined
      }
    }

    tool && toolState.setTool(tool)
  }

  const handleUndo = () => {
    canvasState.undo()
  }

  const handleRedo = () => {
    canvasState.redo()
  }

  const handleDownload = () => {
    const dataUrl = canvasState.canvas?.toDataURL()
    console.log("----", dataUrl)

    const a = document.createElement('a')
    a.href = dataUrl ?? ''
    a.download = canvasState.sessionId + '.jpg'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="toolbar">
      <div>
        <button className="toolbar__btn" onClick={setTool(Tools.brush)}>
          <BrushIcon />
        </button>
        <button className="toolbar__btn" onClick={setTool(Tools.rect)}>
          <RectIcon />
        </button>
        <button className="toolbar__btn" onClick={setTool(Tools.circle)}>
          <CircleIcon />
        </button>
        <button className="toolbar__btn" onClick={setTool(Tools.eraser)}>
          <EraserIcon />
        </button>
        <button className="toolbar__btn" onClick={setTool(Tools.line)}>
          <LineIcon />
        </button>
        <input onChange={handleColorChange} type="color"/>
      </div>

      <div>
        <button className="toolbar__btn" onClick={handleUndo}>
          <UndoIcon />
        </button>

        <button className="toolbar__btn" onClick={handleRedo}>
          <RedoIcon />
        </button>

        <button className="toolbar__btn" onClick={handleDownload}>
          <SaveIcon />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
