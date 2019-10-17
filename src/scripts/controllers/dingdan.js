const dingdan = require('../../scripts/views/dingdan/dingdan.art')
const bscroll=require('better-scroll')
const store=require('store')
class Index {
    render() {
      var user=sessionStorage.getItem('user')
      var data=store.get(user)
      var type=sessionStorage.getItem('type')
      var temp=[]
      for(var i=0;i<data.length;i++){
        if(data[i].type==type){
          temp.push(data[i])
        }
      }
      data=temp;
      console.log(data)
      let html = dingdan({
        data
      })
      $('.contanier').html(html);
      $('.B-nav-back').on('tap',function(){
        window.history.go(-1)
      })
      new bscroll.default($('.M-M').get(0),{
        disableMouse: false,
        disableTouch: false,
        probeType: 2
      })
      if(type==1){
        $('.deleat').html('待收货')
      }else{
        $('.deleat').html('待付款')
      }
    }
  }
  
  export default new Index()