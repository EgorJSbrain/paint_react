import { useState } from "react";
import Canvas from "./Canvas";
import SettingsBar from "./SettingsBar";
import Toolbar from "./Toolbar";
import StartFrom from "./StartForm";
import canvasState from "@/store/canvasState";

const GeneralComponent = () => {
  const [isInit, setIsInit] = useState<boolean>(true)

  const submitName = (userName: string) => {
    canvasState.setUserName(userName)
    setIsInit(false)
  }

  return (
    <div className="app">
      <>
        {isInit && <StartFrom onConfirm={submitName} />}
        {!isInit && (
          <>
            <Toolbar />
            <SettingsBar />
            <Canvas />
          </>
        )}
      </>
    </div>
  );
};

export default GeneralComponent
