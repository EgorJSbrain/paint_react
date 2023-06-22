import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import '../styles/canvas.scss'
import canvasState from '@/store/canvasState'
import toolState from '@/store/toolState'
import Brush from '@/tools/Brush'

const Canvas = observer(() => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      canvasState.setCanvas(canvasRef.current)
      toolState.setTool(new Brush(canvasRef.current))
    }
  }, [])

  return (
    <div className="canvas">
      <canvas ref={canvasRef} width={800} height={480}></canvas>
    </div>
  )
})

export default Canvas