// pages/my/my.js
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
    var that = this;
    wx.setNavigationBarTitle({
      title: '我的订单',
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
    this.getData();
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

  getData: function () {
    const mobile = wx.getStorageSync('loginData').data.userInfo.phoneNum;
    wx.request({
      url: `http://127.0.0.1:3000/api/highSpeedOrderManagement/queryByPhoneNum?phoneNum=${mobile}`,
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: (res) => {
        console.log(res)
        if (res.data.code == 200) {
          this.setData({
            orderData: res.data.data.result
          })
        }
      }
    })
  },

  backTicket: function () {
    wx.redirectTo({
      url: '../tickets/tickets',
    })
  }
})