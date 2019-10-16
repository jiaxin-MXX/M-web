module.exports = {
    get({page=1}) {
      return $.ajax({
        url: `/api/mobile/skulist?page=${page}`
      })
    }
  }