import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '@/hooks/use-theme';

export default function BinanceModel() {
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
    
    // Binance coin colors
    const binanceColor = 0xf3ba2f; // Binance yellow color
    const metalness = isDark ? 0.8 : 0.7;
    const roughness = isDark ? 0.2 : 0.3;
    
    // Create the main Binance coin model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    
    // Create wireframe octahedron (outer shape)
    const outerGeometry = new THREE.OctahedronGeometry(1.5, 0);
    const outerMaterial = new THREE.MeshStandardMaterial({
      color: binanceColor,
      metalness: metalness,
      roughness: roughness,
      wireframe: true,
      emissive: binanceColor,
      emissiveIntensity: 0.2
    });
    
    const outerShape = new THREE.Mesh(outerGeometry, outerMaterial);
    modelGroup.add(outerShape);
    
    // Create semi-transparent middle octahedron
    const middleGeometry = new THREE.OctahedronGeometry(1.2, 0);
    const middleMaterial = new THREE.MeshStandardMaterial({
      color: binanceColor,
      metalness: metalness,
      roughness: roughness,
      transparent: true,
      opacity: 0.4
    });
    
    const middleShape = new THREE.Mesh(middleGeometry, middleMaterial);
    modelGroup.add(middleShape);
    
    // Create inner diamond (hexagonal shape for Binance logo)
    const innerGroup = new THREE.Group();
    modelGroup.add(innerGroup);
    
    // Create a simple box for the center of the logo
    const innerGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      emissive: binanceColor,
      emissiveIntensity: 0.5
    });
    
    const innerShape = new THREE.Mesh(innerGeometry, innerMaterial);
    innerShape.rotation.set(Math.PI/4, Math.PI/4, 0);
    innerGroup.add(innerShape);
    
    // Add particle effects
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 7;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: binanceColor,
      transparent: true,
      opacity: 0.4
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);
    
    // Animation
    const animate = () => {
      modelGroup.rotation.y += 0.005;
      
      // Make the model float up and down gently
      modelGroup.position.y = Math.sin(Date.now() * 0.0007) * 0.1;
      
      // Rotate inner shape for added effect
      innerGroup.rotation.y -= 0.01;
      innerGroup.rotation.x += 0.007;
      
      // Rotate particles slightly for a dynamic effect
      particlesMesh.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);
  
  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}