const router = require('express').Router()
const Test = require('./test.model')

router.delete('/deleteAll', async (req,res,next)=>{
  try{
    const user = await Test.deleteMany()
    res.send(user )
  }
  catch(e){
    next(e)
  }
})


module.exports = router;