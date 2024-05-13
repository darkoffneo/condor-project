import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocketData = () => {
  const [data, setData] = useState({'spo': 0, 'bpm': 0 });

  useEffect(() => {
    const socket = io('http://127.0.0.1:5000'); // Asegúrate de reemplazar 'http://localhost:5000' con la URL de tu servidor

    socket.on('newdata', (newData) => {
      setData(newData);
    });

  }, []);

  return data;
};

