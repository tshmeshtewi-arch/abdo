document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Sticky Header Effect on Scroll
       ========================================================================== */
    const siteHeader = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. Mobile Navigation Drawer Controls
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileOverlay = document.getElementById('mobileOverlay');

    function openMobileMenu() {
        mobileDrawer.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileDrawer.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

    /* ==========================================================================
       3. SPA Page Switching Logic (Single Page Application)
       ========================================================================== */
    const navButtons = document.querySelectorAll('[data-page]');
    const pageSections = document.querySelectorAll('.page-section');
    const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
    const drawerLinks = document.querySelectorAll('.drawer-body .drawer-link');

    function switchPage(targetPageId) {
        // Hide all pages
        pageSections.forEach(section => {
            section.classList.remove('active');
        });

        // Target section show
        const targetSection = document.getElementById(`${targetPageId}-page`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update Desktop Active Link State
        desktopNavLinks.forEach(link => {
            if (link.getAttribute('data-page') === targetPageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update Mobile Drawer Active Link State
        drawerLinks.forEach(link => {
            if (link.getAttribute('data-page') === targetPageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Close mobile drawer if open
        closeMobileMenu();

        // Scroll to top smooth
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Trigger animations for new page
        setTimeout(handleScrollReveal, 100);

        // Run animated stats counters if on Home Page
        if (targetPageId === 'home') {
            runCounters();
        }
    }

    // Attach click events to all page switching triggers
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = button.getAttribute('data-page');
            if (targetPage) {
                switchPage(targetPage);
            }
        });
    });

    /* ==========================================================================
       4. Stats Counter Animation
       ========================================================================== */
    let countersAnimated = false;

    function runCounters() {
        const counters = document.querySelectorAll('.counter');
        if (!counters.length) return;

        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const duration = 1500; // Total duration in ms
            const step = Math.ceil(target / (duration / 20));

            const updateCounter = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.min(count + step, target);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
        countersAnimated = true;
    }

    /* ==========================================================================
       5. Scroll Reveal Animation Logic
       ========================================================================== */
    function handleScrollReveal() {
        const reveals = document.querySelectorAll('.page-section.active .reveal');
        const windowHeight = window.innerHeight;

        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScrollReveal);

    /* Initialize on first load */
    runCounters();
    handleScrollReveal();
});
