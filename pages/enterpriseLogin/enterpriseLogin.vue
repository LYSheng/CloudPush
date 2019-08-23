<template>
	<view>
		<view class="login-new-box">
			<view class="login-new-top">
				<view class="login-new-ul">
					<!-- <view class="login-new-li">
						<view class="login-new-left">
							国家/地区
						</view>
						<view class="login-new-right">
							<view class="login-new-text login-new-wen">
								中国（+86）
							</view>
							<view class="login-new-jian">
								>
							</view>
						</view>
					</view> -->
					<view class="login-new-li">
						<view class="login-new-left">
							手机号码
						</view>
						<view class="login-new-right">
							<input maxlength="11" v-model="yanPhone" placeholder="请输入手机号" placeholder-class="plarc " type="text" class="phone-me-input phone-font" value="" />
							<button @click="getCode" :disabled="disabled" class="phone-me-get">
							        {{countdown}} <text v-show="timestatus">秒重获</text>
							</button>						
						</view>
					</view>
					
					<view class="login-new-li">
						<view class="login-new-left">
							验证码
						</view>
						<view class="login-new-right">
							<input v-model="code" placeholder="请输入验证码" placeholder-class="plarc" type="text" class="phone-me-input phone-font" value="" />
						</view>
					</view>
				</view>
			</view>
			
			<view class="login-new-bottom">
				<!-- 加入云推 -->
				<view class="join" @click='Login'>
					登录企业账号
				</view>
				<!-- 加入云推 -->
				<view class="join-hui" @click='register'>
					注册企业账号
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		data() {
			return {
				countdown:'获取验证码',
				timestatus:false,
				disabled:false,
				yanPhone:'',
				code:'',
			}
		},
		created() {
			let token = uni.getStorageSync('token'),
			uid = uni.getStorageSync('uid'),
			secret = uni.getStorageSync('secret');
			if(secret && uid && token){
				uni.redirectTo({
					url:'../businessHome/businessHome?type=1'
				})
			}
		},
		methods: {
			// 注册
			register(){
				uni.navigateTo({
					url: '../enterpriseRegister/enterpriseRegister'
				})
			},
			// 获取验证码
			getCode(){
				
				if(this.yanPhone == ''){
					uni.showToast({
						icon:'none',
						title: '请填写手机号码'
					});
					return false;
				}
				
				let data = {
					mobile:this.yanPhone,
				};
				
				http.LoginPost(api.SmsCode,data,(res) => {
					console.log(res)
					uni.showToast({
						title: '发送成功'
					});
					this.disabled = true;//禁用点击
					this.countdown=60;
					this.timestatus=true;
					this.clear=setInterval(this.countDown,1000);
					
				})
			},
			// 登录
			Login(){
				if(!this.yanPhone){
					uni.showToast({
						icon:'none',
						title: '请输入手机号'
					});
					return 
				}
				if(!this.code){
					uni.showToast({
						icon:'none',
						title: '请输入手机验证码'
					});
					return
				};
				let param={
					code:this.code,
					mobile:this.yanPhone,
				};
				console.log(param)
				http.LoginPost(api.FirmLogin,param,function(res){
					uni.setStorageSync('token', res.token);
					uni.setStorageSync('uid', res.userId);
					uni.setStorageSync('secret', res.secret);
					uni.navigateTo({
						url:'../businessHome/businessHome?type=1'
					})
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

<style>
@import url("./index.css");
</style>
