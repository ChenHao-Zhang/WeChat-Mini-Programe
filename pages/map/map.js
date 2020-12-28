Page({
  data: {
    latitude: 31.90410,
    longitude: 118.89972,
    showDialog: false,
    labelLatitude: null,
    labelLongitude: null,
    index: null,
    markers: [

    ]
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  oks:function(e){
    let newCallout = [{
      id: this.data.index+1,
      latitude: this.data.labelLatitude,
      longitude: this.data.labelLongitude,
      callout: {
        content: e.detail.value.msg,
        display: 'ALWAYS'
      }
    }]
    this.setData({
      markers: this.data.markers.concat(newCallout),
      showDialog: !this.data.showDialog
    })
    wx.setStorage({
      data: this.data.markers,
      key: 'markers',
      success:function(){
        console.log("success")
      }
    })
  },
  click: function(e){
    this.toggleDialog()
    this.setData({
      labelLatitude: e.detail.latitude,
      labelLongitude: e.detail.longitude,
      index: this.data.markers.length
    })
  },
  onLoad: function(options){
    var that = this
    wx.getStorage({
      key: 'markers',
      success:function(res){
        that.setData({
          markers: res.data
        })
      }
    })
  },
  sendMsg: function(e){
    let url = "../index2/index2?msg=" + e.detail.value.sendMsg
    wx.navigateTo({
      url: url,
    })
  }
})