// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    let dark = true; // Start in dark theme
    
    // Set initial theme toggle icon
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    
    themeToggle.addEventListener('click', () => {
        dark = !dark;
        body.setAttribute('data-theme', dark ? 'dark' : 'light');
        themeToggle.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Re-initialize skill effects on theme toggle
        initSkillEffects();
    });

    // Cube toggle functionality
    const cubeToggle = document.getElementById('cube-toggle');
    let cubeVisible = false; // Start with cube hidden
    
    // Set initial cube toggle icon to show it's hidden
    cubeToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
    
    cubeToggle.addEventListener('click', () => {
        cubeVisible = !cubeVisible;
        cubeToggle.innerHTML = cubeVisible ? '<i class="fas fa-cube"></i>' : '<i class="fas fa-eye-slash"></i>';
        
        // Toggle cube visibility in particle background
        if (window.toggleCube) {
            window.toggleCube(cubeVisible);
        }
    });



    // Skill hover effects (no longer animating bars)
    function initSkillEffects() {
        document.querySelectorAll('.skill').forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                skill.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            skill.addEventListener('mouseleave', () => {
                skill.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Initialize skill effects
    initSkillEffects();

    // Interactive experience cards
    document.querySelectorAll('.exp-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
            item.style.background = item.classList.contains('active') ? 'rgba(99,102,241,0.12)' : 'transparent';
        });
    });

    // Particle background with wireframe cube
    initParticleBackground();
});

