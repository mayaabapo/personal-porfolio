document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6e00ff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#6e00ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Links hover effect
    const links = document.querySelectorAll('a, button, .skill-planet, .nav-item, .project-card');
    
    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.backgroundColor = 'rgba(0, 247, 255, 0.5)';
        });
        
        link.addEventListener('mouseout', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--cosmic-accent)';
        });
    });
    
    // Mobile navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
  // Smooth scrolling for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target element
        const targetElement = document.querySelector(this.getAttribute('href'));
        
        // Calculate the offset (e.g., 50px)
        const offset = 50;

        // Scroll to the target element, adjusting for the offset
        window.scrollTo({
            top: targetElement.offsetTop - offset,
            behavior: 'smooth'
        });
        
        // Close mobile navigation if open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
    });
});

    
    // Animate hero title words
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.transform = 'translateY(0)';
            word.style.opacity = '1';
        }, index * 200);
    });
    
    // Hero chart animation
  // Minimalist Data Constellation
const heroVisualization = document.getElementById('heroChart');
const ctx = heroVisualization.getContext('2d');
heroVisualization.width = heroVisualization.offsetWidth;
heroVisualization.height = heroVisualization.offsetHeight;

// Data points (stars)
const stars = Array.from({length: 30}, () => ({
  x: Math.random() * heroVisualization.width,
  y: Math.random() * heroVisualization.height,
  size: Math.random() * 2 + 1,
  brightness: Math.random() * 0.5 + 0.5,
  speed: Math.random() * 0.2 + 0.1
}));

// Data connections (constellation lines)
const connections = [];
for (let i = 0; i < stars.length; i++) {
  // Connect each star to 1-3 nearest neighbors
  const neighbors = getNearestNeighbors(stars, i, Math.floor(Math.random() * 2) + 1);
  neighbors.forEach(j => {
    connections.push({
      from: i,
      to: j,
      width: Math.random() * 0.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1
    });
  });
}

function getNearestNeighbors(stars, index, count) {
  return stars
    .map((star, i) => ({i, dist: distance(stars[index], star)}))
    .sort((a, b) => a.dist - b.dist)
    .slice(1, count + 1)
    .map(item => item.i);
}

