import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, onModelLoad }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();
  const initializedRef = useRef(false);
  
  // Center the model when it loads
  useEffect(() => {
    if (scene && modelRef.current && !initializedRef.current) {
      // Compute bounding box to get model center
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Reposition the model so its center is at (0,0,0)
      scene.position.x = -center.x;
      scene.position.y = -center.y;
      scene.position.z = -center.z;
      
      // Pass the model size to parent for zoom adjustment
      if (onModelLoad) {
        onModelLoad(size.length());
      }
      
      initializedRef.current = true;
    }
  }, [scene, onModelLoad]);
  
  return <primitive ref={modelRef} object={scene} />;
}

// Component to handle camera controls
function CameraControls({ onControlsReady }) {
  const controlsRef = useRef();
  
  React.useEffect(() => {
    if (controlsRef.current) {
      onControlsReady(controlsRef.current);
    }
  }, [onControlsReady]);
  
  return (
    <OrbitControls 
      ref={controlsRef}
      enablePan={true} 
      enableZoom={true} 
      enableRotate={true}
      zoomSpeed={1.2}
    />
  );
}

function ModelViewer({ modelUrl }) {
  const [controls, setControls] = useState(null);
  
  // Use state for zoom distance (was const before)
  const [zoomDistance, setZoomDistance] = useState(5);
  const [modelSize, setModelSize] = useState(5);
  
  const handleModelLoad = (size) => {
    // Adjust zoom based on model size
    const newZoom = Math.max(size * 0.75, 5);
    setZoomDistance(newZoom);
    setModelSize(size);
    
    // Update camera if controls exist
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.object.position.set(newZoom, newZoom, newZoom);
      controls.object.up.set(0, 0, 1);
      controls.update();
    }
  };
  
  // Zoom functions
  const zoomIn = () => {
    if (controls) {
      controls.object.position.multiplyScalar(0.8);
      setZoomDistance(prev => prev * 0.8);
      controls.update();
    }
  };
  
  const zoomOut = () => {
    if (controls) {
      controls.object.position.multiplyScalar(1.2);
      setZoomDistance(prev => prev * 1.2);
      controls.update();
    }
  };
  
  const resetZoom = () => {
    if (controls) {
      const resetDist = Math.max(modelSize * 0.75, 5);
      controls.object.position.set(resetDist, resetDist, resetDist);
      controls.object.up.set(0, 0, 1);
      controls.target.set(0, 0, 0);
      setZoomDistance(resetDist);
      controls.update();
    }
  };
  
  // View functions with consistent zoom distance
  const setFrontView = () => {
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.object.position.set(0, -zoomDistance, 0);
      controls.object.up.set(0, 0, 1);
      controls.update();
    }
  };
  
  const setBackView = () => {
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.object.position.set(0, zoomDistance, 0);
      controls.object.up.set(0, 0, 1);
      controls.update();
    }
  };
  
  const setLeftView = () => {
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.object.position.set(-zoomDistance, 0, 0);
      controls.object.up.set(0, 0, 1);
      controls.update();
    }
  };
  
  const setRightView = () => {
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.object.position.set(zoomDistance, 0, 0);
      controls.object.up.set(0, 0, 1);
      controls.update();
    }
  };
  
  const setTopView = () => {
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.object.position.set(0, 0, zoomDistance);
      controls.object.up.set(0, 0, 1);
      controls.update();
    }
  };
  
  const setBottomView = () => {
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.object.position.set(0, 0, -zoomDistance);
      controls.object.up.set(0, 0, 1);
      controls.update();
    }
  };
  
  const setIsometricView = () => {
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.object.position.set(zoomDistance, zoomDistance, zoomDistance);
      controls.object.up.set(0, 0, 1);
      controls.update();
    }
  };
  
  return (
    <div style={{ 
      width: '100%', 
      height: '500px', 
      background: 'rgba(10, 20, 50, 0.5)', 
      borderRadius: '30px',  
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Zoom controls - top left */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '8px',
        borderRadius: '12px',
        backdropFilter: 'blur(5px)'
      }}>
        <button onClick={zoomIn} style={zoomButtonStyle} title="Zoom In">➕</button>
        <button onClick={zoomOut} style={zoomButtonStyle} title="Zoom Out">➖</button>
        <button onClick={resetZoom} style={{...zoomButtonStyle, backgroundColor: '#FF9800'}} title="Reset Zoom">⟲</button>
      </div>
      
      {/* Axis views - top right */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <button onClick={setFrontView} style={axisButtonStyle} title="Front View (Z+)">Front</button>
        <button onClick={setBackView} style={axisButtonStyle} title="Back View (Z-)">Back</button>
        <button onClick={setLeftView} style={axisButtonStyle} title="Left View (X-)">Left</button>
        <button onClick={setRightView} style={axisButtonStyle} title="Right View (X+)">Right</button>
        <button onClick={setTopView} style={axisButtonStyle} title="Top View (Y+)">Top</button>
        <button onClick={setBottomView} style={axisButtonStyle} title="Bottom View (Y-)">Bottom</button>
        <button onClick={setIsometricView} style={{...axisButtonStyle, backgroundColor: '#9C27B0'}} title="Isometric View">ISO</button>
      </div>
      
      {/* Auto-rotate button - bottom centered */}
      {/* <button onClick={toggleAutoRotate} style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        padding: '10px 20px',
        backgroundColor: isAutoRotating ? '#4CAF50' : '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease'
      }}>
        {isAutoRotating ? '⏸️ Pause Rotation' : '▶️ Start Rotation'}
      </button>*/}
      
      <Canvas 
        key={modelUrl} 
        camera={{ position: [5, 5, 5] }} 
        gl={{ alpha: true }}  
        onCreated={({ gl }) => {gl.setClearColor(0x000000, 0)}}
        style={{
          width: '100%',
          height: '500px',
          display: 'block'
        }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model url={modelUrl} onModelLoad={handleModelLoad} />
        </Suspense>
        <CameraControls onControlsReady={setControls} />
      </Canvas>
    </div>
  );
}

// Reusable button styles
const axisButtonStyle = {
  padding: '8px 12px',
  backgroundColor: 'rgba(33, 33, 33, 0.8)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 'bold',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  transition: 'all 0.2s ease',
  width: '60px',
  textAlign: 'center'
};

const zoomButtonStyle = {
  padding: '8px 12px',
  backgroundColor: 'rgba(33, 33, 33, 0.9)',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
};

export default ModelViewer;