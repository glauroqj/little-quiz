const formatSeconds = secs => {
  let minutes = parseInt(secs / 60)
  let seconds = parseInt(secs - minutes * 60)

  if (minutes < 10) minutes = `0${minutes}`
  if (seconds < 10) seconds = `0${seconds}`

  return `${minutes}:${seconds}`
}

export {
  formatSeconds
}