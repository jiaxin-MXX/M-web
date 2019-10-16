module.exports = {
    get({id}) {
      return $.ajax({
        url: `/api/product/spus?ids=${id}`
      })
    }
}