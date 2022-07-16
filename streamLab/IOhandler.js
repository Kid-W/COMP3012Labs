/*
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: July 15th, 2022
 * Author: Will Fedorko
 *
 */

const path = require("path");
const unzipper = require("unzipper")
const  fs = require("fs")
const PNG = require("pngjs").PNG
  

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */

const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject)=>{
    fs.createReadStream(pathIn)
    .pipe(unzipper.Extract({path: pathOut}))
    .on('error', reject)
    .on('finish',resolve)
  })
  // This way was not returning a promise, and I am not sure why
  // createReadStream(pathIn)
  // .pipe(unzipper.Extract({path: pathOut}))
  // .promise()
  // .then( () => console.log('done'), e => console.log('error',e))
};


/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */

const readDir = (dir) => {
const fileName = dir.split('/')[1]

return new Promise((resolve, reject)=> {
  fs.readdir(dir, (err, files)=>{
    if(err){
      reject(err)
    } else {
      const newFiles = files.filter(file => path.extname(file) === '.png')
      resolve(
       newFiles.map(file=> fileName +'/'+ file)
      )}
  })
})
};


/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */

const grayScale = (pathIn,pathOut) =>{
  return new Promise((resolve, reject)=> {
    fs.createReadStream(pathIn)
    .pipe(
      new PNG({
        filterType: 4,
      })
    )
    .on("parsed", function () {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var idx = (this.width * y + x) << 2;
   
          let avg = (this.data[idx] + this.data[idx + 1] + this.data[idx+ 2]) / 3
          // invert color
          this.data[idx] = avg
          this.data[idx + 1] = avg
          this.data[idx + 2] = avg
   
          // and reduce opacity
          this.data[idx + 3] = this.data[idx + 3] >> 1;
        }
      }
   
      this.pack().pipe(fs.createWriteStream(pathOut))
      .on('finish',resolve)
      .on('error', reject)
    });
  })
}


module.exports = {
  unzip,
  readDir,
  grayScale,
};
