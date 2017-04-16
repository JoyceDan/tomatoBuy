Page({
  data: {
    list: {}
  },
  //加载事件
  onLoad: function() {
    //从缓存中读取数据
    var that = this
    wx.getStorage({
      key: 'list',
      success: function(res) {
        that.setData({
          list: res.data
        })
      }
    })
  },
  onShow: function() {
    this.onLoad()
  },
  //Debug Tool 查看storage
  showStorage: function() {
    wx.getStorage({
      key: 'list',
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  //Debug Tool 查看 order ID
  showid: function(order){
    console.log(order.target.id);
  },
  //事件处理
  onTap: function(order) {
    var id = order.target.id
    var link = "../info/info?id=" + id
    wx.navigateTo({
      url: link
    })
  },
  writeStorage: function(){
    try {
      wx.setStorageSync('list', this.data.list)
    } catch (e) {

    }
  },
  deleteOrder: function(e){
    var dataSet = e.target.dataset;
    var Index = dataSet.index;
    delete this.data.list[Index]
    //同步缓存
    this.writeStorage()
    //重新渲染页面
    this.setData({
      list: this.data.list
    });
  },
  modelTap: function(e) {
    var that = this;
    var o = e;
    wx.showModal({
      content: "确定要删除吗？",
      confirmText: "确定",
      cancelText: "取消",
      success: function(e) {
        if (e.confirm) {
          that.deleteOrder(o)
        }
      }
    })
  }
})
