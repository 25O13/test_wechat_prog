// pages/mytheme/mytheme.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        scrH:null,
        theme_color:"",
        jiaonangHeight: 42, // data中定义
        statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度

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
        wx.getMenuButtonBoundingClientRect(  //获取胶囊的干度及其他参数
          {
              success: e => {
                that.data.jiaonangHeight = e.height
              }
            }
        )

    },

    back(){
        wx.navigateBack({
          delta: 1,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            theme_color: app.globalData.theme_color,
            scrH: app.globalData.scrH
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