// Carica automaticamente Footer in tutte pe pagine
document.addEventListener("DOMContentLoaded", function () {
    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-container").innerHTML = data);
});


// Ripristina lo stato del menu quando si passa da mobile a desktop 
window.addEventListener("resize", function () {
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.querySelector(".menu");

    if (window.innerWidth >= 768) {
        menu.style.maxHeight = null;        // Mostra il menu su desktop
        menuBtn.checked = false;        // Resetta l'icona dell'hamburger
    }
});


// Funzione per aprire la lightbox
document.addEventListener("DOMContentLoaded", function () {
    // Gestione Lightbox - solo se esiste nel DOM
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');

        document.querySelectorAll(".gallery-item img").forEach((img) => {
            img.addEventListener("click", function () {
                const fullSrc = img.getAttribute("data-full") || img.src;
                openLightbox(fullSrc, this.alt);
            })
        });

        function openLightbox(src, caption) {
            const lightbox = document.getElementById("lightbox");
            const lightboxImage = document.getElementById("lightbox-image");
            const lightboxCaption = document.getElementById("lightbox-caption")

            // Imposta la didascalia
            lightboxCaption.textContent = caption;

            // Nasconde temporaneamente la lightbox
            lightbox.style.display = "none";

            // Imposta immagine
            lightboxImage.src = src;

            // Mostra la lightbox solo dopo che l'immagine è caricata
            lightboxImage.onload = function () {
                lightbox.style.display = "flex";
            };
        };


        // Chiudere lightbox
        window.closeLightbox = function () {
            lightbox.style.display = "none";
        };

        // Chiudere la lightbox cliccando fuori dall'immagine
        lightbox.addEventListener('click', function (event) {
            if (event.target === this) {
                closeLightbox();
            }
        });
    };
    // Chiudere la lightbox con ESC
    document.addEventListener("keydown", function (e) {
        if (e.key == "Escape") {
            closeLightbox();
        };
    });
});


// Filtraggio per categorie
window.filtraCategoria = function (categoria) {
    let allItems = document.querySelectorAll('.gallery-item');
    let title = document.getElementById("gallery-title");
    let desc = document.getElementById("gallery-description");

    // Nasconde tutte le immagini
    allItems.forEach(item => item.style.display = "none");

    // Gestione testi e immagini in base alla categoria
    if (categoria === 'tutti') {
        allItems.forEach(item => item.style.display = "block");
        title.innerHTML = "<strong>Foto attività</strong>";
        desc.textContent = "Benvenuti nella mia galleria! Qui trovate una selezione delle mie attività.";
    } else if (categoria === 'merceria') {
        document.querySelectorAll(".merceria").forEach(item => item.style.display = "block");
        title.innerHTML = "<strong>Foto Merceria</strong>";
        desc.textContent = "La merceria offre una vasta gamma di articoli per il cucito, bottoni, nastri e molto altro.";
    } else if (categoria === 'sartoria') {
        document.querySelectorAll(".sartoria").forEach(item => item.style.display = "block");
        title.innerHTML = "<strong>Foto Sartoria</strong>";
        desc.textContent = "La sartoria è il cuore del mio lavoro: confeziono abiti su misura con cura artigianale."
    }
}


// Codice footer e cookie
document.addEventListener("DOMContentLoaded", function () {
    // Carica il footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-container").innerHTML = data);

    // Carica il banner cookie
    fetch("cookie-banner.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("cookie-container").innerHTML = data;
            waitForElement("#accept-cookies", setupCookieBanner);   // Aspetta l'elemento
        });

    // Funzione per aspettare che un elemento appaia nel DOM
    function waitForElement(selector, callback) {
        const el = document.querySelector(selector);
        if (el) {
            callback();
        } else {
            const observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    callback();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }
     
    function setupCookieBanner() {
        const cookieBanner = document.getElementById("cookie-banner");
        const acceptCookies = document.getElementById("accept-cookies");
        const declineCookies = document.getElementById("decline-cookies");

        // Verifica che gli elementi esistano prima di aggiungere gli event listener
        if (!cookieBanner || !acceptCookies || !declineCookies) {
            console.warn("Banner cookie non completamente caricato.");
            return;
        }

        // Controlla se il consenso è già stato dato
        if (!localStorage.getItem("acceptCookies")) {
            cookieBanner.classList.add("visible");
        };

        // Se l'utente accetta, salva il consenso e nasconde il banner
        acceptCookies.addEventListener("click", function () {
            localStorage.setItem("acceptCookies", "true");
            cookieBanner.classList.remove("visible");
        });

        // Se l'utente rifiuta, chiude il banner senza salvare
        declineCookies.addEventListener("click", function () {
            localStorage.setItem("acceptCookies", "false");
            cookieBanner.classList.remove("visible");
        });
    };
});


// Modal per ingrandire immagine Home
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector("#imageModal .close");

    document.querySelectorAll(".clickable-img").forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;
        });
    });

    // Chiude il modal cliccando sulla X
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
            modalImg.src = "";
        });
    }

    // Chiudi cliccando fuori dall'immagine
    if (modal && modalImg) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
                modalImg.src = "";
            }
        });
    }
});