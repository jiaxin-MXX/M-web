module.exports = {
    get() {
      return $.ajax({
        url: `/api/mobile/classify`
      })
    }
}