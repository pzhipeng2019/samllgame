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
    timeData: {},
    mallNav: [
      {
       item: [{ title: "超市", path: "../../images/mallnav-01.png.webp" },
        { title: "数码电器", path: "../../images/mallnav-02.png.webp" },
        { title: "服饰", path: "../../images/mallnav-03.png.webp" },
        { title: "生鲜", path: "../../images/mallnav-04.png.webp" },
        { title: "1小时达", path: "../../images/mallnav-05.png.webp" },
        { title: "充值服务", path: "../../images/mallnav-06.png.webp" },
        { title: "9.9元拼", path: "../../images/mallnav-07.png.webp" },
        { title: "领券", path: "../../images/mallnav-08.png.webp" },
        { title: "赚钱", path: "../../images/mallnav-09.png.webp" },
        { title: "PLUS会员", path: "../../images/mallnav-10.png.webp" }]
        }, 
    {
      item:[{ title: "国际", path: "../../images/mallnav-11.png.webp" },
      { title: "拍卖", path: "../../images/mallnav-12.png.webp" },
      { title: "唯品会", path: "../../images/mallnav-13.png.webp" },
      { title: "玩3C", path: "../../images/mallnav-14.png.webp" },
      { title: "沃尔玛", path: "../../images/mallnav-15.png.webp" },
      { title: "美妆馆", path: "../../images/mallnav-16.png.webp" },
      { title: "旅行", path: "../../images/mallnav-17.png.webp" },
      { title: "拍拍二手", path: "../../images/mallnav-18.png.webp" },
      { title: "物流查询", path: "../../images/mallnav-19.png.webp" },
      { title: "全部", path: "../../images/mallnav-20.png.webp" }]}

      
      
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