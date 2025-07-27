let currentString = '';
    let attempts = 0;
    const maxAttempts = 2;
    let fontSize = 45;
    const minFontSize = 10;
    let yOffset = 30; // vertical position

    const display = document.getElementById("textDisplay");
    const input = document.getElementById("inputField");
    const status = document.getElementById("status");

    // Disable zooming
    document.addEventListener('wheel', e => {
      if (e.ctrlKey) e.preventDefault();
    }, { passive: false });

    document.addEventListener('keydown', e => {
      if ((e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) || e.key === 'Meta') {
        e.preventDefault();
      }
    });

    function generateRandomString() {
      const len = Math.floor(Math.random() * 9); // 0 to 8 letters
      let str = '';
      for (let i = 0; i < len; i++) {
        const charCode = Math.floor(Math.random() * 26) + 65;
        str += String.fromCharCode(charCode);
      }
      return str || 'A';
    }

    function updateDisplay() {
      display.style.fontSize = fontSize + 'px';
      display.textContent = currentString;
      display.style.marginTop = yOffset + 'px';
      input.value = '';
      status.textContent = '';
    }

    function nextLevel() {
      currentString = generateRandomString();
      if (fontSize > minFontSize) fontSize--;
      yOffset += 10; // Move display lower
      updateDisplay();
    }

    function failAndRetry() {
      currentString = generateRandomString();
      updateDisplay(); // same size & yOffset
    }

    input.addEventListener("input", () => {
      if (!currentString) return;
      if (input.value === currentString) {
        status.textContent = "✅ Correct!";
        attempts = 0;
        setTimeout(nextLevel, 800);
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (input.value !== currentString) {
          attempts++;
          if (attempts >= maxAttempts) {
            status.textContent = "❌ 2 Attempts Failed! Restarting...";
            setTimeout(() => {
              restartGame();
            }, 1200);
          } else {
            status.textContent = `❗ Wrong! Attempts left: ${maxAttempts - attempts}`;
            setTimeout(() => {
              failAndRetry(); // new string, same size
            }, 700);
          }
        }
      }
    });

    function restartGame() {
      fontSize = 45;
      yOffset = 30;
      attempts = 0;
      currentString = generateRandomString();
      updateDisplay();
    }

    restartGame();
    input.focus();