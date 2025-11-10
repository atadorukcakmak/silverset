## SilverSet — Copilot talimatları (kısa ve eyleme dönük)

Bu repo tek sayfalık bir statik web sitesidir. Amaç: küçük UI değişiklikleri, içerik güncellemeleri ve kullanıcı etkileşimlerini koruyarak yeni özellikler eklemek.

Hızlı bakış

- Ana dosyalar: `index.html`, `styles.css`, `script.js`, `README.md`.
- Build adımı yok — dosyaları doğrudan servis et. (Yerelde test için hızlı komutlar aşağıda.)

Neler bilinmeli (big picture)

- Tüm davranışlar `script.js` içinde ve doğrudan DOM seçicileriyle yapılıyor (küçük, kütüphanesiz yapı).
- CSS teması, animasyon ve görsel düzen `styles.css` içinde; responsive kurallar ve `.navbar.scrolled` gibi sınıf tabanlı durumlar burada tanımlı.
- `index.html` içinde bazı inline `onclick` kullanımları var (örn. logo tıklaması, hero butonları) — bunları JS tarafına taşırken mevcut davranışı koru.

Önemli seçiciler / örnekler

- Mobil nav: `.hamburger` ve `.nav-menu` (JS toggler) — menü açık/kapalı durumu `.active` sınıfıyla kontrol ediliyor.
- Navigasyon: `.nav-link` (smooth scroll) — `script.js` bunu zaten yakalıyor; yeni link eklerken aynı href formatını kullan.
- Oyun kartları: `.game-card` onclick ile `window.open(...)` kullanıyor; harici link davranışını koru veya güvenlik için `rel="noopener"` ekle.
- Form: `.contact-form form` — Formspree endpoint (index.html içinde `action="https://formspree.io/f/xqalopgl"`) kullanılıyor; `script.js` client-side validasyon (`isValidEmail`) ve fetch submit yapıyor.
- Animasyon tetikleme: `IntersectionObserver` script içinde `.game-card, .stat-item, .contact-item` öğelerini gözlemliyor.
- Bildirimler: `showNotification(message, type)` fonksiyonunu kullanarak kullanıcıya geri bildirim yap.

Geliştirici iş akışları (hızlı)

- Yerelde hızlı test (zsh):

```sh
# basit http server ile servis et
python3 -m http.server 8000
# veya npm/yarn yüklüyse hızlı serve
# npx serve .
```

- Değişiklik yaparken: `index.html` -> `script.js` -> `styles.css` sırasını takip et; markup değiştikten sonra JS ve CSS'nin selector uyumunu kontrol et.

Proje-spesifik kurallar ve ipuçları

- Yeni interaktivite ekliyorsan mevcut `script.js` tarzını koru — vanilla JS, tek dosya, küçük yardımcı fonksiyonlar (örn. `isValidEmail`, `showNotification`).
- Inline onclick handler'ları (index.html) kademeli olarak kaldırıp `script.js` içinde event listener ekleyebilirsin; önce davranışı test et, sonra inline'ı kaldır.
- Tasarım değişiklikleri CSS içinde yapılır; `styles.css` büyük ve yorum yok — küçük, hedefli sınıf değişiklikleri tercih et.

Dış entegrasyonlar

- Formspree: iletişim formu `action` ile Formspree'ye gönderiliyor — backend yok, bu endpoint ve fetch/JSON mantığını bozma.
- Font Awesome ve Google Fonts CDN kullanılıyor (index.html head).

Test / CI notu

- Repo'da otomatik test yok. Küçük değişiklikleri yerelde açıp görsel ve etkileşim testleri yap.

Sorular / eksik bilgiler

- CI, tercih edilen kod stili veya linter yok; eğer isterseniz bir ESLint/Prettier önerisi veya basit test harness ekleyebilirim.

Bu dosyada bir şey eksik veya net değilse belirtin; isterseniz yönergeyi proje tercihlerine göre genişletirim.
