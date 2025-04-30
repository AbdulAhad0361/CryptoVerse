import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '@/hooks/use-theme';

export default function CardanoModel() {
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
    
    // Create Cardano (ADA) logo group
    const cardanoGroup = new THREE.Group();
    
    // Cardano colors
    const cardanoColor = 0x0033AD; // Cardano blue
    const cardanoAccentColor = 0x71FFBD; // Cardano teal accent
    
    // Create the Cardano logo using three interlocking circles
    // The Cardano logo is based on the "Ouroboros" algorithm representation
    
    // Create a main central circle 
    const createMainCircle = () => {
      const circleGeometry = new THREE.TorusGeometry(0.8, 0.2, 16, 100);
      const circleMaterial = new THREE.MeshStandardMaterial({
        color: cardanoColor,
        metalness: 0.8,
        roughness: 0.2,
        emissive: cardanoColor,
        emissiveIntensity: isDark ? 0.2 : 0.1,
      });
      
      const circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.rotation.x = Math.PI / 2;
      return circle;
    };
    
    // Create the interconnected circles that make up the Cardano logo
    const createInterconnectedCircles = () => {
      const group = new THREE.Group();
      
      // Create 3 small circles that connect with the main circle
      for (let i = 0; i < 3; i++) {
        const smallCircleGeometry = new THREE.TorusGeometry(0.4, 0.1, 16, 100);
        const smallCircleMaterial = new THREE.MeshStandardMaterial({
          color: cardanoAccentColor,
          metalness: 0.9,
          roughness: 0.1,
        });
        
        const smallCircle = new THREE.Mesh(smallCircleGeometry, smallCircleMaterial);
        
        // Position the 3 small circles around the main circle
        const angle = (i * Math.PI * 2) / 3;
        smallCircle.position.x = Math.cos(angle) * 0.8;
        smallCircle.position.y = Math.sin(angle) * 0.8;
        smallCircle.position.z = 0.05;
        
        // Rotate each small circle to be tangential to its position
        smallCircle.rotation.z = angle + Math.PI / 2;
        smallCircle.rotation.y = Math.PI / 12;
        
        group.add(smallCircle);
      }
      
      return group;
    };
    
    // Create the Cardano symbol which is placed in the center
    const createCentralSymbol = () => {
      const geometry = new THREE.CircleGeometry(0.4, 32);
      const material = new THREE.MeshStandardMaterial({
        color: cardanoAccentColor,
        metalness: 0.5,
        roughness: 0.5,
        transparent: true,
        opacity: 0.85,
      });
      
      // Create a disc shape for the center
      const disc = new THREE.Mesh(geometry, material);
      disc.position.z = 0.1;
      
      // Add a pulsing light to the center
      const centerLight = new THREE.PointLight(cardanoAccentColor, 0.8, 3);
      centerLight.position.set(0, 0, 0.5);
      disc.add(centerLight);
      
      return disc;
    };
    
    // Add all components to the Cardano group
    const mainCircle = createMainCircle();
    cardanoGroup.add(mainCircle);
    
    const interconnectedCircles = createInterconnectedCircles();
    cardanoGroup.add(interconnectedCircles);
    
    const centralSymbol = createCentralSymbol();
    cardanoGroup.add(centralSymbol);
    
    // Scale the entire Cardano logo
    cardanoGroup.scale.set(0.8, 0.8, 0.8);
    scene.add(cardanoGroup);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, isDark ? 0.5 : 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xFFFFFF, isDark ? 1 : 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Add blue spotlight to enhance the effect
    const spotLight = new THREE.SpotLight(cardanoColor, isDark ? 0.8 : 0.4);
    spotLight.position.set(0, 0, 5);
    spotLight.angle = Math.PI / 3;
    spotLight.penumbra = 0.5;
    scene.add(spotLight);
    
    // Animation variables
    let time = 0;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      
      // Spin the entire logo
      cardanoGroup.rotation.y += 0.005;
      
      // Add a subtle floating motion
      cardanoGroup.position.y = Math.sin(time * 0.5) * 0.1;
      
      // Pulse the central symbol
      if (centralSymbol) {
        const pulseScale = 1 + Math.sin(time * 2) * 0.05;
        centralSymbol.scale.set(pulseScale, pulseScale, 1);
        
        // Adjust the opacity of the central light
        if (centralSymbol.children[0] instanceof THREE.PointLight) {
          centralSymbol.children[0].intensity = 0.5 + Math.sin(time * 2) * 0.3;
        }
      }
      
      // Rotate the interconnected circles
      interconnectedCircles.rotation.z += 0.003;
      
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
      
      scene.remove(cardanoGroup);
      
      // Dispose geometries and materials
      cardanoGroup.traverse((child) => {
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
    <div id="cardano-model" ref={containerRef} className="w-full h-full"></div>
  );
}