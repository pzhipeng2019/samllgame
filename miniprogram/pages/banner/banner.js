// pages/banner/banner.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['首页', '推广'],
    objectArray: [
      {
        id: 0,
        name: '首页'
      },
      {
        id: 1,
        name: '推广'
      },
      
    ],
    imageType: "0",
    inputTitle:"",
    inputDescribe:"",
    inputUrl:"",
    imagePath:"",
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value,e)
    this.setData({
      imageType: e.detail.value
    })
  },
  /**
   * 图片标题
   */
  inputTitle:function(event){
    console.log(event.detail)
    console.log(event.detail )
    this.setData({
      inputTitle:event.detail.value
    })
  },
   /**
   * 图片描述
   */
  inputDescribe:function(event){
    console.log(event.detail)
    console.log(event.detail )
    this.setData({
      inputDescribe:event.detail.value
    })
  },
   /**
   * 跳转链接
   */
  inputUrl:function(event){
    console.log(event.detail)
    console.log(event.detail )
    this.setData({
      inputUrl:event.detail.value
    })
  },
  /**
   * 上传图片
   */
  uploadImage:function(){
    wx.showLoading({
      title: '图片中。。。',
    })
    const that=this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        console.log(res)
        let suffix=/\.\w+$/.exec(tempFilePaths);
        console.log(res)
       
/**
 * 上传到云服务器
 *
 */
wx.cloud.uploadFile({
  cloudPath: new Date().getTime()+suffix,
  filePath: tempFilePaths, // 文件路径
}).then(res => {
  // get resource ID
  wx.hideLoading();
  console.log(res.fileID)
  that.setData({
    imagePath:res.fileID
  })
  wx.showToast({
    title: '图片上传成功！',
  })
}).catch(error => {
  // handle error
  wx.hideLoading();
  wx.showToast({
    title: '图片上传失败！',
  })
})

      }
    })
  },
  subimtBanner:function(){
    console.log("subimtBanner");
   var that=this;
   wx.showLoading({
     title: '提交中。。。',
   })
   console.log( that.data)
    db.collection("bannerImage").add({
      data:{
        imageType: that.data.imageType,
        inputTitle:that.data.inputTitle,
        inputDescribe:that.data.inputDescribe,
        inputUrl:that.data.inputUrl,
        imagePath:that.data.imagePath,
      }
    }).then(res=>{
      wx.hideLoading();
      wx.showToast({
        title: '提交成功！',
      })
      that.onLoad();
    }).catch(err=>{
      wx.hideLoading();
      wx.showToast({
        title: '提交失败！',
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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