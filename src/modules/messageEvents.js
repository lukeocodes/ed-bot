const matchMap = {
  ticketInfo: {
    regex: /(deved-[0-9]{1,6})/gi,
    response: (match) => {
      return `info on ${match}`
    }
  }
}

module.exports = (web, event) => {
  matchMap.forEach(map => {
    const matches = event.text.match(map.regex)

    if (matches) {
      matches.forEach(match => {
        return map.response(match)
      })
    }
  })
}
