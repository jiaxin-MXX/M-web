import fenlei from '../views/fenlei/fenlei.art'
import Llist from '../views/fenlei/left.art'
import RList from '../views/fenlei/right.art'
import zuolie from '../models/left-list'
const BScroll = require('better-scroll')
import {get} from '../../utils/http'
const type ={
    huawei:'华为',
    vivo:'VIVO',
    oppo:'OPPO',
    Samsung:'三星',
    mi:'小米'
}
class Fenlei{
    render(){
        let html=fenlei();
        $('.contanier').html(html);
        this.addleft();
    }
    async addleft(){
        let list2 = await get({
            url: "/dev/lunbo",
            params: {
              mess:'all',
              page: 1,
              pageSize: 1000
            }
          })
          for(let item of list2.data){
            item.tupian = item.tupian.split('|')
          }
          list2 = _.groupBy(list2.data,(value)=>{
            return value.changshang
          })
          let tem =[]
          _.forEach(list2,(value,key)=>{
            tem.push({
              title:type[key],
              arr:value
            })
          })
          console.log(tem)
        let that=this;
        let Ldata=await zuolie.get();
        let data=Ldata.data
        let html=Llist({
            tem
        })
        $('.first-list').html(html);
        $('.first-list li').eq(0).addClass('active')
        this.addright(tem[0])
        $('.first-list li').on('click',function(){
            that.addright(tem[$(this).index()])
            $(this).addClass('active').siblings().removeClass('active')
        })
        
    }
    addright(data){
        let html=RList({
            data
        })
        $('.second-list').html(html);
        this.addfun()
        let $main=$('.F-right')
        new BScroll.default($main.get(0),{
            probeType: 2
        })
    }
    addfun(){
        $('.R-item').on('tap',function(){
          location.hash=$(this).attr('data-to')+'~'+$(this).attr('data-spuid')
        })
    }
}
export default new Fenlei()