import { useEffect, useState } from 'react';
import CardVideo from './components/CardVideo';
import './style.css'

export default function HomePage() {

  const urls_tmp = [
    'ws://192.168.101.162:9002', 'ws://192.168.101.162:9003'
  ]
  
  const [webSocketStart, setWebSocketStart] = useState(false)

  const startWebSocket = () => {
    setWebSocketStart(true)
}

  const stopWebSocket = () => {
    setWebSocketStart(false)
  }

  useEffect(()=>{
    if (!document.hidden) {
      stopWebSocket()
    }
  }, [document])

  return (
    
    <>
    <div className='videos_container'>
      {
        webSocketStart ? 
        <button className='button' onClick={stopWebSocket}>Stop WS</button>
        :
        <button className='button' onClick={startWebSocket}>Start WS</button>
      }
      <div className='card_videos_flex'>
        
      {
        urls_tmp?.map((value: string, index: number)=>{
          return (
          <CardVideo key={index} wsurl={value} startWs={webSocketStart} />
          )
      })
      }
      </div>
    </div>
    </>
  );
}
