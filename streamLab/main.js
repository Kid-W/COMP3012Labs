/*
 * File Name: main.js
 * Description: Combine IOhandler functions to unzip a file containing .png images and greyscale them.
 *
 * Created Date: July 15th, 2022
 * Author: Will Fedorko
 * Student Number: A00892109
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath =  __dirname + '/myfile.zip',
  pathUnzipped = __dirname + '/unzipped',
  pathProcessed = `${__dirname}/grayscaled`;


  IOhandler.unzip(zipFilePath,pathUnzipped)
  .then(()=> IOhandler.readDir(pathUnzipped))
  .then((pathUnzipped)=> {
    console.log(pathUnzipped)
    pathUnzipped.forEach(path => IOhandler.grayScale(path , pathProcessed + '/' + path.split('/')[1])
    )
  })
  .catch(err => console.log(err))

  

  
 

