// pages/mapBD/mapBD.js
var bmap = require('../../utils/bmap-wx.min.js');
var wxMarkerData = [];
var akBd = 'Q7BtXjD6I9aL8NHV65aU3l9yQGyxzflY'
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    keyWord:'',
    noRes:false,
    weatherShow:false,
    animationData: "",
  },
  makertap: function (e) {
    console.log(e)
    var that = this;
    var id = e.markerId;
    console.log(id)
  },
  onLoad: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'Q7BtXjD6I9aL8NHV65aU3l9yQGyxzflY'
    });
    that.BMap = BMap;
    that.getLoc();
    that.BMap.weather({
      success: function(res){
        console.log(res)
        that.setData({
          weather: res.currentWeather[0],
        })
      }
    }); 
  },
  weatherToggle:function(){
    var that = this;
      that.setData({
        weatherShow: !that.data.weatherShow,
      })
  },
  searchInput:function(e){
    var that=this
    that.setData({
      keyWord:e.detail.value,
      noRes:false,
      markers:[]
    })
    if (that.data.keyWord!=""){
      that.BMap.suggestion({
        query: e.detail.value,
        region: that.data.cityCode,
        city_limit: true,
        location: that.data.latitude + ',' + that.data.longitude,
        success: function(data){
          console.log(data)
          that.setData({
            sugData: data.result,
          });
          if (data.result.length==0){
            that.setData({
              noRes: true
            })
          }else{
            that.setData({
              noRes: false
            })
          }
        }
      });
    }else{
      that.setData({
        sugData: [],
        noRes: false
      });
    }
 
  },
  inputClear:function(){
    var that=this
    that.setData({
      keyWord: "",
      sugData: [],
      noRes: false,
      markers: []
    })
  },
  getLoc:function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        that.setData({
            longitude: res.longitude,
            latitude: res.latitude
        })
        var loc = res.latitude + ',' +res.longitude
        wx.request({
          url: `https://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${loc}&output=json&pois=1&ak=${akBd}`,
          data: { },
          success: function (res) {
            console.log(res)
            let num = res.data.indexOf('(')
            let result = JSON.parse(res.data.slice(num + 1, -1))
            console.log(result)
            that.setData({
              cityCode: result.result.cityCode
            })
          }
        });
      }
    })
  },
  copyIn:function(e){
    var that=this;
    var curDot = that.data.sugData[e.currentTarget.dataset.index];
    var curDotName = curDot.name
    var curDotMarker={
      id:0,
      latitude: curDot.location.lat,
      longitude: curDot.location.lng,
      iconPath:'../../image/bd_map_dot.png',
      width:25,
      height:34,
      label:{
        content: curDotName,
        color: '#ff5100',
        fontSize: 12,
        borderRadius: 10,
        anchorX: (parseFloat(curDotName.length / 2) * -12)-4,
        anchorY: '4',
        textAlign: 'center',
        bgColor:"#fff",
        padding:3,
        borderRadius:0,
        borderColor: '#ff5100',
        borderWidth:1
      }
    }
    that.setData({
      keyWord: curDot.name,
      desLat: curDot.location.lat,
      desLng: curDot.location.lng,
      latitude: curDot.location.lat,
      longitude: curDot.location.lng,
      markers: [curDotMarker],
      sugData:[]
    })
  }
})