// Inicialización de AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic'
    });

    // Cargar preferencias guardadas
    loadThemePreference();
    loadLanguagePreference();
});

// Cambio de Tema (Dark/Light)
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeToggle.setAttribute('title', 'Cambiar a tema oscuro');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeToggle.setAttribute('title', 'Cambiar a tema claro');
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Cambio de Idioma (ES/EN)
const langToggle = document.getElementById('lang-toggle');
let currentLang = 'es';

const translations = {
    es: {
        // Navegación
        'nav.inicio': 'Inicio',
        'nav.sobre-mi': 'Sobre Mí',
        'nav.experiencia': 'Experiencia',
        'nav.educacion': 'Educación',
        'nav.certificaciones': 'Certificaciones',
        'nav.habilidades': 'Habilidades',
        'nav.idiomas': 'Idiomas',
        'nav.proyectos': 'Proyectos',
        'nav.contacto': 'Contacto',
        
        // Hero
        'hero.title': 'DANIEL RICO ESTEBAN',
        'hero.subtitle': 'Senior Cloud DevOps Engineer | AWS & Azure Specialist',
        'hero.description': 'Especialista en Cloud Computing (AWS y Azure), DevOps y Ciberseguridad con amplia experiencia en automatización de procesos, CI/CD y gestión de infraestructura en la nube.',
        'hero.btn.contact': 'Contáctame',
        'hero.btn.projects': 'Ver Proyectos',
        'hero.status': 'Disponible para proyectos',
        
        // Sobre Mí
        'about.title': 'Sobre Mí',
        'about.p1': 'Soy un profesional especializado en Cloud Computing (AWS y Azure), DevSecOps y Ciberseguridad con más de 4 años de experiencia en el sector tecnológico. Actualmente trabajo como Senior Cloud DevOps Engineer en CTAIMA, automatizando procesos y gestionando infraestructuras multi-cloud.',
        'about.p2': 'Mi experiencia incluye la gestión de CI/CD, contenedores (Docker, Kubernetes), orquestación con Ansible, desarrollo en Python y Golang, y seguridad con plataformas SOAR. Tengo un fuerte compromiso con el aprendizaje continuo, evidenciado por mis múltiples certificaciones en AWS y otras tecnologías cloud.',
        'about.stat1': 'Años de Experiencia',
        'about.stat2': 'Proyectos Completados',
        'about.stat3': 'Certificaciones',
        'about.stat4': 'Satisfacción Cliente',
        
        // Experiencia
        'exp.title': 'Experiencia Profesional',
        'exp.ctaima.date': 'Febrero 2025 - Actualidad',
        'exp.ctaima.title': 'Senior Cloud DevOps Engineer',
        'exp.ctaima.li1': 'Gestión de infraestructura multi-cloud en AWS y Microsoft Azure con IaC (CDK, CloudFormation, Terraform)',
        'exp.ctaima.li2': 'Administración de servicios AWS: WAF, CloudWatch Alarms, ECS, ECR, Route53, VPC, Redshift, Glue',
        'exp.ctaima.li3': 'Gestión de IAM en AWS y Azure para control de accesos y políticas de seguridad',
        'exp.ctaima.li4': 'Automatización de procesos con pipelines en Azure DevOps y GitHub Actions',
        'exp.ctaima.li5': 'Gestión y optimización de clusters Kubernetes (EKS y AKS)',
        'exp.ctaima.li6': 'Automatización de backups con Commvault y S3',
        'exp.ctaima.li7': 'Implementación de soluciones de análisis de datos con Redshift, Glue, Power BI y CDK',
        'exp.ctaima.li8': 'Automatización de análisis de seguridad: SonarQube, Trivy, Veracode (SAST/DAST), OWASP ZAP, Aikido, Plandek',
        'exp.ctaima.li9': 'Monitorización y observabilidad con Prometheus y Grafana',
        'exp.ctaima.li10': 'Implementación de Bitwarden self-hosted con SSO Entra ID y backups automáticos (S3 + Commvault)',
        'exp.ctaima.li11': 'Migración de servidor SFTP a AWS con análisis de seguridad completo (Veracode, SonarQube, Trivy, OWASP ZAP)',
        'exp.ctaima.li12': 'Gestión de aplicaciones mediante CDK y diseño de Disaster Recovery Plans (DRP) para auditorías',
        'exp.ctaima.li13': 'Automatización de backups RDS: MongoDB, PostgreSQL, MySQL, MariaDB, Aurora',
        'exp.ctaima.li14': 'Gestión de herramientas Atlassian: JIRA, Confluence, Bitbucket',
        'exp.ctaima.li15': 'Gestión de repositorios y CI/CD en GitHub Actions y Bitbucket Pipelines',
        'exp.txofi.date': 'Noviembre 2022 - Febrero 2025',
        'exp.txofi.title': 'Senior DevSecOps Consultant',
        'exp.txofi.li1': 'Automatización de procesos haciendo uso de pipelines en Azure DevOps',
        'exp.txofi.li2': 'Gestión de CI/CD en Azure DevOps (Build y Deploy/Release Pipelines)',
        'exp.txofi.li3': 'Gestión y despliegue de aplicaciones ubicadas en la nube de AWS',
        'exp.txofi.li4': 'Despliegue de aplicaciones con contenedores: Kubernetes (EKS) y Docker',
        'exp.txofi.li5': 'CloudBees CI y CloudBees CD/RO',
        'exp.txofi.li6': 'Gestión y orquestación de configuración con Ansible (Playbooks)',
        'exp.txofi.li7': 'Uso de herramientas DevOps: GitLab, Bitbucket, Jira, Confluence',
        'exp.txofi.li8': 'Gestión de incidencias en Jenkins y SonarQube',
        'exp.txofi.li9': 'Presentación de demos a potenciales clientes',
        'exp.cipher.date': 'Enero 2021 - Octubre 2022',
        'exp.cipher.title': 'Cyber Security Engineer',
        'exp.cipher.li1': 'Gestión y automatización de operaciones y respuestas de seguridad',
        'exp.cipher.li2': 'Desarrollo e implementación de Playbooks, Integraciones y Acciones en Siemplify SOAR',
        'exp.cipher.li3': 'DevOps and Threat Intelligence Analyst',
        'exp.cipher.li4': 'Desarrollo con servicios AWS: S3, DynamoDB, Lambda, Step Functions, Athena',
        'exp.cipher.li5': 'Desarrollo de aplicaciones web con Python y Django',
        'exp.cipher.li6': 'Uso de herramientas DevOps: Git, Docker, Bitbucket, Jira, Confluence',
        
        // Educación
        'edu.title': 'Educación',
        'edu.master.ai.title': 'Máster en Inteligencia Artificial y Big Data',
        'edu.master.ai.university': 'Universidad Isabel I',
        'edu.master.ai.date': '2022 - 2023',
        'edu.master.ai.desc': 'Especialización en Machine Learning, Deep Learning y Análisis de Datos',
        'edu.master.cyber.title': 'Máster en Ciberseguridad y Gestión de Riesgos',
        'edu.master.cyber.university': 'Universidad Alfonso X el Sabio',
        'edu.master.cyber.date': '2020 - 2021',
        'edu.master.cyber.desc': 'Especialización en seguridad de la información y gestión de riesgos tecnológicos',
        'edu.degree.title': 'Grado en Ingeniería de Telecomunicaciones',
        'edu.degree.university': 'Universidad Politécnica de Madrid (UPM)',
        'edu.degree.date': '3º curso',
        'edu.degree.desc': 'Formación en sistemas de telecomunicaciones y tecnologías de la información',
        'edu.bachillerato.title': 'Bachillerato Tecnológico',
        'edu.bachillerato.university': 'Liceo Europeo, Madrid',
        'edu.bachillerato.date': '2011 - 2013',
        'edu.bachillerato.desc': 'Formación preuniversitaria con especialización tecnológica',
        
        // Certificaciones
        'cert.title': 'Certificaciones',
        'cert.subtitle': 'Haz clic en cada certificación para verificarla',
        'cert.verify': 'Verificar',
        
        // Habilidades
        'skills.title': 'Habilidades Técnicas',
        'skills.cloud': 'Cloud Computing',
        'skills.programming': 'Programación',
        'skills.devops': 'DevOps & CI/CD',
        'skills.iac': 'Infrastructure as Code (IaC)',
        'skills.containers': 'Contenedores & Orquestación',
        'skills.databases': 'Bases de Datos',
        'skills.security': 'Seguridad & Análisis de Código',
        'skills.monitoring': 'Monitorización & Observabilidad',
        'skills.data': 'Data & Analytics',
        'skills.backup': 'Backup & Disaster Recovery',
        
        // Proyectos
        'proj.title': 'Proyectos Destacados',
        'proj.cicd.title': 'Automatización de CI/CD Multi-Cloud',
        'proj.cicd.desc': 'Implementación de pipelines de CI/CD completos en Azure DevOps para despliegues automatizados en AWS, utilizando contenedores y Kubernetes para aplicaciones empresariales.',
        'proj.soar.title': 'Plataforma SOAR de Seguridad',
        'proj.soar.desc': 'Desarrollo de Playbooks, integraciones y automatizaciones personalizadas en Siemplify para gestión de incidentes de seguridad y respuesta automatizada a amenazas.',
        'proj.iac.title': 'Infrastructure as Code',
        'proj.iac.desc': 'Gestión de infraestructura cloud con Ansible, Terraform y CloudFormation. Automatización de configuración de servidores, redes y servicios cloud para múltiples clientes.',
        'proj.microservices.title': 'Arquitectura de Microservicios',
        'proj.microservices.desc': 'Diseño y desarrollo de aplicaciones web con arquitectura de microservicios usando Python/Django, desplegadas en contenedores Docker y orquestadas con Kubernetes en AWS EKS.',
        'proj.serverless.title': 'Aplicaciones Serverless AWS',
        'proj.serverless.desc': 'Desarrollo de herramientas y aplicaciones serverless utilizando AWS Lambda, Step Functions, DynamoDB, S3 y Athena para análisis de threat intelligence y automatización de seguridad.',
        'proj.golang.title': 'Herramientas CLI en Golang',
        'proj.golang.desc': 'Desarrollo de herramientas de línea de comandos y aplicaciones de alto rendimiento en Golang para automatización de tareas DevOps y gestión de infraestructura cloud.',
        
        // Contacto
        'contact.title': '¿Hablamos?',
        'contact.subtitle': 'Estoy disponible para nuevos proyectos y oportunidades',
        'contact.email': 'Email',
        'contact.phone': 'Teléfono',
        'contact.location': 'Ubicación',
        'contact.location.value': 'Madrid, España',
        'contact.birth': 'Fecha de Nacimiento',
        'contact.form.name': 'Nombre',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Asunto',
        'contact.form.message': 'Mensaje',
        'contact.form.submit': 'Enviar Mensaje',
        
        // Footer
        'footer.rights': 'Todos los derechos reservados.',
        'footer.role': 'Senior Cloud DevOps Engineer | AWS & Azure Specialist',
        'footer.designed': 'Diseñado y desarrollado con'
    },
    en: {
        // Navigation
        'nav.inicio': 'Home',
        'nav.sobre-mi': 'About Me',
        'nav.experiencia': 'Experience',
        'nav.educacion': 'Education',
        'nav.certificaciones': 'Certifications',
        'nav.habilidades': 'Skills',
        'nav.idiomas': 'Languages',
        'nav.proyectos': 'Projects',
        'nav.contacto': 'Contact',
        
        // Hero
        'hero.title': 'DANIEL RICO ESTEBAN',
        'hero.subtitle': 'Senior Cloud DevOps Engineer | AWS & Azure Specialist',
        'hero.description': 'Specialist in Cloud Computing (AWS and Azure), DevOps, and Cybersecurity with extensive experience in process automation, CI/CD, and cloud infrastructure management.',
        'hero.btn.contact': 'Contact Me',
        'hero.btn.projects': 'View Projects',
        'hero.status': 'Available for projects',
        
        // About
        'about.title': 'About Me',
        'about.p1': 'I am a professional specialized in Cloud Computing (AWS and Azure), DevSecOps, and Cybersecurity with over 4 years of experience in the technology sector. I currently work as a Senior Cloud DevOps Engineer at CTAIMA, automating processes and managing multi-cloud infrastructures.',
        'about.p2': 'My experience includes CI/CD management, containers (Docker, Kubernetes), orchestration with Ansible, development in Python and Golang, and security with SOAR platforms. I have a strong commitment to continuous learning, evidenced by my multiple certifications in AWS and other cloud technologies.',
        'about.stat1': 'Years of Experience',
        'about.stat2': 'Completed Projects',
        'about.stat3': 'Certifications',
        'about.stat4': 'Client Satisfaction',
        
        // Experience
        'exp.title': 'Professional Experience',
        'exp.ctaima.date': 'February 2025 - Present',
        'exp.ctaima.title': 'Senior Cloud DevOps Engineer',
        'exp.ctaima.li1': 'Multi-cloud infrastructure management in AWS and Microsoft Azure with IaC (CDK, CloudFormation, Terraform)',
        'exp.ctaima.li2': 'AWS services administration: WAF, CloudWatch Alarms, ECS, ECR, Route53, VPC, Redshift, Glue',
        'exp.ctaima.li3': 'IAM management in AWS and Azure for access control and security policies',
        'exp.ctaima.li4': 'Process automation with pipelines in Azure DevOps and GitHub Actions',
        'exp.ctaima.li5': 'Kubernetes cluster management and optimization (EKS and AKS)',
        'exp.ctaima.li6': 'Backup automation with Commvault and S3',
        'exp.ctaima.li7': 'Data analytics solutions implementation with Redshift, Glue, Power BI and CDK',
        'exp.ctaima.li8': 'Security analysis automation: SonarQube, Trivy, Veracode (SAST/DAST), OWASP ZAP, Aikido, Plandek',
        'exp.ctaima.li9': 'Monitoring and observability with Prometheus and Grafana',
        'exp.ctaima.li10': 'Bitwarden self-hosted implementation with SSO Entra ID and automatic backups (S3 + Commvault)',
        'exp.ctaima.li11': 'SFTP server migration to AWS with complete security analysis (Veracode, SonarQube, Trivy, OWASP ZAP)',
        'exp.ctaima.li12': 'Application management through CDK and Disaster Recovery Plans (DRP) design for audits',
        'exp.ctaima.li13': 'RDS backup automation: MongoDB, PostgreSQL, MySQL, MariaDB, Aurora',
        'exp.ctaima.li14': 'Atlassian tools management: JIRA, Confluence, Bitbucket',
        'exp.ctaima.li15': 'Repository and CI/CD management in GitHub Actions and Bitbucket Pipelines',
        'exp.txofi.date': 'November 2022 - February 2025',
        'exp.txofi.title': 'Senior DevSecOps Consultant',
        'exp.txofi.li1': 'Process automation using pipelines in Azure DevOps',
        'exp.txofi.li2': 'CI/CD management in Azure DevOps (Build and Deploy/Release Pipelines)',
        'exp.txofi.li3': 'Management and deployment of applications located in AWS cloud',
        'exp.txofi.li4': 'Application deployment with containers: Kubernetes (EKS) and Docker',
        'exp.txofi.li5': 'CloudBees CI and CloudBees CD/RO',
        'exp.txofi.li6': 'Configuration management and orchestration with Ansible (Playbooks)',
        'exp.txofi.li7': 'DevOps tools usage: GitLab, Bitbucket, Jira, Confluence',
        'exp.txofi.li8': 'Incident management in Jenkins and SonarQube',
        'exp.txofi.li9': 'Demos presentation to potential clients',
        'exp.cipher.date': 'January 2021 - October 2022',
        'exp.cipher.title': 'Cyber Security Engineer',
        'exp.cipher.li1': 'Security operations and response management and automation',
        'exp.cipher.li2': 'Development and implementation of Playbooks, Integrations and Actions in Siemplify SOAR',
        'exp.cipher.li3': 'DevOps and Threat Intelligence Analyst',
        'exp.cipher.li4': 'Development with AWS services: S3, DynamoDB, Lambda, Step Functions, Athena',
        'exp.cipher.li5': 'Web application development with Python and Django',
        'exp.cipher.li6': 'DevOps tools usage: Git, Docker, Bitbucket, Jira, Confluence',
        
        // Education
        'edu.title': 'Education',
        'edu.master.ai.title': 'Master\'s in Artificial Intelligence and Big Data',
        'edu.master.ai.university': 'Isabel I University',
        'edu.master.ai.date': '2022 - 2023',
        'edu.master.ai.desc': 'Specialization in Machine Learning, Deep Learning and Data Analysis',
        'edu.master.cyber.title': 'Master\'s in Cybersecurity and Risk Management',
        'edu.master.cyber.university': 'Alfonso X el Sabio University',
        'edu.master.cyber.date': '2020 - 2021',
        'edu.master.cyber.desc': 'Specialization in information security and technological risk management',
        'edu.degree.title': 'Bachelor\'s in Telecommunications Engineering',
        'edu.degree.university': 'Polytechnic University of Madrid (UPM)',
        'edu.degree.date': '3rd year',
        'edu.degree.desc': 'Training in telecommunications systems and information technologies',
        'edu.bachillerato.title': 'Technological Baccalaureate',
        'edu.bachillerato.university': 'Liceo Europeo, Madrid',
        'edu.bachillerato.date': '2011 - 2013',
        'edu.bachillerato.desc': 'Pre-university training with technological specialization',
        
        // Certifications
        'cert.title': 'Certifications',
        'cert.subtitle': 'Click on each certification to verify it',
        'cert.verify': 'Verify',
        
        // Skills
        'skills.title': 'Technical Skills',
        'skills.cloud': 'Cloud Computing',
        'skills.programming': 'Programming',
        'skills.devops': 'DevOps & CI/CD',
        'skills.iac': 'Infrastructure as Code (IaC)',
        'skills.containers': 'Containers & Orchestration',
        'skills.databases': 'Databases',
        'skills.security': 'Security & Code Analysis',
        'skills.monitoring': 'Monitoring & Observability',
        'skills.data': 'Data & Analytics',
        'skills.backup': 'Backup & Disaster Recovery',
        
        // Projects
        'proj.title': 'Featured Projects',
        'proj.cicd.title': 'Multi-Cloud CI/CD Automation',
        'proj.cicd.desc': 'Implementation of complete CI/CD pipelines in Azure DevOps for automated deployments in AWS, using containers and Kubernetes for enterprise applications.',
        'proj.soar.title': 'SOAR Security Platform',
        'proj.soar.desc': 'Development of custom Playbooks, integrations and automations in Siemplify for security incident management and automated threat response.',
        'proj.iac.title': 'Infrastructure as Code',
        'proj.iac.desc': 'Cloud infrastructure management with Ansible, Terraform and CloudFormation. Server, network and cloud services configuration automation for multiple clients.',
        'proj.microservices.title': 'Microservices Architecture',
        'proj.microservices.desc': 'Design and development of web applications with microservices architecture using Python/Django, deployed in Docker containers and orchestrated with Kubernetes on AWS EKS.',
        'proj.serverless.title': 'AWS Serverless Applications',
        'proj.serverless.desc': 'Development of serverless tools and applications using AWS Lambda, Step Functions, DynamoDB, S3 and Athena for threat intelligence analysis and security automation.',
        'proj.golang.title': 'CLI Tools in Golang',
        'proj.golang.desc': 'Development of command-line tools and high-performance applications in Golang for DevOps task automation and cloud infrastructure management.',
        
        // Contact
        'contact.title': 'Let\'s Talk?',
        'contact.subtitle': 'I am available for new projects and opportunities',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.location': 'Location',
        'contact.location.value': 'Madrid, Spain',
        'contact.birth': 'Date of Birth',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send Message',
        
        // Footer
        'footer.rights': 'All rights reserved.',
        'footer.role': 'Senior Cloud DevOps Engineer | AWS & Azure Specialist',
        'footer.designed': 'Designed and developed with'
    }
};

