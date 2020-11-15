const Tesseract = require('tesseract.js')
const searchFiles = require('./modules/searchFiles')

const dir = process.argv[2]
console.log(`Search this Directory :${dir}`)

searchFiles.searchRecursiveByExtention(dir, /.*(jpg|png)$/g, (err, filePath) => {
  if (err) {
    console.log(err)
  }
  Tesseract.recognize(filePath, 'eng')
    .then(({ data: { text } }) => {
      console.log('---------')
      console.log(filePath)
      console.log(text)
    })
})
