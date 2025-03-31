// משתנים גלובליים
let cube;
let isAutoRotating = true;
let isDragging = false;
let lastMouseX, lastMouseY;
let rotationX = 0;
let rotationY = 0;
let autoRotateInterval;
let scene, camera, renderer;
let canvas;
let inactivityTimer; // טיימר לחוסר פעילות
let inactivityTimeout = 2000; // 2 שניות

// משתנה גלובלי לשמירת סוג האתר הנוכחי
let currentSiteType = 'business'; // ברירת מחדל - האתר הראשון

// עצירת סיבוב אוטומטי
function stopAutoRotate() {
  isAutoRotating = false;
  document.getElementById('autoRotate').classList.remove('active');
  document.getElementById('stopRotate').classList.add('active');
  clearInterval(autoRotateInterval);
  
  // הפעלת טיימר לחוסר פעילות
  resetInactivityTimer();
}

// איפוס הקוביה
function resetCube() {
  rotationX = 180; // סיבוב לכיוון הפאה העליונה (חדר כושר)
  rotationY = 0;
  updateCubeRotation();
  
  // הפעלת סיבוב אוטומטי מחדש
  startAutoRotate();
}

// עדכון הסיבוב של הקוביה
function updateCubeRotation() {
  if (cube) {
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  }
}

// איפוס טיימר חוסר פעילות
function resetInactivityTimer() {
  // ניקוי טיימר קודם אם קיים
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  
  // הגדרת טיימר חדש
  inactivityTimer = setTimeout(() => {
    // הפעלת סיבוב אוטומטי אחרי חוסר פעילות
    if (!isAutoRotating) {
      console.log("חוסר פעילות זוהה - מחדש סיבוב אוטומטי");
      startAutoRotate();
    }
  }, inactivityTimeout);
}

// אתחול אירועים
function initEvents() {
  // מאזיני אירועים לעכבר
  canvas.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  
  // מאזיני אירועים למגע (מובייל)
  canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleTouchUp);
  
  // מאזיני אירועים לכפתורים
  document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
  document.querySelector('.menu-toggle').addEventListener('click', toggleMobileMenu);
  
  // מאזיני אירועים לכפתורים "גלה אתרים" ו"צור קשר"
  document.querySelector('.cta-primary').addEventListener('click', () => {
    // גלילה לאזור הקוביה התלת-ממדית
    const cubeSection = document.querySelector('#cube-showcase');
    if (cubeSection) {
      cubeSection.scrollIntoView({ behavior: 'smooth' });
      
      // וידוא שהקוביה מסתובבת ונראית
      if (cube) {
        // עצירת הסיבוב האוטומטי אם הוא פעיל
        if (isAutoRotating) {
          stopAutoRotate();
        }
        
        // הפעלת סיבוב קצר ומהיר של הקוביה להדגשה
        gsap.to(cube.rotation, {
          x: cube.rotation.x + Math.PI * 0.5,
          y: cube.rotation.y + Math.PI * 2,
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            // הפעלת סיבוב אוטומטי איטי לאחר האנימציה
            startAutoRotate();
          }
        });
      }
    }
  });
  
  document.querySelector('.cta-secondary').addEventListener('click', () => {
    // גלילה לאזור יצירת הקשר
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  // מאזיני אירועים לחלון
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // מאזיני אירועים לגלילה
  window.addEventListener('scroll', animateOnScroll);
  
  // מאזיני אירועים לקישורי ניווט
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // עדכון קישור פעיל
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

// טיפול בלחיצת עכבר על הקוביה
function handleMouseDown(e) {
  isDragging = true;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  
  // עצירת סיבוב אוטומטי בעת גרירה
  stopAutoRotate();
}

// טיפול בתנועת עכבר
function handleMouseMove(e) {
  if (!isDragging) return;
  
  // איפוס טיימר חוסר פעילות בכל תנועה
  resetInactivityTimer();
  
  const deltaX = e.clientX - lastMouseX;
  const deltaY = e.clientY - lastMouseY;
  
  rotationY += deltaX * 0.5;
  rotationX -= deltaY * 0.5;
  
  updateCubeRotation();
  
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
}

// טיפול בשחרור לחיצת עכבר
function handleMouseUp() {
  isDragging = false;
  // הפעלת טיימר חוסר פעילות מיד כשהמשתמש משחרר את העכבר
  resetInactivityTimer();
}

// טיפול במגע התחלתי (מובייל)
function handleTouchStart(e) {
  if (e.touches.length === 1) {
    e.preventDefault();
    isDragging = true;
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
    
    // עצירת סיבוב אוטומטי בעת גרירה
    stopAutoRotate();
  }
}

// טיפול בתנועת מגע (מובייל)
function handleTouchMove(e) {
  if (!isDragging || e.touches.length !== 1) return;
  
  e.preventDefault();
  
  // איפוס טיימר חוסר פעילות בכל תנועה
  resetInactivityTimer();
  
  const deltaX = e.touches[0].clientX - lastMouseX;
  const deltaY = e.touches[0].clientY - lastMouseY;
  
  rotationY += deltaX * 0.5;
  rotationX -= deltaY * 0.5;
  
  updateCubeRotation();
  
  lastMouseX = e.touches[0].clientX;
  lastMouseY = e.touches[0].clientY;
}

// טיפול בסיום מגע (מובייל)
function handleTouchUp() {
  isDragging = false;
  // הפעלת טיימר חוסר פעילות מיד כשהמשתמש מסיים את המגע
  resetInactivityTimer();
}

// החלפת מצב תצוגה (בהיר/כהה)
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const themeIcon = document.querySelector('.theme-toggle i');
  
  if (document.body.classList.contains('light-theme')) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

// פתיחת תפריט במובייל
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
  
  const menuIcon = document.querySelector('.menu-toggle i');
  if (navLinks.classList.contains('active')) {
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  } else {
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  }
}

// אתחול צ'אט
function initChat() {
  const chatButton = document.querySelector('.chat-button');
  const chatContainer = document.querySelector('.chat-container');
  const closeChat = document.querySelector('.close-chat');
  const sendMessage = document.querySelector('.send-message');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.querySelector('.chat-messages');
  
  // פתיחת צ'אט
  chatButton?.addEventListener('click', () => {
    chatContainer.style.display = 'flex';
    chatButton.style.display = 'none';
  });
  
  // סגירת צ'אט
  closeChat?.addEventListener('click', () => {
    chatContainer.style.display = 'none';
    chatButton.style.display = 'flex';
  });
  
  // שליחת הודעה
  function sendChatMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // הוספת הודעת משתמש
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = `
      <div class="message-content">${message}</div>
      <div class="message-time">עכשיו</div>
    `;
    chatMessages.appendChild(userMessage);
    
    // ניקוי שדה הטקסט
    chatInput.value = '';
    
    // גלילה לתחתית הצ'אט
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // הוספת הודעת תמיכה אוטומטית (לאחר השהייה קצרה)
    setTimeout(() => {
      const supportMessage = document.createElement('div');
      supportMessage.className = 'message support';
      supportMessage.innerHTML = `
        <div class="message-content">תודה על פנייתך! נחזור אליך בהקדם.</div>
        <div class="message-time">עכשיו</div>
      `;
      chatMessages.appendChild(supportMessage);
      
      // גלילה לתחתית הצ'אט
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }
  
  // אירוע לחיצה על כפתור שליחה
  sendMessage?.addEventListener('click', sendChatMessage);
  
  // אירוע לחיצה על Enter
  chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  });
}

