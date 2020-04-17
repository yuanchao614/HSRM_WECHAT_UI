// pages/order-detail/order-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOrderTiket', function (res) {
      that.setData({
        fromOrderTiketPageData: res.data,
        mobinle: wx.getStorageSync('loginData').data.userInfo.phoneNum,
        type: res.data.type
      })
      console.log(res.data)
    });
    wx.setNavigationBarTitle({
      title: '确认订单',
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

  order: function () {
    if (this.data.type == 1) {
      this.setData({
        price: this.data.fromOrderTiketPageData.data.ticket_price1
      })
    } else if (this.data.type == 2) {
      this.setData({
        price: this.data.fromOrderTiketPageData.data.ticket_price2
      })
    } else {
      this.setData({
        price: this.data.fromOrderTiketPageData.data.ticket_price3
      })
    }
  wx.request({
    url: `http://127.0.0.1:3000/api/highSpeedOrderManagement/addOrder`,
    method: 'POST',
    header: {
      'content-type': 'application/json', // 默认值
    },
    data: {
      "phoneNum": this.data.mobinle,
      "hs_railId": this.data.fromOrderTiketPageData.data.hs_railId,
      "startStation": this.data.fromOrderTiketPageData.data.start_station,
      "endStation": this.data.fromOrderTiketPageData.data.end_station,
      "startTime": this.data.fromOrderTiketPageData.data.start_time,
      "endTime": this.data.fromOrderTiketPageData.data.end_time,
      "siteType": this.data.type,
      "price": this.data.price,
      "siteNum": "14A5"
    },
    success: (res) => {
      console.log(res);
      if (res.data.code == 200) {
        console.log('订票成功')
        wx.navigateTo({
          url: '../my/my'
        })
      }
    }
  })
  }
})