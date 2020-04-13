// pages/info/info.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{}
  },
  addCar: function(){//添加购物车
  wx.showLoading({
    title: '加载中',
  })
  console.log(this.data.info)
  const info=this.data.info;
  db.collection("carList").where({
    _id:info._id
  }).get().then(res=>{
   
    wx.hideLoading();
    if(res.data.length>0){//是否存在这条记录
      db.collection('carList').doc(
        info._id
      ).update({
        // data 传入需要局部更新的数据
        data: {
          // 表示将 done 字段置为 true
          carItemNum: res.data[0].carItemNum+1
        }
      })
        .then(res=>{
          wx.hideLoading();
          wx.showToast({
            title: '添加成功！',
          })
        })
        .catch(err => {
          wx.hideLoading();
          wx.showToast({
            title: '添加失败!',
          })
        })
    }else{
      this.addCarObj();
    }
    }).catch(err => {
      console.log(err)
      wx.hideLoading();
      wx.showToast({
        title: '添加失败!',
      })
    })
  },
  addCarObj:function(){
    const info = this.data.info;
    db.collection('carList').add({
      data: {
        productName: info.productName,
        productPrice: info.productPrice,
        fileIds: info.fileIds[0],
        _id: info._id,
        carItemNum: 1,
      }
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '添加成功',
      })
      console.log(res)
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '添加失败',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
    db.collection('product').where({
      _id: options._id // 填入当前用户 openid
    }).get().then(res => {
      console.log(res.data)
      this.setData({
        info: res.data[0]
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})