//index.js
//获取应用实例
const app = getApp()
var poetry = require("../../data/poetry.js");
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.loop = true
innerAudioContext.src = 'http://www.170mv.com/kw/other.web.ra01.sycdn.kuwo.cn/resource/n2/128/12/22/2072368440.mp3'
Page({
  data: {
    poerty: '',
    showNum: 5,
    animationData: '',
    curIndex: 0,
    lastX: 0,
    lastY: 0,
    currentGesture: 0,
    play: true
  },

  onLoad: function () {
    this.randomPoetry()
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        //console.log(res)
      },
    })
    innerAudioContext.play()

  },
  handletouchtart: function (e) {
    //console.log(e)
    this.data.pageX = e.touches[0].pageX
    this.data.pageY = e.touches[0].pageY
  },
  handletouchmove: function (e) {
    //console.log(e)
    if (this.data.currentGesture != 0) {
      return
    }
    let currentX = e.touches[0].pageX
    let currentY = e.touches[0].pageY
    if (currentX < this.data.pageX) {
      this.slide("left")
      this.data.currentGesture = 1
    } else {
      this.slide("right")
      this.data.currentGesture = 2
    }
    this.data.lastX = currentX
    this.data.lastY = currentY
  },
  handletouchend: function (e) {
    this.data.currentGesture = 0
  },
  touch: function (e) {
    //console.log(e);

  },
  slide: function (direction) {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    this.animation = animation;
    if (direction == 'left') {
      this.animation.translateY(0).rotate(-5).translateX('-150%').step();
    } else {
      this.animation.translateY(-0).rotate(5).translateX('150%').step();
    }
    this.animation.translateY(0).translateX(0).rotate(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(() => {
      if (direction == 'left') {
        var nextIndex = this.data.curIndex + 1
        if (nextIndex > this.data.showNum - 1) {
          nextIndex = 0;
        }
      } else {
        var nextIndex = this.data.curIndex - 1
        if (this.data.curIndex == 0) {
          nextIndex = this.data.showNum - 1
        }
      }
      this.setData({
        curIndex: nextIndex,
        animationData: ''
      })
    }, 500)
  },
  randomPoetry:function(e){
    var cache = poetry.poetry.concat();
    app.utils.shuffle(cache)
    var showPoetry=cache.slice(0,this.data.showNum)
    this.setData({
      curIndex: 0,
      poetry: showPoetry
    })

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
  bindmusic: function () {
    if (this.data.play) {
      this.data.play = false
      this.setData({
        play: this.data.play
      })
      innerAudioContext.pause()
    } else {
      this.data.play = true
      this.setData({
        play: this.data.play
      })
      innerAudioContext.play()
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }
  },
})
