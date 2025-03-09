// Toggle mobile navigation
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('nav-active');

    // Close menu when clicking outside
    if (navLinks.classList.contains('nav-active')) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Close menu when clicking outside of it
function closeMenuOnClickOutside(e) {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');

    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinks.classList.remove('nav-active');
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

// Toggle theme function
function toggleTheme() {
    if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        document.getElementById('theme-toggle').textContent = "🌙";
    } else {
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        document.getElementById('theme-toggle').textContent = "☀️";
    }
}
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// On load: set theme based on saved preference and initialize smooth section scrolling with fade effects.
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-toggle').textContent = "☀️";
    } else {
        document.body.classList.remove('light-theme');
        document.getElementById('theme-toggle').textContent = "🌙";
    }

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sectionDots = document.getElementById('section-dots');
    const navPrev = document.getElementById('nav-prev');
    const navNext = document.getElementById('nav-next');
    let currentSection = 0;
    let isScrolling = false;

    // Create section indicator dots
    sections.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('indicator-dot');
        if (index === currentSection) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToSection(index));
        sectionDots.appendChild(dot);
    });

    function updateNavArrows() {
        // Update prev arrow state
        if (currentSection <= 0) {
            navPrev.classList.add('disabled');
        } else {
            navPrev.classList.remove('disabled');
        }

        // Update next arrow state
        if (currentSection >= sections.length - 1) {
            navNext.classList.add('disabled');
        } else {
            navNext.classList.remove('disabled');
        }

        // Update indicator dots
        const dots = document.querySelectorAll('.indicator-dot');
        dots.forEach((dot, index) => {
            if (index === currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === sections[currentSection].id) {
                link.classList.add('active');
            }
        });
    }

    // Check if current section's content is fully scrolled
    function isScrolledToBottom(container) {
        if (!container) return true;
        return Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) < 2;
    }

    function isScrolledToTop(container) {
        if (!container) return true;
        return container.scrollTop <= 0;
    }

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length || isScrolling) return;
        isScrolling = true;
        sections[currentSection].classList.remove('visible');
        setTimeout(() => {
            sections[index].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                sections[index].classList.add('visible');
                currentSection = index;
                updateNavArrows();

                // Reset scrollable areas when changing sections
                const scrollable = sections[index].querySelector('.card-container');
                if (scrollable) {
                    scrollable.scrollTop = 0;
                }

                setTimeout(() => { isScrolling = false; }, 500);
            }, 300);
        }, 500);
    }

    // Add event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetIndex = Array.from(sections).findIndex(section => section.id === targetId);
            if (targetIndex !== -1) {
                scrollToSection(targetIndex);
            }

            // Close mobile menu if open
            document.getElementById('navLinks').classList.remove('nav-active');
        });
    });

    navPrev.addEventListener('click', () => {
        if (currentSection > 0 && !isScrolling) {
            scrollToSection(currentSection - 1);
        }
    });

    navNext.addEventListener('click', () => {
        if (currentSection < sections.length - 1 && !isScrolling) {
            scrollToSection(currentSection + 1);
        }
    });

    window.addEventListener('wheel', function (e) {
        if (isScrolling) return;

        const scrollable = sections[currentSection].querySelector('.card-container');

        if (scrollable) {
            // If the mouse is over the scrollable container and it has scrollable content
            const rect = scrollable.getBoundingClientRect();
            const isMouseOverContainer =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;

            // If scrolling down and not at bottom of scrollable content, let the container scroll
            if (e.deltaY > 0 && !isScrolledToBottom(scrollable) && isMouseOverContainer) {
                return;
            }

            // If scrolling up and not at top of scrollable content, let the container scroll
            if (e.deltaY < 0 && !isScrolledToTop(scrollable) && isMouseOverContainer) {
                return;
            }
        }

        e.preventDefault();

        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    }, { passive: false });

    // Initialize arrows state
    updateNavArrows();

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('#projects .card');
    const cardContainer = document.querySelector('#projects .card-container');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');

            // Don't do anything if the button is already active
            if (this.classList.contains('active')) return;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Allow scrollable container to reset scroll position
            if (cardContainer) {
                cardContainer.scrollTop = 0;
                // Add a class to help with animation
                cardContainer.classList.add('filtering');
            }

            // First fade out all cards
            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(15px)';
            });

            // After fading out, hide/show cards based on filter and reposition
            setTimeout(() => {
                projectCards.forEach((card, index) => {
                    const isVisible = filterValue === 'all' || card.getAttribute('data-type') === filterValue;

                    if (isVisible) {
                        // For visible cards, first ensure they're in the DOM flow
                        card.classList.remove('hidden');
                        card.style.display = '';
                    } else {
                        // For hidden cards, remove them from the DOM flow
                        card.classList.add('hidden');
                        card.style.display = 'none';
                    }
                });

                // Force a reflow to ensure the grid layout updates
                cardContainer.offsetHeight;

                // Now fade in visible cards with staggered timing
                const visibleCards = Array.from(projectCards).filter(card =>
                    !card.classList.contains('hidden')
                );

                visibleCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50 * index);
                });

                // Remove the filtering class after animation completes
                setTimeout(() => {
                    cardContainer.classList.remove('filtering');
                }, 50 * visibleCards.length + 300);

            }, 300);
        });
    });

    // Apply initial fade-in to all cards only once on page load
    setTimeout(() => {
        projectCards.forEach((card, index) => {
            // Set initial state
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';

            // Stagger the appearance
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }, 500);

    // Handle scrollable container events
    document.querySelectorAll('.card-container').forEach(container => {
        container.addEventListener('scroll', function (e) {
            // Prevent propagation when scrolling inside containers
            e.stopPropagation();
        });
    });

    // Additional mobile optimization
    if (window.innerWidth <= 768) {
        // Adjust initial section visibility on mobile
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index === 0) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });

        // Add touch swipe navigation for mobile
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', e => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', e => {
            if (isScrolling) return;

            touchEndY = e.changedTouches[0].screenY;
            const diffY = touchStartY - touchEndY;

            // Check if current section has scrollable content
            const scrollable = sections[currentSection].querySelector('.card-container');
            if (scrollable) {
                const rect = scrollable.getBoundingClientRect();
                const isInScrollableArea =
                    e.changedTouches[0].clientX >= rect.left &&
                    e.changedTouches[0].clientX <= rect.right &&
                    e.changedTouches[0].clientY >= rect.top &&
                    e.changedTouches[0].clientY <= rect.bottom;

                // If in scrollable area, don't navigate sections
                if (isInScrollableArea) {
                    // Only navigate if at top/bottom of scrollable area
                    if (diffY > 50 && isScrolledToBottom(scrollable)) {
                        scrollToSection(currentSection + 1);
                    } else if (diffY < -50 && isScrolledToTop(scrollable)) {
                        scrollToSection(currentSection - 1);
                    }
                    return;
                }
            }

            // Handle section navigation
            if (diffY > 50) {
                // Swipe up - go to next section
                if (currentSection < sections.length - 1) {
                    scrollToSection(currentSection + 1);
                }
            } else if (diffY < -50) {
                // Swipe down - go to previous section
                if (currentSection > 0) {
                    scrollToSection(currentSection - 1);
                }
            }
        }, { passive: false });
    }
});