import { useEffect, useRef, MouseEvent } from 'react'
import { observer } from 'mobx-react-lite'

import '../styles/canvas.scss'
import canvasState from '@/store/canvasState'
import toolState from '@/store/toolState'
import Brush from '@/tools/Brush'

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      canvasState.setCanvas(canvasRef.current)
      toolState.setTool(new Brush(canvasRef.current))
    }
  }, [])

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
    }
  }

  return (
    <div className="canvas">
      <canvas onMouseDown={handleMouseDown} ref={canvasRef} width={800} height={480}></canvas>
    </div>
  )
})

export default Canvas