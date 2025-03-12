import React, { useEffect, useRef } from 'react';

interface SearchAnimationProps {
  isSearching: boolean;
}

const SearchAnimation: React.FC<SearchAnimationProps> = ({ isSearching }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!isSearching || !containerRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Clear previous animation elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Create SVG element for paths
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    container.appendChild(svg);
    
    // Create particles
    const particleCount = 15;
    const particles: HTMLDivElement[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'search-particle';
      
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random starting position
      const x = Math.random() * width;
      const y = Math.random() * height;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      // Random velocity
      particle.dataset.vx = String(Math.random() * 2 - 1);
      particle.dataset.vy = String(Math.random() * 2 - 1);
      
      container.appendChild(particle);
      particles.push(particle);
    }
    
    // Create waves
    const createWave = () => {
      const wave = document.createElement('div');
      wave.className = 'search-wave';
      
      // Center position
      const x = width / 2;
      const y = height / 2;
      wave.style.left = `${x}px`;
      wave.style.top = `${y}px`;
      wave.style.width = '0px';
      wave.style.height = '0px';
      
      container.appendChild(wave);
      
      // Animate wave expansion
      let size = 0;
      const expandWave = () => {
        size += 2;
        wave.style.width = `${size}px`;
        wave.style.height = `${size}px`;
        wave.style.left = `${x - size/2}px`;
        wave.style.top = `${y - size/2}px`;
        wave.style.opacity = `${1 - size/Math.max(width, height)}`;
        
        if (size < Math.max(width, height) * 2) {
          requestAnimationFrame(expandWave);
        } else {
          container.removeChild(wave);
        }
      };
      
      requestAnimationFrame(expandWave);
    };
    
    // Create paths between particles
    const createPaths = () => {
      // Clear previous paths
      const paths = svg.querySelectorAll('path');
      paths.forEach(path => svg.removeChild(path));
      
      // Create new paths between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          const x1 = parseFloat(p1.style.left);
          const y1 = parseFloat(p1.style.top);
          const x2 = parseFloat(p2.style.left);
          const y2 = parseFloat(p2.style.top);
          
          const distance = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
          
          // Only connect nearby particles
          if (distance < 100) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M${x1},${y1} L${x2},${y2}`);
            path.setAttribute('stroke', 'rgba(59, 130, 246, 0.2)');
            path.setAttribute('stroke-width', '1');
            path.setAttribute('fill', 'none');
            svg.appendChild(path);
          }
        }
      }
    };
    
    // Animation loop
    let waveTimer = 0;
    const animate = () => {
      // Move particles
      particles.forEach(particle => {
        const x = parseFloat(particle.style.left);
        const y = parseFloat(particle.style.top);
        const vx = parseFloat(particle.dataset.vx || '0');
        const vy = parseFloat(particle.dataset.vy || '0');
        
        // Update position
        let newX = x + vx;
        let newY = y + vy;
        
        // Bounce off walls
        if (newX < 0 || newX > width) {
          particle.dataset.vx = String(-vx);
          newX = x;
        }
        
        if (newY < 0 || newY > height) {
          particle.dataset.vy = String(-vy);
          newY = y;
        }
        
        particle.style.left = `${newX}px`;
        particle.style.top = `${newY}px`;
      });
      
      // Create paths
      createPaths();
      
      // Create waves periodically
      waveTimer++;
      if (waveTimer > 60) {
        createWave();
        waveTimer = 0;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isSearching]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-64 relative mt-8 mb-8 rounded-lg bg-secondary/20 overflow-hidden"
      style={{ display: isSearching ? 'block' : 'none' }}
    />
  );
};

export default SearchAnimation;
