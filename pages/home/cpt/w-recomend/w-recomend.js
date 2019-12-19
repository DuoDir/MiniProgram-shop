Component({
  data: {
    isLoad:false
  },
  properties: {
    recommend:{
      type:Array,
      value:[]
    }
  },
  methods: {
    handleImageLoad(){
      if(!this.data.isLoad){
        this.data.isLoad = true;
        // 发送事件
        this.triggerEvent('imageload')
      }
    }
  }
})