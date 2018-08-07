// pages/result/result.js
Page({

  data: {
    showScore:'',
    shareImage: '',
    userInfo: {},
    avatarUrl:'',
    nickName:'',
    textCon:'',
    ctx: '',
    uPhoto:'',
    picOK:true,
    writePhotosAlbum:false
  },

  onLoad: function (options) {
    var that=this;
    var lastScore = options.lastScore;
    //console.log(lastScore)
    var showScore = '0%';
    var textCon='';
    if(lastScore==1){
      showScore="100%"
      textCon='诗仙'
    } else if (lastScore >=0.9){
      showScore=lastScore*100+'%'
      textCon = '诗圣'
    } else if (lastScore >= 0.7){
      showScore = lastScore * 100 + '%'
      textCon = '诗魔'
    } else if (lastScore >= 0.5) {
      showScore = lastScore * 100 + '%'
      textCon = '诗人'
    } else if (lastScore >0) {
      showScore = lastScore * 100 + '%'
      textCon = '诗小白'
    } else if (lastScore == 0){
      showScore = lastScore * 100 + '%'
      textCon = '诗渣渣'
    }
    this.setData({
      showScore: showScore,
      textCon: textCon,
    })
    wx.getSetting({
      success: (res) => {
       // console.log(res)
        that.writePhotosAlbum = res.authSetting['scope.writePhotosAlbum']
        this.setData({
          writePhotosAlbum: that.writePhotosAlbum,
        })
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
       // console.log(res)
        that.setData({
          avatarUrl: res.data.avatarUrl,
          nickName: res.data.nickName,
        })
        wx.downloadFile({
          url: res.data.avatarUrl,
          success: function (res) {
            if (res.statusCode === 200) {
              that.data.uPhoto = res.tempFilePath
              that.poster()
            }
          }
        })
      },
    })
  },

  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '诗词达人称号不考虑PK一下吗！',
      path: 'pages/login/login',
      // imageUrl: '../../image/share_pic.jpg',
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
  },
  
  eventSave() {
    let that = this;
    wx.showLoading({
      title: '生成保存中',
      mask: true
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: 'myCanvas',
      success: function (res) {
        that.setData({
          canvasTemppath: res.tempFilePath,
        })
        wx.hideLoading()
        wx.saveImageToPhotosAlbum({
          filePath: that.data.canvasTemppath,
          success(res) {
            //console.log(res)
            wx.showToast({
              title: '已保存相册',
              icon: 'success',
              duration: 2500
            })
          },
          fail(res) {
           console.log(res)
            if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              wx.showLoading({
                title: '请先授权相册',
              })
            }
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
    
  },
  getImage() {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      canvasId: 'myCanvas',
      complete: res => {
        //console.log(res.tempFilePath)
        if (res.errMsg === 'canvasToTempFilePath:ok') {
          wx.hideLoading();
          that.setData({
            shareImage: res.tempFilePath,
          })
        }
      }
    })
  },
  poster:function(){
    var that=this;
    wx.showLoading({
      title: '生成称号中',
      mask: true
    })

    wx.getSystemInfo({
      success: function (res) {
        var wWidth = res.windowWidth;
        var wHeight = res.windowHeight
        var ratio = wWidth / 750;
        const ctx = wx.createCanvasContext('myCanvas');
        that.setData({
          ctx: ctx
        })
        ctx.drawImage('../../image/result_bg.jpg',0 ,0, 600 * ratio, 880 * ratio);
        var text1 = '恭喜您！答对' + that.data.showScore + '的诗句';
        ctx.setTextAlign('center');
        ctx.setFontSize(24 * ratio);
        ctx.setFillStyle('#402D16') 
        ctx.fillText(text1, 600 * ratio/2, 100 * ratio)

        ctx.save(); // 先保存状态 已便于画完圆再用
        ctx.beginPath(); //开始绘制
        ctx.strokeStyle = "#e7e7e7";
        ctx.arc(600 * ratio / 2, 345 * ratio, 45 * ratio, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(that.data.uPhoto, (600-90 )* ratio / 2, 300 * ratio, 90 * ratio, 90 * ratio);
        ctx.restore();

        ctx.setFontSize(30 * ratio);
        ctx.setFillStyle('#333333');
        ctx.fillText(that.data.nickName, 600 * ratio / 2, 440 * ratio);
        ctx.fillText(that.data.nickName, 600 * ratio / 2 - 0.25 * ratio, 440 * ratio +0.25 * ratio);

        ctx.setFontSize(52 * ratio);
        ctx.setFillStyle('#af832d');
        var textNameW = ctx.measureText(that.data.textCon).width;
        ctx.fillText(that.data.textCon, 605 * ratio / 2, 540 * ratio);
        ctx.setFontSize(24 * ratio);
        ctx.setFillStyle('#402D16');
        var text2 = "荣获";
        ctx.fillText(text2, 600 * ratio / 2 - textNameW/2-24, 540 * ratio);
        var text4='称号';
        ctx.fillText(text4, 600 * ratio / 2 + textNameW / 2 + 24, 540 * ratio);
        ctx.drawImage('../../image/code.jpg', (600-320) * ratio / 2, 720 * ratio, 120 * ratio, 120 * ratio);

        ctx.setTextAlign('left');
        ctx.fillText('长按识别二维码', 600 * ratio / 2 , 770 * ratio);
        ctx.fillText('获取属于你的称号吧', 600 * ratio / 2 , 810 * ratio);

        ctx.draw(true,function(){
          that.getImage();
        });

      }
    })
  }
})