import express from 'express';
import { json, raw, text, urlencoded } from 'body-parser'; /** post reqest body 파싱용 */

const app = express();

var cors = require('cors')

app.use(json());
app.use(cors());

/** 전체 인터셉터 */
app.use(function(req, res, next) {
  //인터셉터 역할 부여
  console.log('call global interFace')   
  next();
});


app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});

app.use('/user', require('./routers/user'))
app.use('/',require('./routers/fileupload'))


/** 부분 인터셉터 
 const router = express.Router();
router.all('/매핑주소',function(req, res, next) {
    //인터셉터
    next();
}, function(req, res, next) {
  //인터셉터 이후 행동
}); 
*/
