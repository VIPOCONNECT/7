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
    contract: "https://vipoconnect.github.io/5/",      // חוזה דיגיטלי - חדש
    hairremoval: "https://lp.landing-page.mobi/index.php?page=landing&id=605975&token=30588aaa1065b183d4946aded5faad00&CustomerId=33877&ProjectId=1059482&Domain=lp6.me&Key=oWuLz", // הסרת שיער - חדש
    massage: "https://lp.landing-page.mobi/index.php?page=landing&id=606313&token=b57749c71bf2fd4e637f94fb06b81bbb&CustomerId=33877&ProjectId=1059482&Domain=lp6.me&Key=PwDhv", // כורסת עיסוי - חדש
    cosmetics: "https://lp.landing-page.mobi/index.php?page=landing&id=607019&token=0ec910fe75377da846344db79a8ec13b&CustomerId=33877&ProjectId=1059482&Domain=lp6.me&Key=VkQFy", // קוסמטיקה - חדש
    "business-consulting": "https://lp.landing-page.mobi/index.php?page=landing&id=607497&token=68b859eb7024de6a1418d7df8f5187b9&CustomerId=33877&ProjectId=1059482&Domain=lp6.me&Key=dYvp9" // יעוץ עסקי - חדש
  };

  // שינוי התנהגות פאות הקוביה
  document.querySelectorAll('.face').forEach(face => {
    face.addEventListener('click', function() {
      const siteType = this.getAttribute('data-site');
      console.log('נלחץ פאה: ' + siteType);
      
      // פתיחת האתר בחלון חדש
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
      const categoryType = this.getAttribute('data-category');
      console.log('נלחצה קטגוריה: ' + categoryType);
      
      // פתיחת האתר בחלון חדש
      if (siteUrls[categoryType]) {
        window.open(siteUrls[categoryType], '_blank');
      }
    });
  });

  // שינוי התנהגות כפתור "לחץ כאן לעבור לאתר במסך מלא"
  const previewSiteCta = document.getElementById('preview-site-cta');
  if (previewSiteCta) {
    previewSiteCta.addEventListener('click', function() {
      console.log('נלחץ כפתור צפייה במסך מלא');
      
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
      console.log('נלחץ כפתור מהיר: ' + siteType);
      
      // פתיחת האתר בחלון חדש
      if (siteUrls[siteType]) {
        window.open(siteUrls[siteType], '_blank');
      }
    });
  });
  
  // שינוי התנהגות כפתור מהיר בחלק העליון
  const quickPreviewSiteCta = document.getElementById('quick-preview-site-cta');
  if (quickPreviewSiteCta) {
    quickPreviewSiteCta.addEventListener('click', function() {
      console.log('נלחץ כפתור צפייה מהיר במסך מלא');
      
      // פתיחת האתר הנוכחי בחלון חדש
      const currentSite = document.querySelector('.site-quick-btn.active');
      if (currentSite) {
        const siteType = currentSite.getAttribute('data-site');
        if (siteUrls[siteType]) {
          window.open(siteUrls[siteType], '_blank');
        }
      }
    });
  }
});
