<template>
	<view class="settled-box">
		<view class="settled-bg-header">
			<view class="settled-bg-top">
				<view class="settled-bu-name">
					客户信息
				</view>
				<view class="settled-bu-name">
					专属二维码
				</view>
				<view class="settled-bu-name">
					成为会员
				</view>
			</view>
			<view class="settled-header">
				<view class="settled-xian">
					
				</view>
				<view class="settled-bu settled-buOne">
					<image class="settled-buImg" src="/static/image/dui.png" mode=""></image>
				</view>
				<view class="settled-bu settled-buTwo">
					<image class="settled-buImg" src="/static/image/kong.png" mode=""></image>
				</view>
				<view class="settled-bu settled-San">
					<image class="settled-buImg" src="/static/image/kong.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="register-ul">
			<view class="register-li">
				<view class="register-name">
					商家名称
				</view>
				<view class="register-right">
					<input v-model="name" placeholder-style="color:#AEB3C0" placeholder="请输入商家名称" class="register-input" type="text" value="" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">  
					商家类型
				</view>
				<view @click="showPicker" class="register-right">
					<view class="register-picker" placeholder='请输入地址'>
						{{types}}
					</view>
					<image src="/static/image/jt.png" mode="" class="shangjian"></image>
					<mpvue-picker :deepLength='deepLength' ref="mpvuePicker" :mode="mode" :pickerValueDefault="pickerValueDefault" @onChange="onChangepicker" @onConfirm="onConfirmpicker" @onCancel="onCancelpicker" :pickerValueArray="pickerValueArray"></mpvue-picker>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					商家地区
				</view>
				<view @click="showCityPicker" class="register-right">
					<view class="register-picker" placeholder='请输入地址'>
						{{address}}
					</view>
					<image src="/static/image/jt.png" mode="" class="shangjian"></image>
					
					<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onCancel="onCancel" @onConfirm="onConfirm">请选择地址</mpvue-city-picker>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					详细地址
				</view>
				<view class="register-right">
					<input v-model="addressDetail" placeholder-style="color:#AEB3C0" placeholder="请输入详细地址" class="register-input" type="text" value="" />
				</view>
		<!-- 		<view class="register-name" @click="getLocation">
					获取位置
				</view> -->
			</view>
			<view class="register-li">
				<view class="register-name">
					负责人名称
				</view>
				<view class="register-right">
					<input v-model="leadingName" placeholder-style="color:#AEB3C0" placeholder="请输入负责人名称" class="register-input" type="text" value="" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					手机号
				</view>
				<view class="register-right">
					<input maxlength="11" v-model="phone" placeholder-style="color:#AEB3C0" placeholder="请输入负责人手机号" class="register-input" type="number" value="" />
				</view>
			</view>
		</view>
		<!-- 上传 -->
		<view class="register-upload">
			<view class="register-upload-header">
				与门店合影（仅限现场拍照）
			</view>
		 	<view class="upload-box">
				<view class="upload-list">
					<view class="uphe">
						<block v-if="imageSrc">
							<view class="imgaboust">
								<image @click="imageSrcOneNone" class="imgOut" src="/static/image/up2.png" mode=""></image>
								<image @click="previewImage(imgUrlZs)" :src="imgUrlZs" class="upImg" mode="widthFix"></image>
							</view>
							
						</block>
						<block v-else>
							<image @click="chooseImage" class="upImg" src="/static/image/up1.png" mode=""></image>
						</block>
						<view class="register-uptext">
							拍照
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 下一步 -->
		<view class="join" @click='join'>
			下一步
		</view>  
	</view>
</template>

