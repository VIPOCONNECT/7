// קוד לפתיחת אתרים בחלון חדש במקום בתוך iframe
document.addEventListener('DOMContentLoaded', function() {
  // מיפוי של סוגי אתרים לכתובות URL
  const siteUrls = {
    business: "https://vipoconnect.github.io/Real-estate-brokerage/",
    ecommerce: "https://vipoconnect.github.io/face/",
    portfolio: "https://vipoconnect.github.io/AI/",
    blog: "https://vipoconnect.github.io/fitnes/", // חדר כושר
    landing: "https://vipoconnect.github.io/nails/", // ציפורניים
    restaurant: "https://vipoconnect.github.io/lawyer/" // משרד עורך דין
  };
  
  // בדיקה שכל הכתובות תקינות
  for (const [key, url] of Object.entries(siteUrls)) {
    console.log(`בדיקת כתובת לאתר ${key}: ${url}`);
  }

  // שינוי התנהגות פאות הקוביה
  document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', function() {
      const siteType = this.getAttribute('data-site');
      if (siteUrls[siteType]) {
        console.log(`פתיחת אתר מפאת קוביה: ${siteType} - ${siteUrls[siteType]}`);
        window.open(siteUrls[siteType], '_blank');
      } else {
        console.error(`לא נמצאה כתובת לסוג האתר: ${siteType}`);
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
          console.log(`פתיחת אתר מכרטיסיית קטגוריה: ${categoryType} - ${siteUrls[categoryType]}`);
          window.open(siteUrls[categoryType], '_blank');
        } else {
          console.error(`לא נמצאה כתובת לקטגוריה: ${categoryType}`);
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
        console.log(`פתיחת אתר מכפתור תצוגה מקדימה: ${iframe.src}`);
        window.open(iframe.src, '_blank');
      } else {
        // אם ה-iframe לא קיים או שאין לו מקור, פתח את האתר הנוכחי
        const currentSiteType = window.currentSiteType || 'business';
        if (siteUrls[currentSiteType]) {
          console.log(`פתיחת אתר נוכחי: ${currentSiteType} - ${siteUrls[currentSiteType]}`);
          window.open(siteUrls[currentSiteType], '_blank');
        }
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
        console.log(`פתיחת אתר מכפתור מהיר: ${iframe.src}`);
        window.open(iframe.src, '_blank');
      } else {
        // אם ה-iframe לא קיים או שאין לו מקור, פתח את האתר הנוכחי
        const currentSiteType = window.currentSiteType || 'business';
        if (siteUrls[currentSiteType]) {
          console.log(`פתיחת אתר נוכחי מכפתור מהיר: ${currentSiteType} - ${siteUrls[currentSiteType]}`);
          window.open(siteUrls[currentSiteType], '_blank');
        }
      }
    });
  }

  // שינוי התנהגות כפתורי האתרים המהירים
  document.querySelectorAll('.site-quick-btn').forEach(button => {
    button.addEventListener('click', function() {
      const siteType = this.getAttribute('data-site');
      if (siteUrls[siteType]) {
        console.log(`פתיחת אתר מכפתור מהיר: ${siteType} - ${siteUrls[siteType]}`);
        window.open(siteUrls[siteType], '_blank');
      } else {
        console.error(`לא נמצאה כתובת לסוג האתר: ${siteType}`);
      }
    });
  });

  console.log('קוד פתיחת אתרים בחלון חדש נטען בהצלחה');
});
