const canvas = document.getElementById("heart");

const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

const particles = [];

const totalParticles = 1800;

class Particle {

  constructor(){

    this.createTarget();

    this.x = Math.random() * canvas.width;

    this.y = Math.random() * canvas.height;

    this.size = Math.random() * 2 + 1;

    this.speed = Math.random() * 0.02 + 0.01;
  }

  createTarget(){

    const t = Math.random() * Math.PI * 2;

    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
      13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t);

    this.targetX = canvas.width / 2 + x * 18;

    this.targetY = canvas.height / 2 - y * 18;
  }

  update(){

    this.x += (this.targetX - this.x) * this.speed;

    this.y += (this.targetY - this.y) * this.speed;
  }

  draw(){

    ctx.beginPath();

    ctx.fillStyle = "#ff4dff";

    ctx.shadowBlur = 15;

    ctx.shadowColor = "#ff4dff";

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    ctx.fill();
  }
}

for(let i = 0; i < totalParticles; i++){

  particles.push(new Particle());

}

function animate(){

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle)=>{

    particle.update();

    particle.draw();

  });

  requestAnimationFrame(animate);
}

animate();

const letter = document.getElementById("letter");

const note = document.getElementById("note");

letter.addEventListener("click", ()=>{

  note.classList.toggle("show");

});

const starsContainer = document.querySelector(".stars");

for(let i = 0; i < 250; i++){

  const star = document.createElement("div");

  star.classList.add("star");

  star.style.left = Math.random() * window.innerWidth + "px";

  star.style.top = Math.random() * window.innerHeight + "px";

  const size = Math.random() * 3;

  star.style.width = size + "px";

  star.style.height = size + "px";

  star.style.animationDuration =
    (Math.random() * 3 + 2) + "s";

  star.style.animationDelay =
    Math.random() * 5 + "s";

  starsContainer.appendChild(star);

}
const music = document.getElementById("bgMusic");

document.body.addEventListener("click", ()=>{

  music.play();

}, { once:true });