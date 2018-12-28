// pages/mapGD/mapGD.js
var amapFile = require('../../utils/amap-wx.js');
var akGd = '1d3713f194b9ac36ae66157a31c22c01'
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    staticShow:false
  },
  onLoad: function (options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: akGd });
    that.myAmapFun = myAmapFun;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        //that.getPoiAround()
      }
    })
  },
  getLoc: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
  },
  getPoiAround:function(){
    var that = this;
    that.myAmapFun.getPoiAround({
      location: that.data.longitudeEnd + "," + that.data.latitudeEnd,
      success: function (res) {
        //成功回调
        console.log(res)
        var markers = res.markers;
        for (var i in markers){
          var curDotName =markers[i].name
          markers[i]={
            id: i,
            latitude: markers[i].latitude,
            longitude: markers[i].longitude,
            iconPath: '../../image/bd_map_dot.png',
            width: 12,
            height: 17,
            label: {
              content: curDotName,
              color: '#ff5100',
              fontSize: 8,
              borderRadius: 10,
              anchorX: (parseFloat(curDotName.length / 2) * -8) - 4,
              anchorY: '4',
              textAlign: 'center',
              bgColor: "#fff",
              padding: 3,
              borderRadius: 0,
              borderColor: '#ff5100',
              borderWidth: 1
            }
          }
        }
        that.setData({
          markers:markers
        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
  },
  regionchange(e) {
    //console.log(e);
    var that = this;
    that.mapCtx = wx.createMapContext('map');
    if (e.type == 'end') {
      //获取地图中心点经纬度，并解析成地址
      that.mapCtx.getCenterLocation({
        success: function (res) {
          //console.log(res)
          that.setData({
            longitudeEnd: res.longitude,
            latitudeEnd: res.latitude
          })
          that.reverseGeocoder();
          that.getPoiAround()
        },
        fail: function (res) {
        }
      })
    }
    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
      //console.log(e)
    }
  },
  reverseGeocoder(){
    var that=this;
    var myAmapFun = new amapFile.AMapWX({ key: akGd });
    myAmapFun.getRegeo({
      location: that.data.longitudeEnd+","+that.data.latitudeEnd,
      success: function (data) {
        //console.log(data)
        that.setData({
          endAddress:data[0]
        })
      },
      fail: function (info) {
        console.log(info)
      }
    })
  },
  draw(){
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: akGd });
    wx.getSystemInfo({
      success: function (data) {
        var height = data.windowHeight;
        var width = data.windowWidth;
        var size = width + "*" + height;
        var markers = 'large,0xba30ef,:' + that.data.longitudeEnd + ',' + that.data.latitudeEnd + ';' + that.data.longitude + ',' + that.data.latitude;
        var paths ='5,0xba30ef,1,,:'+ that.data.longitudeEnd + ',' + that.data.latitudeEnd + ';' + that.data.longitude + ',' + that.data.latitude;
        myAmapFun.getStaticmap({
          zoom: 10,
          size: size,
          scale: 2,
          markers: markers,
          paths: paths,
          success: function (data) {
            //console.log(data)
            that.setData({
              src: data.url,
              staticShow: true
            })
          },
          fail: function (info) {
            wx.showModal({title:info.errMsg})
          }
        })
  

      }
    })

  },
  close(){
    var that=this;
    that.setData({
      staticShow: false
    })
  }
})