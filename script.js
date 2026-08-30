/* =========================================
   SYNAPSE '26
   LOADING SCREEN
   SHOW ONLY ON FIRST VISIT
   OF CURRENT BROWSER SESSION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");

    const percentage = document.getElementById("percentage");

    const progressBar = document.getElementById("progressBar");

    const statusText = document.getElementById("statusText");


    /* -----------------------------------------
       SAFETY CHECK
    ----------------------------------------- */

    if (!loader) {
        return;
    }


    /* -----------------------------------------
       CHECK IF INTRO ALREADY PLAYED
       DURING THIS SESSION
    ----------------------------------------- */

    const introPlayed =
        sessionStorage.getItem("synapseIntroPlayed");


    if (introPlayed === "true") {

        /* Skip intro completely */

        loader.remove();

        document.body.style.overflow = "auto";

        return;

    }


    /* -----------------------------------------
       MARK INTRO AS PLAYED
       IMMEDIATELY
    ----------------------------------------- */

    sessionStorage.setItem(
        "synapseIntroPlayed",
        "true"
    );


    /* -----------------------------------------
       START INTRO
    ----------------------------------------- */

    let progress = 0;

    const duration = 3000;

    const intervalTime = 30;

    const increment =
        100 / (duration / intervalTime);


    const loadingInterval =
        setInterval(() => {

            progress += increment;


            if (progress >= 100) {

                progress = 100;

                clearInterval(
                    loadingInterval
                );


                percentage.textContent =
                    "100";

                progressBar.style.width =
                    "100%";

                statusText.textContent =
                    "INITIALISED";


                /* --------------------------------
                   FADE OUT
                -------------------------------- */

                setTimeout(() => {

                    loader.style.opacity =
                        "0";

                    loader.style.transition =
                        "opacity 0.8s ease";


                    setTimeout(() => {

                        loader.remove();

                        document.body.style.overflow =
                            "auto";

                    }, 800);


                }, 200);


                return;

            }


            percentage.textContent =
                Math.floor(progress);


            progressBar.style.width =
                progress + "%";


        }, intervalTime);

});
/* =========================================
   SYNAPSE '26
   SPONSOR CAROUSEL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sponsorTrack =
        document.getElementById("sponsorTrack");

    const sponsorSlides =
        document.querySelectorAll(".sponsor-slide");

    const sponsorPrev =
        document.getElementById("sponsorPrev");

    const sponsorNext =
        document.getElementById("sponsorNext");

    const sponsorDots =
        document.querySelectorAll(".sponsor-dot");


    /* -----------------------------------------
       SAFETY CHECK
    ----------------------------------------- */

    if (
        !sponsorTrack ||
        !sponsorSlides.length
    ) {
        return;
    }


    /* -----------------------------------------
       VARIABLES
    ----------------------------------------- */

    let currentSponsor = 0;

    const totalSponsors =
        sponsorSlides.length;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;


    /* -----------------------------------------
       UPDATE SLIDER
    ----------------------------------------- */

    function updateSponsorSlider() {

        sponsorTrack.style.transform =
            `translate3d(-${currentSponsor * 100}%, 0, 0)`;


        sponsorDots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSponsor
            );

        });

    }


    /* -----------------------------------------
       NEXT
    ----------------------------------------- */

    function nextSponsor() {

        currentSponsor++;

        if (
            currentSponsor >= totalSponsors
        ) {

            currentSponsor = 0;

        }

        updateSponsorSlider();

    }


    /* -----------------------------------------
       PREVIOUS
    ----------------------------------------- */

    function previousSponsor() {

        currentSponsor--;

        if (
            currentSponsor < 0
        ) {

            currentSponsor =
                totalSponsors - 1;

        }

        updateSponsorSlider();

    }


    /* -----------------------------------------
       BUTTONS
    ----------------------------------------- */

    if (sponsorNext) {

        sponsorNext.addEventListener(
            "click",
            nextSponsor
        );

    }


    if (sponsorPrev) {

        sponsorPrev.addEventListener(
            "click",
            previousSponsor
        );

    }


    /* -----------------------------------------
       DOTS
    ----------------------------------------- */

    sponsorDots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    currentSponsor = index;

                    updateSponsorSlider();

                }
            );

        }
    );


    /* =========================================
       MOBILE / TOUCH SWIPE
    ========================================= */


    sponsorTrack.addEventListener(
        "pointerdown",
        (event) => {

            startX = event.clientX;

            currentX = startX;

            isDragging = true;

            sponsorTrack.setPointerCapture(
                event.pointerId
            );

        }
    );


    sponsorTrack.addEventListener(
        "pointermove",
        (event) => {

            if (!isDragging) {
                return;
            }

            currentX = event.clientX;

        }
    );


    sponsorTrack.addEventListener(
        "pointerup",
        (event) => {

            if (!isDragging) {
                return;
            }

            isDragging = false;

            currentX = event.clientX;

            const distance =
                startX - currentX;


            /* --------------------------------
               SWIPE LEFT
               → NEXT
            -------------------------------- */

            if (distance > 50) {

                nextSponsor();

            }


            /* --------------------------------
               SWIPE RIGHT
               → PREVIOUS
            -------------------------------- */

            else if (distance < -50) {

                previousSponsor();

            }


            /* --------------------------------
               RELEASE POINTER
            -------------------------------- */

            if (
                sponsorTrack.hasPointerCapture(
                    event.pointerId
                )
            ) {

                sponsorTrack.releasePointerCapture(
                    event.pointerId
                );

            }

        }
    );


    /* -----------------------------------------
       POINTER CANCEL
    ----------------------------------------- */

    sponsorTrack.addEventListener(
        "pointercancel",
        () => {

            isDragging = false;

        }
    );


    /* -----------------------------------------
       INITIAL STATE
    ----------------------------------------- */

    updateSponsorSlider();

});
/* =========================================
   MOBILE NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (!menuButton || !navLinks) {
        return;
    }

    function openMenu() {

        navLinks.classList.add("active");
        menuButton.classList.add("active");

        menuButton.setAttribute(
            "aria-label",
            "Close menu"
        );

        document.body.classList.add("menu-open");
    }

    function closeMenu() {

        navLinks.classList.remove("active");
        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-label",
            "Open menu"
        );

        document.body.classList.remove("menu-open");
    }

    menuButton.addEventListener("click", () => {

        if (navLinks.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    /* CLOSE MENU AFTER CLICKING A LINK */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* CLOSE WITH ESCAPE */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navLinks.classList.contains("active")
        ) {

            closeMenu();

        }

    });

});
/* =========================================
   SYNAPSE '26
   REPLAY GALLERY
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       IMAGE DATA
    ====================================== */

   const memories = [

    /* =========================================
       NEW SYNAPSE '26 IMAGES — 01 to 18
    ========================================= */

    "https://i.ibb.co/wNBVRLbN/Whats-App-Image-2026-08-29-at-19-07-34-1.jpg",
	"https://i.ibb.co/svXJs3pr/Whats-App-Image-2026-08-29-at-19-07-19-1.jpg",
    "https://i.ibb.co/vxyTcvmn/Whats-App-Image-2026-08-29-at-19-07-29.jpg",
    "https://i.ibb.co/mV2mpKh8/Whats-App-Image-2026-08-29-at-19-07-39.jpg",
    "https://i.ibb.co/Y7g3W12w/Whats-App-Image-2026-08-29-at-19-07-40.jpg",
    "https://i.ibb.co/XZ2kpt7k/Whats-App-Image-2026-08-29-at-19-07-35-1.jpg",
    "https://i.ibb.co/7tHJMRf0/Whats-App-Image-2026-08-29-at-19-07-36.jpg",
    "https://i.ibb.co/tMKH5jkN/Whats-App-Image-2026-08-29-at-19-07-35.jpg",
    "https://i.ibb.co/GGGX1qv/Whats-App-Image-2026-08-29-at-19-07-26-2.jpg",
    "https://i.ibb.co/wNJc3h4r/Whats-App-Image-2026-08-29-at-19-07-26-1.jpg",
    "https://i.ibb.co/Cp2xwrs5/Whats-App-Image-2026-08-29-at-19-07-26.jpg",
    "https://i.ibb.co/0jYnkyjP/Whats-App-Image-2026-08-29-at-19-07-25-1.jpg",
    "https://i.ibb.co/gZ5MqnJp/Whats-App-Image-2026-08-29-at-19-07-25.jpg",
    "https://i.ibb.co/Zbv0F2f/Whats-App-Image-2026-08-29-at-19-07-24-2.jpg",
    "https://i.ibb.co/99VKF4rk/Whats-App-Image-2026-08-29-at-19-07-24.jpg",
    "https://i.ibb.co/p6vJn4Mt/Whats-App-Image-2026-08-29-at-19-07-23-1.jpg",
    "https://i.ibb.co/QvfZPH7x/Whats-App-Image-2026-08-29-at-19-07-23.jpg",
    "https://i.ibb.co/XZNM9JkR/Whats-App-Image-2026-08-29-at-19-07-22-2.jpg",
    "https://i.ibb.co/qLS0HfJW/Whats-App-Image-2026-08-29-at-19-07-22-1.jpg",
    "https://i.ibb.co/zhVvR0yq/Whats-App-Image-2026-08-29-at-19-07-22.jpg",
    "https://i.ibb.co/QFytT9Nq/Whats-App-Image-2026-08-29-at-19-07-21-1.jpg",
    "https://i.ibb.co/r28HzTDP/Whats-App-Image-2026-08-29-at-19-07-21.jpg",
    "https://i.ibb.co/R4jf2xjH/Whats-App-Image-2026-08-29-at-19-07-20.jpg",
    "https://i.ibb.co/rfbgcx7F/Whats-App-Image-2025-08-22-at-19-33-45.jpg",
    "https://i.ibb.co/1t1BNfrw/Whats-App-Image-2025-08-22-at-19-33-44.jpg",
    "https://i.ibb.co/TDCDrG62/Whats-App-Image-2025-08-22-at-19-21-30-1.jpg",
    "https://i.ibb.co/tM9Y3ZXP/Whats-App-Image-2025-08-22-at-19-21-30.jpg",
    "https://i.ibb.co/hJdszCD9/Whats-App-Image-2025-08-22-at-19-21-28.jpg",
    "https://i.ibb.co/ccrtsxNm/Whats-App-Image-2025-08-13-at-14-44-17.jpg",
    "https://i.ibb.co/TqxhRG20/Whats-App-Image-2025-08-13-at-14-44-10.jpg",
    "https://i.ibb.co/QFCzkxc4/Whats-App-Image-2025-08-22-at-22-29-39-1.jpg",
    "https://i.ibb.co/fz3B4bJZ/Whats-App-Image-2025-08-23-at-21-27-47.jpg",
    "https://i.ibb.co/rRvm9Z1m/Whats-App-Image-2025-09-06-at-20-45-03.jpg",
    "https://i.ibb.co/rGvFfn3m/cropped-Whats-App-Image-2025-08-23-at-00-39-41.jpg",
    "https://i.ibb.co/ym2V2WsR/Whats-App-Image-2025-08-22-at-21-43-07.jpg",
    "https://i.ibb.co/rKbGWk50/cropped-Whats-App-Image-2025-08-23-at-10-19-23.jpg",
    "https://i.ibb.co/67jpxPqp/Whats-App-Image-2025-08-13-at-14-44-17-1.jpg",
    "https://i.ibb.co/XrjLZy9y/Whats-App-Image-2025-08-13-at-14-44-16.jpg",
    "https://i.ibb.co/zVbP9pN4/Whats-App-Image-2025-08-13-at-14-44-11.jpg",
    "https://i.ibb.co/HDsvwMQv/Whats-App-Image-2025-08-13-at-14-44-06.jpg",
    "https://i.ibb.co/C58hGxcT/Whats-App-Image-2025-08-13-at-14-44-05.jpg",
    "https://i.ibb.co/35SZd55j/Whats-App-Image-2025-08-13-at-14-44-21.jpg",
    "https://i.ibb.co/27nj9hp5/Whats-App-Image-2025-08-13-at-14-44-19-1.jpg",
    "https://i.ibb.co/vxF0VsVY/Whats-App-Image-2025-08-13-at-14-44-19.jpg",
    "https://i.ibb.co/BKPwQyB1/Whats-App-Image-2025-08-13-at-14-44-18-2.jpg",
    "https://i.ibb.co/VW5QWv9V/cropped-Whats-App-Image-2025-08-22-at-13-26-19-2.jpg",
    "https://i.ibb.co/ZzSFJtd5/Screenshot-2025-08-28-202853.png",
    "https://i.ibb.co/3KCfgBH/Whats-App-Image-2025-08-24-at-10-13-47.jpg",
    "https://i.ibb.co/wNVWxgMT/cropped-Whats-App-Image-2025-08-22-at-18-59-58.jpg",
    "https://i.ibb.co/0yR0s4hq/Whats-App-Image-2025-08-22-at-19-21-29-1.jpg",
    "https://i.ibb.co/XZ0pC7ZW/Whats-App-Image-2025-08-22-at-19-21-29.jpg",
    "https://i.ibb.co/mCn0N363/cropped-Whats-App-Image-2025-08-22-at-22-07-07.jpg",
    "https://i.ibb.co/S7QhmWHP/cropped-Whats-App-Image-2025-08-22-at-21-27-00.jpg",
    "https://i.postimg.cc/9QS9Xztp/Whats-App-Image-2025-08-22-at-21-28-59.jpg"

];


    /* =====================================
       ELEMENTS
    ====================================== */

    const grid =
        document.getElementById("memoryGrid");

    const index =
        document.getElementById("memoryIndex");

    const currentMemory =
        document.getElementById("currentMemory");

    const totalMemories =
        document.getElementById("totalMemories");
    const lightbox =
        document.getElementById("memoryLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCounter =
        document.getElementById("lightboxCounter");

    const closeButton =
        document.getElementById("lightboxClose");

    const previousButton =
        document.getElementById("lightboxPrev");

    const nextButton =
        document.getElementById("lightboxNext");


    let activeMemory = 0;
	
	if (totalMemories) {
    totalMemories.textContent = memories.length;
}
	
	
	


    /* =====================================
       CREATE GALLERY
    ====================================== */

    memories.forEach((image, i) => {

        const number = i + 1;

        const card =
            document.createElement("button");

        card.className = "memory-card";

        /*
            Create an intentional asymmetric
            rhythm throughout the gallery.
        */

        /* =====================================
   REPEATING ASYMMETRIC LAYOUT
   Works for ANY number of images
===================================== */

const position = (number - 1) % 12;

if (
    position === 0 ||
    position === 7
) {

    card.classList.add("large");

}

if (
    position === 4 ||
    position === 10
) {

    card.classList.add("wide");

}


        card.dataset.index = number;

        card.innerHTML = `

            <img
                src="${image}"
                alt="SYNAPSE Former Year Highlight ${number}"
                loading="lazy"
            >

            <span class="memory-number">
                ${String(number).padStart(2, "0")}
            </span>

            <span class="memory-view">
                VIEW MEMORY ↗
            </span>

        `;


        card.addEventListener(
            "click",
            () => {

                openLightbox(number);

            }
        );


        grid.appendChild(card);

    });


    /* =====================================
       CREATE MEMORY INDEX
    ====================================== */

    memories.forEach((_, i) => {

        const number = i + 1;

        const button =
            document.createElement("button");

        button.textContent =
            String(number).padStart(2, "0");

        button.dataset.index = number;


        button.addEventListener(
            "click",
            () => {

                const card =
                    document.querySelector(
                        `.memory-card[data-index="${number}"]`
                    );

                if (!card) return;

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        );


        index.appendChild(button);

    });


    /* =====================================
       UPDATE COUNTER
    ====================================== */

    function updateCounter(number) {

        currentMemory.textContent =
            String(number).padStart(2, "0");


        document
            .querySelectorAll(
                ".index-track button"
            )
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    Number(button.dataset.index) === number
                );

            });

    }


    /* =====================================
       OBSERVE VISIBLE MEMORY
    ====================================== */

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        updateCounter(
                            Number(
                                entry.target.dataset.index
                            )
                        );

                    }

                });

            },
            {
                threshold: 0.55
            }
        );


    /* =====================================
       LIGHTBOX
    ====================================== */

    function openLightbox(number) {

        activeMemory = number;

        lightboxImage.src =
            memories[number - 1];

        lightboxImage.alt =
            `SYNAPSE Former Year Highlight ${number}`;

        lightboxCounter.textContent =
            `${String(number).padStart(2, "0")} / ${memories.length}`;

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    /* =====================================
       NEXT
    ====================================== */

    function nextMemory() {

        activeMemory++;

        if (
            activeMemory >
            memories.length
        ) {

            activeMemory = 1;

        }

        openLightbox(activeMemory);

    }


    /* =====================================
       PREVIOUS
    ====================================== */

    function previousMemory() {

        activeMemory--;

        if (activeMemory < 1) {

            activeMemory =
                memories.length;

        }

        openLightbox(activeMemory);

    }


    /* =====================================
       LIGHTBOX EVENTS
    ====================================== */

    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    nextButton.addEventListener(
        "click",
        nextMemory
    );


    previousButton.addEventListener(
        "click",
        previousMemory
    );


    /* =====================================
       CLICK OUTSIDE
    ====================================== */

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================
       KEYBOARD
    ====================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowRight"
            ) {

                nextMemory();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousMemory();

            }

        }
    );


    /* =====================================
       TOUCH SWIPE
    ====================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    lightbox.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    lightbox.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0]
                    .screenX;


            const difference =
                touchStartX - touchEndX;


            if (
                Math.abs(difference) < 50
            ) {

                return;

            }


            if (difference > 0) {

                nextMemory();

            } else {

                previousMemory();

            }

        },
        {
            passive: true
        }
    );


    /* =====================================
       START OBSERVER
    ====================================== */

    document
        .querySelectorAll(".memory-card")
        .forEach(card => {

            observer.observe(card);

        });


    /* =====================================
       INITIAL STATE
    ====================================== */

    updateCounter(1);

});