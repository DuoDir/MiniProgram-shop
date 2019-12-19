import { getMultiData , getGoodsData } from '../../service/home.js'

Page({
    data:{
        banners:[],
        recommends:[],
        titlelist:['流行','新款','精选'],
        goods:{
            pop:{page:0,list:[
                {image:"https://gw.alicdn.com/bao/uploaded/TB1kH1nkkL0gK0jSZFtSutQCXXa.jpg_440x440q75",id:'1'},
                {image:"https://gw.alicdn.com/bao/uploaded/TB1WUBDkXP7gK0jSZFjSuw5aXXa.jpg_440x440q50.jpg",id:'2'},
                {image:"https://gw.alicdn.com/bao/uploaded/TB1.bhvklv0gK0jSZKbSuvK2FXa.jpg_440x440q50.jpg",id:'3'},
                {image:"https://gw.alicdn.com/bao/uploaded/TB1EDInj.z1gK0jSZLeSuv9kVXa.jpg_440x440q50.jpg",id:'4'},
                {image:"https://gw.alicdn.com/bao/uploaded/TB1CXZGjWL7gK0jSZFBSutZZpXa.jpg_440x440q50.jpg",id:'5'},
                {image:"https://gw.alicdn.com/bao/uploaded/TB1sKXkkeH2gK0jSZJnSuuT1FXa.jpg_440x440q75",id:'6'}
            ]},
            new:{page:0,list:[]},
            sell:{page:0,list:[]}
        },
        currentType:'pop',
        nowPage:0,
        isTabFixed:false,
        tapScrollTop:0
    },
    onLoad: function(options){
        this._getMultiData();
    },
    // 获取轮播图推荐数据
    _getMultiData(){
        getMultiData().then(res =>{
            const banners = res.data.data.banner.list;
            const recommends = res.data.data.recommend.list;
            this.setData({
                banners,
                recommends
            })
        })
    },
    // 获取展示图片数据
    _getGoodsData(type){
        const page = this.data.goods[type].page + 1;
        getGoodsData(type,1).then(res =>{
            const oldList = this.data.goods[type].list;
            const typekey = `goods.'${type}'.list`;
            const pagekey = `goods.'${type}'.page`;
            
            oldList.push({
                image:"https://s10.mogucdn.com/mlcdn/c45406/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg"
            })
            this.setData({
                [typekey]:oldList,
                [pagekey]:page
            })            
        })
    },
    // 监听上面图片 加载完成后执行
    handleImageLoad(){
        // 获取id组件与顶部的距离
        const query = wx.createSelectorQuery();
        query.select('#tab-control').boundingClientRect()
        query.exec(res=>{
            this.data.tapScrollTop = res[0].top
        })
    },
    // 屏幕滚动
    onPageScroll(options){
        // 实时记录屏幕滚动的高度
        const ScrollTop = options.scrollTop;
        // 推荐数据的tab距离顶部的距离  与 滚动的高度进行比较
        const flag = ScrollTop >= this.data.tapScrollTop;
        if(flag !=this.data.isTabFixed){
            this.setData({
                isTabFixed:flag
            })
        }
    },
    // 下拉更多
    onReachBottom(){
        // 每拉一次 页数就会增加
        this.data.nowPage += 1;
        // 写死的数据 (因为接口不能用 先写个假的)
        const addlist = [
                {image:"https://gw.alicdn.com/bao/uploaded/TB1kH1nkkL0gK0jSZFtSutQCXXa.jpg_440x440q75",id:'1'},
                {image:"https://gw.alicdn.com/bao/uploaded/TB1WUBDkXP7gK0jSZFjSuw5aXXa.jpg_440x440q50.jpg",id:'2'},
                {image:"https://gw.alicdn.com/bao/uploaded/TB1.bhvklv0gK0jSZKbSuvK2FXa.jpg_440x440q50.jpg",id:'3'},
                {image:"https://gw.alicdn.com/bao/uploaded/TB1EDInj.z1gK0jSZLeSuv9kVXa.jpg_440x440q50.jpg",id:'4'},
                {image:"https://gw.alicdn.com/bao/uploaded/TB1CXZGjWL7gK0jSZFBSutZZpXa.jpg_440x440q50.jpg",id:'5'},
                {image:"https://gw.alicdn.com/bao/uploaded/TB1sKXkkeH2gK0jSZJnSuuT1FXa.jpg_440x440q75",id:'6'}
        ]
        const newlist = this.data.goods.pop.list;
        newlist.push(...addlist);
        const goodstype = `goods.${this.data.currentType}.list`;
        this.setData({
            [goodstype]:newlist
        })
        console.log(`我是第${this.data.nowPage}页`)
    }
})