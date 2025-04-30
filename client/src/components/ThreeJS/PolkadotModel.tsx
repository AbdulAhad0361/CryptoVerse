import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '@/hooks/use-theme';

export default function PolkadotModel() {
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
    
    // Create Polkadot (DOT) logo
    const polkadotGroup = new THREE.Group();
    
    // Polkadot colors
    const polkadotColor = 0xE6007A; // Polkadot pink/magenta
    
    // Create the main circle
    const createMainCircle = () => {
      const circleGeometry = new THREE.CircleGeometry(1, 64);
      const circleMaterial = new THREE.MeshStandardMaterial({
        color: polkadotColor,
        metalness: 0.7,
        roughness: 0.3,
        side: THREE.DoubleSide,
        emissive: polkadotColor,
        emissiveIntensity: isDark ? 0.2 : 0.1,
      });
      
      const circle = new THREE.Mesh(circleGeometry, circleMaterial);
      return circle;
    };
    
    // Create the Polkadot pattern (dots)
    const createDots = () => {
      const dotsGroup = new THREE.Group();
      
      // Define positions for the dots based on the Polkadot logo pattern
      const dotPositions = [
        { x: 0, y: 0 },          // Center dot
        { x: 0.5, y: 0 },        // Right dot
        { x: 0.35, y: 0.35 },    // Top-right dot
        { x: 0, y: 0.5 },        // Top dot
        { x: -0.35, y: 0.35 },   // Top-left dot
        { x: -0.5, y: 0 },       // Left dot
        { x: -0.35, y: -0.35 },  // Bottom-left dot
        { x: 0, y: -0.5 },       // Bottom dot
        { x: 0.35, y: -0.35 }    // Bottom-right dot
      ];
      
      // Create each dot
      dotPositions.forEach((pos, index) => {
        // Use different sizes for center dot vs others
        const radius = index === 0 ? 0.2 : 0.15;
        const dotGeometry = new THREE.CircleGeometry(radius, 32);
        const dotMaterial = new THREE.MeshStandardMaterial({
          color: 0xFFFFFF,       // White dots
          metalness: 0.5,
          roughness: 0.5,
          side: THREE.DoubleSide
        });
        
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.set(pos.x, pos.y, 0.01); // Position slightly in front of main circle
        
        // Store original position for animation
        dot.userData = {
          originalX: pos.x,
          originalY: pos.y,
          pulsePhase: Math.random() * Math.PI * 2, // Random phase for pulsing
          pulseSpeed: 0.5 + Math.random() * 0.5    // Slightly different speeds
        };
        
        dotsGroup.add(dot);
      });
      
      return dotsGroup;
    };
    
    // Create connecting lines between dots for the Polkadot network effect
    const createConnectingLines = () => {
      const linesGroup = new THREE.Group();
      
      // Get the dots from the dotsGroup
      const dots = polkadotGroup.children[1].children;
      
      // Create lines connecting center dot to all other dots
      for (let i = 1; i < dots.length; i++) {
        const centerDot = dots[0];
        const targetDot = dots[i];
        
        // Calculate positions
        const startPosition = centerDot.position;
        const endPosition = targetDot.position;
        
        // Create line geometry
        const points = [];
        points.push(new THREE.Vector3(startPosition.x, startPosition.y, 0.005));
        points.push(new THREE.Vector3(endPosition.x, endPosition.y, 0.005));
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Create line material
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xFFFFFF,
          transparent: true,
          opacity: 0.5,
          linewidth: 1
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        line.userData = {
          startDot: 0,
          endDot: i,
          originalOpacity: 0.5
        };
        
        linesGroup.add(line);
      }
      
      // Add some cross connections between non-center dots for more network effect
      const connections = [
        { from: 1, to: 3 }, { from: 3, to: 5 }, { from: 5, to: 7 }, 
        { from: 7, to: 1 }, { from: 2, to: 6 }, { from: 4, to: 8 }
      ];
      
      connections.forEach(({ from, to }) => {
        const startDot = dots[from];
        const endDot = dots[to];
        
        // Calculate positions
        const startPosition = startDot.position;
        const endPosition = endDot.position;
        
        // Create line geometry
        const points = [];
        points.push(new THREE.Vector3(startPosition.x, startPosition.y, 0.005));
        points.push(new THREE.Vector3(endPosition.x, endPosition.y, 0.005));
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        // Create line material with lower opacity
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xFFFFFF,
          transparent: true,
          opacity: 0.3,
          linewidth: 1
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        line.userData = {
          startDot: from,
          endDot: to,
          originalOpacity: 0.3
        };
        
        linesGroup.add(line);
      });
      
      return linesGroup;
    };
    
    // Add data packets that flow along the lines
    const createDataPackets = () => {
      const packetsGroup = new THREE.Group();
      const lines = polkadotGroup.children[2].children;
      
      // Create a packet for each line
      lines.forEach((line, index) => {
        const packetGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const packetMaterial = new THREE.MeshBasicMaterial({
          color: 0xFFFFFF,
          transparent: true,
          opacity: 0.8
        });
        
        const packet = new THREE.Mesh(packetGeometry, packetMaterial);
        
        // Position packet at the start of the line
        if (line instanceof THREE.Line) {
          const positions = line.geometry.attributes.position.array;
          packet.position.set(positions[0], positions[1], positions[2]);
        }
        
        // Set userData for animation
        packet.userData = {
          lineIndex: index,
          progress: 0,
          speed: 0.005 + (Math.random() * 0.01),
          active: Math.random() > 0.5 // Only some packets active initially
        };
        
        // Initially hide inactive packets
        if (!packet.userData.active) {
          packet.visible = false;
        }
        
        packetsGroup.add(packet);
      });
      
      return packetsGroup;
    };
    
    // Add main circle, dots, lines, and packets to the Polkadot group
    const mainCircle = createMainCircle();
    polkadotGroup.add(mainCircle);
    
    const dotsGroup = createDots();
    polkadotGroup.add(dotsGroup);
    
    // After dots are added to the scene, add connecting lines
    const linesGroup = createConnectingLines();
    polkadotGroup.add(linesGroup);
    
    // Add data packets
    const packetsGroup = createDataPackets();
    polkadotGroup.add(packetsGroup);
    
    // Scale the entire Polkadot logo
    polkadotGroup.scale.set(1.2, 1.2, 1.2);
    scene.add(polkadotGroup);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, isDark ? 0.5 : 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xFFFFFF, isDark ? 1 : 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Add pink spotlight to enhance the effect
    const spotLight = new THREE.SpotLight(polkadotColor, isDark ? 0.8 : 0.4);
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
      
      // Rotate the entire logo
      polkadotGroup.rotation.z += 0.002;
      
      // Animate the dots
      if (dotsGroup && dotsGroup.children.length > 0) {
        dotsGroup.children.forEach((dot, index) => {
          if (dot.userData) {
            const { originalX, originalY, pulsePhase, pulseSpeed } = dot.userData;
            
            // Make dots pulse slightly
            const scale = 1 + Math.sin(time * pulseSpeed + pulsePhase) * 0.1;
            dot.scale.set(scale, scale, 1);
            
            // Slightly move the outer dots in a circular pattern
            if (index > 0) {
              const angle = time * 0.2 + (index * Math.PI / 4);
              const radius = 0.05;
              dot.position.x = originalX + Math.cos(angle) * radius;
              dot.position.y = originalY + Math.sin(angle) * radius;
            }
          }
        });
      }
      
      // Update connecting lines based on dot positions
      if (linesGroup && linesGroup.children.length > 0) {
        linesGroup.children.forEach((line) => {
          if (line instanceof THREE.Line && line.userData) {
            const { startDot, endDot } = line.userData;
            
            // Get the dots
            const dots = dotsGroup.children;
            const startPosition = dots[startDot].position;
            const endPosition = dots[endDot].position;
            
            // Update line vertices
            const positions = line.geometry.attributes.position.array;
            positions[0] = startPosition.x;
            positions[1] = startPosition.y;
            positions[3] = endPosition.x;
            positions[4] = endPosition.y;
            
            line.geometry.attributes.position.needsUpdate = true;
            
            // Animate line opacity
            const material = line.material as THREE.LineBasicMaterial;
            material.opacity = line.userData.originalOpacity * (0.7 + Math.sin(time * 0.5) * 0.3);
          }
        });
      }
      
      // Animate data packets
      if (packetsGroup && packetsGroup.children.length > 0) {
        packetsGroup.children.forEach((packet) => {
          if (packet.userData && packet.userData.active) {
            const { lineIndex, progress, speed } = packet.userData;
            
            // Get the line
            const line = linesGroup.children[lineIndex];
            
            if (line instanceof THREE.Line) {
              const positions = line.geometry.attributes.position.array;
              
              // Calculate packet position along the line
              const startX = positions[0];
              const startY = positions[1];
              const startZ = positions[2];
              const endX = positions[3];
              const endY = positions[4];
              const endZ = positions[5];
              
              packet.position.x = startX + (endX - startX) * packet.userData.progress;
              packet.position.y = startY + (endY - startY) * packet.userData.progress;
              packet.position.z = startZ + (endZ - startZ) * packet.userData.progress;
              
              // Update progress
              packet.userData.progress += packet.userData.speed;
              
              // Reset packet when it reaches the end
              if (packet.userData.progress > 1) {
                packet.userData.progress = 0;
                packet.userData.active = Math.random() > 0.3; // 70% chance to stay active
                packet.visible = packet.userData.active;
              }
            }
          } else if (Math.random() > 0.99) {
            // Small chance to activate inactive packets
            packet.userData.active = true;
            packet.userData.progress = 0;
            packet.visible = true;
          }
        });
      }
      
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
      
      scene.remove(polkadotGroup);
      
      // Dispose geometries and materials
      polkadotGroup.traverse((child) => {
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
    <div id="polkadot-model" ref={containerRef} className="w-full h-full"></div>
  );
}