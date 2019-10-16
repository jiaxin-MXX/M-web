const xiangqing = require('../views/xiangqing/xiangqing.art')
const lunbo = require('../views/xiangqing/lunbo.art')
const xqdata=require('../models/xiangqing')
const Xlunbo=require('../models/X-lunbo')
const swiper=require('swiper')
const store = require('store')

const BScroll = require('better-scroll')
class Index {
  addLB(result2){
    let html = lunbo({
      result2
    })
    $('.swiper3 .swiper-wrapper').html(html);
    new swiper.default('.swiper3', {
      autoplay: {
         delay: 2500,
          disableOnInteraction: false,
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      }
    })  
  }
  async render() {
    let temp=[];
    let sku;
    let Xhash=location.hash.split('~')[1]
    let result=await xqdata.get({
      id:Xhash
    })
    sku=result.data.list[0].shop_info.default_sku
    for(var i=0;i<result.data.list[0].sku_info.length;i++){
      temp.push(result.data.list[0].sku_info[i].sku_id)
    }
    let id=temp.join(',')
    let result2=await Xlunbo.get({
      id:id
    })
    
    let len=result2.data.list.length
    
    for(var i=0;i<len;i++){
      if(result2.data.list[i].id==sku){
        result2=result2.data.list[i];
        break;
      }
    }
    console.log(result2)
    let html = xiangqing({
      result2
    })
    document.querySelector('#box').innerHTML = html;
    this.addLB(result2)
    $('.X-nav-back').on('tap',function(){
      window.history.go(-1)
    })
    let $main=$('.X-contain')
    let bscoll=new BScroll.default($main.get(0),{})
    $('.X-now').on('tap',function(){
      location.hash='by'
    })
    $('.X-by').on('tap',function(){
      let username=sessionStorage.getItem("user")
        if(!username){
          if(confirm("你还没有登录！臭弟弟,要登录吗？")){
            location.hash='mine'
          }
        }else{
          var text=result2.name;
          let arr=[];
          let con=0; 
          var name,xiq;
          name=text.split('（')[0];
          xiq=text.split('（')[1].split('）')[0];
          var message={
            id:result2.id,
            name:name,
            xiq:xiq,
            img:result2.shop_info.ali_image,
            price:result2.price,
            count:1,
            type:0
          };
          if(store.get(username)){
            arr=store.get(username);
          }
          for(var i=0;i<arr.length;i++){
            if(arr[i].id==message.id&&arr[i].type==0){
              arr[i].count+=message.count;
              store.set(username, arr);
              break;
            }else{
              con++;
            }
          }
          if(con==arr.length){
            arr.push(message)
            store.set(username, arr)
          }
          alert('在购物车等你哦')
        }
    })
    
    // console.log(store.get('user').name)
  }
}

export default new Index()
