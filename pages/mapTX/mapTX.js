// pages/mapTX/mapTX.js

//获取应用实例
const app = getApp()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
// 实例化API核心类
var demo = new QQMapWX({
  key: 'TJJBZ-35QK3-5RN34-3TYAM-QDQJO-GCFXU' // 必填
});
function locaOpen(that) {
  //开启授权提示
  wx.showModal({
    title: '是否授权当前位置',
    content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
    showCancel: false,
    success: function (res) {
      if (res.cancel) {
        console.info("取消按钮未授权");
        locaOpen(that);
      } else if (res.confirm) {
        wx.openSetting({
          success: function (data) {
            console.log(data);
            if (data.authSetting["scope.userLocation"] == true) {
              wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 1000
              })
              that.getLocation();
            } else {
              wx.showToast({
                title: '授权失败',
                icon: 'success',
                duration: 1000,
                success: function () {
                  setTimeout(function () {
                    locaOpen(that)
                  }, 1000);
                }
              })
            }
          }
        })
      }
    }
  })
}

Page({
  data: {
    hasLocation: false,
    latitudeEnd: '',
    longitudeEnd: '',
    addressEnd: '',
    scale: 14,
    scalMaxS: false,
    scalMinS: false,
    markers: [{}],
  },
  regionchange(e) {
    //console.log(e);
    var that = this;
    that.mapCtx = wx.createMapContext('myMap');
    if (e.type == 'end') {
      //获取地图中心点经纬度，并解析成地址
      that.mapCtx.getCenterLocation({
        success: function (res) {
          that.setData({
            longitudeEnd: res.longitude,
            latitudeEnd: res.latitude
          })
          that.reverseGeocoder();
        },
        fail: function (res) {
        }
      })
    }
    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
      //console.log(e)
    }
  },
  markertap(e) {
    console.log(e.markerId)
  },
  nowLocation(e) {
    //定位到当前位置
    var that = this;
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.userLocation']) {
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            //非初始化进入该页面,且未授权
            locaOpen(that);
          } else if (res.authSetting['scope.userLocation'] == undefined) {
            //初始化进入
            that.getLocation();
          }
        } else if (res.authSetting['scope.userLocation']) {
          //已授权直接定位
          that.getLocation();
        }
      }
    })

  },
  maxMin(e) {
    //地图放大缩小
    var that = this;
    var id = e.currentTarget.id;
    console.log("scale===" + this.data.scale)
    if (id == "min") {
      that.setData({
        scale: --this.data.scale,
        scalMaxS: this.data.scale > 19 ? true : false,
        scalMinS: this.data.scale < 6 ? true : false
      })
    } else {
      that.setData({
        scale: ++this.data.scale,
        scalMaxS: this.data.scale > 19 ? true : false,
        scalMinS: this.data.scale < 6 ? true : false
      })
    }
  },
  getLocation: function (e) {
    //获取当前所在位置经纬度
    //console.log(e)
    var that = this
    wx.getLocation({
      type: 'gcj02',//火星坐标
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          }
        })
        demo.reverseGeocoder({
          location: {
            latitude: Number(res.latitude),
            longitude: Number(res.longitude)
          },
          success: function (res) {
            console.log(res);
            that.setData({
              addressEnd: res.result.formatted_addresses.recommend,
            })
          },
          fail: function (res) {
            console.log(that.data.latitudeEnd)
            console.log(res);
          },
          complete: function (res) {
            //console.log(res);
          }
        });
      }
    })
  },
  initLocation() {
    var that = this
    wx.getLocation({
      type: 'gcj02',//火星坐标
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          },
          latitudeEnd: res.latitude,
          longitudeEnd: res.longitude
        })
        that.reverseGeocoder();
      },
      fail:function(){
        locaOpen(that);
      }
    })
  },
  openLocation: function (e) {
    //根据经纬度在地图上显示
    var that = this;
    var value = e.detail.value
  },
  reverseGeocoder() {
    //解析经纬度为具体地址
    var that = this;
    demo.reverseGeocoder({
      location: {
        latitude: Number(that.data.latitudeEnd),
        longitude: Number(that.data.longitudeEnd)
      },
      success: function (res) {
        console.log(res);
        that.setData({
          addressEnd: res.result.formatted_addresses.recommend,
        })
      },
      fail: function (res) {
        console.log(that.data.latitudeEnd)
        console.log(res);
      },
      complete: function (res) {
        //console.log(res);
      }
    });
  },
  bindViewTap: function () {
    //事件处理函数
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    this.initLocation();
   
  },
  addressSel() {
    //调用腾讯地图搜索定位地址
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        //console.log(res)
        that.setData({
          addressEnd: res.name,
          latitudeEnd: res.latitude,
          longitudeEnd: res.longitude,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          },
        });
      },
      fail: function (err) {
        console.log(err)
      }
    });
  },
  startGo() {
    var that = this;
    var routeMap = {
      startLat: that.data.location.latitude,    //起点纬度 选填
      startLng: that.data.location.longitude,    //起点经度 选填
      startName: "我的位置",   // 起点名称 选填
      endLat: that.data.latitudeEnd,    // 终点纬度必传
      endLng: that.data.longitudeEnd,  //终点经度 必传
      endName: that.data.addressEnd,  //终点名称 必传
      mode: 'car' //算路方式 选填
    }
    wx.setStorageSync('routeMap', routeMap);
    wx.navigateTo({
      url: "../mapTxPlugin/mapTxPlugin",
    })
  }
})
