// Dados dos equipamentos
const equipmentData = {
    dji: {
        title: "Estabilizador de imagem DJI",
        image: "/img/estabilizador.png",
        description: "O estabilizador DJI é uma ferramenta profissional essencial para criação de conteúdo de alta qualidade. Com tecnologia de gimbal de 3 eixos, garante estabilização suave e precisa em qualquer movimento, eliminando tremores e vibrações indesejadas. Ideal para gravação de vídeos cinematográficos, reels dinâmicos e conteúdo profissional para redes sociais. Sua portabilidade e facilidade de uso permitem capturar imagens estáveis em qualquer ambiente, desde estúdios até locações externas."
    },
    iphone: {
        title: "iPhone 16 Pro Max",
        image: "img/iphone16promax.png",
        description: "O iPhone 16 Pro Max representa o que há de mais avançado em tecnologia móvel para criação de conteúdo. Equipado com sistema de câmeras Pro de última geração, oferece qualidade cinematográfica com gravação em 4K ProRes, modo Action para estabilização extrema e recursos avançados de fotografia computacional. Sua tela Super Retina XDR de 6,9 polegadas proporciona visualização precisa das cores durante a edição. O processador A18 Pro garante performance excepcional para edição de vídeo e processamento de imagens em tempo real."
    }
};

// Modal functionality
const modal = document.getElementById('equipmentModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close');

// Equipment items click handlers
document.querySelectorAll('.equipment-item').forEach(item => {
    item.addEventListener('click', () => {
        const equipmentType = item.getAttribute('data-equipment');
        const equipment = equipmentData[equipmentType];
        
        if (equipment) {
            modalImage.src = equipment.image;
            modalImage.alt = equipment.title;
            modalTitle.textContent = equipment.title;
            modalDescription.textContent = equipment.description;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    });
});

// Close modal functionality
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Navegação móvel
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll suave para seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header transparente no scroll
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(15, 15, 35, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(15, 15, 35, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    // Esconder/mostrar header no scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.service-card, .portfolio-item, .contact-item, .stat-item').forEach(el => {
    observer.observe(el);
});

// Funcionalidade do WhatsApp
function setupWhatsAppLinks() {
    const phoneNumber = '5511969158988'; // Número do Rafael (formato internacional)
    const defaultMessage = 'Olá Rafael! Vi seu portfólio e gostaria de conversar sobre um projeto de social media. Podemos agendar uma conversa?';
    
    // Link do WhatsApp no hero
    const whatsappHero = document.getElementById('whatsapp-link');
    if (whatsappHero) {
        whatsappHero.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
        whatsappHero.target = '_blank';
    }
    
    // Link do WhatsApp no footer
    const whatsappFooter = document.querySelector('.whatsapp-footer');
    if (whatsappFooter) {
        whatsappFooter.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
        whatsappFooter.target = '_blank';
    }
    
    // Adicionar evento de clique para tracking (opcional)
    document.querySelectorAll('.social-link.whatsapp, .whatsapp-footer').forEach(link => {
        link.addEventListener('click', () => {
            console.log('WhatsApp link clicked');
            // Aqui você pode adicionar analytics se necessário
        });
    });
}

// Formulário de contato
const contactForm = document.getElementById('contactForm');
const successMessage = document.createElement('div');
successMessage.className = 'success-message';
successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Dados do formulário
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Validação básica
    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // Simular envio (aqui você integraria com um serviço real)
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    this.classList.add('loading');
    
    // Criar link mailto com os dados do formulário
    const subject = encodeURIComponent(`Contato do site - ${name}`);
    const body = encodeURIComponent(`
Nome: ${name}
Email: ${email}
Telefone: ${phone || 'Não informado'}

Mensagem:
${message}

---
Enviado através do formulário do site
    `);
    
    const mailtoLink = `mailto:corttesanrafael@gmail.com?subject=${subject}&body=${body}`;
    
    // Simular delay de envio
    setTimeout(() => {
        // Abrir cliente de email
        window.location.href = mailtoLink;
        
        // Mostrar mensagem de sucesso
        this.appendChild(successMessage);
        successMessage.classList.add('show');
        
        // Resetar formulário
        this.reset();
        
        // Restaurar botão
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        this.classList.remove('loading');
        
        // Esconder mensagem após 5 segundos
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }, 1500);
});

// Efeito de digitação no título
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efeito de digitação quando a página carregar
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
    
    // Configurar links do WhatsApp
    setupWhatsAppLinks();
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Observar estatísticas para animação
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const targetNumber = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetNumber);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax suave para o hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    
    if (hero && !isMobile()) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Cursor personalizado para links importantes
document.querySelectorAll('.btn, .portfolio-link, .social-link').forEach(element => {
    element.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
    });
    
    element.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
});

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Adicionar classe ativa ao link de navegação baseado na seção atual
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Preloader simples
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Adicionar ripple effect aos botões
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Efeitos de hover personalizados
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation para elementos
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Aplicar animação de reveal a elementos específicos
document.querySelectorAll('.about-image, .contact-image, .profile-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(el);
});

// CSS para o efeito ripple e outras animações
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    /* Scrollbar personalizada */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: var(--primary-light);
    }
`;

document.head.appendChild(additionalStyles);

// Função para detectar se é dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar comportamentos para mobile
if (isMobile()) {
    // Desabilitar parallax em mobile para melhor performance
    window.removeEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.3;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Função para copiar texto (útil para informações de contato)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Mostrar feedback visual
        const toast = document.createElement('div');
        toast.textContent = 'Copiado para a área de transferência!';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    });
}

// Adicionar funcionalidade de copiar ao clicar em informações de contato
document.querySelectorAll('.contact-text p').forEach(element => {
    element.style.cursor = 'pointer';
    element.title = 'Clique para copiar';
    
    element.addEventListener('click', () => {
        copyToClipboard(element.textContent);
    });
});

console.log('Portfolio Rafael Corttesan - JavaScript carregado com sucesso!');