// אתחול מודאל
function initModal() {
  const modal = document.getElementById('siteModal');
  const closeModal = document.querySelector('.close-modal');
  
  // סגירת מודאל
  closeModal?.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // סגירת מודאל בלחיצה מחוץ לתוכן
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

// פתיחת מודאל עם מידע על האתר
function openModal(siteType) {
  const modal = document.getElementById('siteModal');
  const data = sitesData[siteType];
  
  // עדכון תוכן המודאל
  document.querySelector('.modal-title').textContent = data.title;
  document.querySelector('.site-description').textContent = data.description;
  document.querySelector('.current-price').textContent = data.price;
  document.querySelector('.original-price').textContent = data.originalPrice;
  document.querySelector('.discount-badge').textContent = `-${data.discount}`;
  
  // עדכון רשימת התכונות
  const featuresList = document.querySelector('.features-list');
  featuresList.innerHTML = '';
  data.features.forEach(feature => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
    featuresList.appendChild(li);
  });
  
  // עדכון התצוגה המקדימה
  const previewFrame = document.querySelector('.preview-frame');
  previewFrame.src = data.previewUrl;
  
  // הצגת המודאל
  modal.style.display = 'block';
}

// אתחול אירועי גלילה
function initScrollEvents() {
  window.addEventListener('scroll', () => {
    // שינוי סגנון הדר בגלילה
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // אנימציות בגלילה
    animateOnScroll();
  });
}

// אנימציות בגלילה
function animateOnScroll() {
  const elements = document.querySelectorAll('.section-header, .category-card, .site-card, .feature-card');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight * 0.8) {
      element.classList.add('animate');
    }
  });
}

// אתחול תצוגת האתר
function initSitePreview() {
  // הצגת האתר הראשון כברירת מחדל (business) ללא גלילה
  const siteType = 'business';
  const siteData = sitesData[siteType];
  
  if (!siteData) return;
  
  // עדכון כותרת
  document.getElementById('preview-site-title').textContent = siteData.title;
  
  // עדכון מחיר
  document.getElementById('preview-site-price').textContent = siteData.price;
  
  // עדכון מחיר מקורי והנחה
  document.getElementById('preview-original-price').textContent = siteData.originalPrice;
  document.getElementById('preview-discount').textContent = `-${siteData.discount}`;
  
  // עדכון דירוג
  document.getElementById('preview-site-rating').textContent = siteData.rating;
  
  // עדכון תיאור
  document.getElementById('preview-site-description').textContent = siteData.description;
  
  // עדכון ה-iframe
  const iframe = document.getElementById('site-preview-iframe');
  iframe.src = siteData.previewUrl;
  
  // הוספת מאזיני אירועים לכפתורי התצוגה (מחשב/טאבלט/מובייל)
  const viewButtons = document.querySelectorAll('.preview-btn');
  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const view = button.getAttribute('data-view');
      changePreviewView(view);
      
      // הדגשת הכפתור הנבחר
      viewButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  
  // הוספת מאזין אירוע לכפתור "צפה בדמו"
  const demoButton = document.getElementById('preview-site-cta');
  demoButton?.addEventListener('click', () => {
    const iframe = document.getElementById('site-preview-iframe');
    window.open(iframe.src, '_blank');
  });
}

