/**
 * MIMIC_CHAMBER FX — flow-field particles, pulsing rings, reactive bloom
 * Inspired by flow-field + audio-reactive shader techniques
 */
(function () {
  const canvas = document.createElement("canvas");
  canvas.id = "fx-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ringHost = document.createElement("div");
  ringHost.className = "ring-field";
  ringHost.setAttribute("aria-hidden", "true");
  document.body.prepend(ringHost);

  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let dpr = 1;
  let t = 0;

  const PARTICLE_COUNT = 2200;
  const particles = [];
  const rings = Array.from({ length: 6 }, (_, i) => ({ idx: i }));

  // Compact 2D simplex-style flow (simplex noise approximation via layered sin)
  function flowAngle(x, y, time) {
    const n1 = Math.sin(x * 0.003 + time * 0.0004) + Math.cos(y * 0.0025 - time * 0.0003);
    const n2 = Math.sin((x + y) * 0.0018 + time * 0.0002) * 1.4;
    const n3 = Math.cos(x * 0.0012 - y * 0.0016 + time * 0.00035);
    return (n1 + n2 + n3) * Math.PI;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seedParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: 0.35 + Math.random() * 0.85,
        hue: Math.random() < 0.65 ? 145 : 48,
        bright: 0.35 + Math.random() * 0.65,
      });
    }
  }

  // Audio — synthetic fluorescent hum (no external file)
  let audioCtx = null;
  let analyser = null;
  let audioOn = false;
  let bass = 0;
  let mid = 0;
  let high = 0;
  let pulseBoost = 0;

  function startAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const buf = analyser.frequencyBinCount;
    const data = new Uint8Array(buf);

    const osc1 = audioCtx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.value = 52;

    const osc2 = audioCtx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.value = 104;

    const noise = audioCtx.createBufferSource();
    const nb = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
    const arr = nb.getChannelData(0);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() * 2 - 1) * 0.04;
    noise.buffer = nb;
    noise.loop = true;

    const gain = audioCtx.createGain();
    gain.gain.value = 0.045;

    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.12;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    osc1.connect(gain);
    osc2.connect(gain);
    noise.connect(gain);
    gain.connect(analyser);
    analyser.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    noise.start();
    lfo.start();

    audioOn = true;

    function readAudio() {
      if (!audioOn) return;
      analyser.getByteFrequencyData(data);
      let b = 0;
      let m = 0;
      let hi = 0;
      for (let i = 0; i < buf; i++) {
        if (i < 8) b += data[i];
        else if (i < 32) m += data[i];
        else hi += data[i];
      }
      bass = b / (8 * 255);
      mid = m / (24 * 255);
      high = hi / ((buf - 32) * 255);
      requestAnimationFrame(readAudio);
    }
    readAudio();
  }

  function stopAudio() {
    audioOn = false;
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
      analyser = null;
    }
    bass = mid = high = 0;
  }

  function buildRings() {
    ringHost.innerHTML = rings
      .map(
        (_, i) =>
          `<div class="pulse-ring" style="--i:${i}"><span class="ring-core"></span></div>`
      )
      .join("");
  }

  function drawParticles() {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(10, 10, 6, 0.12)";
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "lighter";
    const time = t;

    for (const p of particles) {
      const angle = flowAngle(p.x, p.y, time);
      p.x += Math.cos(angle) * p.speed;
      p.y += Math.sin(angle) * p.speed;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const flicker = 0.55 + Math.sin(time * 0.01 + p.x * 0.02) * 0.25;
      const alpha = p.bright * flicker * (0.55 + bass * 0.45 + pulseBoost * 0.3);
      const size = 1.1 + mid * 1.8 + pulseBoost * 0.8;

      ctx.beginPath();
      ctx.shadowBlur = 10 + high * 18 + pulseBoost * 12;
      ctx.shadowColor = p.hue > 100 ? "rgba(51,255,136,0.9)" : "rgba(201,180,88,0.85)";
      ctx.fillStyle = `hsla(${p.hue}, 90%, ${p.hue > 100 ? 62 : 58}%, ${alpha})`;
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = "source-over";
  }

  function updateRingDOM() {
    const energy = 0.35 + bass * 0.9 + mid * 0.4 + pulseBoost * 0.6;
    const scale = 1 + bass * 0.22 + pulseBoost * 0.15;
    const opacity = 0.12 + mid * 0.35 + pulseBoost * 0.25;
    ringHost.style.setProperty("--ring-energy", String(energy));
    ringHost.style.setProperty("--ring-scale", String(scale));
    ringHost.style.setProperty("--ring-opacity", String(Math.min(opacity, 0.75)));
    pulseBoost *= 0.92;
  }

  function tick() {
    t++;
    if (t % 2 === 0) drawParticles();
    updateRingDOM();
    requestAnimationFrame(tick);
  }

  window.MimicFX = {
    pulse(amount = 0.5) {
      pulseBoost = Math.min(1, pulseBoost + amount);
      document.body.classList.add("bloom-hit");
      clearTimeout(window._bloomT);
      window._bloomT = setTimeout(() => document.body.classList.remove("bloom-hit"), 280);
    },
    toggleAudio() {
      if (audioOn) {
        stopAudio();
        return false;
      }
      startAudio();
      if (audioCtx?.state === "suspended") audioCtx.resume();
      return true;
    },
    isAudioOn: () => audioOn,
  };

  resize();
  seedParticles();
  buildRings();
  window.addEventListener("resize", () => {
    resize();
    seedParticles();
  });

  const soundBtn = document.getElementById("sound-btn");
  if (soundBtn) {
    soundBtn.addEventListener("click", () => {
      const on = window.MimicFX.toggleAudio();
      soundBtn.textContent = on ? "[HUM:ON]" : "[HUM:OFF]";
      soundBtn.classList.toggle("active", on);
    });
  }

  requestAnimationFrame(tick);
})();