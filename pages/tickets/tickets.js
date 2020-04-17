// pages/tickets/tickets.js
import { formatTime, changeDate } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: 0,
    isLogin: false,
    listOfData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.setNavigationBarTitle({
      title: '车票列表',
    });
    if (!wx.getStorageSync('loginData')) {
      wx.redirectTo({
        url: '../index/index',
      })
    }
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
    that.getData();
    const date = new Date();
    console.log(changeDate(1581073860978, 1, true))
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
    var that = this;
    wx.request({
      url: `http://127.0.0.1:3000/api/highSpeedTicketsManagement/queryAllTickets`,
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function (res) {
        console.log(res)
        const resData = res.data.data.result;
        resData.forEach(item => {
          item.start_time = changeDate(Number(item.startTime), 1, true)
          item.end_time = changeDate(Number(item.endTime), 1, true)
        })
        that.setData({
          listOfData: resData
        })
      }
    })
  },

  orderTickets: function (event) {
    console.log(event);
    const obj = event.currentTarget.dataset.item;
    const param = JSON.stringify(obj);
    console.log('click')
    wx.navigateTo({
      url: `../order-ticket/order-ticket?detail=${param}`,
    })
  },

  goMyPage: function () {
    wx.navigateTo({
      url: '../my/my',
    })
  }
})