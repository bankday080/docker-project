const express = require('express')
const app = express()

app.get('/',(req,res) => {
   res.json({status: 200, data: "hello ...."})

})

app.listen(3300, () => {
   console,log('Start server at port 3300.')
})
