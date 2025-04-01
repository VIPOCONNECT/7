// קוד JavaScript לטיפול באירועי לחיצה על כפתורי הקטגוריות המעוצבים
document.addEventListener('DOMContentLoaded', function() {
  // מיפוי של סוגי אתרים לכתובות URL
  const siteUrls = {
    business: "https://vipoconnect.github.io/Real-estate-brokerage/",
    ecommerce: "https://vipoconnect.github.io/face/",
    portfolio: "https://vipoconnect.github.io/AI/",
    blog: "https://vipoconnect.github.io/lawyer/",
    landing: "https://vipoconnect.github.io/fitnes/",
    restaurant: "https://vipoconnect.github.io/nails/"
  };

  // הוספת אירועי לחיצה לכפתורי "צפה באתר"
  document.querySelectorAll('.category-card .site-cta').forEach(button => {
    button.addEventListener('click', function(e) {
      // מניעת התפשטות האירוע כדי שהקלף עצמו לא יגיב ללחיצה
      e.stopPropagation();
      
      // קבלת סוג האתר מהקלף ההורה
      const parentCard = this.closest('.category-card');
      if (parentCard) {
        const categoryType = parentCard.getAttribute('data-category');
        if (siteUrls[categoryType]) {
          // פתיחת האתר בחלון חדש
          window.open(siteUrls[categoryType], '_blank');
        }
      }
    });
  });

  // הוספת אירועי לחיצה לקלפים עצמם
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      // בדיקה אם המכשיר הוא מובייל
      if (window.innerWidth <= 768) {
        // במובייל, פתיחת החלון הקופץ עם המידע
        const title = this.querySelector('h3').textContent;
        const content = this.querySelector('p').textContent || 'מידע נוסף על קטגוריה זו יתווסף בקרוב.';
        
        // בדיקה אם פונקציית openCategoryPopup קיימת (מוגדרת בקובץ אחר)
        if (typeof openCategoryPopup === 'function') {
          openCategoryPopup(title, content);
        }
      } else {
        // במחשב, פתיחת האתר בחלון חדש
        const categoryType = this.getAttribute('data-category');
        if (siteUrls[categoryType]) {
          window.open(siteUrls[categoryType], '_blank');
        }
      }
    });
  });

  // אנימציית כניסה לקלפים
  function animateCards() {
    const cards = document.querySelectorAll('.category-card');
    cards.forEach((card, index) => {
      // הוספת קלאס אנימציה עם השהייה שונה לכל קלף
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // הפעלת אנימציית הכניסה כשהדף נטען
  animateCards();

  // הוספת אירוע גלילה להפעלת אנימציית הכניסה כשמגיעים לאזור הקטגוריות
  window.addEventListener('scroll', function() {
    const categoriesSection = document.getElementById('categories');
    if (categoriesSection) {
      const rect = categoriesSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        animateCards();
      }
    }
  });

  console.log('קוד JavaScript לקלפי הקטגוריות נטען בהצלחה');
});
