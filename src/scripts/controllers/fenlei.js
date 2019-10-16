import fenlei from '../views/fenlei/fenlei.art'
import Llist from '../views/fenlei/left.art'
import RList from '../views/fenlei/right.art'
import zuolie from '../models/left-list'
const BScroll = require('better-scroll')
class Fenlei{
    render(){
        let html=fenlei();
        $('.contanier').html(html);
        this.addleft();
    }
    async addleft(){
        let that=this;
        let Ldata=await zuolie.get();
        let data=Ldata.data
        let html=Llist({
            data
        })
        $('.first-list').html(html);
        $('.first-list li').eq(0).addClass('active')
        this.addright(data[0])
        $('.first-list li').on('click',function(){
            that.addright(data[$(this).index()])
            $(this).addClass('active').siblings().removeClass('active')
        })
        
    }
    addright(data){
        console.log(data)
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