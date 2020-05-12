import fenlei from '../views/mine/mine.art'
import denglu from '../views/mine/denglu.art'
import zhuce from '../views/mine/register.art'
import rename from '../views/mine/rename.art'
const store = require('store')
import {get,post} from '../../utils/http'
class Mine{
    addfun1(){
        let html=rename();
        $('.contanier').html(html);
        if(store.get('user')){
            let data = store.get('user')
            $('.name').get(0).value = data.user
            $('.phone').get(0).value = data.phone
            $('.password').get(0).value = data.password
            $('.address').get(0).value = data.address
        }
        $('.updata').on('tap',async ()=>{
            if(store.get('user')){
                let data={
                    id:store.get('user').id,
                    user:$('.name').get(0).value,
                    password:$('.password').get(0).value,
                    phone:$('.phone').get(0).value,
                    address:$('.address').get(0).value,
                }
                let result = await post({
                    url: "/dev/updataguke",
                    data
                })
                if(result.message == '修改成功'){
                    store.get('user',data)
                    window.alert(result.message)
                }
                
            }
        })
        $('.goback').on('tap',()=>{
            this.render()
        })
    }
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
                $('.denglu').on('tap',async function(){
                    var judge=async function(){
                        let data={
                            name:$('.name').get(0).value,
                            password:$('.password').get(0).value,
                        }
                        let result = await get({
                            url: "/dev/gukeselect2",
                            params: {
                              keyword:data.name
                            }
                          })
                        for(let item of result.data){
                            if(item.user==data.name && item.password==data.password){
                                store.set('user',item)
                                return true
                            }
                        }
                        return false        
                    }
                    if(await judge()){
                        html=fenlei();
                        $('.contanier').html(html);
                        that.addfun2()
                        that.addfun3()
                        $('.M-zc').html(store.get('user').user+'<p>></p>')
                    }else{
                        window.alert('用户名或密码不正确！')
                    }
                   
                })
                $('.goback').on('tap',()=>{
                    that.render()
                })
            }
            if($(this).hasClass('register')){
                let html=zhuce();
                $('.contanier').html(html);
                $('.zhuce').on('tap',async function(){
                    let data={
                        name:$('.name').get(0).value,
                        password:$('.password').get(0).value,
                        phone:$('.phone').get(0).value,
                        address:$('.address').get(0).value,
                    }
                    let result = await post({
                        url:'/dev/gukeregister',
                        data
                    })
                    window.alert(result.message)
                    if(result.type == 'success'){
                        html=fenlei();
                        $('.contanier').html(html);
                        that.addfun2()
                        that.addfun3()
                        
                    }
                })
                $('.goback').on('tap',()=>{
                    that.render()
                })
            }
        })
    }
    render(){
        let html=fenlei();
        let username
        $('.contanier').html(html);
        if(store.get('user')){
            username=store.get('user').user
        }
        if(username){
            $('.M-zc').html(username+'<p>></p>')
            $('.box-userinfo').on('tap',()=>{
                this.addfun1()
            })
        }
        this.addfun2()     
        this.addfun3()  
    }

}
export default new Mine()