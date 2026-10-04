/* =========================================================
   ДЕНЬ ГРИФФИНДОРА
   Подарок от Когтеврана
   ========================================================= */


/* =========================================================
   АНТИСТРЕССЫ
   ========================================================= */

const toys = [
    {
        image: "images/grifflad.png",
        name: "Гриффолад",
        description:
            "Традиционный симпл-димпл в традиционном оформлении. Щелкайте и расслабляйтесь!"
    },

    {
        image: "images/shushik.png",
        name: "Сэр Шуш",
        description:
            "Сэр Шуш прозрачен как его намерения и наполнен гелиевыми шариками как и его тембр. Приятно жамкать и доступно простым смертным."
    },
    {
        image: "images/ohshush.png",
        name: "Ох, Шуш!",
        description:
            "Мелкие шарики внутри, красивый сэр Шуш снаружи, экстремальная близость к кумиру молодежи и удовольствие в каждом прикосновении. Антистресс от которого хочется замурчать."
    },

    {
        image: "images/snitch.png",
        name: "Снитч",
        description:
            "Никак не можете поймать снитч? Этот спинер не только закроет ваш гештальт, но и обладает успокаивающим действием. А ещё он никуда не улетит, пока не выкините."
    },

    {
        image: "images/fipe-egg.png",
        name: "Яйцо файпа",
        description:
            "Яркий антистресс конструктор в виде яйца файпа. Делайте его туда-сюда и спина не будет болеть."
    },

    {
        image: "images/lion-cub.png",
        name: "Лев",
        description:
            "Этот забавный шипованный почти йо-йо и успокоит, и украсит ваш день. Просто наденьте на палец и заставьте его хорошенько так попрыгать!"
    },

    {
        image: "images/meaning-of-anarchy.png",
        name: "Анархист",
        description:
            "Чтобы писать много статей и не уставать, нужны хорошо натренированные руки! В этом вам поможет мяч-эспандер - лучший друг для пятиминутного перерыва. Если нервная система даст сбой, его всегда можно швырнуть об стену и не потерять, ведь он - не обидчивый."
    },

    {
        image: "images/griflion.png",
        name: "Грифлеон",
        description:
            "Если ничто вас так не успокаивает, как золото, то этот антистресс создан специально для вас. Пока вы смотрите на грифлеоны, грифлеоны смотрят на вас. Положение дел стабильно, вы стабильны, курс грифлеона тоже стабилен."
    },

    {
        image: "images/grifomat.png",
        name: "Грифомат",
        description:
            "С этим грифоматом вы можете делать что угодно: крутить все, что крутится, нажимать все, что нажимается, щелкать все что щелкается. Выиграть вы ничего не выиграете, проиграть ничего не проиграете. Просто развлечетесь и успокоитесь."
    },

    {
        image: "images/grifopoly.png",
        name: "Грифополия",
        description:
            "Сколько раз, играя в эту игру, вы начинали втыкать? А сколько раз хотели навтыкать? У вас есть эта возможность! Тематический поп-ит - тыкате, сколько хотите, пока легче не станет!"
    },

    {
        image: "images/fire-paw.png",
        name: "Лапка файра",
        description:
            "Перед вами таба-лапа. Теперь, даже если вам не достался файр, у вас есть возможность иметь дружескую лапку файра. Её можно жмякать, экспериментировать с липкостью, растягивать и все до чего ваш стресс додумается!"
    },

    {
        image: "images/trynki-gryff-fm.png",
        name: "Gryff.fm",
        description:
            "Звуковой антистресс в виде гриффиндорского радиоприемника. Трынькайте пока не настроетесь на нужную волну и вот это вот всё. П.С. А ещё на него можно ругаться, если вам это помогает"
    },

    {
        image: "images/fire-slime.png",
        name: "Огонь",
        description:
            "Перед вами сквиш в виде стихийного символа факультета. Его можно мять, менять его форму, смотреть (ведь все любят смотреть на огонь). В общем, держите огонь в своих руках (#ничоси #воттакмогу) и ловите дзен"
    },

    {
        image: "images/plenka.png",
        name: "Полосатое спокойствие",
        description:
            "Пленка с пупырками - это антистресс, знакомый многим с детства. Но теперь, он не какой-то там прозрачный, он с тематической подложкой! Так что, даже если захочется биться головой о стену - подкладывайте пленку!"
    },

    {
        image: "images/build-water-supply.png",
        name: "Трубы",
        description:
            "Никто толком не знает, но многие слышали, про гриффиндорские горящчие трубы, душевые, туалеты и вот это все. Если вас тоже беспокоит этот вопрос - держите поп-тубы. Ими можно делать скр-скр, а можно попытаться собрать свой водопровод."
    }
];


/* =========================================================
   КАТАЛОГ АНТИСТРЕССОВ
   ========================================================= */

const toyGrid = document.querySelector("#toyGrid");

