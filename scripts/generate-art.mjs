import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const OUT = join(process.cwd(), 'public', 'images', 'gallery')
const PUBLIC = join(process.cwd(), 'public')

const c = {
  forest950: '#0A231B',
  forest900: '#123C2F',
  forest800: '#14513C',
  forest700: '#176B4D',
  forest500: '#2D8A63',
  ivory: '#FAF8F1',
  ivoryDeep: '#F2EDE0',
  gold: '#C5A45D',
  goldSoft: '#E6D8B4',
  ink: '#1E293B',
}

function starPath(cx, cy, outer, inner = outer * 0.42, points = 8) {
  let d = ''
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI / points) * i - Math.PI / 2
    const radius = i % 2 === 0 ? outer : inner
    const x = (cx + radius * Math.cos(angle)).toFixed(1)
    const y = (cy + radius * Math.sin(angle)).toFixed(1)
    d += `${i === 0 ? 'M' : 'L'}${x},${y}`
  }
  return `${d}Z`
}

function pattern(id, color, opacity = 0.2, size = 90) {
  return `
    <pattern id="${id}" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
      <g fill="none" stroke="${color}" stroke-width="1.1" opacity="${opacity}">
        <path d="${starPath(size / 2, size / 2, size * 0.3, size * 0.13)}" />
        <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.08}" />
        <path d="M0 ${size / 2}h${size * 0.12}M${size * 0.88} ${size / 2}h${size * 0.12}M${size / 2} 0v${size * 0.12}M${size / 2} ${size * 0.88}v${size * 0.12}" />
      </g>
    </pattern>`
}

function frame() {
  return `
    <rect x="34" y="34" width="1132" height="832" fill="none" stroke="${c.gold}" stroke-opacity="0.28" stroke-width="1.4" />
    <rect x="48" y="48" width="1104" height="804" fill="none" stroke="${c.gold}" stroke-opacity="0.12" stroke-width="1" />`
}

function svg(inner, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" role="img" aria-label="${title}">
  ${inner}
</svg>
`
}

const art = {}

art['study-arch'] = svg(`
  <defs>
    ${pattern('p', c.goldSoft, 0.16)}
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c.forest800}" />
      <stop offset="1" stop-color="${c.forest950}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#bg)" />
  <rect width="1200" height="900" fill="url(#p)" />
  ${frame()}
  <path d="M330 790V430a270 270 0 0 1 540 0v360" fill="${c.ivory}" fill-opacity="0.035" stroke="${c.gold}" stroke-opacity="0.55" stroke-width="2.5" />
  <path d="M362 790V438a238 238 0 0 1 476 0v352" fill="none" stroke="${c.gold}" stroke-opacity="0.25" stroke-width="1.4" />
  <path d="${starPath(600, 205, 52, 21)}" fill="none" stroke="${c.gold}" stroke-width="1.6" />
  <circle cx="600" cy="205" r="4" fill="${c.gold}" />
  <text x="600" y="470" text-anchor="middle" font-family="Amiri, 'Traditional Arabic', serif" font-size="170" fill="${c.goldSoft}">اقرأ</text>
  <line x1="480" y1="520" x2="720" y2="520" stroke="${c.gold}" stroke-opacity="0.4" stroke-width="1.2" />
  <text x="600" y="560" text-anchor="middle" font-family="Georgia, serif" font-size="20" letter-spacing="8" fill="${c.goldSoft}" fill-opacity="0.75">READ · REFLECT · PRACTISE</text>
  <g transform="translate(600 690)">
    <path d="M0 -12C-58 -44 -140 -46 -215 -20V105C-140 79 -58 81 0 113 58 81 140 79 215 105V-20C140 -46 58 -44 0 -12Z" fill="${c.ivory}" fill-opacity="0.9" />
    <path d="M0 -12V113" stroke="${c.gold}" stroke-width="2" />
    <path d="M0 -12C-58 -44 -140 -46 -215 -20V105C-140 79 -58 81 0 113M0 -12C58 -44 140 -46 215 -20V105C140 79 58 81 0 113" fill="none" stroke="${c.gold}" stroke-width="1.8" />
    <g stroke="${c.forest700}" stroke-opacity="0.35" stroke-width="1.6" stroke-linecap="round">
      <path d="M-180 0c50-12 104-10 146 8M-180 28c50-12 104-10 146 8M-180 56c50-12 104-10 146 8M-180 84c32-7 66-6 94 2" />
      <path d="M34 8c42-18 96-20 146-8M34 36c42-18 96-20 146-8M34 64c42-18 96-20 146-8M52 92c28-8 62-9 94-2" />
    </g>
  </g>
