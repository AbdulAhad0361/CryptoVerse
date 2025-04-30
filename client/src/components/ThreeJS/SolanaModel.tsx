import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '@/hooks/use-theme';

export default function SolanaModel() {
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
    
    // Create Solana logo (represented by connected cubes)
    const solanaGroup = new THREE.Group();
    
    // Solana colors
    const solanaColor = 0x9945FF; // Solana purple
    const solanaAccent = 0x14F195; // Solana green/teal accent
    
    // Main logo material
    const solanaMaterial = new THREE.MeshStandardMaterial({
      color: solanaColor,
      metalness: isDark ? 0.8 : 0.7,
      roughness: isDark ? 0.2 : 0.3,
    });
    
    // Accent material
    const solanaAccentMaterial = new THREE.MeshStandardMaterial({
      color: solanaAccent,
      metalness: isDark ? 0.8 : 0.7,
      roughness: isDark ? 0.2 : 0.3,
    });
    
    // Create the three parts of the Solana logo
    const cubeGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    
    // Main cube
    const mainCube = new THREE.Mesh(cubeGeometry, solanaMaterial);
    solanaGroup.add(mainCube);
    
    // Bottom-right diagonal cube
    const rightCube = new THREE.Mesh(cubeGeometry, solanaMaterial);
    rightCube.position.set(0.85, -0.85, 0);
    solanaGroup.add(rightCube);
    
    // Bottom-left diagonal cube
    const leftCube = new THREE.Mesh(cubeGeometry, solanaAccentMaterial);
    leftCube.position.set(-0.85, -0.85, 0);
    solanaGroup.add(leftCube);
    
    // Add connecting lines between cubes
    const lineGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.45, 8);
    
    // Line from main to right cube
    const mainToRightLine = new THREE.Mesh(lineGeometry, solanaMaterial);
    mainToRightLine.position.set(0.425, -0.425, 0);
    mainToRightLine.rotation.z = Math.PI / 4;
    solanaGroup.add(mainToRightLine);
    
    // Line from main to left cube
    const mainToLeftLine = new THREE.Mesh(lineGeometry, solanaAccentMaterial);
    mainToLeftLine.position.set(-0.425, -0.425, 0);
    mainToLeftLine.rotation.z = -Math.PI / 4;
    solanaGroup.add(mainToLeftLine);
    
    // Scale and add to scene
    solanaGroup.scale.set(0.9, 0.9, 0.9);
    scene.add(solanaGroup);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, isDark ? 0.5 : 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xFFFFFF, isDark ? 1 : 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      solanaGroup.rotation.y += 0.01;
      
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
      
      scene.remove(solanaGroup);
      cubeGeometry.dispose();
      solanaMaterial.dispose();
      solanaAccentMaterial.dispose();
      lineGeometry.dispose();
      ambientLight.dispose();
      pointLight.dispose();
    };
  }, [isDark]);
  
  return (
    <div id="solana-model" ref={containerRef} className="w-full h-full"></div>
  );
}