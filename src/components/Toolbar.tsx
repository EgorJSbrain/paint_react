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

import "../styles/toolbar.scss";

const enum Tools {
  brush = "brush",
  rect = "rect",
  circle = "circle",
  eraser = "eraser",
  line = "line",
}

const Toolbar = () => {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toolState.setFillColor(e.target.value)
    toolState.setStrokeColor(e.target.value)
  }

  const setTool = (toolType: Tools) => () => {
    let tool;

    if (canvasState.canvas) {
      switch(toolType) {
        case Tools.brush:
          tool = new Brush(canvasState.canvas)
          break;
        case Tools.rect:
          tool = new Rect(canvasState.canvas)
          break;
        case Tools.circle:
          tool = new Circle(canvasState.canvas)
          break;
        case Tools.line:
          tool = new Line(canvasState.canvas)
          break;
        case Tools.eraser:
          tool = new Eraser(canvasState.canvas)
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

        <button className="toolbar__btn">
          <SaveIcon />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
