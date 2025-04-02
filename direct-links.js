// קוד לפתיחת אתרים בחלון חדש במקום בתוך iframe
document.addEventListener('DOMContentLoaded', function() {
  // מיפוי של סוגי אתרים לכתובות URL
  const siteUrls = {
    business: "https://vipoconnect.github.io/Real-estate-brokerage/",
    ecommerce: "https://vipoconnect.github.io/face/",
    portfolio: "https://vipoconnect.github.io/3/",     // בינה מלאכותית - עודכן
    blog: "https://vipoconnect.github.io/fitnes/",     // חדר כושר - עודכן
    landing: "https://vipoconnect.github.io/fitnes/",  // ציפורניים - משתמש באתר חדר כושר כרגע
    restaurant: "https://vipoconnect.github.io/-/",    // משרד עורך דין - עודכן
    vipo: "http://vipo.ltd/",                          // אתר vipo - חדש
    video: "https://vipoconnect.github.io/24-H-woork/", // סרטון פרסום לעסק - חדש
    studio: "https://vipoconnect.github.io/3D-ready-websites/", // סטודיו דיגיטל - חדש
    design: "https://vipoconnect.github.io/3D/",       // עיצוב דיגיטלי - חדש
    contract: "https://vipoconnect.github.io/5/"       // חוזה דיגיטלי - חדש
  };

  // שינוי התנהגות פאות הקוביה
  document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', function() {
      const siteType = this.getAttribute('data-site');
      if (siteUrls[siteType]) {
        window.open(siteUrls[siteType], '_blank');
      }
      // עצירת הסיבוב בעת לחיצה על פאה
      if (typeof stopAutoRotate === 'function') {
        stopAutoRotate();
      }
    });
  });

  // שינוי התנהגות כפתורי הקטגוריות
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      // בדיקה אם המכשיר הוא מובייל - אם כן, נשאיר את ההתנהגות המקורית של פתיחת פופאפ
      if (window.innerWidth > 768) {
        const categoryType = this.getAttribute('data-category');
        if (siteUrls[categoryType]) {
          window.open(siteUrls[categoryType], '_blank');
        }
      }
    });
  });

  // שינוי התנהגות כפתור "לחץ כאן לעבור לאתר במסך מלא"
  const previewSiteCta = document.getElementById('preview-site-cta');
  if (previewSiteCta) {
    previewSiteCta.addEventListener('click', function() {
      // פתיחת האתר הנוכחי בחלון חדש
      const iframe = document.getElementById('site-preview-iframe');
      if (iframe && iframe.src) {
        window.open(iframe.src, '_blank');
      }
    });
  }

  // ביטול הפונקציונליות של כפתור מהיר בחלק העליון - הכפתור מוסתר ב-CSS
  /* 
  const quickPreviewSiteCta = document.getElementById('quick-preview-site-cta');
  if (quickPreviewSiteCta) {
    quickPreviewSiteCta.addEventListener('click', function() {
      // פתיחת האתר הנוכחי בחלון חדש
      const iframe = document.getElementById('site-preview-iframe');
      if (iframe && iframe.src) {
        window.open(iframe.src, '_blank');
      }
    });
  }
  */

  // שינוי התנהגות כפתורי האתרים המהירים
  document.querySelectorAll('.site-quick-btn').forEach(button => {
    button.addEventListener('click', function() {
      const siteType = this.getAttribute('data-site');
      if (siteUrls[siteType]) {
        window.open(siteUrls[siteType], '_blank');
      }
    });
  });

  // ביטול הפונקציונליות של כפתור "לחץ כאן לעבור לאתר במסך מלא"
  /* 
  const previewSiteCta = document.getElementById('preview-site-cta');
  if (previewSiteCta) {
    previewSiteCta.addEventListener('click', function() {
      // פתיחת האתר הנוכחי בחלון חדש
      const iframe = document.getElementById('site-preview-iframe');
      if (iframe && iframe.src) {
        window.open(iframe.src, '_blank');
      }
    });
  }
  */
});
