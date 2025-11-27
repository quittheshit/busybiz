export function initVoiceflowScrollHandler() {
  let scrollTimer: number | null = null;
  let isScrolling = false;

  const isMobileDevice = (): boolean => {
    return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
           window.innerWidth <= 768;
  };

  const disableAnimations = () => {
    if (!isMobileDevice()) return;

    const voiceflowContainer = document.getElementById('voiceflow-chat');
    if (voiceflowContainer && !isScrolling) {
      isScrolling = true;
      voiceflowContainer.classList.add('mobile-scrolling');
    }
  };

  const enableAnimations = () => {
    if (!isMobileDevice()) return;

    const voiceflowContainer = document.getElementById('voiceflow-chat');
    if (voiceflowContainer && isScrolling) {
      isScrolling = false;
      voiceflowContainer.classList.remove('mobile-scrolling');
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
    const voiceflowContainer = document.getElementById('voiceflow-chat');
    if (voiceflowContainer) {
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
  };
}
