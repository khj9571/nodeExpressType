import { Router, Request, Response } from 'express'
import multer = require("multer")



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
//var upload = multer({ storage: storage })



const router = Router()
const upload = multer({
  storage: storage,
  limits: {
    files: 10
  }
})


/*
저장한 파일 조회 - static 파일 제공
정적인 파일이 위치할 디렉토리의 이름 선언 (app_file.js)
정적인 파일이 접근할 라우터 path 설정
(express.static 함수를 통해 제공되는 파일에 대한 가상 경로)
app.use('/users', express.static('uploads'));

이를 통해서 /users 경로를 통해 uploads 디렉토리에 포함된 파일을 로드할 수 있음
(ex. http://localhost:3000/users/siwa.png)*/




router.post('/upload', [upload.array("files", 10)], (req: Request, res: Response) => {
  console.log('call upLoad')
  console.log(req.files)
  console.log(req.body.name)
})


module.exports = router