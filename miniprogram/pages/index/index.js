// pages/index/index.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],//数据列表
    value: '',
    banner: ['img1', 'img2', 'img3', 'img4','img5'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    indicatorColor:"#ffffff",
    //倒計時
    time: 30 * 60 * 60 * 1000,
    timeData: {}
  },
  onChange(e) {
    this.setData({
      timeData: e.detail
    });
  },
  /**
   * 获取product 数据
   */
  getProduct:function(){
    db.collection("product").get({
      success:res=>{
        console.log(res.data)
        this.setData({
          productList: res.data,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad")
    this.getProduct();//获取数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow")
    this.getProduct();//获取数据
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReachBottom")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("onShareAppMessage")
  }
})