function distance(a, b) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function drawConstellation() {
  ctx.clearRect(0, 0, heroVisualization.width, heroVisualization.height);
  
  // Draw connections first (behind stars)
  connections.forEach(conn => {
    const from = stars[conn.from];
    const to = stars[conn.to];
    
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = `rgba(122, 43, 255, ${conn.alpha})`;
    ctx.lineWidth = conn.width;
    ctx.stroke();
  });
  
  // Draw stars
  stars.forEach(star => {
    // Star glow
    const gradient = ctx.createRadialGradient(
      star.x, star.y, 0,
      star.x, star.y, star.size * 3
    );
    gradient.addColorStop(0, `rgba(122, 43, 255, ${star.brightness})`);
    gradient.addColorStop(1, 'rgba(122, 43, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Star core
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Slow drift animation
    star.x += (Math.random() - 0.5) * star.speed;
    star.y += (Math.random() - 0.5) * star.speed;
    
    // Keep within bounds
    star.x = Math.max(0, Math.min(heroVisualization.width, star.x));
    star.y = Math.max(0, Math.min(heroVisualization.height, star.y));
  });
  
  // Occasionally highlight a connection
  if (Math.random() < 0.02) {
    const randomConn = connections[Math.floor(Math.random() * connections.length)];
    randomConn.alpha = 0.8;
    setTimeout(() => { randomConn.alpha = 0.1 + Math.random() * 0.2 }, 800);
  }
  
  requestAnimationFrame(drawConstellation);
}

drawConstellation();
    
    // Skills orbit animation
    const skillPlanets = document.querySelectorAll('.skill-planet');
    const skillsDetails = document.querySelector('.skills-details');
    const skillName = document.querySelector('.skill-name');
    const skillDescription = document.querySelector('.skill-description');
    const meterBar = document.querySelector('.meter-bar');
    
    const skillsData = {
        'Python': {
            description: 'Basic knowledge with Pandas, NumPy, and building machine learning models with scikit-learn.',
            level: 75
        },
        'SQL': {
            description: 'Experienced in writing queries and optimization for large datasets.',
            level: 55
        },
        'Tableau': {
            description: 'Skilled in creating interactive dashboards and visualizations to communicate insights effectively.',
            level: 80
        },
        'R': {
            description: 'Competent in statistical analysis, data visualization, and R Markdown reporting.',
            level: 85
        },
      
        'Excel': {
            description: 'Proficient in using Excel for tasks like pivot tables, data analysis, basic formulas, and Powery Query.',
            level: 80
        }
    };
    
  // Update your positionPlanets() function with this:
function positionPlanets() {
    const orbit = document.querySelector('.skills-orbit');
    if (!orbit) return;
    
    const centerX = 50; // percentage
    const centerY = 50; // percentage
    const radius = 35; // percentage of container
    const angleIncrement = (2 * Math.PI) / skillPlanets.length;
    
    skillPlanets.forEach((planet, index) => {
      const angle = angleIncrement * index;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      planet.style.left = `${x}%`;
      planet.style.top = `${y}%`;
    });
  }
  
  // Call initially and on resize
  positionPlanets();
  window.addEventListener('resize', positionPlanets);
    
    // Handle planet hover
    skillPlanets.forEach(planet => {
        planet.addEventListener('mouseenter', () => {
            const skill = planet.getAttribute('data-skill');
            const skillInfo = skillsData[skill];
            
            skillName.textContent = skill;
            skillDescription.textContent = skillInfo.description;
            meterBar.style.width = `${skillInfo.level}%`;
            
            // Highlight the planet
            planet.style.boxShadow = '0 0 20px var(--cosmic-primary)';
            planet.querySelector('.planet-icon').style.color = 'var(--cosmic-accent)';
        });
        
        planet.addEventListener('mouseleave', () => {
            planet.style.boxShadow = '';
            planet.querySelector('.planet-icon').style.color = 'var(--cosmic-primary)';
        });
    });
    
    // Project filtering
    const projectNavItems = document.querySelectorAll('.nav-item');
    const projectCards = document.querySelectorAll('.project-card');
    
    projectNavItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active state
            projectNavItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
            
            const category = item.getAttribute('data-category');
            
            // Filter projects
            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category').includes(category)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Project visualizations
    const projectVisuals = [
        { id: 'project1-visual', type: 'bar' },
        { id: 'project2-visual', type: 'pie' },
        { id: 'project3-visual', type: 'line' },
        { id: 'project4-visual', type: 'doughnut' }
    ];
    
    projectVisuals.forEach(visual => {
        const ctx = document.getElementById(visual.id).getContext('2d');
        let chart;
        
        switch(visual.type) {
            case 'bar':
                chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                        datasets: [{
                            data: [45, 60, 75, 90],
                            backgroundColor: [
                                'rgba(110, 0, 255, 0.7)',
                                'rgba(110, 0, 255, 0.7)',
                                'rgba(110, 0, 255, 0.7)',
                                'rgba(0, 247, 255, 0.7)'
                            ],
                            borderColor: [
                                'rgba(110, 0, 255, 1)',
                                'rgba(110, 0, 255, 1)',
                                'rgba(110, 0, 255, 1)',
                                'rgba(0, 247, 255, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: false
                            }
                        },
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                display: false
                            }
                        }
                    }
                });
                break;
                
            case 'pie':
                chart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Group A', 'Group B', 'Group C', 'Group D'],
                        datasets: [{
                            data: [30, 25, 20, 25],
                            backgroundColor: [
                                'rgba(110, 0, 255, 0.7)',
                                'rgba(0, 247, 255, 0.7)',
                                'rgba(255, 0, 160, 0.7)',
                                'rgba(13, 2, 33, 0.7)'
                            ],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: false
                            }
                        }
                    }
                });
                break;
                
            case 'line':
                chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                        datasets: [{
                            data: [65, 59, 80, 81, 76, 85],
                            borderColor: 'rgba(0, 247, 255, 1)',
                            backgroundColor: 'rgba(0, 247, 255, 0.1)',
                            borderWidth: 2,
                            tension: 0.4,
                            fill: true,
                            pointRadius: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: false
                            }
                        },
                        scales: {
                            x: {
                                display: false
                            },
                            y: {
                                display: false
                            }
                        }
                    }
                });
                break;
                
            case 'doughnut':
                chart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Data 1', 'Data 2', 'Data 3'],
                        datasets: [{
                            data: [40, 30, 30],
                            backgroundColor: [
                                'rgba(110, 0, 255, 0.7)',
                                'rgba(0, 247, 255, 0.7)',
                                'rgba(255, 0, 160, 0.7)'
                            ],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            },
                            tooltip: {
                                enabled: false
                            }
                        },
                        cutout: '70%'
                    }
                });
                break;
        }
    });
    // Add to your Intersection Observer setup
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.achievement-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    achievementObserver.observe(card);
});
    // Animate stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'about') {
                    animateStats();
                }
                
                if (entry.target.classList.contains('project-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                
                if (entry.target.classList.contains('milestone')) {
                    entry.target.querySelector('.milestone-dot').classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('#about, .project-card, .milestone').forEach(section => {
        observer.observe(section);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just show an alert
        alert('Message transmitted successfully! I will respond soon.');
        this.reset();
    });
    
    // 3D logo effect
    const logo3d = document.getElementById('logo-3d');
    
    logo3d.addEventListener('mousemove', (e) => {
        const rect = logo3d.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        logo3d.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    logo3d.addEventListener('mouseleave', () => {
        logo3d.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
    
    // Create a simple 3D data sphere
    const dataSphere = document.getElementById('dataSphere');
    
    if (dataSphere && typeof THREE !== 'undefined') {
        // Set up Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(300, 300);
        dataSphere.appendChild(renderer.domElement);
        
        // Create data points
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 500;
        
        const posArray = new Float32Array(particlesCount * 3);
        
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x6e00ff,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        // Add central sphere
        const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const sphereMaterial = new THREE.MeshBasicMaterial({
            color: 0x00f7ff,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);
        
        // Position camera
        camera.position.z = 3;
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.001;
            
            sphere.rotation.x += 0.001;
            sphere.rotation.y += 0.002;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle resize
        window.addEventListener('resize', () => {
            camera.aspect = 1;
            camera.updateProjectionMatrix();
            renderer.setSize(300, 300);
        });
    }
});