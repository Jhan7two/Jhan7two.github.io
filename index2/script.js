const colors = {
  issue8: '#f6e0a4',
  issue7: '#ff608c',
  issue6: '#ffffff',
  issue5: '#00c1b5',
  issue4: '#ff6519',
  issue3: '#ffbe00',
  issue2: '#1d3fbb',
  issue1: '#E30512'
};

// --- Sincronización de scroll entre .side-nav y .content ---
const content = document.querySelector('.content');
const sideNav = document.querySelector('.side-nav');
let isSyncingContent = false;
let isSyncingSideNav = false;

if (content && sideNav) {
  content.addEventListener('scroll', () => {
    if (!isSyncingContent) {
      isSyncingSideNav = true;
      sideNav.scrollTop = content.scrollTop;
      isSyncingSideNav = false;
    }
  });
  sideNav.addEventListener('scroll', () => {
    if (!isSyncingSideNav) {
      isSyncingContent = true;
      content.scrollTop = sideNav.scrollTop;
      isSyncingContent = false;
    }
  });
}

// --- Intersection Observer para cambiar colores de fondo ---
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      if (colors[id]) {
        document.body.style.backgroundColor = colors[id];
      }
    }
  });
}, observerOptions);

// Observar todos los elementos con IDs que coincidan con los colores
Object.keys(colors).forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// --- Funcionalidad de navegación ---
const main = document.querySelector('.main');
const navLinks = document.querySelectorAll('.nav-link');
const covers = document.querySelectorAll('.cover');

// Manejar clics en navegación
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const issueNumber = parseInt(link.dataset.issue);
    
    // Calcular la posición de scroll
    let targetIndex;
    if (issueNumber === 8) {
      targetIndex = 0;
    } else {
      targetIndex = issueNumber;
    }
    
    const targetCover = covers[targetIndex];
    if (targetCover) {
      targetCover.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Actualizar navegación activa
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// --- Detectar scroll para actualizar navegación activa ---
let isScrolling = false;

main.addEventListener('scroll', () => {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(() => {
      const scrollTop = main.scrollTop;
      const windowHeight = window.innerHeight;
      const currentSection = Math.round(scrollTop / windowHeight);
      
      // Actualizar navegación activa basada en la sección actual
      const issueNumbers = [8, 1, 2, 3, 4, 5, 6, 7];
      const activeIssue = issueNumbers[currentSection];
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (parseInt(link.dataset.issue) === activeIssue) {
          link.classList.add('active');
        }
      });
      
      isScrolling = false;
    });
  }
});

// Establecer color inicial
document.body.style.backgroundColor = '#ffffff';