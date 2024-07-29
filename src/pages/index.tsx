import { useEffect, useState } from 'react';
import CardVideo from './components/CardVideo';
import './style.css'
export default function HomePage() {

  interface Data {
    wsip: string;
    data: any;
  }

  const urls_tmp = [
    'ws://192.168.99.141:8888/krg', 'ws://192.168.99.141:8889/krg', 'ws://192.168.99.141:8810/krg'
  ]
  const [webSocketStart, setWebSocketStart] = useState(false)
  const [wsInstances, setWsInstances] = useState<WebSocket[]>([])
  const [data, setData] = useState<Data[]>([])

  const startWebSocket = () => {
    if (!webSocketStart){
      urls_tmp.forEach(val=>{
        const ws = new WebSocket(val)
        ws.addEventListener("open", (e)=>{
          setWebSocketStart(true)
          setWsInstances((prev: any)=> [...prev, ws])
          console.log("Web Socket Connected", e)
        })
        
        ws.addEventListener("message", (e)=>{
            setData((prev: any) => [ ...prev, { wsip: val, data: e.data }])
        }, )

        ws.addEventListener("close", () => {
          console.log("Web Socket Closed")
        })
      })
    } else {
      console.info('Web Socket Already Open')
    }
}

  const stopWebSocket = () => {
    if (wsInstances.length < 1) {
      console.log('No WebSocket connections to close');
      return;
    }

    wsInstances.forEach(ws => {
      ws.close();
    });

    setWebSocketStart(false);
    setWsInstances([]);
    setData([]);
  }

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
        urls_tmp?.map((values: any, index: number)=>{
          const filter = data.filter(val=>val.wsip === values)
          return (
          <CardVideo key={index} data={filter} />
          )
      })
      }
      </div>
    </div>
    </>
  );
}
