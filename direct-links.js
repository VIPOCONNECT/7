// קוד לפתיחת אתרים בחלון חדש במקום בתוך iframe
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

  // שינוי התנהגות כפתור מהיר בחלק העליון
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

  // שינוי התנהגות כפתורי האתרים המהירים
  document.querySelectorAll('.site-quick-btn').forEach(button => {
    button.addEventListener('click', function() {
      const siteType = this.getAttribute('data-site');
      if (siteUrls[siteType]) {
        window.open(siteUrls[siteType], '_blank');
      }
    });
  });

  console.log('קוד פתיחת אתרים בחלון חדש נטען בהצלחה');
});
