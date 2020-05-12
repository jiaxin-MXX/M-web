import fenlei from '../views/by/by.art'
import have from '../views/by/have.art'
import goods from '../views/by/goods.art'
import kong from '../views/by/kong.art'
const BScroll = require('better-scroll')
const store = require('store')
import {get,post} from '../../utils/http'
class By{
    allprice(){
        let price=0;
        let count=0;
        for(var i=0;i<$('.item-price').length;i++){
            if($('.B-yuan').eq(i).hasClass('tap')){
                price+=$('.jiaq').eq(i).html()*$('.shuliang').eq(i).html();
                count+=$('.shuliang').eq(i).html()*1;
            }
        }
        $('.qian').html(price);
        $('.jijian').html(count);
    }
    first(data){
        var arr=[];
        for(var i=0;i<data.length;i++){
            if(data[i].type==0){
                arr.push(data[i])
            }
        }
        data=arr;
        // var name=sessionStorage.getItem('user')
        let html=have();
        $('.have-list').html(html);
        html=goods({
            data
        });
        $('.goods').html(html)
        // goods
        new BScroll.default($('.goods').get(0),{
            disableMouse: false,
            disableTouch: false,
            probeType: 2
        })   
    }
    addtap(){
        let that=this;
        $('.yuan').on('tap',function(){
            $(this).toggleClass('tap');
            if($(this).hasClass('tap')){
                $('.B-yuan').addClass('tap')
            }else{
                $('.B-yuan').removeClass('tap')
            }
            that.allprice()
        })
        $('.B-yuan').on('tap',function(){
            let ok=true;
            $(this).toggleClass('tap');
            for(var i=0;i<$('.B-yuan').length;i++){
               if(!$('.B-yuan').eq(i).hasClass('tap')){
                    ok=false;
               }
            }
            if(ok){
                $('.yuan').addClass('tap')
            }else{
                $('.yuan').removeClass('tap')
            }
            that.allprice()
        })
        $('.deleat').on('tap',function(){
            var usernn=store.get('user').user
            var arr=store.get(usernn);
            console.log(arr)
            arr.splice($(this).parent().index(),1)
            console.log(arr)
            $(this).parent().remove();
            store.set(usernn,arr)
            that.allprice()
            if(!store.get(usernn).length){
                that.addimg();
            }
            
        })
    }
    addimg(){
        var html=kong()
        $('.have-list').html(html)
    }
    getdate(){
	    const dt = new Date();
    	const y = dt.getFullYear();
    	const m = dt.getMonth() + 1;
    	const d = dt.getDate();
    	const time = y + '-' + m + '-' + d;
		return time;
    }
    by(){
        let that=this;    
        $('.jiesuan').on('tap',async function(){
            let username=store.get('user').user
            let data=store.get(username);
            var arrindex=[];
            if($('.qian').html()==0){
                alert('真丑陋！连购物车都清空不了吗？')
            }else{
                alert('本次消费一共'+$('.qian').html()+'元，祝您消费愉快！')
                var len=$('.B-yuan').length
                for(var i=len;i>=0;i--){
                    if($('.B-yuan').eq(i).hasClass('tap')){
                        for(var j=0;j<data.length;j++){
                            if($('.good-info').eq(i).attr('data-spu')==data[j].id){
                                data[j].type=1;
                                arrindex.push(data[j])
                            }
                        }
                        $('.good-info').eq(i).remove();
                    }
                }
                that.allprice()
                store.set(username,data)
                let result = await post({
                    url: "/dev/orderadd",
                    data:{
                        time:that.getdate(),
                        user:store.get('user'),
                        data:arrindex
                    }
                })
            }
            
        })
    }
    render(){
        let html=fenlei();
        let username=store.get('user').user
        $('.contanier').html(html);
        $('.B-nav-back').on('tap',function(){
            window.history.go(-1)
        })

        if(store.get(username)&&store.get(username).length){
            var data=store.get(username);
            this.first(data);
            this.addtap();
            this.allprice();
            this.by();
        }else{
            this.addimg(); 
        }
    }

}
export default new By()