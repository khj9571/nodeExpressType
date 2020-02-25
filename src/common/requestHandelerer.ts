
import { DBCONFIG } from '../db/dbConfig'
import { Request, Response } from 'express'

/***************************************
 * 오라클 객체 생성
 ***************************************/
var oracledb = require('oracledb');
 /** Oracle Auto Commit 설정*/
oracledb.autoCommit = true;

/** 공통 Request 처리 */
let commonReqHandler = (callBack: Function) => {
    return (req: any, res: Response) => {
        // callBack(req,res)
        console.log('사용자 정보:', DBCONFIG.user)
        console.log('사용자 비밀번호:', DBCONFIG.password)
        console.log('커넥션 스트링:', DBCONFIG.connectString)
        console.log('세션 정보:', req.session.name)


        oracledb.getConnection({
            user: DBCONFIG.user,
            password: DBCONFIG.password,
            connectString: DBCONFIG.connectString
        },
            function (err: any, connection: any) {
                if (err) {
                    console.log('커넥션 에러 입니다.')
                    console.error(err.message);
                    res.json({message:'디비 커넥션 에러'})
                   
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



/**커넥션 종료 및 result */
let doRelease = (response: any, connection: any, result: any) => {
    connection.release(function (err: any) {
        if (err) {
            console.error(err.message);
        }

        // DB종료까지 모두 완료되었을 시 응답 데이터 반환
        response.send('' + result);
    });
}

module.exports = commonReqHandler