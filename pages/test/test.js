// pages/test/test.js
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onShareAppMessage: function (ops) {
    return {
      title: '最美古诗词！',
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
})