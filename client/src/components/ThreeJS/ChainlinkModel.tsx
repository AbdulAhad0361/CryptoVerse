import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThemeMode } from '@/hooks/use-theme';

export default function ChainlinkModel() {
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
    
    // Chainlink colors
    const chainlinkColor = 0x375bd2; // Chainlink blue color
    const metalness = isDark ? 0.8 : 0.7;
    const roughness = isDark ? 0.2 : 0.3;
    
    // Create the main Chainlink model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    
    // Create center sphere (representing a node)
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: chainlinkColor,
      metalness: metalness,
      roughness: roughness,
      emissive: chainlinkColor,
      emissiveIntensity: 0.2
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    modelGroup.add(sphere);
    
    // Create first ring (representing Chainlink connecting rings)
    const ring1Group = new THREE.Group();
    modelGroup.add(ring1Group);
    
    const ring1Geometry = new THREE.TorusGeometry(1.5, 0.1, 16, 50);
    const ring1Material = new THREE.MeshStandardMaterial({
      color: chainlinkColor,
      metalness: metalness,
      roughness: roughness,
      emissive: chainlinkColor,
      emissiveIntensity: 0.1
    });
    
    const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 2;
    ring1Group.add(ring1);
    
    // Create second ring (perpendicular)
    const ring2Group = new THREE.Group();
    modelGroup.add(ring2Group);
    
    const ring2Geometry = new THREE.TorusGeometry(1.2, 0.08, 16, 50);
    const ring2Material = new THREE.MeshStandardMaterial({
      color: chainlinkColor,
      metalness: metalness,
      roughness: roughness,
      emissive: chainlinkColor,
      emissiveIntensity: 0.1
    });
    
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    ring2Group.add(ring2);
    
    // Create small connecting nodes (representing data points)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 1.2;
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
        emissive: chainlinkColor,
        emissiveIntensity: 0.3
      });
      
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(x, y, 0);
      ring1Group.add(node);
    }
    
    // Add particle effects (data flowing through the network)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 7;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: chainlinkColor,
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
      modelGroup.rotation.y += 0.003;
      
      // Make the model float up and down gently
      modelGroup.position.y = Math.sin(Date.now() * 0.0005) * 0.1;
      
      // Rotate rings for added effect
      ring1Group.rotation.x += 0.01;
      ring1Group.rotation.z += 0.005;
      
      ring2Group.rotation.x -= 0.007;
      ring2Group.rotation.z -= 0.003;
      
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