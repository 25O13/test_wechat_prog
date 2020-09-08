// pages/photograph/photograph.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dev_pos: "back",
    camFlag: 0,
    co1: "#ffffff",
    bco1: "#ff9999",
    co2: "#ff9999",
    bco2: "#ffffff",
    co4: "#ffffff",
    bco4: "#ff9999",
    co5: "#ffffff",
    bco5: "#ff9999",
    theme_color: "",
    jiaonangHeight: 42, // data中定义
    statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度
  },

  start_cam: function () {
    this.setData({
      camFlag: 1
    })
  },

  change_cam() {
    if (this.data.camFlag == 1) {

      if (this.data.dev_pos == "back") {
        this.setData({
          dev_pos: "front",
        })
      } else {
        this.setData({
          dev_pos: "back",
        })
      }
      console.log(this.data)
    }
  },

  takePhoto() {
    if (this.data.camFlag != 2) {

      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.setData({
            src: res.tempImagePath,
            camFlag: 2
          })
        }
      })

    } else {
      var that = this;
      wx.showModal({
        title: "确定提交照片？",
        cancelColor: '#666666',
        showCancel: true,
        cancelText: '重拍',
        confirmText: '是的 ！',
        confirmColor: that.data.theme_color,
        success(res) {

          if (res.confirm) {

            //提交后执行的函数
            wx.navigateTo({
              url: '/pages/report/report',
            })
          }else{
            that.setData({
              camFlag: 1
            })
          }


        }
      })
    }

  },
  error(e) {
    console.log(e.detail)
  },


  tap_1: function () {
    wx.redirectTo({
      url: '/pages/homePage/homePage',
    })
  },

  tap_3: function () {
    wx.navigateTo({
      url: '/pages/shuaya/shuaya',
    })
  },

  tap_4: function () {
    wx.redirectTo({
      url: '/pages/task/task',
    })
  },

  tap_5: function () {
    wx.redirectTo({
      url: '/pages/mine/mine',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.getMenuButtonBoundingClientRect( //获取胶囊的干度及其他参数
      {
        success: e => {
          that.data.jiaonangHeight = e.height
        }
      }
    )

  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      theme_color: app.globalData.theme_color,
      bco1: app.globalData.theme_color,
      co2: app.globalData.theme_color,
      bco4: app.globalData.theme_color,
      bco5: app.globalData.theme_color,
      scrH: app.globalData.scrH,
      scrW: app.globalData.scrW,
    })

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

  }
})