// עדכון תצוגת האתר לפי סוג האתר שנבחר
function updateSitePreview(siteType) {
  currentSiteType = siteType; // שמירת סוג האתר הנוכחי
  const siteData = sitesData[siteType];
  if (!siteData) return;
  
  // עדכון כותרת
  document.getElementById('preview-site-title').textContent = siteData.title;
  
  // עדכון מחיר
  document.getElementById('preview-site-price').textContent = siteData.price;
  
  // עדכון מחיר מקורי והנחה
  document.getElementById('preview-original-price').textContent = siteData.originalPrice;
  document.getElementById('preview-discount').textContent = `-${siteData.discount}`;
  
  // עדכון דירוג
  document.getElementById('preview-site-rating').textContent = siteData.rating;
  
  // עדכון תיאור
  document.getElementById('preview-site-description').textContent = siteData.description;
  
  // עדכון ה-iframe
  const iframe = document.getElementById('site-preview-iframe');
  
  // אנימציה של החלפת האתר
  iframe.style.opacity = 0;
  setTimeout(() => {
    iframe.src = siteData.previewUrl;
    iframe.style.opacity = 1;
    
    // הוספת אירוע לאחר טעינת האתר
    iframe.onload = function() {
      // התחלת גלילה אוטומטית בתוך ה-iframe לאחר טעינה
      startIframeAutoScroll(iframe);
    };
  }, 300);
  
  // גלילה לאזור תצוגת האתר רק אם הפונקציה הופעלה מלחיצה על פאה של הקוביה
  // ולא בעת טעינת העמוד
  if (document.readyState === 'complete') {
    document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
  }
}

// פונקציה למעבר לאתר הבא ברשימה
function goToNextSite() {
  // רשימת כל סוגי האתרים
  const siteTypes = Object.keys(sitesData);
  
  // מציאת האינדקס של האתר הנוכחי
  const currentIndex = siteTypes.indexOf(currentSiteType);
  
  // חישוב האינדקס של האתר הבא (עם מעבר מעגלי)
  const nextIndex = (currentIndex + 1) % siteTypes.length;
  
  // מעבר לאתר הבא
  updateSitePreview(siteTypes[nextIndex]);
}

// שינוי תצוגת האתר (מחשב/טאבלט/מובייל)
function changePreviewView(view) {
  const iframe = document.getElementById('site-preview-iframe');
  
  // הסרת כל הקלאסים הקודמים
  iframe.classList.remove('desktop-view', 'tablet-view', 'mobile-view');
  
  // הוספת הקלאס המתאים
  if (view === 'tablet') {
    iframe.classList.add('tablet-view');
  } else if (view === 'mobile') {
    iframe.classList.add('mobile-view');
  }
  // desktop view הוא ברירת המחדל ללא קלאס מיוחד
}

// התחלת גלילה אוטומטית בתוך ה-iframe
function startIframeAutoScroll(iframe) {
  try {
    const iframeWindow = iframe.contentWindow;
    const iframeDoc = iframeWindow.document;
    
    // המתנה קצרה לפני התחלת הגלילה
    setTimeout(() => {
      // בדיקה שה-iframe נטען כראוי
      if (!iframeDoc || !iframeDoc.body) return;
      
      let scrollInterval;
      let scrollPosition = 0;
      const scrollStep = 2; // מהירות הגלילה
      const maxScroll = Math.min(1500, iframeDoc.body.scrollHeight / 2); // גלילה עד אמצע האתר לכל היותר
      
      // התחלת גלילה חלקה
      scrollInterval = setInterval(() => {
        scrollPosition += scrollStep;
        iframeWindow.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
        
        // הפסקת הגלילה לאחר הגעה למיקום הרצוי או לתחתית האתר
        if (scrollPosition >= maxScroll) {
          clearInterval(scrollInterval);
        }
      }, 50);
      
      // הפסקת הגלילה כאשר המשתמש לוחץ על ה-iframe
      const stopScrollOnInteraction = () => {
        clearInterval(scrollInterval);
        iframeDoc.removeEventListener('click', stopScrollOnInteraction);
        iframeDoc.removeEventListener('touchstart', stopScrollOnInteraction);
        iframeDoc.removeEventListener('scroll', stopScrollOnInteraction);
      };
      
      iframeDoc.addEventListener('click', stopScrollOnInteraction);
      iframeDoc.addEventListener('touchstart', stopScrollOnInteraction);
      iframeDoc.addEventListener('scroll', stopScrollOnInteraction);
      
      // הוספת אינדיקציה ויזואלית שניתן לגלול
      const scrollIndicator = document.createElement('div');
      scrollIndicator.className = 'iframe-scroll-indicator';
      scrollIndicator.innerHTML = '<i class="fas fa-mouse"></i><span>גלול לצפייה באתר</span>';
      
      // הוספת האינדיקציה מעל ה-iframe
      const previewFrame = iframe.parentElement;
      previewFrame.appendChild(scrollIndicator);
      
      // הסרת האינדיקציה לאחר זמן קצר
      setTimeout(() => {
        scrollIndicator.classList.add('fade-out');
        setTimeout(() => {
          if (previewFrame.contains(scrollIndicator)) {
            previewFrame.removeChild(scrollIndicator);
          }
        }, 1000);
      }, 3000);
    }, 1000);
  } catch (error) {
    console.error('שגיאה בגלילה אוטומטית:', error);
  }
}

