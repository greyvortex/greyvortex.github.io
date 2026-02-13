// 1. Clock Functionality
function updateClock() {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ":" + 
                    now.getMinutes().toString().padStart(2, '0') + ":" + 
                    now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = timeStr;
}
setInterval(updateClock, 1000);
updateClock();

// 2. Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 3. Terminal Logic
const termToggle = document.getElementById('terminal-toggle');
const termOverlay = document.getElementById('terminal');
const termClose = document.getElementById('close-terminal');
const termInput = document.getElementById('terminal-input');
const termOut = document.getElementById('terminal-out');

termToggle.onclick = () => termOverlay.classList.remove('hidden');
termClose.onclick = () => termOverlay.classList.add('hidden');

termInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = termInput.value.toLowerCase();
        const p = document.createElement('p');
        p.textContent = `> ${cmd}`;
        termOut.appendChild(p);

        const response = document.createElement('p');
        response.style.color = '#9ece6a'; // Green response
        
        if (cmd === 'help') {
            response.textContent = "Commands: about, skills, clear, exit";
        } else if (cmd === 'about') {
            response.textContent = "Greyvortex: CS student & Security hobbyist.";
        } else if (cmd === 'skills') {
            response.textContent = "Cybersecurity, programming, Reverse Engineering.";
        } else if (cmd === 'clear') {
            termOut.innerHTML = '';
            response.textContent = "Terminal cleared.";
        }else if(cmd === 'exit') {
            termOverlay.classList.add('hidden');
        }else {
            response.textContent = "Command not found. Try 'help'.";
        }
        
        termOut.appendChild(response);
        termInput.value = '';
        termOut.scrollTop = termOut.scrollHeight;
    }
});