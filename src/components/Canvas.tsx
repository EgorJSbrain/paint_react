import { useEffect, useRef, MouseEvent } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import axios from 'axios'

import canvasState from '@/store/canvasState'
import toolState from '@/store/toolState'
import Brush from '@/tools/Brush'

import { Tools } from '@/constants/global'
import Rect from '@/tools/Rect'

import '../styles/canvas.scss'

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { id } = useParams()

  useEffect(() => {
    if (canvasRef.current) {
      canvasState.setCanvas(canvasRef.current)
      let ctx = canvasRef.current.getContext('2d')

      axios.get(`http://localhost:8800/image?id=${id}`)
        .then(response => {
          const img = new Image();
          img.src = response.data

          img.onload = () => {
            ctx?.clearRect(
              0,
              0,
              canvasRef.current!.width ?? 0,
              canvasRef.current!.height ?? 0
            );
            ctx?.drawImage(
              img,
              0,
              0,
              canvasRef.current!.width ?? 0,
              canvasRef.current!.height ?? 0
            );
            ctx?.stroke();
          };
        })
    }
  }, [])

  useEffect(() => {
    if (canvasState.userName && canvasRef.current && id) {
      const socket = new WebSocket('ws://localhost:8800/')
      canvasState.setSocket(socket)
      canvasState.setSessionId(id)
      toolState.setTool(new Brush(canvasRef.current, socket, id))

      socket.onopen = () => {
        socket.send(JSON.stringify({
          id,
          username: canvasState.userName,
          method: 'connection'
        }))
      }

      socket.onmessage = (event: MessageEvent) => {
        const msg = JSON.parse(event.data)

        switch(msg.method) {
          case "connection":
            console.log(`User ${msg.username} was connected`)
            break;

          case "draw":
            drawHandler(msg)
            break;
        }
      }
    }
  }, [canvasState.userName, id])

  const drawHandler = (msg: any) => {
    const figure = msg.figure
    const ctx = canvasRef.current?.getContext('2d')

    if (ctx) {
      switch(figure.type) {
        case Tools.brush:
          Brush.draw(ctx, figure.x, figure.y)

          break;
        case Tools.rect:
          Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)

          break;
        case 'finish':
          ctx.beginPath()
          break;
      }
    }
  }

  const handleMouseDown = (_: MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      canvasState.pushToUndo(canvasRef.current.toDataURL())
      // axios.post(`http://localhost:8800/image?id=${id}`, { img: canvasRef.current.toDataURL() })
    }
  }

  const handleMouseUp = (_: MouseEvent<HTMLCanvasElement>) => {
    if (canvasRef.current) {
      axios.post(`http://localhost:8800/image?id=${id}`, { img: canvasRef.current.toDataURL() })
    }
  }

  return (
    <div className="canvas">
      <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} ref={canvasRef} width={800} height={480}></canvas>
    </div>
  )
})

export default Canvas