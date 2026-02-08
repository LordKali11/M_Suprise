const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", moveButton);

function moveButton() {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

yesBtn.addEventListener("click", () => {
    document.body.innerHTML = `
        <div style="
            height:100vh;
            display:flex;
            justify-content:center;
            align-items:center;
            background:linear-gradient(135deg,#ff9a9e,#fad0c4);
            font-family:'Pacifico', cursive;
            text-align:center;
            padding:20px;
            animation: fadeIn 0.5s ease;
        ">
            <h1 style="
                color:white;
                font-size:32px;
                animation: scaleUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
            ">
                Yay!! 💖💖💖 <br>
                I knew you'd say yes 😍
            </h1>
        </div>
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleUp {
                0% {
                    transform: scale(0.5);
                    opacity: 0;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            /* Confetti hearts */
            .heart {
                position: fixed;
                pointer-events: none;
                font-size: 30px;
                animation: fall 3s linear forwards;
            }
            @keyframes fall {
                0% {
                    transform: translateY(-100px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        </style>
    `;
    
    // Create falling hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "heart";
            heart.textContent = ["💖", "💕", "💗", "💝"][Math.floor(Math.random() * 4)];
            heart.style.left = Math.random() * 100 + "%";
            heart.style.animationDelay = (Math.random() * 0.5) + "s";
            document.body.appendChild(heart);
        }, i * 30);
    }
});
