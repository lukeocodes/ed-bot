const router = require('express').Router()

router.post('/review', require('../commands/review'))

module.exports = router
