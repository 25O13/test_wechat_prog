// pages/mytheme/mytheme.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        theme_color:"",
        jiaonangHeight: 42, // data中定义
        statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度

    },

    change:function(e){
        const mycolor = e.target.dataset.mycolor;
        var that = this;
        this.setData({
            theme_color: mycolor
        })
        app.globalData.theme_color = this.data.theme_color

        app.globalData.user.set("theme_color", mycolor)
        app.globalData.user.save().then(() => {
            wx.showToast({
                title: '更换成功~',
                icon: 'success',
            });
        }).catch(error => {
            wx.showToast({
                title: '失败',
                icon: 'none',
            })
        });
        // console.log(e)
    },

    back: function (e) {
        wx.navigateBack({
          delta: 1,
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
        wx.getMenuButtonBoundingClientRect(  //获取胶囊的干度及其他参数
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
            theme_color: app.globalData.theme_color
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