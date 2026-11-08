const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const whatsappNumber = '5516996453642';

// Conteúdo estático do portfólio nesta versão pública.
const projects = [
  {
    id: 'vivo',
    title: 'Vivo Araraquara',
    category: 'Social media, comunicação visual e marketing digital',
    intro: 'Planejamento, criação de conteúdos e campanhas para comunicação comercial e divulgação de produtos no varejo.',
    cover: 'assets/p3_2.png',
    gallery: ['assets/p3_3.png','assets/p3_4.png','assets/p3_5.png','assets/p3_8.png','assets/p3_9.png','assets/p3_10.png','assets/p3_11.png','assets/p3_12.png','assets/p3_13.png','assets/p3_14.png','assets/p3_15.png'],
    challenge: 'Comunicar uma grande variedade de produtos e ofertas sem perder a identidade visual da marca e mantendo uma comunicação atrativa e clara.',
    solution: 'Criação de uma comunicação visual consistente, adaptada para diferentes campanhas, produtos e formatos de Instagram.',
    deliveries: 'Feed • Stories • Reels • Campanhas • Materiais de loja',
    result: 'Uma comunicação mais organizada, visualmente atrativa e alinhada à identidade da marca, contribuindo para a divulgação de produtos e campanhas no ponto de venda e nas redes sociais.'
  },
  {
    id: 'majue',
    title: 'Majuê Doceria',
    category: 'Social media e comunicação visual',
    intro: 'Planejamento, criação de conteúdos e design para fortalecer a presença da marca no digital, divulgar produtos e atrair mais clientes.',
    cover: 'assets/p3_17.png',
    gallery: ['assets/p3_20.png','assets/p3_21.png','assets/p3_22.png','assets/p3_23.png','assets/p3_24.png','assets/p3_25.png','assets/p3_26.png'],
    challenge: 'Destacar os produtos da doceria no ambiente digital, transmitir a qualidade e o cuidado artesanal e criar uma comunicação atrativa.',
    solution: 'Criação de uma identidade visual consistente, conteúdo estratégico para redes sociais e materiais que valorizam os produtos.',
    deliveries: 'Feed • Stories • Reels • Cardápios digitais • Flyers • Identidade visual',
    result: 'Uma comunicação mais organizada e atrativa, destacando os principais produtos da doceria, fortalecendo a identidade da marca e aumentando a conexão com o público.'
  }
];

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function renderProjects() {
  const container = $('#projects-container');
  if (!container) return;
  container.innerHTML = projects.map((project, index) => `
    <article class="project-case">
      <div class="project-head">
        <div>
          <p class="eyebrow">PROJETO ${String(index + 1).padStart(2, '0')}</p>
          <h2>${escapeHtml(project.title)}</h2>
          <p class="eyebrow">${escapeHtml(project.category)}</p>
          <p>${escapeHtml(project.intro)}</p>
        </div>
        <img src="${project.cover}" alt="${escapeHtml(project.title)} — imagem de apresentação" loading="lazy" data-lightbox="${project.cover}">
      </div>
      <div class="project-gallery">
        ${project.gallery.map((image, imageIndex) => `<img src="${image}" alt="${escapeHtml(project.title)} — imagem ${imageIndex + 1}" loading="lazy" data-lightbox="${image}">`).join('')}
      </div>
      <div class="project-meta">
        <article><b>O DESAFIO</b><p>${escapeHtml(project.challenge)}</p></article>
        <article><b>A SOLUÇÃO</b><p>${escapeHtml(project.solution)}</p></article>
        <article><b>ENTREGAS E RESULTADOS</b><p>${escapeHtml(project.deliveries)}</p><p>${escapeHtml(project.result)}</p></article>
      </div>
    </article>
  `).join('');
}

function navigate() {
  const requestedId = location.hash.replace('#', '') || 'inicio';
  const target = $('#' + CSS.escape(requestedId));
  const page = target?.classList.contains('page') ? target : $('#inicio');
  $$('.page').forEach(item => item.classList.toggle('active-page', item === page));
  $$('.main-nav a').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page.id || (requestedId === 'servicos' && link.dataset.page === 'servicos'));
  });
  $('.main-nav')?.classList.remove('open');
  $('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  if (requestedId === 'servicos' && target) {
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Menu responsivo e navegação entre as telas.
window.addEventListener('hashchange', navigate);
$('.menu-toggle')?.addEventListener('click', () => {
  const isOpen = $('.main-nav').classList.toggle('open');
  $('.menu-toggle').setAttribute('aria-expanded', String(isOpen));
});

// Galeria ampliada do portfólio.
let lightboxImages = [];
let lightboxIndex = 0;
function showLightbox() {
  const lightbox = $('#lightbox');
  const current = lightboxImages[lightboxIndex];
  if (!current) return;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  $('img', lightbox).src = current.src;
  $('img', lightbox).alt = current.alt;
  $('.lightbox-caption').textContent = current.alt;
}
function closeLightbox() {
  $('#lightbox')?.classList.remove('open');
  $('#lightbox')?.setAttribute('aria-hidden', 'true');
}
function stepLightbox(direction) {
  if (!lightboxImages.length) return;
  lightboxIndex = (lightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
  showLightbox();
}
document.addEventListener('click', event => {
  const image = event.target.closest('[data-lightbox]');
  if (!image) return;
  lightboxImages = $$('[data-lightbox]').map(item => ({ src: item.dataset.lightbox, alt: item.alt || 'Imagem do portfólio' }));
  lightboxIndex = Math.max(0, lightboxImages.findIndex(item => item.src === image.dataset.lightbox));
  showLightbox();
});
$('.lightbox-close')?.addEventListener('click', closeLightbox);
$('.lightbox-prev')?.addEventListener('click', () => stepLightbox(-1));
$('.lightbox-next')?.addEventListener('click', () => stepLightbox(1));
$('#lightbox')?.addEventListener('click', event => {
  if (event.target.id === 'lightbox') closeLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
  if ($('#lightbox')?.classList.contains('open') && event.key === 'ArrowRight') stepLightbox(1);
  if ($('#lightbox')?.classList.contains('open') && event.key === 'ArrowLeft') stepLightbox(-1);
});

// O formulário prepara a mensagem e direciona o visitante ao WhatsApp.
$('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const message = `Olá! Meu nome é ${formData.get('name')}.\nWhatsApp: ${formData.get('phone')}\nE-mail: ${formData.get('email')}\nComo nos conheceu: ${formData.get('source')}\n\nSobre meu projeto:\n${formData.get('message')}`;
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

$('#year').textContent = new Date().getFullYear();
renderProjects();
navigate();