// Particle Background System
function initParticleBackground() {
    const canvas = document.getElementById('particle-bg');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let cubeAngle = 0;
    let cubeVisible = false; // Track cube visibility state - start hidden
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2.5 + 1.5,
                dx: (Math.random() - 0.5) * 0.7,
                dy: (Math.random() - 0.5) * 0.7,
                color: `hsla(${Math.random()*360}, 80%, 70%, 0.7)`
            });
        }
    }
    
    // Wireframe cube functions
    function rotate3DPoint(x, y, z, angleX, angleY, angleZ) {
        // Rotate around X axis
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        
        // Rotate around Y axis
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;
        
        // Rotate around Z axis
        const cosZ = Math.cos(angleZ);
        const sinZ = Math.sin(angleZ);
        const x3 = x2 * cosZ - y1 * sinZ;
        const y3 = x2 * sinZ + y1 * cosZ;
        
        return { x: x3, y: y3, z: z2 };
    }
    
    function project3DTo2D(x, y, z, distance = 200) {
        const scale = distance / (distance + z);
        return {
            x: x * scale + canvas.width / 2,
            y: y * scale + canvas.height / 2
        };
    }
    
    function drawWireframeCube() {
        const size = 100;
        const gridSize = 20; // Size of each grid cell
        const gridPoints = [];
        
        // Create grid points for each face
        for (let i = 0; i <= 4; i++) {
            for (let j = 0; j <= 4; j++) {
                // Front face
                gridPoints.push([
                    -size + (i * gridSize),
                    -size + (j * gridSize),
                    -size
                ]);
                // Back face
                gridPoints.push([
                    -size + (i * gridSize),
                    -size + (j * gridSize),
                    size
                ]);
                // Left face
                gridPoints.push([
                    -size,
                    -size + (i * gridSize),
                    -size + (j * gridSize)
                ]);
                // Right face
                gridPoints.push([
                    size,
                    -size + (i * gridSize),
                    -size + (j * gridSize)
                ]);
                // Top face
                gridPoints.push([
                    -size + (i * gridSize),
                    -size,
                    -size + (j * gridSize)
                ]);
                // Bottom face
                gridPoints.push([
                    -size + (i * gridSize),
                    size,
                    -size + (j * gridSize)
                ]);
            }
        }
        
        // Remove duplicate points
        const uniquePoints = [];
        const seen = new Set();
        gridPoints.forEach(point => {
            const key = point.join(',');
            if (!seen.has(key)) {
                seen.add(key);
                uniquePoints.push(point);
            }
        });
        
        // Rotate all points
        const rotatedPoints = uniquePoints.map(point => 
            rotate3DPoint(point[0], point[1], point[2], cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3)
        );
        
        // Project to 2D
        const projectedPoints = rotatedPoints.map(point => 
            project3DTo2D(point.x, point.y, point.z)
        );
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        
        // Draw horizontal and vertical lines for each face
        for (let i = 0; i <= 4; i++) {
            for (let j = 0; j <= 4; j++) {
                // Find corresponding points for grid lines
                const x1 = -size + (i * gridSize);
                const y1 = -size + (j * gridSize);
                
                // Front face horizontal lines
                const frontH1 = rotate3DPoint(x1, -size, -size, cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3);
                const frontH2 = rotate3DPoint(x1, size, -size, cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3);
                const frontH1Proj = project3DTo2D(frontH1.x, frontH1.y, frontH1.z);
                const frontH2Proj = project3DTo2D(frontH2.x, frontH2.y, frontH2.z);
                
                // Front face vertical lines
                const frontV1 = rotate3DPoint(-size, y1, -size, cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3);
                const frontV2 = rotate3DPoint(size, y1, -size, cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3);
                const frontV1Proj = project3DTo2D(frontV1.x, frontV1.y, frontV1.z);
                const frontV2Proj = project3DTo2D(frontV2.x, frontV2.y, frontV2.z);
                
                // Back face horizontal lines
                const backH1 = rotate3DPoint(x1, -size, size, cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3);
                const backH2 = rotate3DPoint(x1, size, size, cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3);
                const backH1Proj = project3DTo2D(backH1.x, backH1.y, backH1.z);
                const backH2Proj = project3DTo2D(backH2.x, backH2.y, backH2.z);
                
                // Back face vertical lines
                const backV1 = rotate3DPoint(-size, y1, size, cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3);
                const backV2 = rotate3DPoint(size, y1, size, cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3);
                const backV1Proj = project3DTo2D(backV1.x, backV1.y, backV1.z);
                const backV2Proj = project3DTo2D(backV2.x, backV2.y, backV2.z);
                
                // Draw lines
                ctx.beginPath();
                ctx.moveTo(frontH1Proj.x, frontH1Proj.y);
                ctx.lineTo(frontH2Proj.x, frontH2Proj.y);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(frontV1Proj.x, frontV1Proj.y);
                ctx.lineTo(frontV2Proj.x, frontV2Proj.y);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(backH1Proj.x, backH1Proj.y);
                ctx.lineTo(backH2Proj.x, backH2Proj.y);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(backV1Proj.x, backV1Proj.y);
                ctx.lineTo(backV2Proj.x, backV2Proj.y);
                ctx.stroke();
            }
        }
        
        // Draw connecting lines between front and back faces
        for (let i = 0; i <= 4; i++) {
            for (let j = 0; j <= 4; j++) {
                const x = -size + (i * gridSize);
                const y = -size + (j * gridSize);
                
                const frontPoint = rotate3DPoint(x, y, -size, cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3);
                const backPoint = rotate3DPoint(x, y, size, cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3);
                const frontProj = project3DTo2D(frontPoint.x, frontPoint.y, frontPoint.z);
                const backProj = project3DTo2D(backPoint.x, backPoint.y, backPoint.z);
                
                ctx.beginPath();
                ctx.moveTo(frontProj.x, frontProj.y);
                ctx.lineTo(backProj.x, backProj.y);
                ctx.stroke();
            }
        }
        
        // Draw main cube edges with thicker lines
        const mainEdges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // Front face
            [4, 5], [5, 6], [6, 7], [7, 4], // Back face
            [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
        ];
        
        const mainCubePoints = [
            [-size, -size, -size], [size, -size, -size], [size, size, -size], [-size, size, -size],
            [-size, -size, size], [size, -size, size], [size, size, size], [-size, size, size]
        ];
        
        const rotatedMainPoints = mainCubePoints.map(point => 
            rotate3DPoint(point[0], point[1], point[2], cubeAngle * 0.5, cubeAngle, cubeAngle * 0.3)
        );
        
        const projectedMainPoints = rotatedMainPoints.map(point => 
            project3DTo2D(point.x, point.y, point.z)
        );
        
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.lineWidth = 3;
        
        mainEdges.forEach(edge => {
            const p1 = projectedMainPoints[edge[0]];
            const p2 = projectedMainPoints[edge[1]];
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
        });
        
        // Draw vertices
        projectedMainPoints.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
            ctx.fill();
        });
    }
    
    createParticles();
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw wireframe cube only if visible
        if (cubeVisible) {
            drawWireframeCube();
            cubeAngle += 0.01;
        }
        
        // Draw particles
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    // Function to toggle cube visibility (accessible globally)
    window.toggleCube = function(visible) {
        cubeVisible = visible;
    };
    
    animateParticles();
    
    // Recreate particles on resize
    window.addEventListener('resize', createParticles);
}
  
  
  
  
  