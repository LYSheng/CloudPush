<template>
	<view class="register-box">
		<view class="register-ul">
			<view class="register-li">
				<view class="register-name">
					公司名称
				</view>
				<view class="register-right">
					<input disabled placeholder-style="color:#AEB3C0" placeholder="请输入公司名称" class="register-input" type="text" value="" v-model="username" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					办公地址
				</view>
				<view @click="showCityPicker" class="register-right">
					<view class="register-picker" placeholder='请输入地址'>
						{{address}}
					</view>
					<mpvue-city-picker class='' ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					详细地址
				</view>
				<view class="register-right">
					<input v-model="adders" placeholder-style="color:#AEB3C0" placeholder="请输入详细地址" class="register-input" type="text" value="" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					负责人姓名
				</view>
				<view class="register-right">
					<input disabled maxlength="18" v-model="idCard" placeholder-style="color:#AEB3C0" placeholder="请输入负责人姓名" class="register-input" type="text" value="" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					手机号
				</view>
				<view class="register-right">
					<input disabled maxlength="11"  placeholder-style="color:#AEB3C0" placeholder="请输入手机号" class="register-input" type="text" value="" v-model="phone" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					统一社会信用代码
				</view>
				<view class="register-right">
					<input disabled maxlength="11"  placeholder-style="color:#AEB3C0" placeholder="请输入统一社会信用代码" class="register-input" type="text" value="" v-model="phone" />
				</view>
			</view>
		</view>
		<view class="register-upload">
			<view class="register-upload-header">
				请上传营业执照照片
			</view>
		 	<view class="upload-box">
				<view class="upload-list">
					<view class="uphe">
						<block>
							<view class="imgaboust">
								<!-- <image @click="imageSrcOneNone" class="imgOut" src="/static/image/up2.png" mode=""></image> -->
								<image @click="previewImage(imageSrcOne)" :src="imageSrcOneZs" class="upImg" mode="widthFix"></image>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- 保存修改 -->
		<view class="join" @click='join'>
			保存修改
		</view>
		
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
    import mpvueCityPicker from 'mpvue-citypicker';
	export default {
		data() {
			return {
				 pickerValueDefault: [0, 0, 0],//省市区默认
				 username:'',//姓名
				 phone:'',//手机号
				 yanPhone:'',//验证手机
				 adders:'',//详细地址
				 idCard:'',//身份证
				 imageSrcOne:'',//正面
				 imageSrcOneZs:'',//正面zs
				 imageSrcTwo:'',//反面
				 imageSrcTwoZs:'',//反面zs
				 address:'请选择地址',//常住地
				 countdown:'获取验证码',
				 timestatus:false,
				 disabled:false,
				 code:'',//验证码
				 clear:'',//倒计时函数
				 phoneMask:false,
				 session:'',
				 county:'',
				 city:'',
				 province:'',
			}
		},
		components: {
			mpvueCityPicker
		},
		onLoad() {
			this.session=uni.getStorageSync('session');
		},
		methods: {
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
			// 获取手机号
			getPhoneNumber: function(e) {  
                console.log(e);  
				let self=this
                if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {  
					console.log('拒绝了')
					// self.phoneMask=true
					uni.showToast({
						icon:'none',
						title: '请授权获取手机号'
					});
                } else {  
					let encryptedData=e.detail.encryptedData
					let iv=e.detail.iv
					self.getPhone(encryptedData,iv)
                }  
            },  
			getPhone(encryptedData,iv){
				let self=this
				let param={
					encrypted:encryptedData,
					iv:iv,
					session:self.session
				}
				http.LoginPost(api.queryWxMiniMobile,param,function(res){
					// self.loading=false
					console.log(res)
					self.phone=res.mobile
					uni.setStorageSync('phone',res.mobile);
				})
			},
			// 上传正面   
			chooseImageOne: function() {
				let self=this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['camera','album'], //album
					success: (res) => {
						console.log( res)
						var imageSrc = res.tempFilePaths[0]
						console.log(imageSrc)
						uni.uploadFile({
							url: 'https://api30.chuanhuoapp.com/business-user/v1/yt/uploadImage',
							filePath: imageSrc,
							fileType: 'image',
							formData: {
								'file': imageSrc
							},
							name: 'file',
							header:{"Content-Type": "multipart/form-data"},
							success: (res) => {
								console.log(res)
								console.log( JSON.parse(res.data))
								let datasOne=JSON.parse(res.data)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								self.imageSrcOne = datasOne.data
								self.imageSrcOneZs=imageSrc
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
			// 上传反面图片
			chooseImageTwo: function() {
				let self=this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['camera','album'], //album
					success: (res) => {
						console.log('chooseImage success, temp path is', res.tempFilePaths[0])
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: 'https://api30.chuanhuoapp.com/business-user/v1/yt/uploadImage',
							filePath: imageSrc,
							fileType: 'image',
							name: 'file',
							header:{"Content-Type": "multipart/form-data"},
							success: (res) => {
								let datasTwo=JSON.parse(res.data)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								self.imageSrcTwo = datasTwo.data
								self.imageSrcTwoZs=imageSrc
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
				this.imageSrcOne=''
			},
			// 删除背面
			imageSrcTwoNone(){
				this.imageSrcTwo=''
			},
			// 打开省市区选择器
			showCityPicker() {
			  this.$refs.mpvueCityPicker.show();
			},
			onChange(e) {
			  console.log(e);
			},
			onCancel(e) {
				// 取消事件
			  console.log(e);
			  this.$refs.mpvueCityPicker.hide();
			},
			// 确定事件
			onConfirm(e) {
			  console.log(e);
			  this.address=e.label
			  let newaddress=this.address.split("-")
			  console.log(newaddress)
			  this.province=newaddress[0]
			  this.city=newaddress[1]
			  this.county=newaddress[2]
			  this.$refs.mpvueCityPicker.hide();
			},
			// 取消
			phoneMaskQu(){
				this.phoneMask=false
			},
			// 点击加入
			join(){
				let self=this
				if(self.imageSrcOne==''){
					uni.showToast({
						icon:'none',
						title: '请上传身份证正面照片'
					});
					return
				}
				if(self.imageSrcTwo==''){
					uni.showToast({
						icon:'none',
						title: '请上传身份证反面照片'
					});
					return
				}
				if(self.username==''){
					uni.showToast({
						icon:'none',
						title: '请输入姓名'
					});
					return
				};
				if(self.phone==''){
					uni.showToast({
						icon:'none',
						title: '请输入手机号'
					});
					return
				};
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				       uni.showToast({
				       	icon:'none',
				       	title: '请填写正确的手机号码'
				       });  
				       return false; 
				} 
				if(self.adders==''){
					uni.showToast({
						icon:'none',
						title: '请输入详细地址'
					});
					return
				};
				if(self.address==='请选择地址'){
					uni.showToast({
						icon:'none',
						title: '请选择常住地址'
					});
					return	
				};
				if(self.idCard==''){
					uni.showToast({
						icon:'none',
						title: '请输入身份证信息'
					});
					return
				};
				if(!(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.idCard))){
					uni.showToast({
						icon:'none',
						title: '请输入正确的身份证信息'
					});
					return
				};
				if((/^ +| +$/g).test(this.username)){
					uni.showToast({
						icon:'none',
						title: '姓名含有空格'
					});
					return
				};
				if((/^ +| +$/g).test(this.phone)){
					uni.showToast({
						icon:'none',
						title: '手机号含有空格'
					});
					return
				};
				if((/^ +| +$/g).test(this.adders)){
					uni.showToast({
						icon:'none',
						title: '详细地址含有空格'
					});
					return
				};
				if((/^ +| +$/g).test(this.idCard)){
					uni.showToast({
						icon:'none',
						title: '身份证信息含有空格'
					});
					return
				};
				let addressCity,addressCounty,addressProvince
				let param={
					addressCity:self.city,
					addressCounty:self.county,
					addressDetail:self.adders,
					addressProvince:self.province,
					code:self.code,
					idCardBackImage:self.imageSrcTwo,
					idCardFrontImage:self.imageSrcOne,
					idCardNo:self.idCard,
					name:self.username,
					phone:self.phone,
					session:self.session
				}
				http.LoginPost(api.register,param,function(res){
					// self.loading=false
					console.log(res)
					uni.setStorageSync('token', res.token);
					uni.setStorageSync('uid', res.userId);
					uni.setStorageSync('secret', res.secret);
					uni.switchTab({
						url: '/pages/home/home'
					});
				})
				
			},
			// 获取验证码
			getCode(){
				let self=this;
				if(self.yanPhone==''){
					uni.showToast({
						icon:'none',
						title: '请填写手机号码'
					});
					return
				}else{
					self.getSmsCode()
					
				}
			},
			// 验证验证码
			phoneSubmit(){
				let self=this;
				if(self.code==''){
					uni.showToast({
						icon:'none',
						title: '请输入手机验证码'
					});
					return
				}
				let param={
					code:self.code,
					phone:self.yanPhone,
				}
				http.Request(api.checkSmsCode,'POST',param,function(res){
					// self.loading=false
					console.log(res)
					uni.setStorageSync('phone', self.yanPhone);
					self.phone= self.yanPhone;
					self.phoneMask=false;
					self.yanPhone='';
				})
			},
			// diao用获取验证码接口
			getSmsCode(){
				let self = this;
				let param={
					mobile:self.yanPhone,
				}
				http.Request(api.getSmsCode,'POST',param,function(res){
					// self.loading=false
					console.log(res)
					self.disabled = true;//禁用点击
					self.countdown=60;
					self.timestatus=true;
					self.clear=setInterval(self.countDown,1000)
				})
			},
			// 倒计时
			countDown(){
				let self = this;
				if(!self.countdown){
					self.disabled = false;
                    self.timestatus = false;
                    self.countdown = '获取验证码';
                    clearInterval(self.clear);
				}else{
					--self.countdown;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register-li:last-child{
		.register-name{
			width: 270rpx;
		}
	}
</style>
