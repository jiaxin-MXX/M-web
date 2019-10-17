import index from '../controllers/index'
import positionController from '../controllers/position'
import fenleiController from '../controllers/fenlei'
import byController from '../controllers/by'
import mineController from '../controllers/mine'
import xiangqingController from '../controllers/xiangqing'
import dingdanController from '../controllers/dingdan'
class Router{
    constructor(){
        index.render()
        this.hash='xiangqing';
        this.render()
    }
    render(){
        window.addEventListener('load', this.handlePageload.bind(this))
        window.addEventListener('hashchange', this.handleHashchange.bind(this))
    }
    renderDOM(hash){
        if(hash.indexOf('~')!=-1){
            hash=hash.split('~')[0]
        }
        let pageControllers = {
            positionController,
            fenleiController,
            byController,
            mineController,
            xiangqingController,
            dingdanController
          }
        if(this.hash=='xiangqing'){
            index.render()
        }
        pageControllers[hash + 'Controller'].render()
    }
    setActiveClass(hash){
        if(hash.indexOf('~')!=-1){
            hash=hash.split('~')[0]
        }
        $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active')
    }
    handlePageload(){
        let hash = location.hash.substr(1) || 'position'
        location.hash = hash
        this.renderDOM(hash)
        this.setActiveClass(hash)
    }
    handleHashchange(){
        
        let hash=location.hash.substr(1);
        if(hash.indexOf('~')!=-1){
            hash=hash.split('~')[0]
        }
        this.renderDOM(hash)
        this.setActiveClass(hash)
        this.hash=hash;
    }
}
export default new Router()