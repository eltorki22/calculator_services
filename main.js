const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const text = e.target.dataset.text;

        switch (text) {
            case 'ac':
                clear();
                return;
            case 'last':
                deleteLast();
                return;
            case '=':
                calculate();
                return;
        }

        if (display.innerText === '0') {
            display.innerText = '';
        }

        display.innerText += text;
    });
});

function clear() {
    display.innerText = '0';
}

function deleteLast() {
    const current = display.innerText;
    if (current.length <= 1) {
        display.innerText = '0';
    } else {
        display.innerText = current.slice(0, -1);
    }
}

function calculate() {
    let expr = display.innerText
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

    try {
        const result = math.evaluate(expr);
        display.innerText = result;
    } catch (error) {
        display.innerText = 'Error';
    }
}


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
 
    // وظيفة للتأكد أن الصوت يشغل فقط بعد تفاعل المستخدم
let userInteracted = false;

document.body.addEventListener('click', () => {
  userInteracted = true;
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
}, { once: true });  // مرة واحدة فقط

function playNotificationSound() {
  if (!userInteracted) return; // لن يشغل الصوت إلا بعد تفاعل المستخدم
  const audio = new Audio('/calculator_services/sounds/1.mp3');
  audio.play().catch((e) => console.warn('الصوت لم يعمل:', e));
}

function sendNotificationWithSound(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/calculator_services/img/apple-touch-icon.png'
    });
    playNotificationSound();
  }
}

// إشعار كل 20 ثانية فقط إذا الإذن granted والمستخدم تفاعل
setInterval(() => {
  if (Notification.permission === 'granted' && userInteracted) {
    sendNotificationWithSound('🔔 تنبيه', 'مر 20 ثانية وانت بتستخدم الآلة الحاسبة');
  }
}, 20000);

  });
}









// let deferredPrompt;
// const installBtn = document.getElementById('installBtn');

// // حدث يظهر عند توفّر خيار التثبيت
// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault(); // منع ظهور البانر التلقائي
//   deferredPrompt = e;
//   installBtn.style.display = 'block'; // إظهار الزر
// });

// // لما يضغط المستخدم على الزر
// installBtn.addEventListener('click', () => {
//   installBtn.style.display = 'none'; // إخفاؤه مؤقتًا
//   if (deferredPrompt) {
//     deferredPrompt.prompt(); // إظهار نافذة التثبيت
//     deferredPrompt.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === 'accepted') {
//         console.log('User accepted the install prompt');
//       } else {
//         console.log('User dismissed the install prompt');
//       }
//       deferredPrompt = null;
//     });
//   }
// });



let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// هل التطبيق يعمل كـ PWA؟
const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

// تغيير الزر حسب الحالة
if (isStandalone) {
  installBtn.textContent = '🗑️ إلغاء التثبيت';
  installBtn.addEventListener('click', () => {
    alert('لحذف التطبيق، الرجاء حذفه من الشاشة الرئيسية يدويًا 🙏');
  });
} else {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none';
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    }
  });
}



// === الإشعارات المتكررة مع صوت ===
function playNotificationSound() {
  const audio = new Audio('/calculator_services/sounds/1.mp3');
  audio.play().catch((e) => console.warn('الصوت لم يعمل:', e));
}

function sendNotificationWithSound(title, body) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/calculator_services/img/apple-touch-icon.png'
    });
    playNotificationSound();
  }
}

// طلب الإذن من المستخدم
if (Notification.permission === 'default') {
  Notification.requestPermission();
}

// إشعار كل 20 ثانية
setInterval(() => {
  sendNotificationWithSound('🔔 تنبيه', 'مر 20 ثانية وانت بتستخدم الآلة الحاسبة');
}, 20000);
