(function() {
  const root = document.documentElement;

  function onPointerMove(e) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    root.style.setProperty('--cursorX', `${x}%`);
    root.style.setProperty('--cursorY', `${y}%`);
  }

  if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', onPointerMove);
  }
})();
