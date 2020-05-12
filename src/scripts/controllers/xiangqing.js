/*
 * @Description: 
 * @Autor: Decade Xin
 * @Date: 2020-04-14 15:49:10
 * @LastEditors: Decade Xin
 * @LastEditTime: 2020-05-12 14:14:19
 */
const xiangqing = require('../views/xiangqing/xiangqing.art')
const lunbo = require('../views/xiangqing/lunbo.art')
const xqdata=require('../models/xiangqing')
const Xlunbo=require('../models/X-lunbo')
const swiper=require('swiper')
const store = require('store')
import {get} from '../../utils/http'
const BScroll = require('better-scroll')
class Index {
  addLB(result2){
    console.log(result2)
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
    let result=await await get({
      url: "/dev/lunboselect",
      params: {
        id:Xhash
      }
    });
    let result2 = result.data
    let html = xiangqing({
      result2
    })
    document.querySelector('#box').innerHTML = html;
    this.addLB(result.data)
    $('.X-nav-back').on('tap',function(){
      window.history.go(-1)
    })
    let $main=$('.X-contain')
    let bscoll=new BScroll.default($main.get(0),{})
    $('.X-now').on('tap',function(){
      location.hash='by'
    })
    $('.X-by').on('tap',function(){
      let username
        if(!store.get("user")){
          if(confirm("你还没有登录！臭弟弟,要登录吗？")){
            location.hash='mine'
          }
        }else{
          let arr
          let flag = false
          username =store.get("user").user
          if(store.get(username)){
            arr = store.get(username)
          }else{
            arr = []
          }
          for(let item of arr){
            if(item.id == result2.id){
              item.count++
              flag = true
            }
          }
          if(flag){
            store.set(username,arr)
            flag = false
          }else{
            let message={
              id:result2.id,
              name:result2.name,
              xiq:result2.title,
              img:result2.tupian[0],
              price:result2.shoujia,
              count:1,
              type:0
            };
            arr.push(message)
            store.set(username,arr)
          }
          alert('在购物车等你哦')
        }
    })
  }
}

export default new Index()
