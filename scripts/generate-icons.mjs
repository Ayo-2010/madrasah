import sharp from 'sharp'

await sharp('public/images/og-image.svg')
  .resize(1200, 630)
  .png({ quality: 90 })
  .toFile('public/og-image.png')

await sharp('public/apple-touch-icon.svg')
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png')

await sharp('public/favicon.svg')
  .resize(32, 32)
  .png()
  .toFile('public/favicon-32.png')

console.log('Generated og-image.png, apple-touch-icon.png and favicon-32.png')
