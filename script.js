document.addEventListener("DOMContentLoaded", function () {

    /* ---------- LOADER ---------- */
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", function () {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.transition = "1s ease";
                setTimeout(() => {
                    loader.style.display = "none";
                }, 1000);
            }, 2000);
        });
    }

    /* ---------- HERO SLIDER (only on homepage) ---------- */
    const hero = document.querySelector(".hero");
    if (hero && hero.classList.contains('hero')) {
        const images = [
            "images/hero1.png", "images/hero2.png", "images/hero3.png",
            "images/hero4.png", "images/hero5.png", "images/hero6.png",
            "images/hero7.png", "images/hero8.png", "images/hero9.png"
        ];
        let current = 0;
        hero.style.backgroundImage = `url('${images[0]}')`;
        setInterval(() => {
            current = (current + 1) % images.length;
            hero.style.backgroundImage = `url('${images[current]}')`;
        }, 5000);
    }

    /* ---------- HAMBURGER MENU ---------- */
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
        // Close menu when a link is clicked
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    /* ---------- NUMBER COUNTERS (Intersection Observer) ---------- */
    const counters = document.querySelectorAll('.counter-number');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 80;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            el.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.innerText = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.3 });
        counters.forEach(counter => observer.observe(counter));
    }

    /* ---------- FALLBACK: if observer fails, start counters after 500ms ---------- */
    setTimeout(() => {
        const countersAgain = document.querySelectorAll('.counter-number');
        countersAgain.forEach(counter => {
            if (counter.innerText === "0" || counter.innerText === "") {
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 80;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            }
        });
    }, 500);
});