if (toyGrid) {

    toys.forEach((toy, index) => {

        const card = document.createElement("article");

        card.className = "toy-card";

        card.innerHTML = `
            <div class="toy-image">
                <img
                    src="${toy.image}"
                    alt="${toy.name}"
                    loading="lazy"
                >
            </div>

            <span>
                АНТИСТРЕСС №${String(index + 1).padStart(2, "0")}
            </span>

            <h3>${toy.name}</h3>

            <p>${toy.description}</p>
        `;

        toyGrid.appendChild(card);
    });
}




/* =========================================================
   НАВИГАЦИЯ МЕЖДУ БЛОКАМИ
   ========================================================= */

const pagePanels = Array.from(document.querySelectorAll(".page-panel"));
const pageLinks = Array.from(document.querySelectorAll("[data-slide-link]"));
const pagePrev = document.querySelector("#pagePrev");
const pageNext = document.querySelector("#pageNext");

let currentPageIndex = 0;

function pageIndexById(id) {
    return pagePanels.findIndex((panel) => panel.id === id);
}

function showPage(index, options = {}) {
    if (!pagePanels.length) return;

    const safeIndex = Math.max(0, Math.min(index, pagePanels.length - 1));
    currentPageIndex = safeIndex;

    pagePanels.forEach((panel, panelIndex) => {
        panel.hidden = panelIndex !== safeIndex;
    });

    const currentPanel = pagePanels[safeIndex];

    pageLinks.forEach((link) => {
        const isActive = link.dataset.slideLink === currentPanel.id;
        link.classList.toggle("active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    if (pagePrev) pagePrev.disabled = safeIndex === 0;
    if (pageNext) pageNext.disabled = safeIndex === pagePanels.length - 1;

    if (!options.keepScroll) {
        window.scrollTo({ top: 0, behavior: options.instant ? "auto" : "smooth" });
    }

    if (!options.skipHash) {
        history.replaceState(null, "", `#${currentPanel.id}`);
    }
}

pageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.dataset.slideLink;
        const targetIndex = pageIndexById(targetId);

        if (targetIndex !== -1) {
            event.preventDefault();
            showPage(targetIndex);
        }
    });
});

if (pagePrev) {
    pagePrev.addEventListener("click", () => showPage(currentPageIndex - 1));
}

if (pageNext) {
    pageNext.addEventListener("click", () => showPage(currentPageIndex + 1));
}

document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isFormControl = target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);

    if (isFormControl) return;

    if (event.key === "ArrowLeft") {
        showPage(currentPageIndex - 1);
    }

    if (event.key === "ArrowRight") {
        showPage(currentPageIndex + 1);
    }
});

window.addEventListener("hashchange", () => {
    const targetId = location.hash.replace("#", "");
    const targetIndex = pageIndexById(targetId);

    if (targetIndex !== -1 && targetIndex !== currentPageIndex) {
        showPage(targetIndex, { skipHash: true });
    }
});

const initialHash = location.hash.replace("#", "");
const initialIndex = pageIndexById(initialHash);
showPage(initialIndex === -1 ? 0 : initialIndex, { instant: true, skipHash: initialIndex === -1 });


/* =========================================================
   РАНДОМАЙЗЕР
   ========================================================= */

const giftBox = document.querySelector("#giftBox");

const result = document.querySelector("#result");
const resultImage = document.querySelector("#resultImage");
const resultTitle = document.querySelector("#resultTitle");
const resultDescription = document.querySelector("#resultDescription");

const againButton = document.querySelector("#again");

let lastIndex = -1;
let isChoosing = false;


/*
    Получаем случайный антистресс.
    Один и тот же два раза подряд не выпадает.
*/

function getRandomToy() {

    let index;

    do {
        index = Math.floor(Math.random() * toys.length);
    } while (
        index === lastIndex &&
        toys.length > 1
    );

    lastIndex = index;

    return toys[index];
}


/*
    Показываем результат.
*/

function showToy(toy) {

    resultImage.innerHTML = `
        <img
            src="${toy.image}"
            alt="${toy.name}"
        >
    `;

    resultTitle.textContent = toy.name;

    resultDescription.textContent = toy.description;

    result.classList.add("active");
}


/*
    Небольшой эффект перебора.
    Перед финальным подарком несколько раз
    быстро меняются изображения.
*/

