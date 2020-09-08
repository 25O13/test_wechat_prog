// pages/reminder/change/change.js
const app = getApp();
const AV = require('../../../libs/av-core-min')
var util = require('../../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        brush_start_date: "",
        brush_end_date: "",
        brush_num: 0,
        jiaonangHeight: 42, // data中定义
        statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度
        tips: "建议：应该至少3个月更换一次牙刷",
        tap: "#ff9999",
        array: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        objectArray: [{
                id: 0,
                name: '1'
            },
            {
                id: 1,
                name: '2'
            },
            {
                id: 2,
                name: '3'
            },
            {
                id: 3,
                name: '4'
            },
            {
                id: 4,
                name: '5'
            },
            {
                id: 5,
                name: '6'
            },
            {
                id: 6,
                name: '7'
            },
            {
                id: 7,
                name: '8'
            },
            {
                id: 8,
                name: '9'
            },
            {
                id: 9,
                name: '10'
            },
            {
                id: 10,
                name: '11'
            },
            {
                id: 11,
                name: '12'
            },
        ],
        index: 0,
        choose_tip: "选牙刷要看两点\n先看头，再看毛"

    },

    go_task(){
        wx.redirectTo({
          url: '/pages/task/task',
        })
    },

    swt_brush: function (e) {
        if (e.detail.value) {
            wx.requestSubscribeMessage({
                tmplIds: ["LXDtb1J0RaEHwgLlvXR9qvFO8VSgi_8e2oP5SnW88YY"],
            })
        }
    },


    num_data: function () {
        var start_date = new Date(this.data.brush_start_date.replace(/-/g, "/"));
        var end_date = new Date(this.data.brush_end_date.replace(/-/g, "/"));
        var days = end_date.getTime() - start_date.getTime();
        var day = parseInt(days / (1000 * 60 * 60 * 24));
        if (day > 0) {
            this.setData({
                brush_num: day
            })
        }
    },


    change_action: function () {

        // this.setData({
        //     start_date: this.data.end_date,
        //     num: 0,
        // })
        // app.globalData.start_date = this.data.start_date
        // console.log(this.data.num)

        var that = this;
        wx.showModal({
            title: "确定已经更换牙刷了吗？",
            cancelColor: '#666666',
            showCancel: true,
            cancelText: '点错啦',
            confirmText: '是的 ！',
            confirmColor: that.data.theme_color,
            success(res) {

                if (res.confirm) {

                    that.setData({
                        brush_start_date: that.data.brush_end_date,
                        brush_num: 0,
                    })
                    app.globalData.brush_start_date = that.data.brush_start_date
                    app.globalData.user.set("brush", that.data.brush_end_date)
                    app.globalData.user.save().then(() => {
                        wx.showToast({
                            title: '我知道啦~',
                            icon: 'success',
                        });
                    }).catch(error => {
                        wx.showToast({
                            title: '失败',
                            icon: 'none',
                        })
                    });
                }


            }
        })
    },

    back: function () {
        wx.navigateBack({
            delta: 1,
        })
    },

    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value,
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
            theme_color: app.globalData.theme_color
        })
        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var time = util.formatTime(new Date());
        // 再通过setData更改Page()里面的data，动态更新页面的数据
        this.setData({
            brush_end_date: time,
            brush_start_date: app.globalData.brush_start_date,
        });
        this.num_data()
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