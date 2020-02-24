import { Request, Response } from 'express'
var oracledb = require('oracledb');

export function echo(req: Request, res: Response) {
  res.json(req.query)
}

/**
 * 디비 사용자 정보
 */
const dbConfig = {
  user: '1',
  password: '1',
  connectString: 'connString'
}

/** 공통 Request 처리 */
let commonReq = (callBack: Function) => {
  return (req: Request, res: Response) => {
    // callBack(req,res)

    oracledb.getConnection({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
    },
      function (err: any, connection: any) {
        if (err) {
          console.log('커넥션 에러 입니다.')
          console.error(err.message);
          return;
        }

        // //조회할 파라미터
        // var param = {
        //     empno : request.body.empno
        // }

        // // 쿼리문 형식
        // let format = {language: 'sql', indent: '  '};
        // //첫번째는 xml의 namespace, 두번째는 해당 xml id값, 세번째는 파라미터, 마지막은 포맷.
        // let query = mybatisMapper.getStatement('oracleMapper', 'selectEmpInfo', param, format);

        // console.log(query);  // 쿼리 출력

        // connection.execute(query, [], function (err, result) {
        //     if (err) {
        //         console.error(err.message);
        //         doRelease(connection);
        //         return;
        //     }
        //     console.log(result.rows);                   // 데이터
        //     doRelease(response, connection, result.rows);         // Connection 해제
        // });
      });


  }
}

/**커넥션 종료 */
let doRelease =(response:any, connection:any, result:any) => {
  connection.release(function (err:any) {
      if (err) {
          console.error(err.message);
      }

      // DB종료까지 모두 완료되었을 시 응답 데이터 반환
      response.send(''+result);
  });
}





// let getUser = (req: Request , res: Response) => {

//   console.log('파라메터')
//   console.log(req.params)
//   console.log(req.query)
//   console.log(req.path)
//   res.json({
//     name:'홍길동',
//     age:12
//   })
// }

let getUser = commonReq((req: Request, res: Response) => {
  console.log('파라메터')
  console.log(req.params)
  console.log(req.query)
  console.log(req.path)
  res.json({
    name: '홍길동',
    age: 12
  })
})

let createUser = (req: Request, res: Response) => {
  res.json('createUser')
}

let updateUser = (req: Request, res: Response) => {
  res.json('updateUser')
}

let deleteUser = (req: Request, res: Response) => {
  res.json('updateUser')
}


export default {
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}