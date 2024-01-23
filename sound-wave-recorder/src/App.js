import React, { useRef, useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const SoundWaveVisualizer = () => {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const [analyser, setAnalyser] = useState(null);

  useEffect(() =>{
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 256;
    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    setAnalyser(analyserNode);

    const source = audioContext.createMediaElementSource(audioRef.current);
    source.connect(analyserNode);
    analyserNode.connect(audioContext.destination);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    function draw() {
      const animationId = requestAnimationFrame(draw);

      analyserNode.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2;

        ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
        ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);

        x += barWidth + 1;
      }

      x = 0;
    }

    draw();

    return () => {
    let animationId;
      cancelAnimationFrame(animationId);
      audioContext.close();
    };
  }, []);

  return (
    <div>
      <ReactAudioPlayer
        ref={audioRef}
        src="your-audio-file.mp3"
        autoPlay
        controls
      />
      <canvas ref={canvasRef} width={800} height={200} />
    </div>
  );
};

export default SoundWaveVisualizer;
