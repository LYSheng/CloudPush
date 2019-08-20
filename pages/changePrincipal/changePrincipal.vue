<template>
	<view class="changePrincipal">
		<view class="head">
			<view class="settled-bg-header">
				<view class="settled-bg-top">
					<view class="settled-bu-name">
						验证身份
					</view>
					<view class="settled-bu-name">
						绑定新号码
					</view>
					<view class="settled-bu-name">
						更换成功
					</view>
				</view>
			</view>
			<view class="settled-header">
				<view class="settled-xian" :style='{ width:lineWidth + "rpx !important" }'>
					
				</view>
				<view class="settled-bu settled-buOne">
					<image class="settled-buImg" src="/static/image/dui.png" mode=""></image>
				</view>
				<view class="settled-bu settled-buTwo">
					<image class="settled-buImg" src="/static/image/dui.png" mode=""></image>
				</view>
				<view class="settled-bu settled-San">
					<image class="settled-buImg" src="/static/image/kong.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="input" v-if="inputShow">
			<view class="login-new-box">
				<view class="login-new-top">
					<view class="login-new-ul">
						<view class="login-new-li">
							<view class="login-new-left">
								{{NameText}}
							</view>
							<view class="login-new-right">
								<input :disabled='nameDisabled' v-model="name" placeholder="请输入负责人姓名" placeholder-class="plarc" type="text" class="phone-me-input phone-font"  />
							</view>
						</view>
						<view class="login-new-li">
							<view class="login-new-left">
								国家/地区
							</view>
							<view class="login-new-right">
								<view class="login-new-text login-new-wen">
									中国（+86）
								</view>
							</view>
						</view>
						<view class="login-new-li">
							<view class="login-new-left">
								手机号码
							</view>
							<view class="login-new-right">
								<input maxlength="11" v-model="yanPhone" :disabled="phoneDisabled" placeholder="请输入手机号" placeholder-class="plarc " type="text" class="phone-me-input phone-font" value="" />
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
			</view>
		</view>
		
		<view v-else class="ChangeEnd">
			<view class="imgbox">
				<image src="../../static/image/change.png" mode="aspectFit"></image>
			</view>
			<view class="text">
				<text>公司负责人信息更新完成，请重新登录</text>
			</view>
		</view>
		
		<view class="btnBox" @click="next(tapType)">
			<button>{{tapText}}</button>
		</view>
		
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		data() {
			return {
				name:'xxx',
				countdown:'获取验证码',
				timestatus:false,
				disabled:false,
				yanPhone:'',
				code:'',
				lineWidth:128,
				NameText:'负责人姓名',
				phoneDisabled:true,
				nameDisabled:true,
				tapType:1,
				inputShow:true,
				tapText:'下一步',
			};
		},
		methods:{
			next(type){
				if(type == 1){
					this.NameText = '新负责人姓名';
					this.lineWidth = 330;
					this.phoneDisabled = false;
					this.nameDisabled = false;
					this.name = '';
					this.yanPhone = '';
					this.code = '';
					this.tapType = 2;
				}
				if(type == 2){
					this.inputShow = false;
					this.lineWidth = 640;
					this.tapText = '完成';
					this.tapType = 3;
				}
				
				if(type == 3){
					
				}
				
			},
			register(){ 
				uni.navigateTo({
					url: '../enterpriseRegister/enterpriseRegister'
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

<style lang="scss">
	
	.changePrincipal{
		.btnBox{
			text-align:center;
			padding-top: 220rpx;
			button{
				width:640rpx;
				height:84rpx;
				line-height: 84rpx !important;
				background:rgba(84,93,255,1);
				box-shadow:0 10rpx 30rpx 0 rgba(84,93,255,0.3);
				border-radius:20rpx;
				color: #fff;
				font-size: 32rpx;
			}
		}
		.ChangeEnd{
			.imgbox{
				width: 580rpx;
				margin: 132rpx auto 28rpx;
			}
			.text{
				text-align: center;
				text{
					font-weight: 400;
					color: #595959;
					font-size: 24rpx;
				}
			}
		}
	}
	
.login-new-li{
	padding: 38upx 0upx;
	border-bottom: 1px solid #E5E5E5;
	display: flex;
	align-items: center;
}
.login-new-left{
	padding-left: 56upx;
	font-size: 32upx;
	color:#595959;
	flex-grow: 0;
	flex-shrink: 0;
	width: 220upx;
}
.login-new-right{
	flex-grow: 1;
	display: flex;
	justify-content: space-between;
	
	align-items: center;
}
.login-new-jian{
	margin-right: 66upx;
}
.login-new-wen{
	font-size: 32upx;
	color:#595959;
}

.plarc{
	color: #AEB3C0;
	font-size: 32upx;
}
.phone-me-get{
	display: block;
	color: #545DFF;
	font-size: 24upx;
	flex-grow: 0;
		background-color: #545DFF;
	color: #FFFFFF;
	width: 200upx;
	padding-left: 20upx;
	height: 60upx;
	line-height: 60upx !important;
	margin-right: 36upx;
}
.login-new-bottom{
	margin-top: 359upx;
}
.settled-bg-header{
	width: 700upx;
	margin: 0 auto;
	margin-top: 30upx;
}
.settled-bg-top{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.settled-header{
	width: 636upx;
	height: 20upx;
	background-color: #EFEFEF;
	border-radius: 26upx;
	margin: 30upx auto;
	position: relative; 
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* overflow: hidden; */
}
.settled-bu-name{
	font-size: 24upx;
	color:#595959 ;
}
.settled-buImg{
	width: 44upx;
	height: 44upx;
	margin-top: 10upx;
	position: relative;
	z-index: 999;
}
.settled-xian{
	width: 128upx;
	height: 100%;
	position: absolute;
	left: 0px;
	top: 0px;
	border-radius: 26upx;
	background-color: #545DFF;
}
.settled-buOne{
	margin-left: -10upx;
}
.settled-San{
	margin-right: -10upx;
}

.phone-font{
	color: #222565;
	font-size: 32rpx;
}


</style>
