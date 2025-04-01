// סקריפט לטיפול בקוביה התלת-ממדית במובייל
document.addEventListener('DOMContentLoaded', function() {
  // בדיקה אם המכשיר הוא מובייל
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // העתקת הקוביה התלת-ממדית מהקנבס המקורי לקנבס המובייל
    const originalCanvas = document.getElementById('webgl-canvas');
    const mobileCanvas = document.getElementById('mobile-webgl-canvas');
    
    // יצירת סצנת תלת-ממד חדשה למובייל
    function initMobileCube() {
      // קבלת הקונטקסט של הקנבס למובייל
      const renderer = new THREE.WebGLRenderer({
        canvas: mobileCanvas,
        antialias: true,
        alpha: true
      });
      
      renderer.setSize(mobileCanvas.clientWidth, mobileCanvas.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      
      // יצירת סצנה
      const scene = new THREE.Scene();
      
      // יצירת מצלמה
      const camera = new THREE.PerspectiveCamera(75, mobileCanvas.clientWidth / mobileCanvas.clientHeight, 0.1, 1000);
      camera.position.z = 5;
      
      // יצירת קוביה
      const cubeSize = 3;
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      
      // טעינת הטקסטורות לפאות הקוביה
      const textureLoader = new THREE.TextureLoader();
      const materials = [
        new THREE.MeshBasicMaterial({ map: textureLoader.load('img/business.webp') }), // ימין
        new THREE.MeshBasicMaterial({ map: textureLoader.load('img/ecommerce.webp') }), // שמאל
        new THREE.MeshBasicMaterial({ map: textureLoader.load('img/landing.webp') }), // למעלה
        new THREE.MeshBasicMaterial({ map: textureLoader.load('img/restaurant.webp') }), // למטה
        new THREE.MeshBasicMaterial({ map: textureLoader.load('img/portfolio.webp') }), // קדימה
        new THREE.MeshBasicMaterial({ map: textureLoader.load('img/blog.webp') }) // אחורה
      ];
      
      // יצירת הקוביה
      const cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);
      
      // הוספת אור לסצנה
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // אנימציית סיבוב הקוביה
      function animate() {
        requestAnimationFrame(animate);
        
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        
        renderer.render(scene, camera);
      }
      
      // התחלת האנימציה
      animate();
      
      // התאמת גודל הקנבס בעת שינוי גודל החלון
      window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
          camera.aspect = mobileCanvas.clientWidth / mobileCanvas.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mobileCanvas.clientWidth, mobileCanvas.clientHeight);
        }
      });
    }
    
    // אתחול הקוביה למובייל
    initMobileCube();
  }
});
