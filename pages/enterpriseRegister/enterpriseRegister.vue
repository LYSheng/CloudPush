<template>
	<view class="register-box">
		<view class="register-ul">
			<view class="register-li">
				<view class="register-name">
					公司名称
				</view>
				<view class="register-right">
					<input placeholder-style="color:#AEB3C0" placeholder="请输入公司名称" class="register-input" type="text" value="" v-model="username" />
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
					<mpvue-city-picker class='' ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault"
					 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					详细地址
				</view>
				<view class="register-right">
					<input v-model="adders" placeholder-style="color:#AEB3C0" placeholder="请输入详细地址" class="register-input" type="text"
					 value="" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					负责人姓名
				</view>
				<view class="register-right">
					<input v-model="fuUserName" placeholder-style="color:#AEB3C0" placeholder="请输入负责人名称" class="register-input" type="text"
					 value="" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					手机号码
				</view>
				<view class="register-right">
					<input maxlength="11" v-model="phone" placeholder-style="color:#AEB3C0" placeholder="请输入手机号码" class="register-input"
					 type="text" value="" />
					<button @click='verify("smscode")' :disabled="disabled" class="phone-me-get">
						        {{countdown}} <text v-show="timestatus">秒重获</text>
					</button>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					验证码
				</view>
				<view class="register-right">
					<input v-model="code" placeholder-style="color:#AEB3C0" placeholder="请输入验证码" class="register-input" type="text"
					 value="" />
				</view>
			</view>

			<view class="register-li">
				<view class="register-name register-new-name">
					统一社会信用代码
				</view>
				<view class="register-right">
					<input v-model="creditCode" placeholder-style="color:#AEB3C0" class="register-input" type="text" value="" />
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
						<block v-if="imageSrcOne">
							<view class="imgaboust">
								<image @click="imageSrcOneNone" class="imgOut" src="/static/image/up2.png" mode=""></image>
								<image :src="imageSrcOne" class="upImg" mode="widthFix"></image>
							</view>
						</block>
						<block v-else>
							<image @click="chooseImageOne" class="upImg" src="/static/image/up1.png" mode=""></image>
						</block>
					</view>
				</view>
			</view>
		</view>
		<!-- 加入云推 -->
		<view class="join" @click='verify("reg")'>
			加入云推
		</view>
		<!-- phone   盒子 -->
		<view v-if="phoneMask" class="phone-mask">
			<view class="phone-me ">
				<view class="phone-me-top phone-me-list m20">
					<view class="phone-me-name phone-font">
						国家/地区
					</view>
					<view class="phone-me-right">
						<view class="phone-me-con phone-font">
							中国（+86）
						</view>
					</view>
				</view>
				<view class="phone-me-list">
					<view class="phone-me-name phone-font">
						手机号码
					</view>
					<view class="phone-me-right">
						<input maxlength="11" v-model="yanPhone" placeholder="请输入手机号" placeholder-class="phone-place " type="text" class="phone-me-input phone-font"
						 value="" />
						<button @click="getCode" :disabled="disabled" class="phone-me-get">
			                {{countdown}} <text v-show="timestatus">秒重获</text>
			            </button>
					</view>
				</view>
				<view class="phone-me-list">
					<view class="phone-me-name phone-font">
						验证码
					</view>
					<view class="phone-me-right">
						<input v-model="code" placeholder="请输入验证码" placeholder-class="phone-place " type="text" class="phone-me-input phone-font"
						 value="" />
					</view>
				</view>

				<view class="phone-me-bottom">
					<view @click="phoneMaskQu" class="phone-me-btn phone-me-btn-none">
						取消
					</view>
					<view @click="phoneSubmit" class="phone-me-btn">
						提交
					</view>
				</view>
			</view>
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
				pickerValueDefault: [0, 0, 0], //省市区默认
				username: '', //公司名称
				fuUserName: '', //负责人名称
				phone: '', //手机号
				code: '', //验证码
				creditCode:'', // 信用代码
				daiCode: '', //验证码
				yanPhone: '', //验证手机
				adders: '', //详细地址
				imageSrcOne: '', //营业执照
				address: '请选择地址', //办公地址
				countdown: '获取验证码',
				timestatus: false,
				disabled: false,
				clear: '', //倒计时函数
				phoneMask: false,
				session: '',
				county: '',
				city: '',
				province: '',
			}
		},
		components: {
			mpvueCityPicker
		},
		onLoad() {
			this.session = uni.getStorageSync('session');
		},
		methods: {
			// 上传营业执照
			chooseImageOne: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['camera', 'album'], //album
					success: (res) => {
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: 'https://api30.chuanhuoapp.com/business-user/v1/yt/uploadImage',
							filePath: imageSrc,
							fileType: 'image',
							formData: {
								'file': imageSrc
							},
							name: 'file',
							header: {
								"Content-Type": "multipart/form-data"
							},
							success: (res) => {
								let datasOne = JSON.parse(res.data)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								this.imageSrcOne = datasOne.data
							},
							fail: (err) => {
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
			// 删除上传图片
			imageSrcOneNone() {
				this.imageSrcOne = ''
			},
			// 打开省市区选择器
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onCancel(e) {
				this.$refs.mpvueCityPicker.hide();
			},
			// 确定事件
			onConfirm(e) {
				console.log(e);
				this.address = e.label
				let newaddress = this.address.split("-")
				console.log(newaddress)
				this.province = newaddress[0]
				this.city = newaddress[1]
				this.county = newaddress[2]
				this.$refs.mpvueCityPicker.hide();
			},
			// 取消
			phoneMaskQu() {
				this.phoneMask = false
			},
			// 校验信息是否填写
			verify(type){
				
				let self = this
				if (self.imageSrcOne == '') {
					uni.showToast({
						icon: 'none',
						title: '请上传营业执照'
					});
					return
				}
				if (self.username == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入姓名'
					});
					return
				};
				if (self.phone == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					});
					return
				};
				if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号码'
					});
					return false;
				}
				if (self.adders == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入详细地址'
					});
					return
				};
				if (self.address === '请选择地址') {
					uni.showToast({
						icon: 'none',
						title: '请选择常住地址'
					});
					return
				};
				if (self.creditCode == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入信用代码'
					});
					return
				};
				
				if ((/^ +| +$/g).test(this.username)) {
					uni.showToast({
						icon: 'none',
						title: '姓名含有空格'
					});
					return
				};
				if ((/^ +| +$/g).test(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '手机号含有空格'
					});
					return
				};
				if ((/^ +| +$/g).test(this.adders)) {
					uni.showToast({
						icon: 'none',
						title: '详细地址含有空格'
					});
					return
				};
				
				let addressCity, addressCounty, addressProvince
				let data = {
					addressCity: self.city,
					addressCounty: self.county,
					addressDetail: self.adders,
					addressProvince: self.province,
					leaderName: self.username,
					leaderMobile: self.phone,
					name:self.username,
					image:self.imageSrcOne,
					businessLicenseNo:self.creditCode,
					session: self.session
				};
				console.log(data)
				if(type == 'smscode'){
					this.getCode(data);
				}else if(type == 'reg'){
					
					if (self.code == '') {
						uni.showToast({
							icon: 'none',
							title: '请输入手机验证码'
						});
						return
					};
					data.smsCode = self.code;
					this.join(data);
				}
				
			},
			// 点击加入
			join(data) {
				// uni.reLaunch({
				//     url: '../businessHome/businessHome?type=2'
				// });
				http.LoginPost(api.FirmReg, data, function(res) {
					uni.showToast({
						title: '注册成功'
					});
					uni.setStorageSync('token', res.token);
					uni.setStorageSync('uid', res.userId);
					uni.setStorageSync('secret', res.secret);
					uni.navigateTo({
						url:'../businessHome/businessHome?type=1'
					})

				})

			},
			// 获取验证码
			getCode(data) {
				let self = this;
				http.LoginPost(api.RegSmsCode,data,function(res){
					self.disabled = true; //禁用点击
					self.countdown = 60;
					self.timestatus = true;
					self.clear = setInterval(self.countDown, 1000);
					uni.showToast({
						title: '验证码发送成功'
					});
				})
			},
			// 倒计时
			countDown() {
				let self = this;
				if (!self.countdown) {
					self.disabled = false;
					self.timestatus = false;
					self.countdown = '获取验证码';
					clearInterval(self.clear);
				} else {
					--self.countdown;
				}
			}
		}
	}
</script>

<style scoped>
	@import url("./index.css");
</style>
