Component({
  data: {
    currentIndex:0
  },
  properties: {
    titles:{
      type:Array,
      value:[]
    }
  },
  methods: {
    itemClick(e){
      if(e.currentTarget.dataset.index == this.data.currentIndex) return;
      this.setData({
        currentIndex : e.currentTarget.dataset.index
      })
      
    }
  }
})