`, 'Illustrative artwork of an arched Islamic study niche with an open book.')

art['recitation-rays'] = svg(`
  <defs>
    ${pattern('p', c.forest700, 0.12)}
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${c.goldSoft}" stop-opacity="0.5" />
      <stop offset="0.55" stop-color="${c.ivory}" stop-opacity="0" />
      <stop offset="1" stop-color="${c.gold}" stop-opacity="0.16" />
    </radialGradient>
  </defs>
  <rect width="1200" height="900" fill="${c.ivory}" />
  <rect width="1200" height="900" fill="url(#p)" />
  <circle cx="600" cy="450" r="420" fill="url(#glow)" />
  ${frame()}
  <g transform="translate(600 450)" fill="none" stroke="${c.gold}" stroke-opacity="0.5">
    ${Array.from({ length: 48 }, (_, i) => {
      const angle = (i * 360) / 48
      const long = i % 4 === 0 ? 235 : i % 2 === 0 ? 190 : 160
      return `<line x1="0" y1="-128" x2="0" y2="-${long}" transform="rotate(${angle})" stroke-width="${i % 4 === 0 ? 2 : 1}" />`
    }).join('')}
    <circle r="150" stroke-width="1.4" />
    <circle r="210" stroke-width="0.8" stroke-dasharray="3 7" />
    <circle r="300" stroke-width="0.8" />
    <circle r="340" stroke-width="0.6" stroke-dasharray="2 10" />
  </g>
  <circle cx="600" cy="450" r="112" fill="${c.forest900}" />
  <circle cx="600" cy="450" r="112" fill="none" stroke="${c.gold}" stroke-opacity="0.7" stroke-width="1.6" />
  <path d="${starPath(600, 450, 92, 38)}" fill="none" stroke="${c.goldSoft}" stroke-opacity="0.35" stroke-width="1.2" />
  <text x="600" y="498" text-anchor="middle" font-family="Amiri, 'Traditional Arabic', serif" font-size="130" fill="${c.goldSoft}">ق</text>
  <g fill="${c.gold}">
    <path d="${starPath(600, 115, 9, 4, 4)}" />
    <path d="${starPath(1085, 450, 7, 3, 4)}" />
    <path d="${starPath(600, 790, 7, 3, 4)}" />
    <circle cx="150" cy="450" r="3" />
  </g>
`, 'Illustrative artwork of a golden recitation medallion with radiating lines.')

art['study-pair'] = svg(`
  <defs>${pattern('p', c.forest700, 0.1)}</defs>
  <rect width="1200" height="900" fill="${c.ivoryDeep}" />
  <rect width="1200" height="900" fill="url(#p)" />
  ${frame()}
  <path d="M210 780V400a390 390 0 0 1 780 0v380" fill="${c.ivory}" stroke="${c.forest900}" stroke-opacity="0.45" stroke-width="2" />
  <path d="M250 780V408a350 350 0 0 1 700 0v372" fill="none" stroke="${c.gold}" stroke-opacity="0.5" stroke-width="1.4" />
  <text x="600" y="250" text-anchor="middle" font-family="Amiri, 'Traditional Arabic', serif" font-size="92" fill="${c.forest900}">العلم</text>
  <line x1="470" y1="285" x2="730" y2="285" stroke="${c.gold}" stroke-width="1.2" />
  <g stroke="${c.forest900}" stroke-width="2" fill="${c.ivory}">
    <path d="M300 628c48-28 106-30 158-10v96c-52-20-110-18-158 10Z" />
    <path d="M458 618c52-20 110-18 158 10v96c-48-28-106-30-158-10Z" />
    <path d="M584 628c48-28 106-30 158-10v96c-52-20-110-18-158 10Z" />
    <path d="M742 618c52-20 110-18 158 10v96c-48-28-106-30-158-10Z" />
  </g>
  <g stroke="${c.gold}" stroke-width="1.3" stroke-linecap="round">
    <path d="M458 618v106M742 618v106" />
    <path d="M330 650c33-10 67-9 97 2M330 674c33-10 67-9 97 2M330 698c23-7 48-6 70 1" />
    <path d="M488 640c30-11 64-12 97-2M488 664c30-11 64-12 97-2M488 688c30-11 64-12 97-2" />
    <path d="M614 650c33-10 67-9 97 2M614 674c33-10 67-9 97 2M614 698c23-7 48-6 70 1" />
    <path d="M772 640c30-11 64-12 97-2M772 664c30-11 64-12 97-2M772 688c30-11 64-12 97-2" />
  </g>
  <g fill="${c.gold}">
    <path d="${starPath(600, 370, 15, 7)}" />
    <circle cx="600" cy="420" r="3" />
  </g>
