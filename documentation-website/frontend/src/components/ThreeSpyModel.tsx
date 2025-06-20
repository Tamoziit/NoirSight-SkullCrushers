
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeSpyModel = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iMouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec2 iMouse;
        
        // Enhanced radar sweep with mouse interaction
        float radar(vec2 uv, float time, vec2 mouse) {
          vec2 center = mouse * 0.3;
          vec2 adjustedUV = uv - center;
          
          float angle = atan(adjustedUV.y, adjustedUV.x);
          float sweepAngle = mod(time * 0.8 + length(mouse) * 2.0, 6.28318);
          float sweepWidth = 0.4 + sin(time) * 0.1;
          float dist = length(adjustedUV);
          
          float sweep = smoothstep(sweepWidth, 0.0, abs(angle - sweepAngle));
          float circles = sin(dist * 15.0 - time * 3.0) * 0.5 + 0.5;
          circles *= smoothstep(1.2, 0.0, dist);
          
          // Pulsing effect based on mouse distance
          float mouseInfluence = 1.0 + length(mouse) * 0.5;
          
          return (sweep + circles * 0.4) * smoothstep(1.0, 0.0, dist) * mouseInfluence;
        }
        
        // Interactive surveillance grid
        float grid(vec2 uv, vec2 mouse) {
          vec2 gridUV = uv * (20.0 + length(mouse) * 10.0);
          vec2 grid = abs(fract(gridUV) - 0.5);
          float gridLine = max(grid.x, grid.y) < 0.03 ? 0.3 : 0.0;
          
          // Add dynamic grid distortion
          float distortion = sin(gridUV.x + iTime) * sin(gridUV.y + iTime) * 0.1;
          return gridLine * (1.0 + distortion);
        }
        
        // Multiple surveillance cameras that track mouse
        float cameras(vec2 uv, float time, vec2 mouse) {
          float totalCameras = 0.0;
          
          // Camera positions that slightly follow mouse
          vec2 positions[4];
          positions[0] = vec2(0.3, 0.3) + mouse * 0.1;
          positions[1] = vec2(-0.3, 0.3) + mouse * 0.1;
          positions[2] = vec2(0.3, -0.3) + mouse * 0.1;
          positions[3] = vec2(-0.3, -0.3) + mouse * 0.1;
          
          for(int i = 0; i < 4; i++) {
            vec2 camPos = positions[i];
            float dist = length(uv - camPos);
            float pulse = sin(time * 2.0 + float(i) * 1.57) * 0.3 + 0.7;
            
            // Camera lens rings
            float rings = 0.0;
            for(int j = 1; j <= 3; j++) {
              float r = float(j) * 0.08;
              rings += smoothstep(0.015, 0.0, abs(dist - r)) * (1.0 - r * 3.0);
            }
            
            // Tracking beam towards mouse
            vec2 toMouse = normalize(mouse - camPos);
            vec2 toPixel = normalize(uv - camPos);
            float beam = smoothstep(0.95, 1.0, dot(toMouse, toPixel)) * 
                        smoothstep(0.4, 0.0, length(uv - camPos)) * pulse;
            
            // Center dot with pulse
            float centerDot = smoothstep(0.02, 0.0, dist) * pulse;
            
            totalCameras += (rings + centerDot + beam * 0.5) * pulse;
          }
          
          return totalCameras;
        }
        
        // Enhanced scanning lines with mouse interaction
        float scanLines(vec2 uv, float time, vec2 mouse) {
          float speed = 8.0 + length(mouse) * 5.0;
          float lines = sin(uv.y * 80.0 + time * speed) * 0.5 + 0.5;
          float vertLines = sin(uv.x * 60.0 + time * speed * 0.7) * 0.3 + 0.3;
          return (lines + vertLines) * 0.08;
        }
        
        // Targeting reticle that follows mouse
        float targetingReticle(vec2 uv, vec2 mouse) {
          vec2 target = mouse * 0.8;
          vec2 toTarget = uv - target;
          float dist = length(toTarget);
          
          // Crosshair
          float crosshair = 0.0;
          if(abs(toTarget.x) < 0.15 && abs(toTarget.y) < 0.005) crosshair = 1.0;
          if(abs(toTarget.y) < 0.15 && abs(toTarget.x) < 0.005) crosshair = 1.0;
          
          // Targeting circles
          float circles = 0.0;
          circles += smoothstep(0.008, 0.005, abs(dist - 0.1));
          circles += smoothstep(0.008, 0.005, abs(dist - 0.15));
          
          return (crosshair + circles) * smoothstep(0.2, 0.18, dist);
        }
        
        void main() {
          vec2 uv = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y;
          
          vec3 color = vec3(0.0);
          
          // Animated background with mouse influence
          float bg = 1.0 - length(uv) * (0.4 + length(iMouse) * 0.2);
          color += vec3(0.0, 0.05, 0.15) * bg;
          
          // Interactive grid
          color += vec3(0.0, 0.4, 0.6) * grid(uv, iMouse);
          
          // Enhanced radar effect
          float radarEffect = radar(uv, iTime, iMouse);
          color += vec3(0.0, 1.0, 0.3) * radarEffect;
          
          // Multiple surveillance cameras
          float cameraEffect = cameras(uv, iTime, iMouse);
          color += vec3(1.0, 0.3, 0.0) * cameraEffect;
          
          // Interactive scanning lines
          color += vec3(0.0, 0.5, 0.8) * scanLines(uv, iTime, iMouse);
          
          // Targeting reticle
          color += vec3(1.0, 0.0, 0.0) * targetingReticle(uv, iMouse);
          
          // Enhanced digital noise
          vec2 noise = fract(sin(dot(uv + iTime * 0.1, vec2(12.9898, 78.233))) * 43758.5453);
          color += noise.x * 0.03 * (1.0 + length(iMouse) * 0.5);
          
          // Data streams
          float streams = sin(uv.x * 5.0 + iTime * 10.0) * sin(uv.y * 3.0 + iTime * 7.0);
          color += vec3(0.0, 0.3, 0.5) * streams * 0.1;
          
          // Enhanced vignette with mouse interaction
          float vignette = 1.0 - length(uv) * (0.6 - length(iMouse) * 0.2);
          color *= vignette;
          
          // Glitch effect occasionally
          if(mod(iTime, 5.0) > 4.8) {
            color.r += sin(uv.y * 100.0 + iTime * 50.0) * 0.1;
          }
          
          gl_FragColor = vec4(color, 0.7);
        }
      `
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.016;
      material.uniforms.iMouse.value.set(mousePosition.current.x, mousePosition.current.y);
      renderer.render(scene, camera);
    }

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

export default ThreeSpyModel;
