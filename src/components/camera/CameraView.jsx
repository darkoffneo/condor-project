import { VideoPop } from './VideoPop';
import { useCamera }  from "../../Hooks/useCamera";



export const CameraView = () => {
  const {containerRef, videoRef, canvasRef, zoom, toggleFullscreen,
    toggleZoom, urlImg, hrtImg, data } = useCamera();

  return (
    <div className='cam-container' ref={containerRef} onDoubleClick={toggleFullscreen} style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}>
      <video autoPlay playsInline muted ref={videoRef} width="640" height="480" />
      <canvas onClick={toggleZoom} ref={canvasRef} width="640" height="480" />
      <VideoPop imgUrl={urlImg} hrtUrl={hrtImg} dat={data}/>
    </div>
  );
};


