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

const Toolbar = () => {
  return (
    <div className="toolbar">
      <div>
        <button className="toolbar__btn">
          <BrushIcon />
        </button>
        <button className="toolbar__btn">
          <RectIcon />
        </button>
        <button className="toolbar__btn">
          <CircleIcon />
        </button>
        <button className="toolbar__btn">
          <EraserIcon />
        </button>
        <button className="toolbar__btn">
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
