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

import "../styles/toolbar.scss";
import Brush from "@/tools/Brush";
import canvasState from "@/store/canvasState";
import toolState from "@/store/toolState";
import Rect from "@/tools/Rect";

const enum Tools {
  brush = "brush",
  rect = "rect",
  circle = "circle",
  eraser = "eraser",
  line = "line",
}

const Toolbar = () => {
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
        default:
          return undefined
      }
    }

    tool && toolState.setTool(tool)
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
        <input type="color"/>
      </div>

      <div>
        <button className="toolbar__btn">
          <UndoIcon />
        </button>

        <button className="toolbar__btn">
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
