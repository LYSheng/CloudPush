<template>
	<view class="register-box">
		<view class="register-ul">
			<view class="register-li">
				<view class="register-name">
					公司名称
				</view>
				<view class="register-right">
					<input disabled placeholder-style="color:#AEB3C0" placeholder="请输入公司名称" class="register-input" type="text" value=""
					 v-model="companyName" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					办公地址
				</view>
				<view @click="() => { this.$refs.mpvueCityPicker.show(); }" class="register-right">
					<view class="register-picker" placeholder='请输入地址'>
						{{address}}
					</view>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					详细地址
				</view>
				<view class="register-right">
					<input v-model="adders" placeholder-style="color:#AEB3C0" placeholder="请输入详细地址" class="register-input" type="text"/>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					负责人姓名
				</view>
				<view class="register-right">
					<input disabled v-model="username" placeholder-style="color:#AEB3C0" placeholder="请输入负责人姓名" class="register-input"
					type="text"/>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					手机号
				</view>
				<view class="register-right">
					<input disabled maxlength="11" placeholder-style="color:#AEB3C0" placeholder="请输入手机号" class="register-input" type="text"
					 value="" v-model="phone" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					统一社会信用代码
				</view>
				<view class="register-right">
					<input disabled maxlength="11" placeholder-style="color:#AEB3C0" placeholder="请输入统一社会信用代码" class="register-input"
					 type="text" value="" v-model="creditCode" />
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
								<image @click="previewImage(businessImg)" :src="businessImg" class="upImg" mode="widthFix"></image>
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
		<mpvue-city-picker class='' ref="mpvueCityPicker" :pickerValueDefault="Picker.pickerValueDefault" @onCancel="Picker.onCancel"
		 @onConfirm="Picker.onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	import mpvueCityPicker from 'mpvue-citypicker';
	export default {
		data() {
			return {
				Picker: {
					pickerValueDefault: [0, 0, 0], //省市区默认
					onConfirm: (e) => {
						this.onConfirm(e)
					},
					onCancel: () => {
						this.$refs.mpvueCityPicker.hide();
					}
				},
				companyName:'公司名称',
				username: '负责人姓名', //姓名
				phone: '136354215666', //手机号
				creditCode:'信用代码',
				adders: '详细地址', //详细地址
				businessImg: '../../static/image/b1.png', //营业执照
				address: '请选择地址', //常住地
			}
		},
		components: {
			mpvueCityPicker
		},
		onLoad() {
			this.session = uni.getStorageSync('session');
		},
		methods: {
			// 预览
			previewImage(url) {
				let arrayImg = []
				arrayImg.push(url)
				uni.previewImage({
					urls: arrayImg,
					current:1
				});
			},
			
			// 三级联动 确定事件
			onConfirm(e) {
				this.address = e.label
				// let newaddress = this.address.split("-");
				this.$refs.mpvueCityPicker.hide();
			},
			
			// 点击加入
			join() {
				
				if (this.adders == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入详细地址'
					});
					return
				};
				
				if (this.address === '请选择地址') {
					uni.showToast({
						icon: 'none',
						title: '请选择常住地址'
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
				
				let data = {
					address:this.address,
					addres:this.addres
				};
				http.LoginPost(api.register, data, (res) => {
					uni.setStorageSync('token', res.token);
					uni.setStorageSync('uid', res.userId);
					uni.setStorageSync('secret', res.secret);
					
					uni.navigateBack();
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.register-li:last-child {
		.register-name {
			width: 270rpx;
		}
	}
</style>
