const isValidEmail = (email) => {
  const checkEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm
  return checkEmail.test(email)
}

export { isValidEmail }