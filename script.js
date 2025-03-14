document.addEventListener('DOMContentLoaded', function() {

    // Menu Hamburger
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  
    // Navigation Smooth Scroll
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        navMenu.classList.remove('active');
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if(targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Bouton Retour en haut
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    // Thème Sombre/Clair
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      themeIcon.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    });
  
    // Animation des éléments au scroll
    const observerOptions = { threshold: 0.2 };
    const revealElements = document.querySelectorAll('.animate');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.style.animation = `${entry.target.classList[1]} 1s forwards`;
          entry.target.classList.remove('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    revealElements.forEach(el => { if(el.classList.length > 1) revealOnScroll.observe(el); });
  
    // Animation des barres de progression dans la section Compétences
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillsSection = document.getElementById('competences');
    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          progressBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    skillsObserver.observe(skillsSection);
  
    // Filtrage des projets
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active le bouton sélectionné
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        projectItems.forEach(item => {
          if(filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 50);
          } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
          }
        });
      });
    });
  
    // Effet de particules sur canvas
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 100;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.x < 0) this.x = canvas.width;
        if(this.x > canvas.width) this.x = 0;
        if(this.y < 0) this.y = canvas.height;
        if(this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  
    function initParticles() {
      particlesArray = [];
      for(let i = 0; i < numberOfParticles; i++){
        particlesArray.push(new Particle());
      }
    }
  
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();
  
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    });
  
    // Validation du formulaire de contact
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      [name, email, message].forEach(input => { input.style.borderColor = '#ccc'; });
      if(name.value.trim() === '') { name.style.borderColor = 'red'; valid = false; }
      if(!emailRegex.test(email.value.trim())) { email.style.borderColor = 'red'; valid = false; }
      if(message.value.trim() === '') { message.style.borderColor = 'red'; valid = false; }
      if(valid) {
        alert('Votre message a été envoyé avec succès !');
        form.reset();
      } else {
        alert('Veuillez remplir correctement tous les champs.');
      }
    });
  });
  