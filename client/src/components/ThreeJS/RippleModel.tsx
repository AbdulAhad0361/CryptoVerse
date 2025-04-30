import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '@/hooks/use-theme';

export default function RippleModel() {
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
    
    // Create Ripple (XRP) logo
    const rippleGroup = new THREE.Group();
    
    // Ripple colors
    const rippleColor = 0x23292F; // Dark blue/black
    const rippleSecondaryColor = 0x0081C2; // Light blue
    
    // Main Ripple hexagon
    const hexagonGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 6);
    const hexagonMaterial = new THREE.MeshStandardMaterial({
      color: rippleColor,
      metalness: isDark ? 0.7 : 0.6,
      roughness: isDark ? 0.3 : 0.4,
    });
    
    const hexagon = new THREE.Mesh(hexagonGeometry, hexagonMaterial);
    hexagon.rotation.x = Math.PI / 2;
    hexagon.rotation.z = Math.PI / 6; // Rotate to match Ripple logo orientation
    rippleGroup.add(hexagon);
    
    // Create the "X" shape in the center of the Ripple logo
    const createXShape = () => {
      const xGroup = new THREE.Group();
      
      // Create the X using two crossed rectangles
      const rectangleGeometry = new THREE.BoxGeometry(1.3, 0.3, 0.1);
      const rectangleMaterial = new THREE.MeshStandardMaterial({
        color: rippleSecondaryColor,
        metalness: 0.8,
        roughness: 0.2,
        emissive: rippleSecondaryColor,
        emissiveIntensity: isDark ? 0.3 : 0.1,
      });
      
      // First diagonal for X
      const rectangle1 = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
      rectangle1.rotation.z = Math.PI / 4;
      rectangle1.position.z = 0.11;
      xGroup.add(rectangle1);
      
      // Second diagonal for X
      const rectangle2 = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
      rectangle2.rotation.z = -Math.PI / 4;
      rectangle2.position.z = 0.11;
      xGroup.add(rectangle2);
      
      return xGroup;
    };
    
    const xShape = createXShape();
    rippleGroup.add(xShape);
    
    // Add concentric ripple effect circles around the logo
    const addRippleEffects = () => {
      for (let i = 0; i < 3; i++) {
        const rippleGeometry = new THREE.RingGeometry(1.3 + (i * 0.4), 1.3 + (i * 0.4) + 0.1, 32);
        const rippleMaterial = new THREE.MeshBasicMaterial({
          color: rippleSecondaryColor,
          transparent: true,
          opacity: 0.2 - (i * 0.05),
          side: THREE.DoubleSide
        });
        
        const rippleRing = new THREE.Mesh(rippleGeometry, rippleMaterial);
        rippleRing.rotation.x = Math.PI / 2;
        rippleRing.userData = { initialScale: 1 + (i * 0.4), pulseSpeed: 0.5 + (i * 0.2) };
        rippleGroup.add(rippleRing);
      }
    };
    
    addRippleEffects();
    
    // Scale the entire Ripple logo
    rippleGroup.scale.set(0.8, 0.8, 0.8);
    scene.add(rippleGroup);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, isDark ? 0.5 : 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xFFFFFF, isDark ? 1 : 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Add blue spotlight to enhance the effect
    const spotLight = new THREE.SpotLight(0x0081C2, isDark ? 1 : 0.5);
    spotLight.position.set(0, 0, 5);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.5;
    scene.add(spotLight);
    
    // Animation variables
    let time = 0;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      
      // Rotate the Ripple logo
      rippleGroup.rotation.y += 0.01;
      
      // Pulse the ripple rings
      rippleGroup.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
          const { initialScale, pulseSpeed } = child.userData;
          if (initialScale && pulseSpeed) {
            const scale = initialScale + Math.sin(time * pulseSpeed) * 0.1;
            child.scale.set(scale, scale, 1);
          }
        }
      });
      
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
      
      scene.remove(rippleGroup);
      
      // Dispose geometries and materials
      rippleGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          } else if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          }
        }
      });
      
      ambientLight.dispose();
      pointLight.dispose();
      spotLight.dispose();
    };
  }, [isDark]);
  
  return (
    <div id="ripple-model" ref={containerRef} className="w-full h-full"></div>
  );
}