// נתונים של האתרים
const sitesData = {
  business: {
    title: "נדל\"ן",
    description: "אתר תיווך נדל\"ן מקצועי עם עיצוב נקי וחדשני. מתאים לסוכני נדל\"ן, משרדי תיווך וחברות נדל\"ן. האתר כולל דף בית מרשים, חיפוש נכסים, גלריית נכסים, ואפשרויות יצירת קשר.",
    price: "החל מ-₪2,599",
    originalPrice: "₪5,999",
    discount: "57%",
    previewUrl: "https://vipoconnect.github.io/Real-estate-brokerage/",
    previewImage: "https://vipoconnect.github.io/3/images/%D7%A0%D7%93%D7%9C%D7%9F.jpg",
    rating: "(24)",
    features: [
      "עיצוב רספונסיבי מלא",
      "אופטימיזציה למנועי חיפוש",
      "טעינה מהירה",
      "אינטגרציה עם רשתות חברתיות",
      "טפסי יצירת קשר",
      "גלריית תמונות",
      "חיבור לגוגל אנליטיקס"
    ]
  },
  ecommerce: {
    title: "טיפולי פנים",
    description: "אתר טיפולי פנים מתקדם עם ממשק ניהול קל לשימוש. מתאים לקוסמטיקאיות, מכוני יופי וקליניקות טיפוח. כולל הצגת טיפולים, מחירון, גלריה ומערכת הזמנת תורים.",
    price: "החל מ-₪2,799",
    originalPrice: "₪6,299",
    discount: "56%",
    previewUrl: "https://vipoconnect.github.io/face/",
    previewImage: "https://vipoconnect.github.io/3/images/%D7%98%D7%99%D7%A4%D7%95%D7%9C%D7%99%20%D7%A4%D7%A0%D7%99%D7%9D.jpg",
    rating: "(37)",
    features: [
      "מערכת ניהול תורים",
      "הצגת טיפולים ומחירים",
      "גלריית תמונות מרשימה",
      "אינטגרציה עם מערכות תשלום",
      "מערכת קופונים והנחות",
      "דירוג וביקורות לקוחות",
      "התאמה למובייל"
    ]
  },
  portfolio: {
    title: "בינה מלאכותית",
    description: "אתר בנושא בינה מלאכותית עם עיצוב חדשני וטכנולוגי. מתאים לחברות טכנולוגיה, סטארטאפים ומפתחי AI. האתר מציג מידע, שירותים ופתרונות בתחום הבינה המלאכותית.",
    price: "החל מ-₪2,699",
    originalPrice: "₪5,899",
    discount: "54%",
    previewUrl: "https://vipoconnect.github.io/3/",
    previewImage: "https://vipoconnect.github.io/3/images/AI.jpg",
    rating: "(31)",
    features: [
      "עיצוב טכנולוגי מתקדם",
      "הצגת פתרונות AI",
      "דפי מידע מפורטים",
      "בלוג טכנולוגי",
      "אינטגרציה עם כלי AI",
      "טפסי יצירת קשר",
      "התאמה למובייל"
    ]
  },
  blog: {
    title: "חדר כושר",
    description: "אתר חדר כושר מקצועי עם עיצוב דינמי ומרשים. מתאים לחדרי כושר, סטודיו לאימונים ומאמנים אישיים. כולל הצגת מסלולים, מחירון, לוח זמנים ומערכת הרשמה.",
    price: "החל מ-₪2,499",
    originalPrice: "₪5,799",
    discount: "57%",
    previewUrl: "https://vipoconnect.github.io/fitnes/",
    previewImage: "https://vipoconnect.github.io/3/images/%D7%97%D7%93%D7%A8%20%D7%9B%D7%95%D7%A9%D7%A8.jpg",
    rating: "(15)",
    features: [
      "מערכת הרשמה מקוונת",
      "לוח זמנים אינטראקטיבי",
      "הצגת מסלולים ומחירים",
      "גלריית תמונות",
      "פרופילי מאמנים",
      "בלוג כושר ותזונה",
      "התאמה למובייל"
    ]
  },
  landing: {
    title: "ציפורניים",
    description: "אתר לטיפולי ציפורניים עם עיצוב מרשים ואפקטים מתקדמים. מתאים למניקוריסטיות ומכוני יופי. האתר מציג את העבודות בצורה מרשימה ומקצועית.",
    price: "החל מ-₪2,599",
    originalPrice: "₪5,999",
    discount: "57%",
    previewUrl: "https://vipoconnect.github.io/2/",
    previewImage: "https://vipoconnect.github.io/3/images/%D7%A6%D7%99%D7%A4%D7%95%D7%A8%D7%A0%D7%99%D7%99%D7%9D.jpg",
    rating: "(19)",
    features: [
      "גלריית עבודות מרשימה",
      "אנימציות ואפקטים מתקדמים",
      "פילטרים לקטגוריות",
      "אינטגרציה עם אינסטגרם",
      "טופס יצירת קשר",
      "דף אודות מעוצב",
      "אפשרות להורדת קבצים"
    ]
  },
  restaurant: {
    title: "משרד עורך דין",
    description: "אתר משרד עורך דין מעוצב עם תוכן אינטראקטיבי. מתאים למשרדי עורכי דין ויועצים משפטיים. כולל הצגת תחומי התמחות, צוות המשרד, ומערכת תיאום פגישות.",
    price: "החל מ-₪2,549",
    originalPrice: "₪5,899",
    discount: "57%",
    previewUrl: "https://vipoconnect.github.io/-/",
    previewImage: "https://vipoconnect.github.io/3/images/%D7%A2%D7%95%D7%A8%D7%9A%20%D7%93%D7%99%D7%9F.jpg",
    rating: "(22)",
    features: [
      "עיצוב מקצועי ואמין",
      "מערכת תיאום פגישות",
      "הצגת תחומי התמחות",
      "פרופילי עורכי דין",
      "בלוג משפטי",
      "ביקורות לקוחות",
      "התאמה למובייל"
    ]
  }
};

