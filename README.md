# SilverSet Studios web sitesi

www.silversetstudios.com — Unreal Engine ile savunma sanayi, simülasyon, dijital ikiz, mimarlık ve oyun sistemleri geliştiren SilverSet Studios'un kurumsal sitesi. Tek sayfalık statik site; GitHub Pages üzerinde `CNAME` ile yayınlanır, derleme adımı yoktur.

## Dosyalar

```
index.html      Sayfa yapısı ve tüm metinler (İngilizce)
styles.css      Tüm stiller (renk ve yazı değişkenleri en üstte :root içinde)
script.js       Menü, partner logoları ve iletişim formu
img/web/        Hero görseli, logo, favicon ve paylaşım görseli
img/partners/   Partner ve tedarikçi logoları
img/            Orijinal yüksek çözünürlüklü PNG'ler (sitede kullanılmıyor, arşiv)
```

## Sık yapılan güncellemeler

Site dili İngilizcedir; tüm metinler doğrudan `index.html` içindedir.

**Partner logoları:** Logolar `img/partners/` klasöründe (`xbox.png`, `bethesda.png`, `havelsan.png`, `aselsan.png`, `flight-simulator.png`). Değiştirmek için aynı adla üzerine yazın. Site tüm logoları otomatik olarak aynı gümüş tona çevirir. Dosya yoksa firma adı yazı olarak görünür. Yeni partner eklemek için `index.html` içindeki "Partners and suppliers" bölümünde bir `<li class="partner" data-logo="...">` satırı kopyalayın.

**Kariyer başvuruları:** "Email your application" düğmesi, konu ve şablon metniyle doldurulmuş bir e-postayı `info@silversetstudios.com` adresine açar. Farklı bir adres (ör. careers@) kullanmak için `index.html` içindeki `id="careers-mail"` bağlantısını ve altındaki adresi değiştirin.

**İletişim formu:** Formspree (`https://formspree.io/f/xqalopgl`) üzerinden gönderilir. Ad, e-posta, kurum, ilgi alanı ve mesaj alanları iletilir.

## Yerelde test

```sh
python3 -m http.server 8000
# http://localhost:8000
```

Hero görselini değiştirmek için `img/web/hero.webp` (1672 px) ve `img/web/hero-960.webp` (mobil) dosyalarını aynı adlarla değiştirin.
