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
					<image class="settled-buImg" src="/static/image/dui.png" mode=""></image>
				</view>
				<view class="settled-bu settled-San">
					<image class="settled-buImg" src="/static/image/kong.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="settled-ul">
			<view class="settled-code">
				<image class="settled-code-img" :src="imgsrc" mode=""></image>
			</view>
			<view class="settled-ts">
				商家扫码关注微信公众号绑定后，
			</view>
			<view class="settled-ts">
				需引导商家购买会员权益，才能入住成功
			</view>
		</view>
				<!-- 下一步 -->
		<view class="join" @click='join'>
			完成
		</view>  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgsrc:''
			}
		},
		onLoad(options){
			console.log(options.query)
			let codeUrl;
			if(options.query==1){
				
			}
			codeUrl=uni.getStorageSync('codeUrl');
			this.imgsrc=codeUrl
		}, 
		methods: {
			join(){
				uni.showModal({
					title: '温馨提示',
					cancelText:'否',
					confirmText:'是',
					content: '商家是否扫码关注公众号',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							// uni.switchTab({
							// 	url: '/pages/home/home'
							// });
							uni.navigateTo({
								url: '../businessHome/businessHome?type=2'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			}
		}
	}
</script>

<style scoped>
@import url("./index.css");
</style>
