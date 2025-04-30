import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '@/hooks/use-theme';

export default function DogecoinModel() {
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
    camera.position.z = 3.5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create Dogecoin main shape (coin)
    const coinGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.15, 50);
    
    const dogecoinColor = 0xf2d13d; // Dogecoin gold color
    const metalness = isDark ? 0.8 : 0.7;
    const roughness = isDark ? 0.2 : 0.3;
    
    const coinMaterial = new THREE.MeshStandardMaterial({
      color: dogecoinColor,
      metalness: metalness,
      roughness: roughness,
      emissive: dogecoinColor,
      emissiveIntensity: 0.2
    });
    
    const coin = new THREE.Mesh(coinGeometry, coinMaterial);
    coin.rotation.x = Math.PI / 2; // Make it stand up
    scene.add(coin);
    
    // Create Dogecoin logo (simplified as a "D" shape)
    const logoGroup = new THREE.Group();
    scene.add(logoGroup);
    
    // Create "D" using simple shapes
    const logoBorderGeometry = new THREE.TorusGeometry(0.7, 0.08, 16, 32, Math.PI);
    const logoBorderMaterial = new THREE.MeshStandardMaterial({
      color: 0x745d0f,
      metalness: 0.5,
      roughness: 0.5
    });
    
    const logoBorder = new THREE.Mesh(logoBorderGeometry, logoBorderMaterial);
    logoBorder.position.z = 0.08;
    logoBorder.rotation.z = -Math.PI / 2;
    logoGroup.add(logoBorder);
    
    // Add vertical line to complete "D" shape
    const lineGeometry = new THREE.BoxGeometry(0.08, 1.4, 0.05);
    const lineMaterial = new THREE.MeshStandardMaterial({
      color: 0x745d0f,
      metalness: 0.5,
      roughness: 0.5
    });
    
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.set(-0.7, 0, 0.08);
    logoGroup.add(line);
    
    // Add particle effects
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 600;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 8;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: 0xc2a633,
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
      coin.rotation.z += 0.005;
      logoGroup.rotation.z += 0.005;
      
      // Make the coin float up and down gently
      coin.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      logoGroup.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      
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