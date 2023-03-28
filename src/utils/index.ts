export const checkMobile = (mobile: string) => {
  let pat = /^1\d{10}$/
  return pat.test(mobile)
}