// אתחול כשהדף נטען
document.addEventListener('DOMContentLoaded', () => {
  // הפעלת פונקציונליות לכפתור "לאתר הבא"
  const nextSiteButton = document.getElementById('next-site-btn');
  nextSiteButton?.addEventListener('click', goToNextSite);
  
  // הפעלת פונקציונליות לכפתור "צפה באתר" החדש מתחת לכפתורי הגישה המהירה
  const quickViewButton = document.getElementById('quick-preview-site-cta');
  if (quickViewButton) {
    quickViewButton.addEventListener('click', () => {
      const iframe = document.getElementById('site-preview-iframe');
      if (iframe && iframe.src) {
        window.open(iframe.src, '_blank');
      }
    });
  }
  
  // הפעלת פונקציונליות לכפתורי הגישה המהירה
  document.querySelectorAll('.site-quick-btn').forEach(button => {
    button.addEventListener('click', function() {
      const siteType = this.getAttribute('data-site');
      updateSitePreview(siteType);
    });
  });
  
  // הפעלת פונקציית האתחול הראשית
  initApp();
  
  // טיפול בטופס יצירת קשר
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // קבלת הערכים מהטופס
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // יצירת הודעה מפורמטת לוואטסאפ
      let subjectText = '';
      if (subject === 'general') {
        subjectText = 'שאלה כללית';
      } else if (subject === 'support') {
        subjectText = 'תמיכה טכנית';
      } else if (subject === 'purchase') {
        subjectText = 'רכישת אתר';
      } else if (subject === 'custom') {
        subjectText = 'אתר מותאם אישית';
      }
      
      const whatsappMessage = 
        `*פנייה חדשה מהאתר*%0A%0A` +
        `*שם:* ${name}%0A` +
        `*טלפון:* ${phone}%0A` +
        `*אימייל:* ${email}%0A` +
        `*נושא:* ${subjectText}%0A` +
        `*הודעה:* ${message}`;
      
      // יצירת קישור לוואטסאפ עם ההודעה
      const whatsappNumber = '972555545821'; // מספר הטלפון בפורמט בינלאומי
      const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      
      // פתיחת חלון חדש עם קישור לוואטסאפ
      window.open(whatsappLink, '_blank');
      
      // הצגת הודעת הצלחה
      alert('הטופס נשלח לוואטסאפ! תודה על פנייתך.');
      
      // איפוס הטופס
      this.reset();
    });
  }
  
  // גלילה לתחילת העמוד בעת טעינת האתר
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // טיפול בלחיצות על כרטיסי הפתרונות
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('click', function() {
      // בדיקה אם הכרטיסייה כבר פעילה
      const isActive = this.classList.contains('active');
      
      // סגירת כל הכרטיסיות הפתוחות
      featureCards.forEach(c => c.classList.remove('active'));
      
      // אם הכרטיסייה לא הייתה פעילה, הפוך אותה לפעילה
      if (!isActive) {
        this.classList.add('active');
      }
    });
  });
  
  // שיפור האינטראקציה עם כפתורי בחר אתר מוכן
  const siteQuickButtons = document.querySelectorAll('.site-quick-btn');

  // הוספת מחלקת active לכפתור הנבחר
  siteQuickButtons.forEach(button => {
    button.addEventListener('click', function() {
      // הסרת המחלקה active מכל הכפתורים
      siteQuickButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // הוספת המחלקה active לכפתור שנלחץ
      this.classList.add('active');
      
      // הוספת אפקט נוסף בלחיצה
      this.classList.add('btn-clicked');
      
      // הסרת האפקט אחרי הסיום
      setTimeout(() => {
        this.classList.remove('btn-clicked');
      }, 500);
    });
  });

  // הגדרת הכפתור הראשון כפעיל בטעינת העמוד
  document.addEventListener('DOMContentLoaded', function() {
    // בדיקה אם יש כפתורים
    if (siteQuickButtons.length > 0) {
      // הפעלת הכפתור הראשון
      siteQuickButtons[0].classList.add('active');
    }
  });
  
  // טיפול בלחיצות על כרטיסי "למה לבחור בנו"
  document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
      card.addEventListener('click', function() {
        // בדיקה אם הכרטיסייה כבר פעילה
        const isActive = this.classList.contains('active');
        
        // סגירת כל הכרטיסיות הפתוחות
        featureCards.forEach(c => c.classList.remove('active'));
        
        // אם הכרטיסייה לא הייתה פעילה, הפוך אותה לפעילה
        if (!isActive) {
          this.classList.add('active');
        }
      });
    });
  });
});

