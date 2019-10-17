const rend=require('../views/home/render.art')
const positionView = require('../views/home/position.art')
const lunbo = require('../views/home/lunbo.art')
const youlike=require('../views/home/youlike.art')
const postionModel = require('../models/postion')
const Llist = require('../models/lunbo')
const swiper=require('swiper')
const BScroll = require('better-scroll')
class Position {
    first(){
      let html2=rend()
      $('.contanier').html(html2);
      
    }
    renderer(list,Ldata,data){
      console.log(1)
      let lunbo2=lunbo({
        list
      })
      //轮播图
      $('.swiper-wrapper').html(lunbo2);
      let positionView2=positionView({
        Ldata
      })
      //基础样式
      $('.home').html(positionView2);
      $('main').css('background','#fff')
      new swiper.default('.swiper1', {
        autoplay: {
           delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
      })        
      new swiper.default('.swiper2', {
        slidesPerView: 3.7,
        spaceBetween : 0,
        freeMode: true,
      });
      this.shuju(data);
    }
    shuju(data){
      let youlike2=youlike({
        data
      });
      $('.like-list').html(youlike2)
    }
    addfun(){
      $('.find').on('tap',function(){
        location.hash=$(this).attr('data-to')+'~'+$(this).attr('data-spuid')
      })
    }
    async render(){
      this.data=[];
      this.page=1;
      
      this.first()
      let that=this;
      let Ldata =  await Llist.get()
      let result = await postionModel.get({
        page:this.page
      })
      //删除数组的第一项
      let tempdata=[...Ldata.data]
      let list=tempdata.shift().list
      this.data=result.data.skuInfo;
      this.renderer(list,tempdata,this.data)


      this.addfun()

      let $imgHead = $('.head img')
      let $imgFoot = $('.foot img')
      let $main=$('main')
      // console.log($main)
      //初始获取数据
      
      let bscoll=new BScroll.default($main.get(0),{
        disableMouse: false,
        disableTouch: false,
        probeType: 2
      })
      bscoll.scrollBy(0,-40)
      //初始状态     
      //滑动结束
      bscoll.on('scrollEnd',async function(){
        if(this.y>=0){
          that.page=1
          $imgHead.attr('src', '../../assets/imgs/ajax-loader.gif');
          let result = await postionModel.get({
            page:that.page
          })
          that.data=result.data.skuInfo;
          bscoll.scrollBy(0,-40)
          $imgHead.attr('src', '../../assets/imgs/arrow.png');
        }
        if(this.maxScrollY >= this.y){
          that.page++;
          $imgFoot.attr('src', '../../assets/imgs/ajax-loader.gif');
          let result = await postionModel.get({
            page:that.page
          })
          that.data=[...that.data,...result.data.skuInfo]
          that.shuju(that.data);
          that.addfun();
          bscoll.refresh();
          $imgFoot.attr('src', '../../assets/imgs/arrow.png');
          $imgFoot.removeClass('down')
          bscoll.scrollBy(0,40)
        }
      })
      //滑动过程中
      bscoll.on('scroll',function(){
        if(this.y>0){
          $imgHead.addClass('up')
        }
        if(this.maxScrollY > this.y){
          $imgFoot.addClass('down')
        }
      })
      window.onresize=function(){
        bscoll.refresh()
      }
    }
}
export default new Position()