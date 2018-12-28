// pages/mapTxPlugin/mapTxPlugin.js
let plugin = requirePlugin("myPlugin")
var routeMap = wx.getStorageSync('routeMap');
let routeInfo = {
  startLat: routeMap.startLat,    //起点纬度 选填
  startLng: routeMap.startLng,    //起点经度 选填
  startName: "我的位置",   // 起点名称 选填
  endLat: routeMap.endLat,    // 终点纬度必传
  endLng: routeMap.endLng,  //终点经度 必传
  endName: routeMap.endName,  //终点名称 必传
  mode: 'car' //算路方式 选填
}
Page({
  data: {
    routeInfo: routeInfo,
  },
  onLoad: function (options) {
    var routeMap = wx.getStorageSync('routeMap');
    console.log(routeMap)
    let routeInfo = {
      startLat: routeMap.startLat,    //起点纬度 选填
      startLng: routeMap.startLng,    //起点经度 选填
      startName: "我的位置",   // 起点名称 选填
      endLat: routeMap.endLat,    // 终点纬度必传
      endLng: routeMap.endLng,  //终点经度 必传
      endName: routeMap.endName,  //终点名称 必传
      mode: 'car' //算路方式 选填
    }
    this.setData({
      routeInfo: routeInfo
    })
  },

})