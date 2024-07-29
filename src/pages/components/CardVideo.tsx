import { useEffect, useRef } from 'react';
import '../style.css'

interface Props {
    data: any[]
} 
const CardVideo = ({ data }: Props) => {
  
  const canvasRef = useRef(null);
  
    //SETEL UKURAN CANVAS
    const rate = 6
    const width = 1920 / rate;
    const height = 1080 / rate;

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
      context.drawImage(image, 0, 0);
    };
    
    // image.src = based64broh
    image.src = 'data:image/jpeg;base64,' + data[data?.length - 1]?.imageBase64;
  }, [data]);
    
    return (
    <>
      <div className="cardvideo">
          <canvas ref={canvasRef} className='canvas' />
      </div>
    </>
    )
}

export default CardVideo