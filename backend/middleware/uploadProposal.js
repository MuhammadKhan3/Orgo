const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/proposal')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname)
    }
  })

  const uploadProposal = multer({ storage: storage })
  module.exports=uploadProposal;