// pages/shuaya/shuaya.js
const app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastBrush: "",
    lastScore: "",
    during: 0,
    timer: null,
    score: 0,
    countiDays: 0,
    mytime: "00:00",
    time_counter: 0,
    end_time: "",
    timesCounter: [0, 0, 0],
    myFuncFlag: [
      0, 0, 0
    ],
    funcFlag: 0, //0刷牙，1牙线，2漱口
    theme_color: "",
    jiaonangHeight: 42, // data中定义
    statusBarHeight: getApp().globalData.statusBarHeight, // 导航栏的高度

  },

  myFunc() {
    var flag = this.data.funcFlag;
    var state = this.data.myFuncFlag[flag];
    const title_list = [
      ["是否要开始刷牙啦", "确定结束了吗"],
      ["确定使用了牙线吗"],
      ["确定使用了漱口水吗"]
    ];
    var that = this
    wx.showModal({
      title: title_list[flag][state],
      cancelColor: '#666666',
      showCancel: true,
      cancelText: '点错啦',
      confirmText: '是的 ！',
      confirmColor: that.data.theme_color,
      success(res) {

        if (res.confirm) {

          const newdata = that.data.myFuncFlag[that.data.funcFlag] + 1
          const flag = that.data.myFuncFlag
          if (flag[0] != 2 && flag[1] != 1 && flag[2] != 1) {

            that.setData({
              [`myFuncFlag[${that.data.funcFlag}]`]: newdata
            })


            //刷牙计时功能
            if (flag[0] == 1) {
              var myInerval = setInterval(() => {
                that.setData({
                  time_counter: that.data.time_counter + 1
                });
                const newtime = that.setMytime(that.data.time_counter);
                that.setData({
                  mytime: newtime
                })
              }, 1000);
              that.setData({
                timer: myInerval
              })
            }

            if (flag[0] == 2) {
              that.setData({
                during: that.data.time_counter,
                end_time: that.data.mytime
              })

              clearInterval(that.data.timer);
            }
            if (flag[0] == 2 || flag[1] == 1 || flag[2] == 1) {
              that.myLog()
              that.setScore()
            }
            if (flag[0] == 2) {
              that.setBrush()
            }
          }
        }
      }
    })
  },

  myLog() {
    const that = this
    var time = util.metime(new Date());
    const last = that.data.during //? that.data.during:"";
    const flag = that.data.funcFlag;
    const toolList = ["牙刷", "牙线", "漱口水"];
    const newlog = {
      date: time,
      tool: toolList[flag],
      lasting: last
    }
    app.globalData.brushList.push(newlog)
    app.globalData.user.set("brushList", app.globalData.brushList)
    app.globalData.user.save().then(() => {}).catch(error => {
      wx.showToast({
        title: '上传记录失败',
        icon: 'none',
      })
    });

  },

  setBrush() {
    var isFirst = false;
    var time = util.formatTime(new Date());
    var that = this;
    var days = this.data.countiDays;
    var last = that.data.lastBrush
    console.log("excute setBrush()")

    if (time != that.data.lastBrush) {
      isFirst = true;
      that.data.lastBrush = time;
      app.globalData.lastBrush = time;
      app.globalData.user.set("lastBrush", that.data.lastBrush)
      app.globalData.user.save().then(() => {}).catch(error => {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
        })
      });
    } else {
      isFirst = false
    }

    if (isFirst) {
      var start = new Date(last.replace(/-/g, "/"));
      var end = new Date(time.replace(/-/g, "/"));
      console.log(start)
      console.log(end)
      var ms = end.getTime() - start.getTime();
      var day = parseInt(ms / 1000 / 60 / 60 / 24)
      if (day == 1 || last == "") {
        that.data.countiDays = days + 1
        console.log("1")
      } else {
        that.data.countiDays = 1
        console.log(">1")
      }
      console.log(that.data.countiDays)
      app.globalData.countiDays = that.data.countiDays;
      app.globalData.user.set("countiDays", that.data.countiDays)
      app.globalData.user.save().then(() => {}).catch(error => {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
        })
      });

    }

    console.log(app.globalData)


  },

  setScore() {
    const limit = [2, 3, 3];
    const scoreList = [0, 5, 5];
    var that = this
    var during = this.data.during;
    var times = this.data.timesCounter;
    var flag = this.data.funcFlag;
    var isFirst = false;
    var time = util.formatTime(new Date());
    var oldScore = this.data.score;
    if (time != that.data.lastScore) {
      isFirst = true;
      that.data.lastScore = time;
      app.globalData.lastScore = time;
      app.globalData.user.set("lastScore", that.data.lastScore)
      app.globalData.user.save().then(() => {}).catch(error => {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
        })
      });

    } else {
      isFirst = false
      // this.setData({
      //   score: app.globalData.scoreList[app.globalData.scoreList.length - 1].num
      // })
    }

    if (times[flag] == limit[flag]) {

      wx.showToast({
        title: '本项目得分次数已经达到上限了哦',
        icon: 'none'
      })
    } else {
      // console.log("case2")
      that.setData({
        [`timesCounter[${flag}]`]: times[flag] + 1,
      })
      app.globalData.timesCounter = that.data.timesCounter;

      app.globalData.user.set("timesCounter", that.data.timesCounter)
      app.globalData.user.save().then(() => {}).catch(error => {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
        })
      });

      //以上功能调试不需要



      //以下代码给分
      if (flag != 0) {
        that.setData({
          score: oldScore + scoreList[flag]
        })
      } else {
        if (during < 60) {
          that.setData({
            score: oldScore + 15
          })
        } else {
          if (during < 120) {
            that.setData({
              score: oldScore + 20
            })
          } else {
            if (during < 150) {
              that.setData({
                score: oldScore + 30
              })
            } else {
              if (during <= 210) {
                that.setData({
                  score: oldScore + 50
                })
              } else {
                that.setData({
                  score: oldScore + 30
                })
              }
            }
          }
        }
      }




      app.globalData.score = that.data.score
      app.globalData.user.set("score", app.globalData.score)
      app.globalData.user.save().then(() => {}).catch(error => {
        wx.showToast({
          title: '上传记录失败',
          icon: 'none',
        })
      })

      //给完分在这后面
      if (isFirst) {
        const newscore = that.data.score
        const showndate = util.md(new Date());
        const newrecord = {
          num: newscore,
          date: showndate,
        }
        app.globalData.scoreList.push(newrecord)
      } else {
        app.globalData.scoreList[app.globalData.scoreList.length - 1].num = that.data.score
      }

      app.globalData.user.set("scoreList", app.globalData.scoreList)
      app.globalData.user.save().then(() => {}).catch(error => {
        wx.showToast({
          title: '上传记录失败',
          icon: 'none',
        })
      });

      const gain = that.data.score - oldScore
      wx.showToast({
        title: '获得'+gain.toString()+'分~！',
      })







    }
  },

  change_L() {
    if (this.data.myFuncFlag[0] != 1) {
      this.setData({
        funcFlag: (this.data.funcFlag + 2) % 3,
        myFuncFlag: [0, 0, 0],
        mytime: "00:00",
        time_counter: 0,
        end_time: 0,
        during: 0,
      })
    } else {
      wx.showToast({
        title: '请先刷完牙哦',
        icon: "none"
      })
    }
  },

  change_R() {
    if (this.data.myFuncFlag[0] != 1) {
      this.setData({
        funcFlag: (this.data.funcFlag + 1) % 3,
        myFuncFlag: [0, 0, 0],
        mytime: "00:00",
        time_counter: 0,
        end_time: 0,
        during: 0,
      })
    } else {
      wx.showToast({
        title: '请先刷完牙哦',
        icon: "none"
      })
    }
  },

  back: function () {
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
      timesCounter: app.globalData.timesCounter,
      theme_color: app.globalData.theme_color,
      scrH: app.globalData.scrH,
      scrW: app.globalData.scrW,
      lastBrush: app.globalData.lastBrush,
      lastScore: app.globalData.lastScore,
      score: app.globalData.score,
      countiDays: app.globalData.countiDays
    })

  },

  setMytime(e) {

    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    return [parseInt(e / 60), e % 60].map(formatNumber).join(':')
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
    clearInterval(this.data.timer);
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