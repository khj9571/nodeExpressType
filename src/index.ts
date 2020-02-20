import express from 'express';
const app = express();

/** 전체 인터셉터 */
app.use(function(req, res, next) {
  //인터셉터 역할 부여
  console.log('call global interFace')   
  next();
});


app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.use('/user', require('./routers/user'))



/** 부분 인터셉터 
 const router = express.Router();
router.all('/매핑주소',function(req, res, next) {
    //인터셉터
    next();
}, function(req, res, next) {
  //인터셉터 이후 행동
}); 
*/
