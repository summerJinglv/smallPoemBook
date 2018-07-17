// pages/test/test.js
var testData = require("../../data/poetry.js");

const app = getApp()
Page({
  data: {
    sumNum: 5,
    curIndex: 0,
    sumQues: '',
    animateQue: '',
    animateAns: '',
    showInfo: '',
    scrollTop: 0,
    resIcon: '',
    clickOne: false,
    score:0,
    width:0,
    proNum:0,
    itemSel:'',
    rightClass:false,
  },
  onLoad: function(options) {
    this.randomQue();
    this.setData({
      showInfo: this.data.sumQues.slice(0, 1),
      width: 0/this.data.sumNum*100+'%'
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
    var ansCurIndex = e.target.dataset.idx
    if (index == that.data.curIndex) {
      if (!this.data.clickOne) {
        if (isRight) {
          var resIcon = '../../image/test_right.png'
          this.data.score++;
          var rightClass = false
        } else {
          wx.vibrateLong();
          var resIcon = '../../image/test_wrong.png'
          var rightClass=true
        }
        
        if (that.data.curIndex == that.data.sumNum - 1) {
          this.data.clickOne = true
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
  
})