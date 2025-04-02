// קוד JavaScript להפעלת אפקט הקליק על כרטיסי התכונות
document.addEventListener('DOMContentLoaded', function() {
  console.log("Feature toggle script loaded");
  
  // בחירת כל כרטיסי התכונות
  const featureCards = document.querySelectorAll('.feature-card');
  console.log("Found " + featureCards.length + " feature cards");
  
  // הוספת אירוע לחיצה לכל כרטיס
  featureCards.forEach(card => {
    card.addEventListener('click', function(event) {
      console.log("Card clicked: ", this);
      
      // בדיקה אם הכרטיס כבר פעיל
      const isActive = this.classList.contains('active');
      console.log("Is active: ", isActive);
      
      // סגירת כל הכרטיסים הפעילים
      featureCards.forEach(c => {
        c.classList.remove('active');
      });
      
      // אם הכרטיס לא היה פעיל, הפעל אותו
      if (!isActive) {
        this.classList.add('active');
      }
      
      // מניעת התפשטות האירוע
      event.stopPropagation();
    });
  });
  
  // סגירת כרטיס פעיל בלחיצה מחוץ לכרטיסים
  document.addEventListener('click', function(event) {
    // בדיקה אם הלחיצה היתה מחוץ לכרטיסים
    if (!event.target.closest('.feature-card')) {
      // סגירת כל הכרטיסים הפעילים
      featureCards.forEach(card => {
        card.classList.remove('active');
      });
    }
  });
  
  // הוספת אירוע לחיצה לכל פסקת תיאור כדי למנוע סגירה בלחיצה על הטקסט
  document.querySelectorAll('.feature-description').forEach(desc => {
    desc.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  });
  
  // בדיקה אם הסקריפט נטען כראוי
  console.log("Feature toggle script initialized");
});
