// פונקציונליות לחלון קופץ ליתרונות בסעיף "למה לבחור בנו?"
document.addEventListener('DOMContentLoaded', function() {
  const featureCards = document.querySelectorAll('.feature-card');
  const featurePopup = document.querySelector('.feature-popup');
  const featurePopupTitle = document.querySelector('.feature-popup-title');
  const featurePopupContent = document.querySelector('.feature-popup-content');
  const featurePopupClose = document.querySelector('.feature-popup-close');
  const featurePopupOverlay = document.querySelector('.feature-popup-overlay');
  
  // בדיקה שכל האלמנטים קיימים
  if (!featurePopup || !featurePopupTitle || !featurePopupContent || !featurePopupClose || !featurePopupOverlay) {
    console.error('אחד או יותר מאלמנטי החלון הקופץ של היתרונות חסרים בדף');
    return;
  }
  
  // פונקציה לפתיחת החלון הקופץ
  function openFeaturePopup(title, content) {
    console.log('פתיחת חלון קופץ של יתרונות עם כותרת:', title);
    
    // הוספת תוכן מעוצב יותר
    const formattedContent = formatFeaturePopupContent(content);
    
    featurePopupTitle.textContent = title;
    featurePopupContent.innerHTML = formattedContent;
    
    // הסרת קלאס סגירה אם קיים
    featurePopup.classList.remove('closing');
    
    // הוספת קלאס אקטיבי
    featurePopup.classList.add('active');
    featurePopupOverlay.classList.add('active');
    
    // מניעת גלילה ברקע
    document.body.style.overflow = 'hidden';
  }
  
  // פונקציה לעיצוב התוכן של הפופאפ
  function formatFeaturePopupContent(content) {
    // חלוקת הטקסט לפסקאות לפי <br> או נקודות
    const paragraphs = content.includes('<br>') ? content.split('<br>') : content.split('. ');
    let formattedContent = '';
    
    // יצירת פסקאות HTML
    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim() !== '') {
        // הדגשת מילות מפתח
        let enhancedParagraph = paragraph;
        const keywordsToHighlight = ['אתר', 'עיצוב', 'תכנות', 'מובייל', 'מותאם', 'תמיכה', 'חינמי', 'עדכונים', 'מהירות', 'טעינה', 'SEO', 'גוגל', 'מודרני', 'התאמה'];
        
        keywordsToHighlight.forEach(keyword => {
          const regex = new RegExp(`(${keyword})`, 'gi');
          enhancedParagraph = enhancedParagraph.replace(regex, '<strong>$1</strong>');
        });
        
        // הוספת נקודה בסוף הפסקה האחרונה אם אין ואם לא מדובר בפיצול לפי <br>
        if (!content.includes('<br>') && index < paragraphs.length - 1 && !enhancedParagraph.endsWith('.')) {
          enhancedParagraph += '.';
        }
        
        formattedContent += `<p>${enhancedParagraph}</p>`;
      }
    });
    
    return formattedContent;
  }
  
  // פונקציה לסגירת החלון הקופץ
  function closeFeaturePopup() {
    console.log('סגירת חלון קופץ של יתרונות');
    
    // הוספת אנימציית סגירה
    featurePopup.classList.add('closing');
    featurePopupOverlay.classList.remove('active');
    
    // המתנה לסיום האנימציה לפני הסרת קלאס אקטיבי
    setTimeout(() => {
      featurePopup.classList.remove('active');
      featurePopup.classList.remove('closing');
      document.body.style.overflow = ''; // החזרת הגלילה
    }, 300); // זמן האנימציה
  }
  
  // הוספת אירוע לחיצה לכל כרטיסיית יתרון
  featureCards.forEach(card => {
    card.addEventListener('click', function() {
      // בדיקה אם המכשיר הוא מובייל
      if (window.innerWidth <= 768) {
        const title = this.querySelector('h3').textContent;
        const content = this.querySelector('p').textContent || 'מידע נוסף על יתרון זה יתווסף בקרוב.';
        openFeaturePopup(title, content);
        console.log('נלחץ כרטיס יתרון:', title);
      }
    });
  });
  
  // סגירת החלון הקופץ בלחיצה על כפתור הסגירה
  featurePopupClose.addEventListener('click', closeFeaturePopup);
  
  // סגירת החלון הקופץ בלחיצה על הרקע
  featurePopupOverlay.addEventListener('click', closeFeaturePopup);
  
  // סגירת החלון הקופץ בלחיצה על מקש Escape
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && featurePopup.classList.contains('active')) {
      closeFeaturePopup();
    }
  });
});
