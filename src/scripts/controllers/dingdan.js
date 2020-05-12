/*
 * @Description: 订单修改
 * @Autor: Decade Xin
 * @Date: 2020-04-14 15:49:10
 * @LastEditors: Decade Xin
 * @LastEditTime: 2020-05-12 15:21:26
 */
const dingdan = require('../../scripts/views/dingdan/dingdan.art')
const bscroll=require('better-scroll')
const store=require('store')
class Index {
    render() {
      var user=store.get('user').user
      var data=store.get(user)
      var temp=[]
      for(var i=0;i<data.length;i++){
        if(data[i].type==1){
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
      $('.good-info').on('tap',function(){
        location.hash='xiangqing~'+$(this).attr('data-spu')
      })
    }
  }
  
  export default new Index()