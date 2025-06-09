
        // (JSON local)
        const recommendationsData = [
            
            {
                tipo: "playa",
                titulo: "Maldivas - Paraíso Tropical",
                descripcion: "Aguas cristalinas y arenas blancas en un paraíso tropical único. Perfecto para luna de miel y relajación.",
                imagenes: [
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop"
                ]
            },
            {
                tipo: "playa",
                titulo: "Copacabana - Brasil",
                descripcion: "La playa más famosa de Río de Janeiro, con vibrante vida nocturna y cultura brasileña auténtica.",
                imagenes: [
                    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop"
                ]
            },
            
            {
                tipo: "templo",
                titulo: "Angkor Wat - Camboya",
                descripcion: "El complejo de templos más grande del mundo, patrimonio de la humanidad con arquitectura khmer impresionante.",
                imagenes: [
                    "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1562602833-0ad28b4a0d29?w=400&h=250&fit=crop"
                ]
            },
            {
                tipo: "templo",
                titulo: "Kiyomizu-dera - Japón",
                descripcion: "Templo budista de madera en Kioto, famoso por sus vistas panorámicas y su arquitectura tradicional japonesa.",
                imagenes: [
                    "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=250&fit=crop"
                ]
            },
            
            {
                tipo: "pais",
                titulo: "Noruega - Fiordos y Aurora Boreal",
                descripcion: "Paisajes espectaculares con fiordos majestuosos y la oportunidad de ver la aurora boreal en invierno.",
                imagenes: [
                    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"
                ]
            },
            {
                tipo: "pais",
                titulo: "Nueva Zelanda - Aventura Natural",
                descripcion: "Tierra de contrastes con montañas, lagos y una naturaleza virgen perfecta para aventureros.",
                imagenes: [
                    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop",
                    "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=250&fit=crop"
                ]
            }
        ];

        
        let currentFilter = 'todos';

        
        function showPage(pageId) {
            
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));

            
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.getElementById('hamburger');
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');

            
            window.scrollTo({ top: 0, behavior: 'smooth' });

            
            if (pageId === 'inicio') {
                loadRecommendations();
            }
        }

        
        function toggleMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.getElementById('hamburger');
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        
        function loadRecommendations() {
            const grid = document.getElementById('recommendationsGrid');
            const filteredData = currentFilter === 'todos' 
                ? recommendationsData 
                : recommendationsData.filter(item => item.tipo === currentFilter);

            grid.innerHTML = '';

            filteredData.forEach((item, index) => {
                const card = createRecommendationCard(item, index);
                grid.appendChild(card);
            });
        }

        
        function createRecommendationCard(item, index) {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.style.animationDelay = `${index * 0.1}s`;

            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${item.imagenes[0]}" alt="${item.titulo}" class="card-image" loading="lazy">
                    <img src="${item.imagenes[1]}" alt="${item.titulo} - Vista alternativa" class="card-image-secondary" loading="lazy">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${item.titulo}</h3>
                    <p class="card-description">${item.descripcion}</p>
                    <button class="card-button" onclick="showDestinationDetails('${item.titulo}')" tabindex="0">
                        Ver más detalles
                    </button>
                </div>
            `;

            return card;
        }

    
        function filterRecommendations(tipo) {
            currentFilter = tipo;
            
            
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

        
            loadRecommendations();
        }

        
        function showDestinationDetails(titulo) {
            alert(`Próximamente: Página de detalles para ${titulo}`);
        }

        
        async function handleFormSubmit(event) {
            event.preventDefault();
            
            const form = event.target;
            const submitBtn = document.getElementById('submitBtn');
            const spinner = document.getElementById('spinner');
            const btnText = document.getElementById('btnText');
            const messageDiv = document.getElementById('formMessage');

            
            const firstName = document.getElementById('firstName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!firstName || !email || !message) {
                showMessage('Por favor, completa todos los campos obligatorios.', 'error');
                return;
            }

            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Por favor, ingresa un email válido.', 'error');
                return;
            }

            
            submitBtn.disabled = true;
            spinner.style.display = 'inline-block';
            btnText.textContent = 'Enviando...';

            try {
                // Simular envío 
                await simulateFormSubmission();
                
                // Mostrar mensaje de éxito
                showMessage('¡Gracias por contactarnos! Te responderemos pronto.', 'success');
                
                // Limpiar formulario
                form.reset();
                
            } catch (error) {
                showMessage('Hubo un error al enviar el mensaje. Inténtalo de nuevo.', 'error');
            } finally {
                // Restaurar botón
                submitBtn.disabled = false;
                spinner.style.display = 'none';
                btnText.textContent = 'Enviar Mensaje';
            }
        }

        
        function simulateFormSubmission() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        }

     
        function showMessage(text, type) {
            const messageDiv = document.getElementById('formMessage');
            messageDiv.textContent = text;
            messageDiv.className = `message ${type}`;
            messageDiv.classList.add('show');

         
            setTimeout(() => {
                messageDiv.classList.remove('show');
            }, 5000);
        }

      
        function handleKeyPress(event, callback) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                callback();
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            
            loadRecommendations();

            
            document.getElementById('hamburger').addEventListener('keydown', function(e) {
                handleKeyPress(e, toggleMobileMenu);
            });

            
            document.addEventListener('click', function(e) {
                const navLinks = document.getElementById('navLinks');
                const hamburger = document.getElementById('hamburger');
                
                if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });

            
            const emailInput = document.getElementById('email');
            emailInput.addEventListener('blur', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#e0e0e0';
                }
            });

    
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 100) {
                    header.style.backgroundColor = 'rgba(76, 175, 80, 0.95)';
                } else {
                    header.style.backgroundColor = '';
                }
            });
        });

        
        window.addEventListener('resize', function() {
            const navLinks = document.getElementById('navLinks');
            const hamburger = document.getElementById('hamburger');
            
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        
        function preloadImages() {
            recommendationsData.forEach(item => {
                item.imagenes.forEach(src => {
                    const img = new Image();
                    img.src = src;
                });
            });
        }


        document.addEventListener('DOMContentLoaded', preloadImages);
    