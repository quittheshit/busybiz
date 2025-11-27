export function initVoiceflowScrollHandler() {
  let scrollTimer: number | null = null;
  let isScrolling = false;

  const isMobileDevice = (): boolean => {
    return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
           window.innerWidth <= 768;
  };

  const disableAnimations = () => {
    if (!isMobileDevice()) return;

    if (!isScrolling) {
      isScrolling = true;
      document.body.classList.add('mobile-scrolling');
    }
  };

  const enableAnimations = () => {
    if (!isMobileDevice()) return;

    if (isScrolling) {
      isScrolling = false;
      document.body.classList.remove('mobile-scrolling');
    }
  };

  const handleScroll = () => {
    disableAnimations();

    if (scrollTimer !== null) {
      clearTimeout(scrollTimer);
    }

    scrollTimer = window.setTimeout(() => {
      enableAnimations();
      scrollTimer = null;
    }, 150);
  };

  const handleTouchStart = () => {
    if (isMobileDevice()) {
      disableAnimations();
    }
  };

  const handleTouchEnd = () => {
    if (isMobileDevice()) {
      if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
      }

      scrollTimer = window.setTimeout(() => {
        enableAnimations();
        scrollTimer = null;
      }, 150);
    }
  };

  const initializeListeners = () => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
  };

  const checkForVoiceflowWidget = () => {
    const widget = document.getElementById('voiceflow-chat');
    if (widget) {
      initializeListeners();
    } else {
      setTimeout(checkForVoiceflowWidget, 500);
    }
  };

  checkForVoiceflowWidget();

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchend', handleTouchEnd);
    window.removeEventListener('touchmove', handleScroll);
    document.body.classList.remove('mobile-scrolling');
  };
}
