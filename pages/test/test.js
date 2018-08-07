// pages/test/test.js
var testData = require("../../data/poetry.js");

const app = getApp()
Page({
  data: {
    sumNum: 10,
    curIndex: 0,
    sumQues: '',
    animateQue: '',
    animateAns: '',
    showInfo: '',
    scrollTop: 0,
    resIcon: '',
    score:0,
    width:0,
    proNum:0,
    itemSel:'',
    rightClass:false,
    ctx: '',
    clickArr:[]
  },
  onLoad: function(options) {
    this.randomQue();
    this.setData({
      showInfo: this.data.sumQues.slice(0, 1),
      width: 0/this.data.sumNum*100+'%'
    })
    this.drawCanvas();
    for (var i=0;i<this.data.sumNum;i++){
      this.data.clickArr[i]=false;
    }
    this.setData({
      clickArr: this.data.clickArr
    })
  },
  randomQue: function() {
    //随机选固定组题目
    var originQues = testData.testData
    var arr = originQues.slice();
    app.utils.shuffle(arr)
    var sumQues = arr.slice(0, this.data.sumNum)
    this.setData({
      sumQues: sumQues
    })
  },
  answer: function(e) {
    var that = this;
    //console.log(e)
    var index = e.target.dataset.index;
    var isRight = e.target.dataset.isright;
    var ansCurIndex = e.target.dataset.idx;
    var click = e.target.dataset.click;
    if(!click){
          if (isRight) {
            var resIcon = '../../image/test_right.png'
            this.data.score++;
            var rightClass = false
          } else {
            wx.vibrateLong();
            var resIcon = '../../image/test_wrong.png'
            var rightClass=true
          }
          this.data.clickArr[index]=true
          this.setData({
            clickArr: this.data.clickArr
          })
          if (that.data.curIndex == that.data.sumNum - 1) {
            var lastScore = this.data.score / this.data.sumNum
            setTimeout(function() {
              that.data.showInfo[that.data.curIndex].icon = resIcon
              that.data.showInfo[that.data.curIndex].ansCurIndex = ansCurIndex
              that.data.showInfo[that.data.curIndex].itemSel = 'item-sel'
              that.data.showInfo[that.data.curIndex].rightClass = rightClass
              that.setData({
                showInfo: that.data.showInfo,
                width: '100%',
                proNum: that.data.sumNum
              })
            }, 500)
            setTimeout(function () {
              wx.redirectTo({
                url: '../result/result?lastScore=' + lastScore
              })
            }, 1000)

          } else {
            setTimeout(function() {
              that.data.showInfo[that.data.curIndex].icon = resIcon
              that.data.showInfo[that.data.curIndex].ansCurIndex = ansCurIndex
              var newItem = that.data.sumQues[that.data.curIndex + 1]
              that.data.showInfo[that.data.curIndex].itemSel = 'item-sel'
              that.data.showInfo[that.data.curIndex].rightClass = rightClass
              that.data.showInfo.push(newItem);
              that.setData({
                curIndex: that.data.curIndex + 1,
                showInfo: that.data.showInfo,
                width: (that.data.curIndex + 1) / that.data.sumNum * 100 + '%',
                proNum: that.data.proNum+1,
                scrollTop: that.data.scrollTop + 1800
              })
            }, 500)
          }
    }
  },
  onShareAppMessage: function(ops) {
    return {
      title: '最美小诗簿，读一首小诗，换一种心情！',
      path: 'pages/login/login',
      imageUrl: '../../image/share_pic.jpg',
      success: function(res) {
        wx.showToast({
          title: '转发成功',
          icon: 'succes',
          duration: 3000,
          mask: true
        })
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  drawCanvas(){
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        var wid = res.windowWidth;
        var hei = res.windowHeight
        var ratio = wid / 750;
        const ctx = wx.createCanvasContext('myCanvas');
        that.setData({
          ctx: ctx
        })
        var snow = 5;
        var arr = []; 
        for (var i = 0; i < snow; i++) {
           var num = Math.floor(Math.random() * 3) ;
          var w = Math.floor(Math.random() * 20)+10;
          arr.push({
            x: Math.random() * wid,
            y: Math.random() * hei,
            r: Math.random() * 10 + 1,
            img: '../../image/petal_' + num + '.png',
            w:w
          })
        }
        setInterval(function () { 
          that.drawOne(ctx, ratio, snow, arr, wid, hei)
        }, 25);
      }
    })
  },
  drawOne: function (ctx, ratio, snow, arr, wid, hei){
    for (var i = 0; i < snow; i++) {
      var p = arr[i];
      ctx.drawImage(p.img, p.x, p.y, p.w * ratio,p.w * ratio);
    }
    this.SnowFall(ctx, ratio, snow, arr, wid, hei);
    ctx.draw();
  },
  SnowFall:function (ctx, ratio, snow, arr, wid, hei) {
    for (var i = 0; i < snow; i++) {
      var p = arr[i];
      p.y += Math.random() * 0 + 1;
      if (p.y > hei) {
        p.y = 0;
      }
      p.x += Math.random() * 0 + 1;
      if (p.x > wid) {
        p.x = 0;
      }
    }
  }
})