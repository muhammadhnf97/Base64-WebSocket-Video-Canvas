import { useEffect, useRef, useState } from 'react';
import '../style.css'

interface Props {
    wsurl: string
    startWs: boolean
} 
const CardVideo = ({ wsurl, startWs }: Props) => {
  const [data, setData] = useState<string>('')
  const [wsInstances, setWsInstances] = useState<WebSocket>()
  
  const canvasRef = useRef(null);
  
    //SETEL UKURAN CANVAS
    const rate = 6
    const width = 1920 / rate;
    const height = 1080 / rate;

    
    const startWebSocket = () => {
      const ws = new WebSocket(wsurl)
      setWsInstances(ws)
      ws.addEventListener("open", (e)=>{
        console.log("Web Socket Connected", e)
      })
      
      ws.addEventListener("message", (e)=>{
        setData(e.data)
      })
  
      ws.addEventListener("close", () => {
        console.log("Web Socket Closed")
      })
    }

    const stopWebSocket = () => {
      wsInstances?.close()
    }

    useEffect(()=>{
      if (startWs) {
        startWebSocket()
      } else {
        stopWebSocket()
      }

      return () => {
        stopWebSocket()
      }
    }, [startWs])

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!canvas || !context || data.length === 0) {
      return;
    }
    
    const image = new Image();
    image.onload = () => {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
    };
    
    // image.src = 'data:image/jpeg;base64,' + data[data?.length - 1]?.imageBase64;
    image.src = 'data:image/jpeg;base64,' + data;
  }, [data]);
    
    return (
    <>
      <div className="cardvideo" style={{ width: width, height: height, borderStyle: 'solid' }}>
          <canvas ref={canvasRef} className='canvas' />
      </div>
    </>
    )
}

export default CardVideo