const layoutView = require('../views/layout.art')
class Index {
  bindClick() {
    // 页面切换
    location.hash = $(this).attr('data-to')
  }
  render() {
    const html = layoutView()
    document.querySelector('#box').innerHTML = html;
    $('footer li').on('tap', this.bindClick)
  }
}

export default new Index()