function drawToy() {

    if (isChoosing) {
        return;
    }

    isChoosing = true;

    if (giftBox) {
        giftBox.classList.remove("open");

        /*
            Перезапускаем CSS-анимацию.
        */
        void giftBox.offsetWidth;

        giftBox.classList.add("open");
    }

    result.classList.remove("active");

    const finalToy = getRandomToy();

    let counter = 0;

    const shuffleInterval = setInterval(() => {

        const previewToy =
            toys[Math.floor(Math.random() * toys.length)];

        resultImage.innerHTML = `
            <img
                src="${previewToy.image}"
                alt=""
            >
        `;

        resultTitle.textContent = previewToy.name;

        counter++;

        /*
            После нескольких быстрых переключений
            показываем настоящий результат.
        */

        if (counter >= 8) {

            clearInterval(shuffleInterval);

            setTimeout(() => {

                showToy(finalToy);

                isChoosing = false;

                /*
                    Плавно прокручиваем к результату
                    только на мобильных устройствах.
                */

                if (window.innerWidth < 800) {

                    result.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            }, 180);
        }

    }, 110);
}


/*
    Клик по коробке.
*/

if (giftBox) {
    giftBox.addEventListener("click", drawToy);
}


/*
    Кнопка «Попробовать ещё раз».
*/

if (againButton) {
    againButton.addEventListener("click", drawToy);
}


/* =========================================================
   КАСТОМНЫЙ МУЗЫКАЛЬНЫЙ ПЛЕЕР
   ========================================================= */

const audio = document.querySelector("#audio");

const playButton = document.querySelector("#playButton");

const progress = document.querySelector("#progress");

const volume = document.querySelector("#volume");

const currentTime = document.querySelector("#currentTime");

const duration = document.querySelector("#duration");

const soundToggle = document.querySelector("#soundToggle");


/*
    Формат времени:
    65 секунд → 1:05
*/

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return `${minutes}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;
}


/*
    Play / Pause
*/

function toggleAudio() {

    if (!audio) {
        return;
    }

    if (audio.paused) {

        audio.play()
            .then(() => {

                playButton.textContent = "Ⅱ";

                if (soundToggle) {

                    soundToggle.innerHTML =
                        `♫ <span>Пауза</span>`;

                }

            })
            .catch(() => {

                alert(
                    "Добавьте файл music.mp3 в папку сайта, чтобы включить музыкальное сопровождение."
                );

            });

    } else {

        audio.pause();

        playButton.textContent = "▶";

        if (soundToggle) {

            soundToggle.innerHTML =
                `♫ <span>Музыка</span>`;

        }
    }
}


/*
    Кнопка Play в нижнем плеере.
*/

if (playButton) {
    playButton.addEventListener(
        "click",
        toggleAudio
    );
}


/*
    Кнопка музыки в шапке.
*/

if (soundToggle) {
    soundToggle.addEventListener(
        "click",
        toggleAudio
    );
}


/*
    Когда аудиофайл загрузился —
    показываем его длительность.
*/

if (audio) {

    audio.addEventListener(
        "loadedmetadata",
        () => {

            if (duration) {

                duration.textContent =
                    formatTime(audio.duration);

            }

        }
    );


    /*
        Обновление прогресса.
    */

    audio.addEventListener(
        "timeupdate",
        () => {

            if (currentTime) {

                currentTime.textContent =
                    formatTime(audio.currentTime);

            }

            if (progress && audio.duration) {

                progress.value =
                    (audio.currentTime /
                        audio.duration) *
                    100;

            }

        }
    );


    /*
        Музыка закончилась.
    */

    audio.addEventListener(
        "ended",
        () => {

            if (playButton) {
                playButton.textContent = "▶";
            }

            if (soundToggle) {

                soundToggle.innerHTML =
                    `♫ <span>Музыка</span>`;

            }

        }
    );

}


/*
    Перемотка.
*/

if (progress && audio) {

    progress.addEventListener(
        "input",
        () => {

            if (audio.duration) {

                audio.currentTime =
                    (progress.value / 100) *
                    audio.duration;

            }

        }
    );

}


/*
    Громкость.
*/

if (volume && audio) {

    volume.addEventListener(
        "input",
        () => {

            audio.volume =
                volume.value;

        }
    );

    audio.volume = volume.value;
}


/* =========================================================
   ДОПОЛНИТЕЛЬНО:
   ЗАПУСК МУЗЫКИ ПО ПЕРВОМУ КЛИКУ ПО САЙТУ
   НЕ ИСПОЛЬЗУЕМ АВТОЗАПУСК —
   БРАУЗЕРЫ ЕГО ЧАСТО БЛОКИРУЮТ.
   ========================================================= */


/*
document.addEventListener("click", () => {
    if (audio && audio.paused) {
        audio.play();
    }
}, { once: true });
*/
/* =========================================================
   МОБИЛЬНОЕ МЕНЮ
   ========================================================= */

const menuToggle = document.querySelector('#menuToggle');
const topNav = document.querySelector('#topNav');

function closeMobileMenu() {
    if (!menuToggle || !topNav) return;
    topNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Открыть меню');
}

if (menuToggle && topNav) {
    menuToggle.addEventListener('click', () => {
        const willOpen = !topNav.classList.contains('open');
        topNav.classList.toggle('open', willOpen);
        menuToggle.setAttribute('aria-expanded', String(willOpen));
        menuToggle.setAttribute('aria-label', willOpen ? 'Закрыть меню' : 'Открыть меню');
    });

    topNav.addEventListener('click', (event) => {
        if (event.target.closest('a[data-slide-link]')) closeMobileMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 820) closeMobileMenu();
    });
}
