import { Router } from 'express'

const router = Router()

import user from '../controllers/user'
//import * as user from '../controllers/user'
//router.get('/echo', echo.echo)

router.get('/getUser/:id', user.getUser)
router.get('/sample', (req, res) => {
    res.json({
        name: '홍길동',
        age: 12
      })
})


module.exports = router