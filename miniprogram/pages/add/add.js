// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productName: '',//商品名称
    productPrice:0,//价格
    productInventory:0,//库存
    productContent:"",//商品介绍
    /*上传预览 */
    fileList: [
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true
      }
    ],
  },
/*商品名称 */
  onChangeproductName(event) {
    // event.detail 为当前输入的值
    this.setData({
      productName: event.detail
    })
  },
  /*商品价格 */
  onChangeproductPrice(event) {
    // event.detail 为当前输入的值
    this.setData({
      productPrice: event.detail
    })
  },
  /*商品库存 */
  onChangeproductInventory(event) {
    // event.detail 为当前输入的值
    this.setData({
      productInventory: event.detail
    })
  },
  /*商品介绍 */
  onChangeproductContent(event) {
    // event.detail 为当前输入的值
    this.setData({
      productContent: event.detail
    })
  },
  /*上传预览 */
  // 上传图片
  uploadToCloud() {
    wx.cloud.init();
    const { fileList } = this.data;
    if (!fileList.length) {
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
      Promise.all(uploadTasks)
        .then(data => {
          wx.showToast({ title: '上传成功', icon: 'none' });
          const newFileList = data.map(item => { url: item.fileID });
          this.setData({ cloudPath: data, fileList: newFileList });
        })
        .catch(e => {
          wx.showToast({ title: '上传失败', icon: 'none' });
          console.log(e);
        });
    }
  },

uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.path
    });
  },
  uploadImg: function (event) {
    console.log(event)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
       
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        console.log(res)
        let obj={};
        obj.url = tempFilePaths;
        obj.name = new Date().getTime()
        this.setData({
          fileList: this.data.fileList.concat(obj),
        })
        console.log(this.data.fileList)
      }
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