// pages/add/add.js
const db=wx.cloud.database();
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
     
    ],
    fileIds:[],
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
  afterRead(event) {
    const { file } = event.detail;
    const tempFilePaths = file.path;
    console.log(tempFilePaths)
    let obj = {};
    obj.url = tempFilePaths;
    obj.name = new Date().getTime()
    this.setData({
      fileList: this.data.fileList.concat(obj),
    })
    console.log(this.data.fileList)
  },
  // 上传图片
  submit:function(){
    wx.showLoading({
      title: '提交中',
    })
    //上传图片
    let promiseArr=[];
    for (let i = 0; i < this.data.fileList.length;i++){
      promiseArr.push(new Promise((reslove,reject)=>{
        let item = this.data.fileList[i];
        let suffix=/\.\w+$/.exec(item.url)[0];
        wx.cloud.uploadFile({
          cloudPath:item.name+suffix,
          filePath:item.url,
          success:res=>{
            this.setData({
              fileIds:this.data.fileIds.concat(res.fileID)
            })
            reslove();
          },
          fail:console.error
        })
      }))
    }
    Promise.all(promiseArr).then(res=>{
      db.collection('product').add({
        data:{
          productName: this.data.productName,
          productPrice: this.data.productPrice,
          productInventory: this.data.productInventory,
          productContent: this.data.productContent,
          fileIds:this.data.fileIds,
          _id:0,
        }
      }).then(res=>{
        wx.hideLoading();
        wx.showToast({
          title: '添加成功',
        })
        console.log(res)
      }).catch(err=>{
        wx.hideLoading();
        wx.showToast({
          title: '添加失败',
        })
      })
    })
  },
  afterDel(event){
    console.log(event.detail.index)
    const { fileList}=this.data;
    console.log(fileList)
    fileList.splice(event.detail.index,1)
    console.log(fileList)
    this.setData({
      fileList: fileList,
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