// פונקציונליות לחלון קופץ לטקסט של קטגוריות האתרים במובייל
document.addEventListener('DOMContentLoaded', function() {
  const categoryCards = document.querySelectorAll('.category-card');
  const categoryPopup = document.querySelector('.category-popup');
  const categoryPopupTitle = document.querySelector('.category-popup-title');
  const categoryPopupContent = document.querySelector('.category-popup-content');
  const categoryPopupClose = document.querySelector('.category-popup-close');
  const categoryPopupOverlay = document.querySelector('.category-popup-overlay');
  
  // פונקציה לפתיחת החלון הקופץ
  function openCategoryPopup(title, content) {
    // הוספת תוכן מעוצב יותר
    const formattedContent = formatPopupContent(content);
    
    categoryPopupTitle.textContent = title;
    categoryPopupContent.innerHTML = formattedContent;
    
    // הסרת קלאס סגירה אם קיים
    categoryPopup.classList.remove('closing');
    
    // הוספת קלאס אקטיבי
    categoryPopup.classList.add('active');
    categoryPopupOverlay.classList.add('active');
    
    // מניעת גלילה ברקע
    document.body.style.overflow = 'hidden';
  }
  
  // פונקציה לעיצוב התוכן של הפופאפ
  function formatPopupContent(content) {
    // חלוקת הטקסט לפסקאות
    const paragraphs = content.split('. ');
    let formattedContent = '';
    
    // יצירת פסקאות HTML
    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim() !== '') {
        // הדגשת מילות מפתח
        let enhancedParagraph = paragraph;
        const keywordsToHighlight = ['אתר', 'עיצוב', 'תכנות', 'מובייל', 'מותאם', 'תמיכה', 'חינמי', 'עדכונים'];
        
        keywordsToHighlight.forEach(keyword => {
          const regex = new RegExp(`(${keyword})`, 'gi');
          enhancedParagraph = enhancedParagraph.replace(regex, '<strong>$1</strong>');
        });
        
        // הוספת נקודה בסוף הפסקה האחרונה אם אין
        if (index < paragraphs.length - 1 && !enhancedParagraph.endsWith('.')) {
          enhancedParagraph += '.';
        }
        
        formattedContent += `<p>${enhancedParagraph}</p>`;
      }
    });
    
    return formattedContent;
  }
  
  // פונקציה לסגירת החלון הקופץ
  function closeCategoryPopup() {
    // הוספת אנימציית סגירה
    categoryPopup.classList.add('closing');
    categoryPopupOverlay.classList.remove('active');
    
    // המתנה לסיום האנימציה לפני הסרת קלאס אקטיבי
    setTimeout(() => {
      categoryPopup.classList.remove('active');
      categoryPopup.classList.remove('closing');
      document.body.style.overflow = ''; // החזרת הגלילה
    }, 300); // זמן האנימציה
  }
  
  // הוספת אירוע לחיצה לכל כרטיסיית קטגוריה
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      // בדיקה אם המכשיר הוא מובייל
      if (window.innerWidth <= 768) {
        const title = this.querySelector('h3').textContent;
        const content = this.querySelector('p').textContent || 'מידע נוסף על קטגוריה זו יתווסף בקרוב.';
        openCategoryPopup(title, content);
      }
    });
  });
  
  // סגירת החלון הקופץ בלחיצה על כפתור הסגירה
  categoryPopupClose.addEventListener('click', closeCategoryPopup);
  
  // סגירת החלון הקופץ בלחיצה על הרקע
  categoryPopupOverlay.addEventListener('click', closeCategoryPopup);
  
  // סגירת החלון הקופץ בלחיצה על מקש Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && categoryPopup.classList.contains('active')) {
      closeCategoryPopup();
    }
  });
});

