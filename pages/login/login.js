// pages/login/login.js
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
      title: '登录页面',
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

  // 个人用户手机号和密码登录
  pwLoginFormSubmit: function (e) {
    console.log(e.detail.value)
    const param = e.detail.value;
    const repass = new RegExp("^[0-9]{11,11}$", "");
    if (!param.phoneNumber || !param.passWord) {
      wx.showToast({
        title: '请填写完整表单',
        icon: 'none',
        duration: 2000
      });
    } else if (repass.test(param.phoneNumber) == false) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 2000
      });
    } else {
      this.loginP(param);
    }
  },

  loginP: function (param) {
    wx.request({
      url: 'http://127.0.0.1:3000/api/fontUser/login',
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
      },
      data: {
        "phoneNum": param.phoneNumber,
        "password": param.passWord
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          wx.setStorage({
            key: 'loginData',
            data: res.data,
            success: () => {
              wx.navigateTo({
                url: '../tickets/tickets',
              })
            }
          });
        }
      }
    })
  },

  getMobileFoucus: function () {
    this.setData({
      mobileActive: true
    });
  },

  lostMoblieBlur: function () {
    this.setData({
      mobileActive: false
    });
  },

  getPwFoucus: function () {
    this.setData({
      pwActive: true
    });
  },

  lostPwBlur: function () {
    this.setData({
      pwActive: false
    });
  }
})