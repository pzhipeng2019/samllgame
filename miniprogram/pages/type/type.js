// pages/type/type.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeValue:"添加产品分类",
    typeList:[],
  },
  inputValue:function(event){
    console.log(event.detail )
    this.setData({
      typeValue:event.detail.value
    })
  },
  submitType:function(){
    const that=this;
    const {typeValue,typeList}=this.data;
    wx.showToast({
      title: '添加中。。。',
    })
    const obj=typeList.find(x=>x.typeName===typeValue)
    console.log(obj)
    db.collection("productType").where({typeName:typeValue}).get().then(res=>{
      console.log(res.data.length)
      if(res.data.length>0){
        wx.hideLoading();
          wx.showToast({
            title: '已存在此分类！',
          })
          that.setData({
            typeValue:"添加产品分类"
          })
      }else{
        db.collection("productType").add({data:{
          typeName:typeValue
        }}).then(res=>{
          wx.hideLoading();
          wx.showToast({
            title: '添加成功',
          })
          that.setData({
            typeValue:"添加产品分类"
          })
        })
      }
    }).catch(err=>{console.log(res)})
   
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;
    db.collection("productType").get().then(res=>{
      console.log(res.data)
      that.setData({
        typeList:res.data
      })
    }).catch(err=>{ console.log(err)})
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