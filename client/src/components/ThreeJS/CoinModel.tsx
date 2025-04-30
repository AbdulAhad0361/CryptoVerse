import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '@/hooks/use-theme';

export default function CoinModel() {
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
    camera.position.z = 3;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create coin geometry
    const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 50);
    
    const coinColor = 0xF59E0B; // Bitcoin gold color
    const coinMetalness = isDark ? 0.8 : 0.7;
    const coinRoughness = isDark ? 0.2 : 0.3;
    
    const coinMaterial = new THREE.MeshStandardMaterial({
      color: coinColor,
      metalness: coinMetalness,
      roughness: coinRoughness,
    });
    
    const coin = new THREE.Mesh(coinGeometry, coinMaterial);
    scene.add(coin);
    
    // Bitcoin logo (simplified as a CircleGeometry)
    const logoGeometry = new THREE.CircleGeometry(0.6, 32);
    const logoMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    
    // Position the logo on front of coin
    logo.position.set(0, 0, 1.01);
    logo.rotation.x = Math.PI / 2;
    coin.add(logo);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, isDark ? 0.5 : 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xFFFFFF, isDark ? 1 : 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      coin.rotation.y += 0.01;
      
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
      scene.remove(coin);
      coinGeometry.dispose();
      coinMaterial.dispose();
      logoGeometry.dispose();
      logoMaterial.dispose();
      ambientLight.dispose();
      pointLight.dispose();
    };
  }, [isDark]);
  
  return (
    <div id="coin-model" ref={containerRef} className="w-full h-full"></div>
  );
}
