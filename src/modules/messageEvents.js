const matchMap = {
  ticketInfo: {
    regex: /(deved-[\d]+)/gi,
    response: (match) => {
      return `info on ${match}`
    }
  }
}

export default (web, event) => {
  matchMap.forEach(map => {
    const matches = event.text.match(map.regex)

    if (matches) {
      matches.forEach(match => {
        return map.response(match)
      })
    }
  })
}
