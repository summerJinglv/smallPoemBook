const app = getApp()
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.loop = true
innerAudioContext.src = 'http://www.170mv.com/kw/other.web.ra01.sycdn.kuwo.cn/resource/n2/128/12/22/2072368440.mp3'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
      mask: false
    })
    this.music();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {
    wx.hideLoading()
  },

  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.errMsg == "getUserInfo:ok"){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    var photos = ["../../image/photo_0.jpg", "../../image/photo_1.jpg", "../../image/photo_2.jpg"]
    var num = Math.floor(Math.random() * photos.length);
    if (!this.data.hasUserInfo) {
      this.setData({
        userInfo: { 'nickName': '无名氏', avatarUrl: photos[num]},
        hasUserInfo: false
      })
    }
    wx.setStorage({
      key: "userInfo",
      data: this.data.userInfo
    })
    setTimeout(()=>{
      wx.redirectTo({
        url: '/pages/index/index'
      })
    },500)
  },
  
  onShareAppMessage: function (ops) {
    return {
      title: '最美小诗簿，读一首小诗，换一种心情！',
      path: 'pages/login/login',
      imageUrl: '../../image/share_pic.jpg',
      success: function (res) {
        wx.showToast({
          title: '转发成功',
          icon: 'succes',
          duration: 3000,
          mask: true
        })
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  music: function () {
      innerAudioContext.play()
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
  },
  onUnload: function(){
    innerAudioContext.stop()
  }
})