// pages/result/result.js
Page({

  data: {
      showScore:'',
  },

  onLoad: function (options) {
    var lastScore = options.lastScore;
    console.log(lastScore)
    var showScore=0;
    if(lastScore==1){
      showScore="100%"
    } else if (lastScore >=0.9){
      showScore=lastScore*100+'%'
    } else if (lastScore >= 0.7){
      showScore = lastScore * 100 + '%'
    } else if (lastScore >= 0.6) {
      showScore = lastScore * 100 + '%'
    } else if (lastScore >= 0.3) {
      showScore = lastScore * 100 + '%'
    } else if (lastScore == 0){
      showScore = lastScore * 100 + '%'
    }else{
      showScore = lastScore * 100 + '%'
    }
    this.setData({
      showScore: showScore,
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
  restart:function(){
    wx.redirectTo({
      url: '../index/index'
    })
  }
})