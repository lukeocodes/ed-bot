const router = require('express').Router()
const commands = require('../modules/commands')

router.post('/review', commands.review)

module.exports = router
