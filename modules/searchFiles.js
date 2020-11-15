const fs = require('fs')
const path = require('path')
const async = require('async')

/**
 * @param {String} dir
 * @param {RegExp} filter
 * @param {function callback(filePath) {}} callback
 */
const coreSearchRecursive = (dir, filter, callback) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    const filePathList = []
    files.forEach((filePath) => {
      filePathList.push(path.join(dir, filePath))
    })
    coreRecursiveDo(filePathList, filter, callback)
  })
}
/**
 * @param {Array} filePathList
 * @param {RegExp} filter
 * @param {function(filePath){}} callback
 */
const coreRecursiveDo = (filePathList, filter, callback) => {
  async.each(filePathList, (filePath) => {
    fs.stat(filePath, (err, stat) => {
      if (err) {
        console.log(err)
        return async.reject(err)
      }
      if (stat.isDirectory()) {
        coreSearchRecursive(filePath, filter, callback)
      } else {
        if (!filter || path.extname(filePath).match(filter)) {
          callback(null, filePath)
        }
      }
    })
  })
}
/**
 * Search File in the Directory and do the callback
 * @param {String} dir Search Directory
 * @param {function(String filePath){}} callback callback
 */
exports.searchRecursive = (dir, callback) => {
  coreSearchRecursive(dir, null, callback)
}
/**
 * Search File by File Extention(Regular Expression) in the Directory and do the callback
 * @param {String} dir Search Directory
 * @param {RegExp} extention Regular Expression
 * @param {function(String filePath){}} callback callback
 */
exports.searchRecursiveByExtention = (dir, extention, callback) => {
  coreSearchRecursive(dir, extention, callback)
}
