const openBtn = document.getElementById("openBtn");
const letter = document.getElementById("letter");
const musicBtn = document.getElementById("musicBtn");
const musicLabel = document.getElementById("musicLabel");
const music = document.getElementById("music");
const petalsLayer = document.getElementById("petals");

// Tugma xat bo'limiga olib boradi va mayin yaproqlar chiqaradi.
openBtn.addEventListener("click", async () => {
  letter.scrollIntoView({ behavior: "smooth", block: "start" });
  createPetals(24);
  if (music.paused) await playMusic();
});

// Musiqa brauzer ruxsati bilan, foydalanuvchi bosganda boshlanadi.
musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    await playMusic();
  } else {
    music.pause();
    musicLabel.textContent = "Musiqani yoqish";
    musicBtn.setAttribute("aria-label", "Musiqani yoqish");
  }
});

async function playMusic() {
  try {
    await music.play();
    musicLabel.textContent = "Musiqa yoqilgan";
    musicBtn.setAttribute("aria-label", "Musiqani to'xtatish");
  } catch (error) {
    musicLabel.textContent = "Avval music.mp3 qo'shing";
  }
}

// Yaproqlar ekran bo'ylab tabiiy ravishda tushadi.
function createPetals(amount = 10) {
  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = Math.random() > 0.35 ? "✿" : "♥";
    petal.style.left = Math.random() * 100 + "%";
    petal.style.fontSize = (10 + Math.random() * 15) + "px";
    petal.style.animationDuration = (5 + Math.random() * 6) + "s";
    petal.style.animationDelay = (Math.random() * 1.5) + "s";
    petal.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");
    petalsLayer.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove(), { once: true });
  }
}

createPetals(12);
setInterval(() => createPetals(4), 4500);
