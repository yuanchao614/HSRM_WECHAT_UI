// pages/order-ticket/order-ticket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.detail))
    var that = this;
    that.setData({
      item: JSON.parse(options.detail)
    })

    wx.setNavigationBarTitle({
      title: '订票详情',
    });
    // 获取屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  orderDetail: function (param) {
    wx.navigateTo({
      url: `../order-detail/order-detail`,
      success: (res) => {
        res.eventChannel.emit('acceptDataFromOrderTiket', {
          data: param
        })
      }
    })
  },

  orderOne: function () {
    const params = {
      data: this.data.item,
      type: 1
    }
    this.orderDetail(params)
  },

   orderSec: function () {
    const params = {
      data: this.data.item,
      type: 2
    }
     this.orderDetail(params)
  },

   orderTheard: function () {
    const params = {
      data: this.data.item,
      type: 3
    }
     this.orderDetail(params)
  }

})