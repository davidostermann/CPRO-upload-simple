const express = require('express')
const multer = require('multer')

path = require('path')

const app = express()

const fileFilter = (req, file, cb) => {
    const extension = file.mimetype.split('/')[0];
    if(extension !== 'image'){
        return cb(new Error('Something went wrong'), false);
    }
    cb(null, true);
};

const upload = multer({ dest: __dirname + '/uploads', fileFilter })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/upload', upload.single('img'), (req, res) => {
  res.json({ url: path.join('/images', req.file.filename) })
})

app.use('/images', express.static(__dirname + '/uploads'))

app.use('/', express.static(__dirname + '/front-react/build'))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front-react/build/index.html'))
})

app.use(function(err, req, res, next) {
  if(err) {
    res.status(403).json({ error: err })
  }
})

const port = process.env.PORT || 4000

const listener = app
  .listen(port, () => {
    console.log('connected : ', port)
  })
  .on('error', err => console.log('erreur de connexion : ', err))