// פונקציונליות לחלון קופץ לטקסט של קטגוריות האתרים במובייל
document.addEventListener('DOMContentLoaded', function() {
  const categoryCards = document.querySelectorAll('.category-card');
  const categoryPopup = document.querySelector('.category-popup');
  const categoryPopupTitle = document.querySelector('.category-popup-title');
  const categoryPopupContent = document.querySelector('.category-popup-content');
  const categoryPopupClose = document.querySelector('.category-popup-close');
  const categoryPopupOverlay = document.querySelector('.category-popup-overlay');
  
  // פונקציה לפתיחת החלון הקופץ
  function openCategoryPopup(title, content) {
    // הוספת תוכן מעוצב יותר
    const formattedContent = formatPopupContent(content);
    
    categoryPopupTitle.textContent = title;
    categoryPopupContent.innerHTML = formattedContent;
    
    // הסרת קלאס סגירה אם קיים
    categoryPopup.classList.remove('closing');
    
    // הוספת קלאס אקטיבי
    categoryPopup.classList.add('active');
    categoryPopupOverlay.classList.add('active');
    
    // מניעת גלילה ברקע
    document.body.style.overflow = 'hidden';
  }
  
  // פונקציה לעיצוב התוכן של הפופאפ
  function formatPopupContent(content) {
    // חלוקת הטקסט לפסקאות
    const paragraphs = content.split('. ');
    let formattedContent = '';
    
    // יצירת פסקאות HTML
    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim() !== '') {
        // הדגשת מילות מפתח
        let enhancedParagraph = paragraph;
        const keywordsToHighlight = ['אתר', 'עיצוב', 'תכנות', 'מובייל', 'מותאם', 'תמיכה', 'חינמי', 'עדכונים'];
        
        keywordsToHighlight.forEach(keyword => {
          const regex = new RegExp(`(${keyword})`, 'gi');
          enhancedParagraph = enhancedParagraph.replace(regex, '<strong>$1</strong>');
        });
        
        // הוספת נקודה בסוף הפסקה האחרונה אם אין
        if (index < paragraphs.length - 1 && !enhancedParagraph.endsWith('.')) {
          enhancedParagraph += '.';
        }
        
        formattedContent += `<p>${enhancedParagraph}</p>`;
      }
    });
    
    return formattedContent;
  }
  
  // פונקציה לסגירת החלון הקופץ
  function closeCategoryPopup() {
    // הוספת אנימציית סגירה
    categoryPopup.classList.add('closing');
    categoryPopupOverlay.classList.remove('active');
    
    // המתנה לסיום האנימציה לפני הסרת קלאס אקטיבי
    setTimeout(() => {
      categoryPopup.classList.remove('active');
      categoryPopup.classList.remove('closing');
      document.body.style.overflow = ''; // החזרת הגלילה
    }, 300); // זמן האנימציה
  }
  
  // הוספת אירוע לחיצה לכל כרטיסיית קטגוריה
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      // בדיקה אם המכשיר הוא מובייל
      if (window.innerWidth <= 768) {
        const title = this.querySelector('h3').textContent;
        const content = this.querySelector('p').textContent || 'מידע נוסף על קטגוריה זו יתווסף בקרוב.';
        openCategoryPopup(title, content);
      }
    });
  });
  
  // סגירת החלון הקופץ בלחיצה על כפתור הסגירה
  categoryPopupClose.addEventListener('click', closeCategoryPopup);
  
  // סגירת החלון הקופץ בלחיצה על הרקע
  categoryPopupOverlay.addEventListener('click', closeCategoryPopup);
  
  // סגירת החלון הקופץ בלחיצה על מקש Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && categoryPopup.classList.contains('active')) {
      closeCategoryPopup();
    }
  });
});

// פונקציית אתחול ראשית
function initApp() {
  // אתחול אלמנטים
  cube = document.querySelector('.cube');
  canvas = document.getElementById('webgl-canvas');
  
  // אתחול סצנת תלת-ממד
  initThreeJS();
  
  // אתחול הקוביה
  initCube();
  
  // אתחול אירועים
  initEvents();
  
  // אתחול צ'אט
  initChat();
  
  // אתחול מודאל
  initModal();
  
  // אתחול אירועי גלילה
  initScrollEvents();
  
  // אתחול תצוגת האתר
  initSitePreview();
}

