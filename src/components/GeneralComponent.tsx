import { useState } from "react";
import StartFrom from "./StartFrom/StartForm";
import canvasState from "@/store/canvasState";
import Toolbar from "./Tollbar/Toolbar";
import SettingsBar from "./SettingsBar/SettingsBar";
import Canvas from "./Canvas/Canvas";

const GeneralComponent = () => {
  const [isInit, setIsInit] = useState<boolean>(true)

  const submitName = (userName: string) => {
    canvasState.setUserName(userName)
    setIsInit(false)
  }

  return (
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
  );
};

export default GeneralComponent
