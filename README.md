# A Universe Made for Talal — A Birthday Surprise by Maria ❤️

An immersive, cinematic 3D birthday website dedicated to **Talal Ahmad**, designed and created with love by **Maria** (*Your Jhalo Rani*).

---

## 🌟 Project Overview

This project was architected from scratch using **Next.js 15**, **React Three Fiber**, **Three.js**, and luxury vanilla CSS styling. It features a complete multi-scene 3D journey:

1. **Scene 1: The Cinematic Opening**
   - Deep obsidian void with floating gold and crimson particles.
   - Emergence of a luminous 3D heart with heartbeat pulsation and smooth reflections.
   - Title: `HAPPY BIRTHDAY, TALAL AHMAD ❤️`
   - Subtitle: `A Special Little Universe, Created Just for You`
   - Dedication: `With Love, Maria — Your Jhalo Rani`
   - Interactive `ENTER YOUR UNIVERSE ❤️` button with 3D camera dolly transition through a celestial portal.

2. **Scene 2: Immersive 3D Romantic Garden**
   - Nighttime dream garden with a luminous 3D glowing moon and halo.
   - Deep star-filled celestial sky.
   - Grand romantic golden archway with warm hanging lanterns.
   - Illuminated stone pathway flanked by procedural red and crimson roses.
   - Heading: `Janaaaa, Tonight This Little World Is All About You ❤️`

3. **Scene 3: The Dedicated Interactive Heart (Dil Ki Baat)**
   - Large floating 3D heart responsive to pointer, hover, and touch.
   - Radiant golden halo ring and celestial particle burst.
   - Exact message in real HTML:
     > *"Ma bohat pyar krti ap se ap ko kabhe kisi k sath share nai kar sakti."*
   - Second message:
     > *"Janaaaa, Aap mere liye bohat special hain. Aap ki khushi meri khushi ha, aur meri dua ha ke aap ki zindagi hamesha khushiyon, kamyabi aur sukoon se bhari rahy. ❤️"*

4. **Scene 4: Talal's Personal 13-Photo 3D Portrait Gallery**
   - Exactly 13 personal portrait slots of Talal Ahmad only.
   - Floating 3D frames with champagne-gold borders, burgundy velvet matting, and glass reflections.
   - Direct interactive portrait chips (`#01` to `#13`) and 3D click support.
   - Accessible Lightbox modal with Next/Previous navigation, keyboard support (`Escape`, `ArrowLeft`, `ArrowRight`), and affectionate captions in natural Roman Urdu.
   - Heading: `13 Little Reasons I Smile When I See You ❤️`
   - Supporting text: `Janaaaa, aap ki har tasveer apni jagah special ha, aur aaj ka din sirf aap ke naam.`
   - Graceful fallback: If an image is missing, an elegant canvas placeholder is displayed without broken-image icons.

5. **Scene 5: Live Age and Birthday Countdown (Cosmic Timeline)**
   - Date of Birth: **17 October 1999** (Configured timezone: `Asia/Karachi`, PKT, UTC+5).
   - Dynamic calculations with leap-year handling:
     - Current age (years & months)
     - Completed calendar months
     - Total elapsed days
     - Total elapsed hours
     - Total elapsed minutes
     - Live updating seconds counter
   - Separate live countdown to upcoming 27th birthday (Days, Hours, Minutes, Seconds).
   - Heading: `27 Years of Being You — A Lifetime of Beautiful Moments`
   - Supporting text: `Har second ki apni ek kahani hai, aur meri har kahani mein aap hain, Meri Jan. ❤️`

6. **Scene 6: The 3D Birthday Cake**
   - Multi-tier velvet and cream birthday cake with golden bead trimmings.
   - 27 3D candles representing 27 years, with animated flickering flames and warm candlelight.
   - Interactive candle celebration with celebratory confetti burst (`Blow Candles & Celebrate ✨`).
   - Wish & Prayer:
     > *"HAPPY 27TH BIRTHDAY, MY JANAAAA! ❤️"*
     > *"Allah aap ko hamesha khush rakhy, kamyabi de, sehat aur sukoon ata farmaye, aur aap ke tamam achay khwab poory hon. Ameen. ❤️"*

7. **Scene 7: The Personal Love Letter**
   - 3D envelope on an illuminated pedestal with a wax seal.
   - Hinged 3D flap opens and letter emerges when touched.
   - Accessible HTML reader modal with Maria's complete heartfelt Roman Urdu letter.
   - Exact sentence preserved:
     > *"Ma bohat pyar krti ap se ap ko kabhe kisi k sath share nai kar sakti."*

