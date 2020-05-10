import fenlei from '../views/mine/mine.art'
import denglu from '../views/mine/denglu.art'
import zhuce from '../views/mine/register.art'
const store = require('store')
class Mine{
    addfun2(){
        $('.dai').on('tap',function(){
            if($(this).hasClass('shou')){
                sessionStorage.setItem('type','1')
            }
            if($(this).hasClass('fu')){
                sessionStorage.setItem('type','0')
            }
            location.hash='dingdan'
        })
    }
    addfun3(){
        let that = this
        $('.hai').on('tap',function(){
            if($(this).hasClass('login')){
                let html=denglu();
                $('.contanier').html(html);
                $('.denglu').on('tap',function(){
                    var judge=function(){
                        var temparr=store.get('user')
                        var len=temparr.length;
                        for(var i=0;i<len;i++){
                            if($('.name').get(0).value==temparr[i].name&&$('.password').get(0).value==temparr[i].password){
                                return temparr[i].name;
                            }
                        }
                        return 0;                    
                    }
                    let us=judge()
                    if(store.get('user')&&us){
                        html=fenlei();
                        $('.contanier').html(html);
                        that.addfun2()
                        that.addfun3()
                        $('.M-zc').html(us+'<p>></p>')
                        sessionStorage.setItem("user",us)
                    }else{
                        window.alert('用户名或密码不正确！')
                    }
                   
                })
            }
            if($(this).hasClass('register')){
                let html=zhuce();
                $('.contanier').html(html);
                $('.zhuce').on('tap',function(){
                    let count=0;
                    let data={
                        name:$('.name').get(0).value,
                        password:$('.password').get(0).value,
                    }
                    let arr;
                    if(store.get('user')){
                        arr=store.get('user');
                    }else{
                        arr=[];
                    }
                    for(var i=0;i<arr.length;i++){
                        if(arr[i].name==data.name){
                            window.alert('存在该用户名！')
                            break;
                        }else{
                            count++
                        }
                    }
                    if(count==arr.length){
                        arr.push(data)
                        store.set('user',arr)
                        window.alert('注册成功')
                        html=fenlei();
                        $('.contanier').html(html);
                        that.addfun2()
                        that.addfun3()
                        
                    }
                    $('.name').get(0).value=$('.password').get(0).value=''
                })
            }
        })
    }
    render(){
        let html=fenlei();
        $('.contanier').html(html);
        let username=sessionStorage.getItem('user')
        if(username){
            $('.M-zc').html(username+'<p>></p>')
        }
        this.addfun2()     
        this.addfun3()  
    }

}
export default new Mine()