<template>
	<view class="home-box">
		<view class="home-img">
			<image class="home-index" src="../../static/image/indeximg.png" mode=""></image>
		</view>
		<view class="home-js">
			<view class="home-title">
				<text class="home-text">数字连接</text>
				<text class="home-text">商业未来</text>
			</view>
			<view class="home-img-box">
				<image class="homr-left home-tImg" src="/static/image/border-left.png" mode=""></image>
				<view class="home-texts">
					DIGITAL  LINK  BUSINESS  FUTUER
				</view>
				<image class="homr-left home-tImg" src="/static/image/border-right.png" mode=""></image>
			</view>  
		</view>
		<view class="join" @click='join'>
			商家入驻
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			join(){
				uni.navigateTo({
					url: '../settled/settled?id=1'
				});
			}
		}
	}
</script>

<style>
	.home-box{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
.join{
	font-size: 32upx;
	width: 640upx;
	height: 84upx;
	line-height: 84upx;
	text-align: center;
	color: #fff;
	background-color: #545DFF;
	margin: 0 auto;
	margin-top: 35px;
	border-radius: 20upx;
}
.home-img{
	margin: 0 auto;
	margin-top: 150upx;
}
.home-index{
	display: block;
	width: 680upx;
	height: 396upx;
	margin: 0 auto;
}
.home-title{
	
	/* padding: 0px 10upx; */
	display: flex;
	justify-content:space-around;
	align-items: center;
}
.home-js{
	width: 400upx;
	margin: 0 auto;
	margin-top: 45upx;
}
.home-jImg{
	display: block;
	width: 91%;
	height: 16upx;
	margin: 20upx auto;
}
.home-img-box{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 364upx;
	margin: 20upx auto;
}
.home-texts{
	font-size: 16upx;
	color: #545DFF;
}
.home-text{
	font-size: 44upx;
	color: #222565;
}
.home-tImg{
	display: block;
	width: 40upx;
	height: 16upx;
}
</style>
