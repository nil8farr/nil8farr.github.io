// پیش از نمایش صفحه اجرا می‌شود (فایل جدا، تا قاعدهٔ امنیتی سایت اجازهٔ اجرایش را بدهد).
// ۱. اگر جاوااسکریپت هست، حرکت‌های صفحه فعال می‌شوند؛ اگر نباشد، همه‌چیز از اول کامل نمایش داده می‌شود.
// ۲. صفحهٔ شروع: فقط در صفحهٔ خانه، فقط بار اول در هر بازدید، و نه وقتی کاربر حرکت را کم کرده یا با لینک مستقیم به یک بخش آمده.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  if (location.pathname !== '/' || location.hash) return;
  var seen = false;
  try { seen = sessionStorage.getItem('splashSeen') === '1'; } catch (e) {}
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!seen && !reduce) {
    root.classList.add('splash-on');
    try { sessionStorage.setItem('splashSeen', '1'); } catch (e) {}
    setTimeout(function () { root.classList.add('splash-out'); }, 150);
    setTimeout(function () { root.classList.remove('splash-on', 'splash-out'); }, 300);
  }
})();
