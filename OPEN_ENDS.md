# Open ends — Stories Lounge Dubai

<!--
Tracked by Flaux HQ. Rules:
- One item per line: "- [ ] text #tags"
- Priority tags: #high #medium #low (default medium)
- Other tags allowed: #mobile #blog #homepage etc.
- When fixed: tick it "- [x]" or delete the line, in the same commit as the fix.
- Or write "closes OE: <item text>" in the commit message.
- Keep the section headings exactly as they are.
-->

## Bugs
- [ ] Hostinger returns 404 for /about, /gallery, /events, and /contact (checked 27 Sep 2026); there is no .htaccess, and vercel.json rewrites are not applied on this host #high
- [ ] /menu returns Hostinger’s 404 instead of redirecting to the digital menu in src/config/seo.js; the redirect exists only in vercel.json #high
- [ ] src/data/galleryManifest.js category key is "mocktails and cocktails " with a trailing space, and 48 image srcs contain spaces #medium
- [ ] src/pages/Menu.jsx is never mounted; src/App.jsx sends /menu to MenuRedirect.jsx #low
- [ ] react-router-dom is 7.15.1; npm audit reports GHSA-wrjc-x8rr-h8h6 (open redirect in Link/useNavigate) fixed in 7.18.2+ #medium
- [ ] npm run build fails on this Mac because macOS blocks node_modules/@rolldown/binding-darwin-arm64 (code signature) #medium
- [ ] src/hooks/usePageMeta.js sets documentElement.lang to "en", overwriting index.html lang="en-AE" #low

## SEO
- [ ] SITE.digitalMenu (qr.mydigimenu.com/b9b1e898…) returns HTTP 404 (checked 7 Oct 2026); Menu links in nav, footer, hero and /menu all point to it #high
- [ ] Homepage "Signature Dishes" section for dish keywords (butter chicken, biryani, ghee roast, sukka…) is waiting on the client's list of dishes actually served #medium #homepage
- [ ] https://www.storiesloungedubai.com and https://storiesloungedubai.com both return 200 with the same homepage and no redirect #high
- [x] index.html title is 76 characters and the meta description is 191; usePageMeta appends "| Stories Lounge Dubai", so rendered titles are home 84, about 84, gallery 83, events 80, menu 67, contact 66 (target 50–60) in src/config/seo.js #medium
- [x] Meta descriptions in src/config/seo.js are over 160 characters except gallery (147): home 205, about 203, menu 184, events 206, contact 216 #medium
- [x] Homepage H1 in src/pages/Home.jsx is only "Stories Lounge" and does not include Dubai, Al Fahidi, or rooftop dining #medium #homepage
- [ ] PAGES.gallery in src/config/seo.js uses ogImage /og/home.jpg; there is no public/og/gallery.jpg #medium #gallery
- [x] public/sitemap.xml lastmod is 2026-07-11 on every URL #low
- [ ] App.jsx has no * route, so unknown paths render the shell with no custom 404 page #medium
- [ ] src/data/galleryManifest.js has 106 images and only 6 unique alt strings (for example "Food at Stories Lounge Dubai" repeated 22 times) #medium #gallery
- [ ] 44 gallery and hero files use camera or number names (DSC*.webp, 001.webp) under public/images/ #medium
- [ ] JSON-LD, canonical, and per-page Open Graph tags are injected in useEffect (src/components/StructuredData.jsx, src/hooks/usePageMeta.js); middleware.js does not run on Hostinger, so non-JS crawlers only see the homepage head in index.html #medium
- [ ] sameAs in src/config/social.js has Instagram, Facebook, TikTok, and Snapchat, and no Google Business Profile URL #medium

## Client inputs needed
- [ ] Confirm or replace the three homepage quotes attributed to Sarah M., Ahmed K., and Priya R. in src/pages/Home.jsx #medium #homepage
- [ ] Supply privacy policy and terms text; neither page exists #medium
- [ ] Supply clock times for Happy Hours (src/pages/Home.jsx lists them as "Daily" with offers only) #medium #homepage
- [ ] Confirm the map pin in src/config/seo.js (25.2634, 55.2972) and send the Google Business Profile URL #medium
- [ ] Supply an SVG logo; public/logo.png is 830×785 and is also used as the favicon and apple-touch-icon #low
- [ ] Supply a postal code if the venue has one; SITE.address.postalCode in src/config/seo.js is empty #low

## Features to build

## Content
- [ ] About page copy in src/pages/About.jsx is one short paragraph plus four lines, well under 300 words #medium #about
- [ ] Gallery page copy in src/pages/GalleryPage.jsx is a single sentence under the H1 #medium #gallery
- [ ] Events page in src/pages/Events.jsx has a one-sentence intro and no dated schedule of DJ, Housie, or quiz nights #medium #events
- [ ] Add Privacy Policy and Terms pages and link them from src/components/Footer.jsx #medium

## Performance & accessibility
- [ ] Several WebP files are over 500KB, including public/images/ambiance/DSC05767.webp (about 1.0MB) and DSC07606.webp (about 940KB) #medium
- [ ] src/styles/global.css line 1 loads Google Fonts with a render-blocking @import (Cormorant Garamond, Montserrat, Jost); the URL does set display=swap #medium
- [ ] Hero images in src/components/HeroSlider.jsx and FeaturedImage in src/components/MediaImage.jsx omit width and height #medium
- [ ] src/styles/global.css sets outline: none on .form-group input, select, and textarea focus, with no replacement focus ring (buttons do have :focus-visible) #medium

## Launch & infra
- [ ] Production is Hostinger (platform: hostinger, panel: hpanel); vercel.json redirects/rewrites and middleware.js do not run there #high
- [ ] No GA4 or other analytics snippet in index.html or src/ #medium
- [ ] No Google Search Console verification meta in index.html #medium
- [ ] README.md is still the default Vite template and does not document the Hostinger deploy #low