<script>
	import mpvueCityPicker from 'mpvue-citypicker';
	import mpvuePicker from '../../components/ly-picker.vue';
	import http from '../../utils/http.js';
	import api from '../../utils/api.js';
	export default {
		data() {
			return {
				 imageSrc: '',
				 address:'请选择地址',//常住地
				 types:'请选择商家类型',
				 pickerValueDefault: [0, 0, 0],
				 index:0,
				 mode: 'multiLinkageSelector',
				 deepLength: 2,
				 pickerValueArray: [
					{
					  label: '火车',
					  value: 10,
					  children: [
						{
						  label: '火车1',
						  value: 11,
						  children: [
							
						  ]
						},
						{
						  label: '火车22',
						  value: 212,
						  children: []
						},
						{
						  label: '火车2',
						  value: 12,
						  children: []
						},
						{
						  label: '火车3',
						  value: 13,
						  children: []
						}
					  ]
					},
					{
					  label: '火车20',
					  value: 210,
					  children: [
						{
						  label: '火车21',
						  value: 211,
						  children: [
							
						  ]
						},
						{
						  label: '火车22',
						  value: 212,
						  children: []
						},
						{
						  label: '火车23',
						  value: 213,
						  children: []
						}
					  ]
					}
				  ],
				  addressProvince:'',//省
				  addressCity:'',//市,
				  addressCounty:'',//区
				  merchantCategoryFirst:'',//yiji
				  merchantCategorySecond:'',//二级
				  addressDetail:'',//详细地址
				  imageUrl:'',//照片
				  imgUrlZs:'',
				  leadingName:'',//负责人名称
				  name:'',//商户名称
				  phone:'',//联系方式
				  longitude:'',//经度
				  latitude:'',//纬度
			}
		},
		components: {
			mpvueCityPicker,
			mpvuePicker
		},
// 		onUnload() {
// 
// 		},
		onShow(){
			this.queryCategory()
		},
		onLoad() {
			this.imageSrc = '';
			console.log(this.pickerValueArray)
			this.getLocation()
		},
		methods: {
			getAuthorizeInfo(a="scope.userLocation"){  //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
					var _this=this;
					uni.authorize({
						scope: a,
						success() { //1.1 允许授权
							_this.getLocation();
						},
						fail(){    //1.2 拒绝授权
							console.log("你拒绝了授权，无法获得周边信息")
						}
					})
				},
			// 获取位置
			getLocation(){
				let self=this;
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
						console.log(res)
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						self.latitude=res.latitude;
						self.longitude=res.longitude
				    }
				});
			},
			// 预览
			previewImage(url){
				let arrayImg=[]
				arrayImg.push(url)
				uni.previewImage({
					urls: arrayImg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			// 获取商户类型
			queryCategory(){
				let self=this
				let param={
					
				}
				http.Request(api.queryCategory,'POST',param,function(res){
					console.log(res)
					self.pickerValueArray=res
					console.log(self.pickerValueArray)
				})
			},
			// 上传图片
			chooseImage: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['camera'], //album
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: 'https://api30.chuanhuoapp.com/business-user/v1/yt/uploadImage',
							filePath: imageSrc,
							fileType: 'image',
							name: 'file',
							success: (res) => {
								console.log( JSON.parse(res.data))
								let datas=JSON.parse(res.data)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								this.imageSrc = datas.data
								this.imgUrlZs=imageSrc
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
					}
				})
			},
			// 删除正面
			imageSrcOneNone(){
				this.imageSrc=''
			},
			// 商家类型
			 showPicker() {
				 console.log(this.$refs.mpvuePicker)
			  this.$refs.mpvuePicker.show();
			},
			// 选择省市区
			showCityPicker() {
				console.log(this.$refs.mpvueCityPicker)
			  this.$refs.mpvueCityPicker.show();
			},
			onChange(e) {
			  console.log(e);
			},
			onChangepicker(e) {
			  console.log(e);
			},
			onCancel(e) {
				// 取消事件
			  console.log(e);
			  this.$refs.mpvueCityPicker.hide();
			},
			onCancelpicker(e) {
				// 取消事件
			  console.log(e);
			  this.$refs.mpvuePicker.hide();
			}, 
			// 确定事件
			onConfirm(e) {
			  console.log(e);
			  this.address=e.label;
			  let newaddress=this.address.split("-")
			  console.log(newaddress)
			  this.addressProvince=newaddress[0];
			  this.addressCity=newaddress[1];
			  this.addressCounty=newaddress[2];
			  this.$refs.mpvueCityPicker.hide();
			},
			// 确定事件
			onConfirmpicker(e) {
			  console.log(e);
			  this.types=e.label
			  let newtypes=this.types.split("-")
			  console.log(newtypes)
			  this.merchantCategoryFirst=newtypes[0];
			  this.merchantCategorySecond=newtypes[1];
			  this.$refs.mpvuePicker.hide();
			},
			// 点击加入
			join(){
				if(this.address=='请选择地址'){
					uni.showToast({
						icon:'none',
						title: '请选择地区'
					});
					return
				}
				if(this.name==''){
					uni.showToast({
						icon:'none',
						title: '请填写商家名称'
					});
					return
				}
				if(this.phone==''){
					uni.showToast({
						icon:'none',
						title: '请填写商家手机号'
					});
					return
				}
				if(this.latitude==''){
					uni.showToast({
						icon:'none',
						title: '请授权获取纬度'
					});
					return
				} 
				if(this.longitude==''){
					uni.showToast({
						icon:'none',
						title: '请授权获取经度'
					});
					return
				}
				if(this.address=='请选择地址'){
					uni.showToast({
						icon:'none',
						title: '请选择地区'
					});
					return
				}
				if((/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g).test(this.name,)){
					uni.showToast({
						icon:'none',
						title: '不可以输入表情'
					});
					return
				}
				if((/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g).test(this.addressDetail)){
					uni.showToast({
						icon:'none',
						title: '不可以输入表情' 
					});
					return
				}
				if((/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g).test(this.leadingName)){
					uni.showToast({
						icon:'none',
						title: '不可以输入表情'
					});
					return
				}
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				       uni.showToast({
				       	icon:'none',
				       	title: '请填写正确的手机号码'
				       });  
				       return false; 
				} 
				if(this.types=='请选择商家类型'){
					uni.showToast({
						icon:'none',
						title: '请选择商家类型'
					});
					return
				}
				if(this.leadingName==''){
					uni.showToast({
						icon:'none',
						title: '请填写负责人名称'
					});
					return
				}
				if(this.addressDetail==''){
					uni.showToast({
						icon:'none',
						title: '请填写详细地址'
					});
					return
				}
				if(this.imageSrc==''){
					uni.showToast({
						icon:'none',
						title: '请上传门店合影照片'
					});
					return
				}
				if((/^ +| +$/g).test(this.name)){
					uni.showToast({
						icon:'none',
						title: '商家名称含有空格'
					});
					return
				}
				if((/^ +| +$/g).test(this.leadingName)){
					uni.showToast({
						icon:'none',
						title: '负责人名称含有空格'
					});
					return
				}
				if((/^ +| +$/g).test(this.phone)){
					uni.showToast({
						icon:'none',
						title: '负责人手机号含有空格'
					});
					return
				}
				if((/^ +| +$/g).test(this.addressDetail)){
					uni.showToast({
						icon:'none',
						title: '详细地址含有空格'
					});
					return
				}
				if(this.latitude==''){
					this.getLocation()
					return 
				}
				this.saveMerchant()
			},
			// 添加上户api
			saveMerchant(){
				let self=this
				let param={
					addressCity:self.addressCity,//市
					addressCounty:self.addressCounty,//区
					addressDetail:self.addressDetail,//商家地址（详细地址）
					addressProvince:self.addressProvince,//（省）
					image:self.imageSrc,//
					// image:'123',//
					latitude:self.latitude,
					longitude:self.longitude,
					leadingName:self.leadingName,//负责人姓名
					merchantCategoryFirst:self.merchantCategoryFirst,//一级类目
					merchantCategorySecond:self.merchantCategorySecond,//二级类目名
					name:self.name,//商户名称
					phone:self.phone,//商户联系方式
				}
				http.Request(api.saveMerchant,'POST',param,function(res){
					console.log(res)
					let query=res
					console.log(query)
					uni.setStorageSync('codeUrl', res);
					uni.reLaunch({
						url: '../settledStepTwo/settledStepTwo?query=1'
					});
				})
			}
		}
	}
</script>

<style scoped>
@import url("./index.css");
</style>
