// קוד JavaScript פשוט להפעלת אפקט הקליק על כרטיסי התכונות
document.addEventListener('DOMContentLoaded', function() {
  console.log("Feature toggle script loaded");
  
  // בחירת כל כרטיסי התכונות
  const featureCards = document.querySelectorAll('.feature-card');
  
  // הוספת אירוע לחיצה לכל כרטיס
  featureCards.forEach(function(card) {
    card.addEventListener('click', function() {
      // בדיקה אם הכרטיס כבר פעיל
      const isActive = this.classList.contains('active');
      
      // סגירת כל הכרטיסים
      featureCards.forEach(function(c) {
        c.classList.remove('active');
      });
      
      // אם הכרטיס לא היה פעיל, הפעל אותו
      if (!isActive) {
        this.classList.add('active');
      }
    });
  });
});
