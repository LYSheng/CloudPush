<template>
	<view class="register-box">
		<view class="register-ul">
			<view class="register-li">
				<view class="register-name">
					公司名称
				</view>
				<view class="register-right">
					<input disabled placeholder-style="color:#AEB3C0" placeholder="请输入公司名称" class="register-input" type="text" value=""
					 v-model="FirmInfo.companyName" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					办公地址
				</view>
				<view @click="() => { this.$refs.mpvueCityPicker.show(); }" class="register-right">
					<view class="register-picker" placeholder='请选择地址'>
						{{FirmInfo.addressProvince}} {{FirmInfo.addressCity}} {{FirmInfo.addressCounty}}
					</view>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					详细地址
				</view>
				<view class="register-right">
					<input v-model="FirmInfo.addressDetail" placeholder-style="color:#AEB3C0" placeholder="请输入详细地址" class="register-input color" type="text"/>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					负责人姓名
				</view>
				<view class="register-right">
					<input disabled v-model="FirmInfo.name" placeholder-style="color:#AEB3C0" placeholder="请输入负责人姓名" class="register-input"
					type="text"/>
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					手机号
				</view>
				<view class="register-right">
					<input disabled maxlength="11" placeholder-style="color:#AEB3C0" placeholder="请输入手机号" class="register-input" type="text"
					 value="" v-model="FirmInfo.mobile" />
				</view>
			</view>
			<view class="register-li">
				<view class="register-name">
					统一社会信用代码
				</view>
				<view class="register-right">
					<input disabled maxlength="11" placeholder-style="color:#AEB3C0" placeholder="请输入统一社会信用代码" class="register-input"
					 type="text" value="" v-model="FirmInfo.businessLicenseNo" />
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
				FirmInfo:undefined,
			}
		},
		components: {
			mpvueCityPicker
		},
		onLoad() {
			this.session = uni.getStorageSync('session');
			this.FirmInfo = uni.getStorageSync('FirmInfo');
			console.log(this.FirmInfo)
			
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
				let address = e.label.split("-");
				this.$refs.mpvueCityPicker.hide();
				this.FirmInfo.addressProvince = address[0];
				this.FirmInfo.addressCity = address[1];
				this.FirmInfo.addressCounty = address[2];
			},
			
			// 点击加入
			join() {
				
				
				if (!this.FirmInfo.addressProvince) {
					uni.showToast({
						icon: 'none',
						title: '请选择常住地址'
					});
					return
				};
				
				if (this.FirmInfo.addressDetail == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入详细地址'
					});
					return
				};
				
				if ((/^ +| +$/g).test(this.FirmInfo.addressDetail)) {
					uni.showToast({
						icon: 'none',
						title: '详细地址含有空格'
					});
					return
				};
				
				let data = {
					addressProvince: this.FirmInfo.addressProvince,
					addressCity: this.FirmInfo.addressCity,
					addressCounty: this.FirmInfo.addressCounty,
					addressDetail: this.FirmInfo.addressDetail,
				};
				
				http.Request(api.UpDateFirmInfo, 'POST', data, (res) => {
					uni.showToast({
						icon:'none',
						title:'修改成功'
					});
					uni.reLaunch({
						url:'../businessHome/businessHome?type=1&idx=3'
					})
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
	.register-input{
		opacity: .6;
	}
	.color{
		opacity: 1;
	}
</style>
