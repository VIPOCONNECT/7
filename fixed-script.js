// פונקציונליות לחלון קופץ לטקסט של קטגוריות האתרים
document.addEventListener('DOMContentLoaded', function() {
  const categoryCards = document.querySelectorAll('.category-card');
  const categoryPopup = document.querySelector('.category-popup');
  const categoryPopupTitle = document.querySelector('.category-popup-title');
  const categoryPopupContent = document.querySelector('.category-popup-content');
  const categoryPopupClose = document.querySelector('.category-popup-close');
  const categoryPopupOverlay = document.querySelector('.category-popup-overlay');
  
  // בדיקה שכל האלמנטים קיימים
  if (!categoryPopup || !categoryPopupTitle || !categoryPopupContent || !categoryPopupClose || !categoryPopupOverlay) {
    console.error('אחד או יותר מאלמנטי החלון הקופץ חסרים בדף');
    return;
  }
  
  // פונקציה לפתיחת החלון הקופץ
  function openCategoryPopup(title, content) {
    console.log('פתיחת חלון קופץ עם כותרת:', title);
    
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
    // חלוקת הטקסט לפסקאות לפי <br> או נקודות
    const paragraphs = content.includes('<br>') ? content.split('<br>') : content.split('. ');
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
  function closeCategoryPopup() {
    console.log('סגירת חלון קופץ');
    
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
      // הסרת ההגבלה למובייל - החלון הקופץ יפעל בכל גודל מסך
      const title = this.querySelector('h3').textContent;
      const content = this.querySelector('p').textContent || 'מידע נוסף על קטגוריה זו יתווסף בקרוב.';
      openCategoryPopup(title, content);
      console.log('נלחץ כרטיס קטגוריה:', title);
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
