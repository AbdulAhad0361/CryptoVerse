import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '@/hooks/use-theme';

export default function EthereumModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useThemeMode();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create the main Ethereum diamond shape
    const ethShape = new THREE.Group();
    
    // The sides of the ETH diamond shape
    const ethColor = 0x3498db; // Ethereum blue
    const ethMaterial = new THREE.MeshStandardMaterial({
      color: ethColor,
      metalness: isDark ? 0.8 : 0.7,
      roughness: isDark ? 0.2 : 0.3,
    });

    // Create the diamond shape using custom geometry
    const diamondGeometry = new THREE.BufferGeometry();
    
    // Define the diamond vertices
    const vertices = new Float32Array([
      // Front diamond (top half)
      0, 1, 0,        // Top vertex
      -1, 0, 0.5,     // Left vertex
      1, 0, 0.5,      // Right vertex
      
      // Front diamond (bottom half)
      0, -1, 0,       // Bottom vertex
      -1, 0, 0.5,     // Left vertex
      1, 0, 0.5,      // Right vertex
      
      // Back diamond (top half)
      0, 1, 0,        // Top vertex
      -1, 0, -0.5,    // Left vertex
      1, 0, -0.5,     // Right vertex
      
      // Back diamond (bottom half)
      0, -1, 0,       // Bottom vertex
      -1, 0, -0.5,    // Left vertex
      1, 0, -0.5,     // Right vertex
      
      // Left side (top half)
      0, 1, 0,        // Top vertex
      -1, 0, 0.5,     // Front left vertex
      -1, 0, -0.5,    // Back left vertex
      
      // Left side (bottom half)
      0, -1, 0,       // Bottom vertex
      -1, 0, 0.5,     // Front left vertex
      -1, 0, -0.5,    // Back left vertex
      
      // Right side (top half)
      0, 1, 0,        // Top vertex
      1, 0, 0.5,      // Front right vertex
      1, 0, -0.5,     // Back right vertex
      
      // Right side (bottom half)
      0, -1, 0,       // Bottom vertex
      1, 0, 0.5,      // Front right vertex
      1, 0, -0.5,     // Back right vertex
    ]);
    
    diamondGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    diamondGeometry.computeVertexNormals();
    
    const diamond = new THREE.Mesh(diamondGeometry, ethMaterial);
    ethShape.add(diamond);
    
    // Add the horizontal lines that make up the Ethereum logo
    const lineGeometry = new THREE.BoxGeometry(1.4, 0.1, 0.1);
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    
    // Middle line
    const middleLine = new THREE.Mesh(lineGeometry, lineMaterial);
    middleLine.position.set(0, 0, 0.55);
    ethShape.add(middleLine);
    
    // Top line
    const topLine = new THREE.Mesh(lineGeometry, lineMaterial);
    topLine.position.set(0, 0.5, 0.55);
    ethShape.add(topLine);
    
    // Bottom line
    const bottomLine = new THREE.Mesh(lineGeometry, lineMaterial);
    bottomLine.position.set(0, -0.5, 0.55);
    ethShape.add(bottomLine);
    
    // Scale the Ethereum shape
    ethShape.scale.set(0.8, 0.8, 0.8);
    scene.add(ethShape);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, isDark ? 0.5 : 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xFFFFFF, isDark ? 1 : 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      ethShape.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      
      scene.remove(ethShape);
      diamondGeometry.dispose();
      ethMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ambientLight.dispose();
      pointLight.dispose();
    };
  }, [isDark]);
  
  return (
    <div id="ethereum-model" ref={containerRef} className="w-full h-full"></div>
  );
}