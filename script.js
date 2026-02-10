const video = document.getElementById("introVideo");
const proposal = document.getElementById("proposal");
const videoIntro = document.getElementById("videoIntro");

function showPlayOverlay() {
    if (document.getElementById('playOverlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'playOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;display:flex;justify-content:center;align-items:center;background:rgba(0,0,0,0.6);z-index:20;cursor:pointer';
    overlay.innerHTML = `
        <div style="text-align:center;color:white;font-family:Pacifico, cursive">
            <button id="playBtn" style="font-size:20px;padding:18px 28px;border-radius:12px;border:none;background:#ff4d6d;color:white;cursor:pointer">▶️ Play</button>
            <p style="margin-top:10px">Tap or click to start the video</p>
        </div>
    `;
    overlay.addEventListener('click', () => {
        video.play().then(() => overlay.remove()).catch(() => {});
    });
    document.body.appendChild(overlay);
}

// Try to autoplay; if blocked, show a play overlay so user can start the video without muting
video.addEventListener('canplay', () => {
    const p = video.play();
    if (p !== undefined) {
        p.then(() => {
            // autoplay succeeded
        }).catch(() => {
            showPlayOverlay();
        });
    }
});

// Also try to start on any first user interaction (useful for mobile)
['click', 'touchstart'].forEach(evt => {
    document.addEventListener(evt, function oncePlay() {
        const p = video.play();
        if (p && typeof p.then === 'function') p.then(() => {
            const ov = document.getElementById('playOverlay'); if (ov) ov.remove();
        }).catch(() => {});
        document.removeEventListener(evt, oncePlay);
    });
});

video.onended = () => {
    // Fade out the video intro
    videoIntro.style.transition = "opacity 0.5s ease";
    videoIntro.style.opacity = 0;

    // Wait 0.5 seconds before hiding the video and showing the proposal
    setTimeout(() => {
        videoIntro.style.display = "none";
        proposal.style.display = "block";

        // Fade in the proposal
        proposal.style.opacity = 0;
        proposal.style.transition = "opacity 0.5s ease";
        setTimeout(() => {
            proposal.style.opacity = 1;
        }, 50); // tiny delay to trigger transition
    }, 500);
};
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", moveButton);

noBtn.addEventListener("click", () => {
    setTimeout(() => {
        document.body.innerHTML = `
            <div style="
                height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                background:linear-gradient(135deg,#fceaaa,#f8b500);
                font-family:'Pacifico', cursive;
                text-align:center;
                padding:20px;
                animation: fadeIn 0.5s ease;
            ">
                <h1 style="
                    color:#555;
                    font-size:32px;
                    animation: scaleUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                ">
                    No worries! <br>
                    Maybe next time 💛
                </h1>
            </div>
        `;
    }, 500);
});





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
                Yay!<br>
                I’d be so happy to be your Valentine! 😄
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