function loadLanguagePreference() {
    currentLang = localStorage.getItem('language') || 'es';
    updateLanguage(currentLang);
}

function updateLanguage(lang) {
    currentLang = lang;
    const langText = langToggle.querySelector('.lang-text');
    langText.textContent = lang === 'es' ? 'EN' : 'ES';
    
    // Actualizar todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    localStorage.setItem('language', lang);
}

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'es' ? 'en' : 'es';
    updateLanguage(newLang);
});

// Navegación - Scroll Spy y Active Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
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
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animación del hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Cerrar menú al hacer clic en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skills Animation on Scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('habilidades');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Stats Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 20);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.getElementById('sobre-mi');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// Form Validation and Submit
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validación básica
        if (!name || !email || !subject || !message) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, ingresa un email válido');
            return;
        }
        
        // Aquí puedes integrar con un servicio de email como EmailJS o FormSpree
        // Por ahora, mostraremos un mensaje de éxito
        
        // Simulación de envío
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
            submitBtn.style.background = 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)';
            
            // Reset form
            contactForm.reset();
            
            // Restaurar botón después de 3 segundos
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Typing Effect for Hero Title (Opcional)
const typingText = document.querySelector('.gradient-text');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Descomentar para activar el efecto de escritura
    // setTimeout(typeWriter, 500);
}

