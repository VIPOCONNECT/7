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

  // פונקציה לפתיחת אתר בחלון חדש
  function openSiteInNewWindow(siteType) {
    if (siteUrls[siteType]) {
      window.open(siteUrls[siteType], '_blank');
    }
  }

  // שינוי התנהגות פאות הקוביה
  document.querySelectorAll('.face').forEach(face => {
    // אירוע לחיצה למחשב
    face.addEventListener('click', function() {
      const siteType = this.getAttribute('data-site');
      console.log('נלחץ פאה: ' + siteType);
      openSiteInNewWindow(siteType);
      
      // עצירת הסיבוב בעת לחיצה על פאה
      if (typeof stopAutoRotate === 'function') {
        stopAutoRotate();
      }
    });
    
    // אירוע מגע למובייל
    face.addEventListener('touchend', function(e) {
      e.preventDefault(); // מניעת אירועי לחיצה כפולים
      const siteType = this.getAttribute('data-site');
      console.log('נלחץ פאה במובייל: ' + siteType);
      openSiteInNewWindow(siteType);
      
      // עצירת הסיבוב בעת לחיצה על פאה
      if (typeof stopAutoRotate === 'function') {
        stopAutoRotate();
      }
    });
  });

  // שינוי התנהגות כפתורי הקטגוריות
  document.querySelectorAll('.category-card').forEach(card => {
    // אירוע לחיצה למחשב
    card.addEventListener('click', function() {
      const categoryType = this.getAttribute('data-category');
      console.log('נלחצה קטגוריה: ' + categoryType);
      openSiteInNewWindow(categoryType);
    });
    
    // אירוע מגע למובייל
    card.addEventListener('touchend', function(e) {
      e.preventDefault();
      const categoryType = this.getAttribute('data-category');
      console.log('נלחצה קטגוריה במובייל: ' + categoryType);
      openSiteInNewWindow(categoryType);
    });
  });

  // שינוי התנהגות כפתור "לחץ כאן לעבור לאתר במסך מלא"
  const previewSiteCta = document.getElementById('preview-site-cta');
  if (previewSiteCta) {
    // אירוע לחיצה למחשב
    previewSiteCta.addEventListener('click', function() {
      console.log('נלחץ כפתור צפייה במסך מלא');
      const iframe = document.getElementById('site-preview-iframe');
      if (iframe && iframe.src) {
        window.open(iframe.src, '_blank');
      }
    });
    
    // אירוע מגע למובייל
    previewSiteCta.addEventListener('touchend', function(e) {
      e.preventDefault();
      console.log('נלחץ כפתור צפייה במסך מלא במובייל');
      const iframe = document.getElementById('site-preview-iframe');
      if (iframe && iframe.src) {
        window.open(iframe.src, '_blank');
      }
    });
  }

  // שינוי התנהגות כפתורי האתרים המהירים
  document.querySelectorAll('.site-quick-btn').forEach(button => {
    // אירוע לחיצה למחשב
    button.addEventListener('click', function() {
      const siteType = this.getAttribute('data-site');
      console.log('נלחץ כפתור מהיר: ' + siteType);
      openSiteInNewWindow(siteType);
    });
    
    // אירוע מגע למובייל
    button.addEventListener('touchend', function(e) {
      e.preventDefault();
      const siteType = this.getAttribute('data-site');
      console.log('נלחץ כפתור מהיר במובייל: ' + siteType);
      openSiteInNewWindow(siteType);
    });
  });
  
  // שינוי התנהגות כפתור מהיר בחלק העליון
  const quickPreviewSiteCta = document.getElementById('quick-preview-site-cta');
  if (quickPreviewSiteCta) {
    // אירוע לחיצה למחשב
    quickPreviewSiteCta.addEventListener('click', function() {
      console.log('נלחץ כפתור צפייה מהיר במסך מלא');
      const currentSite = document.querySelector('.site-quick-btn.active');
      if (currentSite) {
        const siteType = currentSite.getAttribute('data-site');
        openSiteInNewWindow(siteType);
      }
    });
    
    // אירוע מגע למובייל
    quickPreviewSiteCta.addEventListener('touchend', function(e) {
      e.preventDefault();
      console.log('נלחץ כפתור צפייה מהיר במסך מלא במובייל');
      const currentSite = document.querySelector('.site-quick-btn.active');
      if (currentSite) {
        const siteType = currentSite.getAttribute('data-site');
        openSiteInNewWindow(siteType);
      }
    });
  }
  
  // הוספת פתרון לבעיית "delay" בלחיצות במובייל
  document.addEventListener('touchstart', function() {}, {passive: false});
});
