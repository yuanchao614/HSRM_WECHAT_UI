// pages/register/register.js
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
      title: '注册账号',
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
  registerFormSubmit: function (e) {
    let that = this;

    const param = e.detail.value;
    console.log(param)
    const repass = new RegExp("^[0-9a-zA-Z_]{6,16}$", "");
    const mobileRepass = new RegExp("^[0-9]{11,11}$", "");
    if (mobileRepass.test(param.phoneNumber) == false) {
      wx.showToast({
        title: '手机号不合法',
        icon: 'none',
        duration: 2000
      });
    }
    if (repass.test(param.password) == true && param.password === param.password2) {
      console.log('注册中')
      that.register(param);
    } else if (param.password != param.password2) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000
      });
    } else if (repass.test(param.password) == false) {
      wx.showToast({
        title: '请输入6到16位由数字字母下划线组成的密码',
        icon: 'none',
        duration: 2000
      });
    } else {
      wx.showToast({
        title: '请填写完整表单',
        icon: 'none',
        duration: 2000
      });
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
        "password": param.password
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

  register: function (param) {
    var that = this;

    wx.request({
      url: 'http://127.0.0.1:3000/api/fontUser/register',
      method: 'POST',
      header: {
        'content-type': 'application/json', // 默认值
      },
      data: {
        "phoneNum": param.phoneNumber,
        "password": param.password,
        "name": param.name,
        "idCard": param.captcha,
        "sex": ''
      },
      success: function (res) {
        console.log(res)
        if (res.data.code == 200) {
          that.loginP(param);
        } else {
          wx.showToast({
            title: `${res.data.msg}`,
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },
})