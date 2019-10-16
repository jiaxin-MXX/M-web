module.exports = {
    get({id}) {
      return $.ajax({
        url: `/api/product/skus?ids=${id}`
      })
    }
}