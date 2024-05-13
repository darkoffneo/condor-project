import { useRef, useEffect, useState } from 'react';
import {useSocketData} from './useSocketData'
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';


export const useCamera = () => {
    const data=useSocketData();
    const videoRef = useRef();
    const canvasRef = useRef();
    const containerRef = useRef();
    const [zoom, setZoom] = useState(0.5);
    const [urlImg, setUrlImg] = useState('/images/data-layout/Orange.png')
    const [hrtImg, sethrtImg] = useState('/images/heart/Crzn-Orange.png')
    const toggleZoom = () => {
      setZoom(zoom === 0.5 ? 0.8 : 0.5); // Cambia entre zoom 1 y 2
    };
    const [spoLevel, setSpoLevel] = useState(0);
    const [bpmLevel, setBpmLevel] = useState(0);
    console.log(data)
  
    const toggleFullscreen = () => {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setZoom(1)
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          setZoom(0.5)
        }
      }
    };
  
    useEffect(() => {
      let newSpoLevel;
      if (data.spo >= 93) {
        newSpoLevel = 4;
      } else if (data.spo >= 80) {
        newSpoLevel = 3;
      } else if (data.spo >= 30) {
        newSpoLevel = 2;
      } else {
        newSpoLevel = 1;
      }
  
      if (newSpoLevel !== spoLevel) {
        setSpoLevel(newSpoLevel);
        // Actualiza urlImg aquí...
      }
    }, [data.spo]);
  
    useEffect(() => {
      let newBpmLevel;
      if (data.bpm >= 110) {
        newBpmLevel = 4;
      } else if (data.bpm >= 60) {
        newBpmLevel = 3;
      } else if (data.bpm >= 40) {
        newBpmLevel = 2;
      } else {
        newBpmLevel = 1;
      }
  
      if (newBpmLevel !== bpmLevel) {
        setBpmLevel(newBpmLevel);
        // Actualiza hrtImg aquí...
      }
    }, [data.bpm]);
  
    useEffect(() => {
      const runObjectDetection = async () => {
        const net = await cocoSsd.load();
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
  
        const detectFrame = async () => {
          context.clearRect(0, 0, video.width, video.height);
          const predictions = await net.detect(video);
          predictions.forEach(prediction => {
            if (prediction.class === 'person') {
              context.beginPath();
              context.rect(...prediction.bbox);
              context.lineWidth = 5;
              context.strokeStyle = 'red';
              context.stroke();
            }
          });
          requestAnimationFrame(detectFrame);
        };
        detectFrame();
      };
  
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(stream => {
            videoRef.current.srcObject = stream;
            videoRef.current.addEventListener('loadeddata', runObjectDetection);
          });
      }
    }, []);
  
    useEffect(() => {
      switch (spoLevel) {
        case 4:
          setUrlImg('/images/data-layout/Green.png');
          break;
        case 3:
          setUrlImg('/images/data-layout/Yellow.png');
          break;
        case 2:
          setUrlImg('/images/data-layout/Red.png');
          break;
        default:
          setUrlImg('/images/data-layout/Orange.png');
          break;
      }
    }, [spoLevel]); // Este useEffect se ejecutará cada vez que spoLevel cambie
    
    useEffect(() => {
      switch (bpmLevel) {
        case 4:
          sethrtImg('/images/heart/Crzn-Red.png');
          break;
        case 3:
          sethrtImg('/images/heart/Crzn-Green.png');
          break;
        case 2:
          sethrtImg('/images/heart/Crzn-Yellow.png');
          break;
        default:
          sethrtImg('/images/heart/Crzn-Orange.png');
          break;
      }
    }, [bpmLevel]); // Este useEffect se ejecutará cada vez que bpmLevel cambie
  return {
    containerRef,
    videoRef,
    canvasRef,
    zoom,
    toggleFullscreen,
    toggleZoom,
    urlImg,
    hrtImg,
    data,

  } 
}