// אתחול סצנת תלת-ממד
function initThreeJS() {
  // יצירת סצנה
  scene = new THREE.Scene();
  
  // יצירת מצלמה
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  
  // יצירת רנדרר
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // יצירת תאורה
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  // יצירת רקע גרדיאנט עם גריד
  createBackground();
  
  // התחלת לולאת האנימציה
  animate();
  
  // טיפול בשינוי גודל החלון
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// יצירת רקע תלת-ממדי
function createBackground() {
  // יצירת גריד
  const gridHelper = new THREE.GridHelper(20, 20, 0x4a6cf7, 0x334155);
  gridHelper.position.y = -2;
  scene.add(gridHelper);
  
  // יצירת חלקיקים
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x4a6cf7,
    transparent: true,
    opacity: 0.8
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  // אנימציה לחלקיקים
  function animateParticles() {
    particlesMesh.rotation.y += 0.001;
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
}

// לולאת אנימציה
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// אתחול הקוביה
function initCube() {
  // הגדרת משתנים גלובליים
  cube = document.querySelector('.cube');
  isAutoRotating = true;
  
  // הגדרת מצב התחלתי של הקוביה להצגת אתר חדר כושר (top) ובינה מלאכותית (bottom)
  rotationX = 180; // סיבוב לכיוון הפאה העליונה (חדר כושר)
  rotationY = 0;
  
  // עדכון מיידי של סיבוב הקוביה
  updateCubeRotation();
  
  // התחלת סיבוב אוטומטי
  startAutoRotate();
  
  // הוספת מאזיני אירועים לכפתורי השליטה
  document.getElementById('resetCube').addEventListener('click', resetCube);
  document.getElementById('autoRotate').addEventListener('click', startAutoRotate);
  document.getElementById('stopRotate').addEventListener('click', stopAutoRotate);
  
  // הוספת מאזיני אירועים לפאות הקוביה
  document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', function() {
      const siteType = this.getAttribute('data-site');
      updateSitePreview(siteType);
      // עצירת הסיבוב בעת לחיצה על פאה
      stopAutoRotate();
      
      // גלילה לאזור תצוגת האתר
      document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // הוספת מאזיני אירועים לטקסט בפאות הקוביה
  document.querySelectorAll('.face-title').forEach(title => {
    title.addEventListener('click', function(e) {
      // מניעת התפשטות האירוע כדי למנוע הפעלה כפולה
      e.stopPropagation();
      
      // קבלת סוג האתר מהפאה ההורה
      const parentFace = this.closest('.face');
      if (parentFace) {
        const siteType = parentFace.getAttribute('data-site');
        updateSitePreview(siteType);
        // עצירת הסיבוב בעת לחיצה על הטקסט
        stopAutoRotate();
        
        // גלילה לאזור תצוגת האתר
        document.getElementById('popular').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// התחלת סיבוב אוטומטי עם אפקט זום אאוט
function startAutoRotate() {
  if (autoRotateInterval) clearInterval(autoRotateInterval);
  
  isAutoRotating = true;
  document.getElementById('autoRotate').classList.add('active');
  document.getElementById('stopRotate').classList.remove('active');
  
  let angle = 0;
  let initialSpeed = 8.0; // מהירות התחלתית גבוהה מאוד
  let normalSpeed = 0.5; // מהירות רגילה
  let currentSpeed = initialSpeed;
  let slowDownTime = 5000; // זמן האטה (5 שניות)
  let startTime = Date.now();
  
  // הוספת משתנים לאפקט הזום
  let zoomCycle = 0;
  let zoomPhase = 'out'; // מצב התחלתי: זום אאוט
  let minZoom = -150; // ערך ברירת מחדל
  let maxZoom = -350; // זום אאוט מקסימלי
  let zoomSpeed = 0.5; // מהירות הזום
  let currentZoom = minZoom;
  let zoomInterval = 10000; // 10 שניות לכל מחזור זום מלא
  let lastZoomTime = Date.now();
  
  // עדכון ה-CSS של הקוביה
  const cubeWrapper = document.querySelector('.cube-wrapper');
  
  autoRotateInterval = setInterval(() => {
    // חישוב המהירות הנוכחית - האטה הדרגתית
    let elapsed = Date.now() - startTime;
    if (elapsed < slowDownTime) {
      // האטה הדרגתית ממהירות גבוהה למהירות רגילה
      currentSpeed = initialSpeed - ((initialSpeed - normalSpeed) * (elapsed / slowDownTime));
    } else {
      currentSpeed = normalSpeed;
    }
    
    angle += currentSpeed;
    
    // סיבוב מורכב שמציג את כל הפאות
    rotationY = angle;
    
    // סיבוב מלא על ציר X ללא הגבלה
    rotationX = 30 * Math.sin(angle / 20);
    
    // חישוב אפקט הזום
    let currentTime = Date.now();
    let zoomElapsed = currentTime - lastZoomTime;
    
    // חישוב מיקום בתוך מחזור הזום
    let zoomProgress = (zoomElapsed % zoomInterval) / zoomInterval;
    
    // חישוב ערך הזום הנוכחי בהתבסס על פונקציית סינוס לתנועה חלקה
    currentZoom = minZoom + (Math.sin(zoomProgress * Math.PI * 2 - Math.PI/2) + 1) / 2 * (maxZoom - minZoom);
    
    // עדכון הטרנספורם של הקוביה עם ערך הזום
    if (cubeWrapper) {
      cubeWrapper.style.transform = `translateZ(${currentZoom}px)`;
    }
    
    updateCubeRotation();
  }, 20); // הקטנת המרווח בין עדכונים לתנועה חלקה יותר
}

// אנימציות אוטומטיות לכפתורי קטגוריות האתרים
document.addEventListener('DOMContentLoaded', function() {
  // מצא את כל כפתורי הקטגוריות
  const categoryCards = document.querySelectorAll('.category-card');
  
  // הוסף אפקט זוהר אקראי לכרטיסיות
  setInterval(() => {
    const randomCard = categoryCards[Math.floor(Math.random() * categoryCards.length)];
    randomCard.classList.add('highlight-pulse');
    
    setTimeout(() => {
      randomCard.classList.remove('highlight-pulse');
    }, 1000);
  }, 3000);
  
  // הוסף אירוע מעבר עכבר לכל כרטיסייה
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // השהה את האנימציה האוטומטית בזמן מעבר העכבר
      this.style.animationPlayState = 'paused';
      
      // הוסף אפקט זוהר מוגבר
      this.classList.add('hover-enhanced');
    });
    
    card.addEventListener('mouseleave', function() {
      // המשך את האנימציה האוטומטית
      this.style.animationPlayState = 'running';
      
      // הסר את אפקט הזוהר המוגבר
      this.classList.remove('hover-enhanced');
    });
  });
});
