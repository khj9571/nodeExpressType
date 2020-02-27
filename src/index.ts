import express from 'express';
import { json, raw, text, urlencoded } from 'body-parser'; /** post reqest body 파싱용 */


const app = express();

/*******************************************************************
 *  mybatis-mapper 추가
 *******************************************************************/
let mybatisMapper = require('mybatis-mapper');
// Mapper Load
mybatisMapper.createMapper(['./mapper/oracle-mapper.xml']);


/*******************************************************************
 * 세션 추가 시작
 *******************************************************************/
let session = require('express-session');

app.use(session({
  secret: 'asdf123',
  resave: false,
  saveUninitialized: true,
})); 


/*******************************************************************
 * 크로스 도메인
 *******************************************************************/
let cors = require('cors')
app.use(cors());

/*******************************************************************
 * body-parser
 *******************************************************************/
app.use(json());
app.use(urlencoded({ extended: true }));


/*******************************************************************
 * global Intercepter 
 *******************************************************************/
app.use(function (req, res, next) {
  //인터셉터 역할 부여
  console.log('call global interFace')
  next();
});

/*******************************************************************
 * 정적파일 위치 설정
 *******************************************************************/
app.use(express.static('public'));


app.get('/', (req:any, res: express.Response) => {

  req.session.name = '홍길동'
  res.send('Hello World!');
});

app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});

app.use('/user', require('./routers/user'))
app.use('/', require('./routers/fileupload'))


/** 부분 인터셉터
 const router = express.Router();
router.all('/매핑주소',function(req, res, next) {
    //인터셉터
    next();
}, function(req, res, next) {
  //인터셉터 이후 행동
});
*/