// Parallax Effect para el Hero y elementos
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroText) {
            heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
        
        hero.style.opacity = 1 - (scrolled / (window.innerHeight * 1.2));
    }
});

// Efecto de aparición de secciones al hacer scroll (opcional)
const sectionObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, sectionObserverOptions);

// Añadir clase fade-in a secciones para el efecto (excepto la primera sección visible)
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        // Solo aplicar fade-in a secciones que no están inicialmente en viewport
        if (index > 0) {
            section.classList.add('fade-in');
        }
        sectionObserver.observe(section);
    });
});

// Efecto parallax para shapes del fondo
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.3 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Cursor Custom Effect (Opcional - descomentar para activar)
/*
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});
*/

// Easter Egg - Konami Code
let konamiCode = [];
const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-pattern.length);
    
    if (konamiCode.join(',') === pattern.join(',')) {
        document.body.style.animation = 'rainbow 5s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Console Message
console.log('%c¡Hola Desarrollador! 👋', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%c¿Curioseando el código? Me gusta tu estilo 😎', 'color: #2ECC71; font-size: 14px;');
console.log('%c¿Quieres trabajar juntos? ¡Contáctame!', 'color: #E74C3C; font-size: 14px;');

// Protección contra click derecho (opcional - descomentar si deseas)
/*
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
*/

// Prevenir inspección de elementos con F12 (opcional - no recomendado)
/*
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});
*/