8. **Scene 8: The Final Cinematic Ending**
   - Radiant glowing 3D heart with concentric golden halos.
   - Soft warm floating embers.
   - Messages:
     - `Happy Birthday, My Janaaaa ❤️`
     - `Forever Your Jhalo Rani's Favorite Person`
     - `With All My Love, Always — Maria`
   - Interactive `REPLAY OUR LITTLE UNIVERSE ❤️` button to smoothly return to the start.

---

## 🛠️ Prerequisites

- **Node.js**: Version 18.18 or higher (Node 20 or Node 22 recommended).
- **npm**: Version 9 or higher.

---

## 🚀 Installation & Local Development

1. **Clone or navigate to the directory**:
   ```bash
   cd "c:\Users\SHAHEEN\Desktop\Birthday Web"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Testing

1. **Type Checking**:
   ```bash
   npx tsc --noEmit
   ```

2. **Build for Production**:
   ```bash
   npm run build
   ```

3. **Run Production Server**:
   ```bash
   npm run start
   ```

4. **Run Deterministic Birthday Tests**:
   To verify the age transition logic on **16 October 2026** (Age: 26), **17 October 2026** (Age: 27, Birthday!), and **18 October 2026** (Age: 27):
   ```bash
   node --experimental-strip-types test-age.mjs
   ```

---

## 📸 Managing the 13 Personal Photographs

All 13 photograph slots are stored in:
```
public/images/talal/
├── photo-01.jpg
├── photo-02.jpg
├── photo-03.jpg
├── photo-04.jpg
├── photo-05.jpg
├── photo-06.jpg
├── photo-07.jpg
├── photo-08.jpg
├── photo-09.jpg
├── photo-10.jpg
├── photo-11.jpg
├── photo-12.jpg
└── photo-13.jpg
```

- **To update or replace any photo**: Simply copy your desired picture into `public/images/talal/` and name it `photo-01.jpg` through `photo-13.jpg`.
- **To customize photo captions**: Edit `lib/galleryData.ts`. Each photo has an `id`, `slotNumber`, `alt`, and Roman Urdu `caption`.
- **Missing Photo Protection**: If any file is missing, the gallery automatically displays an elegant, luxury placeholder identifying the missing portrait number. It will **never** display broken image icons.

---

## 🎵 Adding Optional Background Music

The website has a built-in sound engine with an accessible toggle in the top-right corner.

- **Default State**: Sound is **off** by default to comply with browser autoplay policies.
- **Built-in Romantic Ambient Music**: If no local MP3 file is supplied, clicking the sound button automatically plays a soft, warm romantic acoustic chord progression using the browser's native **Web Audio API**. No external files or internet access are required!
- **To add an MP3 file**:
  1. Place your legally obtained audio file in:
     ```
     public/audio/birthday-music.mp3
     ```
  2. The website will automatically detect and play your custom MP3 when the visitor turns the music on!

---

## ⏰ Timezone & Birthday Configuration

The birthday recipient's timezone is configured in:
`lib/ageCalculator.ts`

```typescript
export const DEFAULT_TIMEZONE: TimezoneConfig = {
  name: 'Asia/Karachi (PKT, UTC+5)',
  timeZone: 'Asia/Karachi',
  utcOffsetHours: 5
};

export const BIRTH_DATE_CONFIG = {
  year: 1999,
  month: 10, // October (1-indexed)
  day: 17,
  hour: 0,
  minute: 0,
  second: 0
};
```

You can customize `utcOffsetHours` or the timezone name if Talal is in another time zone.

---

## 📝 Files You Can Edit Manually

| File | Purpose |
|------|---------|
| `lib/galleryData.ts` | Captions for Talal's 13 portraits |
| `components/ui/LoveLetterModal.tsx` | Full text of Maria's love letter |
| `lib/ageCalculator.ts` | Date of birth & timezone settings |
| `public/images/talal/` | The 13 JPG portrait files |
| `public/audio/birthday-music.mp3` | Optional custom MP3 audio track |

---

## 🌐 Deploying to Vercel or Hosting Platform

This website is built with Next.js and is 100% ready for deployment to [Vercel](https://vercel.com/):

1. **Push code to GitHub / Git repository**:
   ```bash
   git init
   git add .
   git commit -m "A Universe Made for Talal - 3D Birthday Website"
   ```
2. **Deploy via Vercel**:
   - Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
   - Import this Git repository.
   - Vercel automatically detects Next.js.
   - Click **"Deploy"**.
3. **Verify Live Link**:
   - Test the deployed link on desktop and mobile phones.
   - Copy the generated URL and share it with Talal as his birthday surprise! ❤️