`, 'Illustrative artwork of open books beneath a geometric arch.')

art['courtyard-arches'] = svg(`
  <defs>
    ${pattern('p', c.goldSoft, 0.1)}
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c.forest900}" />
      <stop offset="1" stop-color="${c.forest950}" />
    </linearGradient>
    <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c.forest800}" />
      <stop offset="1" stop-color="${c.forest950}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="url(#sky)" />
  <rect width="1200" height="900" fill="url(#p)" />
  ${frame()}
  <rect y="680" width="1200" height="220" fill="url(#floor)" />
  <g fill="none" stroke="${c.gold}" stroke-width="1.8">
    ${[80, 300, 520, 740, 960].map((x, i) => `
      <path d="M${x} 680V390a80 80 0 0 1 160 0v290" stroke-opacity="${i === 2 ? 0.9 : 0.55}" />
      <path d="M${x + 18} 680V398a62 62 0 0 1 124 0v282" stroke-opacity="0.25" stroke-width="1" />
      <circle cx="${x + 80}" cy="300" r="4" fill="${c.gold}" stroke="none" />
    `).join('')}
  </g>
  <path d="M0 790h1200M0 830h1200" stroke="${c.gold}" stroke-opacity="0.18" stroke-width="1" />
  <g transform="translate(600 150)" fill="none" stroke="${c.goldSoft}">
    <path d="${starPath(0, 0, 34, 14)}" stroke-width="1.6" />
    <circle r="4" fill="${c.gold}" stroke="none" />
  </g>
  <g fill="${c.goldSoft}" opacity="0.7">
    <circle cx="250" cy="170" r="2.5" />
    <circle cx="950" cy="210" r="2" />
    <circle cx="1050" cy="120" r="3" />
    <circle cx="160" cy="120" r="2" />
  </g>
`, 'Illustrative artwork of repeating Islamic arches.')

art['library-shelf'] = svg(`
  <defs>${pattern('p', c.forest700, 0.08)}</defs>
  <rect width="1200" height="900" fill="${c.ivory}" />
  <rect width="1200" height="900" fill="url(#p)" />
  ${frame()}
  <path d="M220 800V370a380 380 0 0 1 760 0v430" fill="${c.ivoryDeep}" stroke="${c.forest900}" stroke-opacity="0.45" stroke-width="2" />
  <path d="M260 800V380a340 340 0 0 1 680 0v420" fill="none" stroke="${c.gold}" stroke-opacity="0.45" stroke-width="1.4" />
  <line x1="260" y1="470" x2="940" y2="470" stroke="${c.forest900}" stroke-opacity="0.5" stroke-width="4" />
  <line x1="260" y1="620" x2="940" y2="620" stroke="${c.forest900}" stroke-opacity="0.5" stroke-width="4" />
  <line x1="260" y1="760" x2="940" y2="760" stroke="${c.forest900}" stroke-opacity="0.5" stroke-width="4" />
  <g>
    ${[
      [300, 390, 38, 70, c.forest700], [344, 402, 30, 58, c.gold], [382, 380, 46, 80, c.forest900], [436, 398, 26, 62, c.forest500], [470, 386, 40, 74, c.ivory], [518, 404, 30, 56, c.gold], [556, 376, 44, 84, c.forest700], [608, 396, 28, 64, c.forest900], [644, 386, 36, 74, c.gold], [688, 400, 26, 60, c.forest500], [722, 378, 42, 82, c.forest800], [772, 392, 34, 68, c.ivory], [814, 384, 44, 76, c.gold], [866, 398, 30, 62, c.forest700],
      [310, 530, 34, 80, c.forest900], [352, 548, 28, 62, c.gold], [388, 520, 46, 90, c.forest700], [442, 542, 26, 68, c.forest500], [476, 528, 38, 82, c.ivory], [522, 548, 30, 62, c.forest900], [560, 518, 44, 92, c.gold], [612, 540, 28, 70, c.forest700], [648, 528, 38, 82, c.forest800], [694, 546, 30, 64, c.ivory], [732, 520, 46, 90, c.forest500], [786, 540, 26, 70, c.gold], [820, 528, 40, 82, c.forest900], [868, 548, 30, 62, c.forest700],
      [320, 676, 36, 76, c.gold], [364, 690, 28, 62, c.forest700], [400, 664, 46, 88, c.forest900], [454, 686, 28, 66, c.forest500], [490, 672, 40, 80, c.ivory], [538, 690, 30, 62, c.forest800], [576, 662, 46, 90, c.gold], [630, 684, 28, 68, c.forest700], [666, 672, 38, 80, c.forest900], [712, 688, 28, 64, c.forest500], [748, 664, 44, 88, c.ivory], [800, 684, 30, 66, c.gold], [838, 672, 40, 80, c.forest700],
    ].map(([x, y, w, h, fill]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${c.forest900}" stroke-opacity="0.35" stroke-width="1.2" />`).join('')}
  </g>
  <path d="M600 95l10 24 24 10-24 10-10 24-10-24-24-10 24-10Z" fill="none" stroke="${c.gold}" stroke-width="1.4" />
`, 'Illustrative artwork of a stylised bookshelf in an Islamic arch.')

art['community-star'] = svg(`
  <defs>${pattern('p', c.goldSoft, 0.12)}</defs>
  <rect width="1200" height="900" fill="${c.forest900}" />
  <rect width="1200" height="900" fill="url(#p)" />
  ${frame()}
  <g transform="translate(600 450)" fill="none" stroke="${c.gold}">
    <circle r="330" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="2 9" />
    <circle r="240" stroke-opacity="0.4" stroke-width="1" />
    <path d="${starPath(0, 0, 190, 78)}" stroke-width="2" stroke-opacity="0.85" />
    <path d="${starPath(0, 0, 132, 54)}" stroke-width="1.2" stroke-opacity="0.45" />
    <circle r="34" fill="${c.gold}" fill-opacity="0.9" stroke="none" />
    <circle r="16" fill="${c.forest900}" stroke="none" />
    ${Array.from({ length: 8 }, (_, i) => {
      const angle = (i * Math.PI) / 4
      const x = Math.cos(angle) * 280
      const y = Math.sin(angle) * 280
      return `
        <line x1="${Math.cos(angle) * 195}" y1="${Math.sin(angle) * 195}" x2="${Math.cos(angle) * 255}" y2="${Math.sin(angle) * 255}" stroke-opacity="0.25" stroke-width="1" />
        <circle cx="${x}" cy="${y}" r="28" fill="${c.forest800}" stroke-opacity="0.6" />
        <path d="${starPath(x, y, 12, 5)}" stroke-opacity="0.8" stroke="${c.goldSoft}" stroke-width="1.1" />
      `
    }).join('')}
  </g>
  <text x="600" y="812" text-anchor="middle" font-family="Georgia, serif" font-size="15" letter-spacing="7" fill="${c.goldSoft}" fill-opacity="0.6">A COMMUNITY OF LEARNING</text>
`, 'Illustrative artwork of an eight-point star surrounded by smaller stars.')

art['achievement-medallion'] = svg(`
  <defs>
    ${pattern('p', c.goldSoft, 0.1)}
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c.goldSoft}" />
      <stop offset="1" stop-color="${c.gold}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="${c.forest950}" />
  <rect width="1200" height="900" fill="url(#p)" />
  ${frame()}
  <g transform="translate(600 430)" fill="none">
    <circle r="265" fill="${c.forest900}" stroke="${c.gold}" stroke-opacity="0.4" stroke-width="1.4" />
    <circle r="236" stroke="${c.gold}" stroke-opacity="0.25" stroke-width="1" stroke-dasharray="3 7" />
    <circle r="205" stroke="${c.gold}" stroke-opacity="0.5" stroke-width="1.2" />
    <path d="${starPath(0, 0, 168, 68)}" fill="${c.forest800}" stroke="url(#gold)" stroke-width="2" />
    <path d="${starPath(0, 0, 120, 48)}" stroke="${c.goldSoft}" stroke-opacity="0.45" stroke-width="1.2" />
    <circle r="34" fill="${c.forest950}" stroke="url(#gold)" stroke-width="1.5" />
    <path d="${starPath(0, 0, 22, 9)}" fill="url(#gold)" stroke="none" />
    ${Array.from({ length: 24 }, (_, i) => `<line x1="0" y1="-205" x2="0" y2="-224" transform="rotate(${i * 15})" stroke="${c.gold}" stroke-opacity="0.55" stroke-width="1.4" />`).join('')}
  </g>
  <text x="600" y="780" text-anchor="middle" font-family="Georgia, serif" font-size="15" letter-spacing="7" fill="${c.goldSoft}" fill-opacity="0.55">STEADY PROGRESS · SINCERE EFFORT</text>
`, 'Illustrative artwork of a gold geometric achievement medallion.')

art['revision-pages'] = svg(`
  <defs>${pattern('p', c.forest700, 0.08)}</defs>
  <rect width="1200" height="900" fill="${c.ivory}" />
  <rect width="1200" height="900" fill="url(#p)" />
  ${frame()}
  <g transform="translate(600 460)">
    <rect x="-250" y="-290" width="500" height="580" rx="4" fill="${c.ivoryDeep}" stroke="${c.forest900}" stroke-opacity="0.2" transform="rotate(-9)" />
    <rect x="-235" y="-302" width="500" height="580" rx="4" fill="${c.ivory}" stroke="${c.forest900}" stroke-opacity="0.3" transform="rotate(-4)" />
    <rect x="-240" y="-300" width="500" height="580" rx="4" fill="${c.ivory}" stroke="${c.forest900}" stroke-opacity="0.45" stroke-width="1.6" />
    <path d="M-190 -250h400M-190 -220h400M-190 -190h400" stroke="${c.gold}" stroke-opacity="0.4" stroke-width="1" />
    <g stroke="${c.forest700}" stroke-opacity="0.3" stroke-width="2" stroke-linecap="round">
      ${Array.from({ length: 13 }, (_, i) => `<path d="M-190 ${-100 + i * 28}h${i % 4 === 3 ? 210 : 400}" />`).join('')}
    </g>
    <rect x="120" y="-290" width="32" height="150" fill="${c.gold}" />
    <path d="M120 140h32l-16 34Z" fill="${c.gold}" />
    <path d="${starPath(-160, 60, 22, 9)}" fill="none" stroke="${c.gold}" stroke-width="1.3" />
  </g>
  <text x="600" y="815" text-anchor="middle" font-family="Georgia, serif" font-size="15" letter-spacing="7" fill="${c.forest900}" fill-opacity="0.45">REVISION · DAY BY DAY</text>
`, 'Illustrative artwork of layered revision pages with a gold bookmark.')

art['children-lantern'] = svg(`
  <defs>
    ${pattern('p', c.forest700, 0.09)}
    <linearGradient id="lamp" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c.goldSoft}" />
      <stop offset="1" stop-color="${c.gold}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="${c.ivoryDeep}" />
  <rect width="1200" height="900" fill="url(#p)" />
  ${frame()}
  <line x1="600" y1="70" x2="600" y2="200" stroke="${c.forest900}" stroke-opacity="0.45" stroke-width="2" />
  <g transform="translate(600 440)">
    <path d="M-70 -200h140l24 40H-94Z" fill="${c.forest900}" />
    <path d="M-120 150h240l30 50H-150Z" fill="${c.forest900}" />
    <path d="M-170 -160h340l-40 300H-130Z" fill="${c.forest900}" stroke="${c.gold}" stroke-width="1.6" />
    <path d="M-140 -130h280l-32 240H-108Z" fill="none" stroke="${c.gold}" stroke-opacity="0.4" />
    <g fill="url(#lamp)">
      <path d="${starPath(0, -30, 78, 31)}" />
      <path d="${starPath(-82, 80, 18, 7)}" />
      <path d="${starPath(84, 74, 14, 6)}" />
    </g>
    <circle cx="0" cy="80" r="6" fill="${c.ivory}" fill-opacity="0.8" />
    <line x1="0" y1="150" x2="0" y2="220" stroke="${c.gold}" stroke-width="2" />
    <path d="M-42 220h84l-42 56Z" fill="${c.forest900}" stroke="${c.gold}" stroke-opacity="0.5" />
  </g>
  <g fill="${c.gold}" opacity="0.7">
    <path d="${starPath(250, 210, 14, 6)}" />
    <path d="${starPath(960, 260, 10, 5)}" />
    <path d="${starPath(330, 690, 8, 4)}" />
    <path d="${starPath(900, 640, 12, 5)}" />
  </g>
  <circle cx="200" cy="420" r="3" fill="${c.gold}" />
  <circle cx="1010" cy="470" r="2.5" fill="${c.gold}" />
`, 'Illustrative artwork of a geometric lantern with small stars.')

art['prayer-niche'] = svg(`
  <defs>
    ${pattern('p', c.goldSoft, 0.13)}
    <linearGradient id="niche" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c.forest700}" stop-opacity="0.55" />
      <stop offset="1" stop-color="${c.forest950}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="900" fill="${c.forest950}" />
  <rect width="1200" height="900" fill="url(#p)" />
  ${frame()}
  <path d="M300 810V470a300 300 0 0 1 600 0v340Z" fill="url(#niche)" stroke="${c.gold}" stroke-opacity="0.55" stroke-width="2.5" />
  <path d="M338 810V478a262 262 0 0 1 524 0v332" fill="none" stroke="${c.gold}" stroke-opacity="0.25" stroke-width="1.2" />
  <path d="M382 810V488a218 218 0 0 1 436 0v322" fill="none" stroke="${c.gold}" stroke-opacity="0.35" stroke-width="1" stroke-dasharray="2 6" />
  <g>
    <line x1="600" y1="130" x2="600" y2="270" stroke="${c.gold}" stroke-width="1.6" />
    <path d="M540 270h120l-18 80H558Z" fill="${c.forest800}" stroke="${c.gold}" stroke-width="1.5" />
    <path d="M565 350h70l-35 55Z" fill="${c.gold}" fill-opacity="0.85" />
    <circle cx="600" cy="310" r="34" fill="${c.goldSoft}" fill-opacity="0.16" stroke="${c.goldSoft}" stroke-opacity="0.4" />
  </g>
  <g fill="${c.gold}">
    <path d="${starPath(600, 615, 20, 8)}" fill-opacity="0.75" />
    <circle cx="600" cy="715" r="3" />
  </g>
  <line x1="240" y1="810" x2="960" y2="810" stroke="${c.gold}" stroke-opacity="0.5" stroke-width="2" />
  <g fill="${c.gold}" opacity="0.5">
    <circle cx="230" cy="180" r="2.5" />
    <circle cx="980" cy="230" r="2" />
    <circle cx="1040" cy="540" r="3" />
  </g>
`, 'Illustrative artwork of a prayer niche with a hanging lamp.')

art['online-desk'] = svg(`
  <defs>${pattern('p', c.forest700, 0.08)}</defs>
  <rect width="1200" height="900" fill="${c.ivory}" />
  <rect width="1200" height="900" fill="url(#p)" />
  ${frame()}
  <rect x="270" y="235" width="660" height="410" rx="18" fill="${c.forest900}" stroke="${c.forest900}" stroke-width="2" />
  <rect x="300" y="265" width="600" height="350" rx="8" fill="${c.forest800}" />
  <path d="M430 540V420a170 170 0 0 1 340 0v120" fill="none" stroke="${c.gold}" stroke-opacity="0.6" stroke-width="2" />
  <path d="M470 540V430a130 130 0 0 1 260 0v110" fill="none" stroke="${c.gold}" stroke-opacity="0.3" stroke-width="1.2" />
  <text x="600" y="455" text-anchor="middle" font-family="Amiri, 'Traditional Arabic', serif" font-size="88" fill="${c.goldSoft}">اقرأ</text>
  <path d="M560 575h80l12 30H548Z" fill="${c.forest900}" />
  <rect x="230" y="645" width="740" height="14" rx="7" fill="${c.forest900}" />
  <rect x="270" y="659" width="18" height="120" fill="${c.forest900}" />
  <rect x="912" y="659" width="18" height="120" fill="${c.forest900}" />
  <g>
    <rect x="330" y="740" width="150" height="20" rx="3" fill="${c.forest700}" />
    <rect x="336" y="716" width="138" height="20" rx="3" fill="${c.gold}" />
    <rect x="342" y="692" width="126" height="20" rx="3" fill="${c.forest900}" />
  </g>
  <g transform="translate(760 690)">
    <rect x="0" y="36" width="94" height="12" rx="3" fill="${c.ivoryDeep}" stroke="${c.forest900}" stroke-opacity="0.4" />
    <path d="M14 36V-4h58v40" fill="none" stroke="${c.forest900}" stroke-width="2" />
    <path d="M76 6h12a12 12 0 0 1 0 24H76" fill="none" stroke="${c.forest900}" stroke-width="2" />
  </g>
  <path d="${starPath(600, 120, 22, 9)}" fill="none" stroke="${c.gold}" stroke-width="1.4" />
  <text x="600" y="830" text-anchor="middle" font-family="Georgia, serif" font-size="15" letter-spacing="7" fill="${c.forest900}" fill-opacity="0.45">LEARNING WITHOUT DISTANCE</text>
`, 'Illustrative artwork of an online learning desk with a screen.')

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="16" fill="${c.forest900}" />
  <rect x="4.5" y="4.5" width="55" height="55" rx="13" fill="none" stroke="${c.gold}" stroke-opacity="0.55" stroke-width="1.2" />
  <path d="M20 45V30c0-6 5.4-10 12-10s12 4 12 10v15" fill="none" stroke="${c.goldSoft}" stroke-width="1.8" stroke-linecap="round" />
  <path d="M21 42.5c4.3-1.4 7.8-1 10.8 1.4 3-2.4 6.5-2.8 10.8-1.4v4.8c-4.3-1.4-7.8-1-10.8 1.4-3-2.4-6.5-2.8-10.8-1.4Z" fill="${c.gold}" />
  <path d="M31.8 43.6v4.6" stroke="${c.forest900}" stroke-width="1.2" stroke-linecap="round" />
  <circle cx="31.8" cy="14.8" r="1.8" fill="${c.gold}" />
</svg>
`

const ogImage = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    ${pattern('ogp', c.goldSoft, 0.13, 80)}
    <linearGradient id="ogbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c.forest800}" />
      <stop offset="1" stop-color="${c.forest950}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ogbg)" />
  <rect width="1200" height="630" fill="url(#ogp)" />
  <rect x="28" y="28" width="1144" height="574" fill="none" stroke="${c.gold}" stroke-opacity="0.3" />
  <g transform="translate(930 315)">
    <path d="M0 -210V210" stroke="${c.gold}" stroke-opacity="0.2" />
    <path d="M-170 210V20a170 170 0 0 1 340 0v190" fill="none" stroke="${c.gold}" stroke-opacity="0.5" stroke-width="2" />
    <path d="M-140 210V28a140 140 0 0 1 280 0v182" fill="none" stroke="${c.gold}" stroke-opacity="0.22" stroke-width="1.2" />
    <path d="${starPath(0, -55, 74, 30)}" fill="none" stroke="${c.goldSoft}" stroke-opacity="0.65" stroke-width="1.5" />
    <g transform="translate(0 30)">
      <path d="M0 -12C-32 -25 -78 -26 -120 -12V58C-78 44 -32 45 0 58 32 45 78 44 120 58V-12C78 -26 32 -25 0 -12Z" fill="none" stroke="${c.goldSoft}" stroke-opacity="0.6" stroke-width="1.6" />
      <path d="M0 -12V58M-96 8c26-6 54-5 78 5M-96 28c26-6 54-5 78 5M18 13c24-10 52-11 78-5M18 33c24-10 52-11 78-5" fill="none" stroke="${c.goldSoft}" stroke-opacity="0.32" stroke-width="1.2" />
    </g>
    <circle cx="0" cy="-55" r="4" fill="${c.gold}" />
  </g>
  <g transform="translate(96 175)">
    <rect width="72" height="72" rx="18" fill="${c.forest900}" stroke="${c.gold}" stroke-opacity="0.4" />
    <path d="M18 53V36c0-7.2 8.1-12 18-12s18 4.8 18 12v17" fill="none" stroke="${c.goldSoft}" stroke-width="1.8" stroke-linecap="round" />
    <path d="M20 50c5-1.8 9.6-1.2 16 1.8 6.4-3 11-3.6 16-1.8v5c-5-1.8-9.6-1.2-16 1.8-6.4-3-11-3.6-16-1.8Z" fill="${c.gold}" />
  </g>
  <text x="190" y="222" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="${c.goldSoft}" letter-spacing="1">Madrasah Al-Noor</text>
  <text x="96" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="62" fill="${c.ivory}">Qur’an, knowledge</text>
  <text x="96" y="402" font-family="Georgia, 'Times New Roman', serif" font-size="62" fill="${c.ivory}">and good character.</text>
  <text x="96" y="470" font-family="Arial, sans-serif" font-size="18" letter-spacing="5" fill="${c.goldSoft}" fill-opacity="0.8">A COMMUNITY ISLAMIC SCHOOL</text>
  <path d="M96 505h330" stroke="${c.gold}" stroke-opacity="0.4" />
  <text x="96" y="546" font-family="Arial, sans-serif" font-size="17" letter-spacing="3" fill="${c.ivory}" fill-opacity="0.55">CHILDREN · TEENAGERS · ADULTS</text>
</svg>
`

const appleIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" fill="${c.forest900}" />
  <rect x="14" y="14" width="152" height="152" rx="34" fill="none" stroke="${c.gold}" stroke-opacity="0.5" stroke-width="2" />
  <path d="M55 125V84c0-17 15.5-29 35-29s35 12 35 29v41" fill="none" stroke="${c.goldSoft}" stroke-width="4.5" stroke-linecap="round" />
  <path d="M58 118c12-4 22-3 32 4 10-7 20-8 32-4v12c-12-4-22-3-32 4-10-7-20-8-32-4Z" fill="${c.gold}" />
  <path d="M90 122v13" stroke="${c.forest900}" stroke-width="3" stroke-linecap="round" />
  <circle cx="90" cy="42" r="5" fill="${c.gold}" />
</svg>
`

await mkdir(OUT, { recursive: true })
for (const [name, content] of Object.entries(art)) {
  await writeFile(join(OUT, `${name}.svg`), content, 'utf8')
}
await writeFile(join(PUBLIC, 'favicon.svg'), favicon, 'utf8')
await writeFile(join(PUBLIC, 'images', 'og-image.svg'), ogImage, 'utf8')
await writeFile(join(PUBLIC, 'apple-touch-icon.svg'), appleIcon, 'utf8')

console.log(`Generated ${Object.keys(art).length} gallery illustrations, favicon, social image and touch icon.`)
