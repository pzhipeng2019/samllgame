// pages/index/index.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],//数据列表
    value: '',
    banner: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    indicatorColor:"#ffffff",
    //倒計時
    time: 30 * 60 * 60 * 1000,
    timeData: {},
    mallNav: [
      {
       item: [{ title: "超市", path: "../../images/mallnav-01.png" },
        { title: "数码电器", path: "../../images/mallnav-02.png" },
        { title: "服饰", path: "../../images/mallnav-03.png" },
        { title: "生鲜", path: "../../images/mallnav-04.png" },
        { title: "1小时达", path: "../../images/mallnav-05.png" },
        { title: "充值服务", path: "../../images/mallnav-06.png" },
        { title: "9.9元拼", path: "../../images/mallnav-07.png" },
        { title: "领券", path: "../../images/mallnav-08.png" },
        { title: "赚钱", path: "../../images/mallnav-09.png" },
        { title: "PLUS会员", path: "../../images/mallnav-10.png" }]
        }, 
    {
      item:[{ title: "国际", path: "../../images/mallnav-11.png" },
      { title: "拍卖", path: "../../images/mallnav-12.png" },
      { title: "唯品会", path: "../../images/mallnav-13.png" },
      { title: "玩3C", path: "../../images/mallnav-14.png" },
      { title: "沃尔玛", path: "../../images/mallnav-15.png" },
      { title: "美妆馆", path: "../../images/mallnav-16.png" },
      { title: "旅行", path: "../../images/mallnav-17.png" },
      { title: "拍拍二手", path: "../../images/mallnav-18.png" },
      { title: "物流查询", path: "../../images/mallnav-19.png" },
      { title: "全部", path: "../../images/mallnav-20.png" }]}

      
      
    ],
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
   * 获取banner
   */
  getBannerImage:function(){
    db.collection("bannerImage").where({
      imageType:"0"
    }).get().then(res=>{
      console.log(res.data)
      this.setData({
        banner:res.data
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log("onLoad")
    this.getProduct();//获取数据
    this.getBannerImage();//获取banner图片
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
wx.getSetting({
  success(res) {
    if (!res.authSetting['scope.record']) {
      wx.authorize({
        scope: 'scope.record',
        success () {
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          wx.startRecord()
        }
      })
    }
  }
})
   
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
    this.getBannerImage();//获取banner图片
    wx.getUserInfo({
      success: function(res) {
        console.log(res.userInfo)
      }
    })
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