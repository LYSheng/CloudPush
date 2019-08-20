<template>
	<view class="addStaff">
		<view class="Head">
			<view class="imgbox">
				<image src="../../static/image/s1.png" mode="aspectFill"></image>
			</view>
			<view class="name">
				<text>name</text>
			</view>
			<view class="phone">
				<text>13635420156</text>
			</view>
		</view>
		<view class="btns">
			<button @click="next">添加</button>
			<button @click="back">取消</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(option){
			console.log(option)
		},
		methods:{
			next(){
				uni.navigateBack()
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.addStaff{
		.Head{
			text-align: center;
			padding: 216rpx 0 264rpx;
			.imgbox{
				width: 240rpx;
				height: 240rpx;
				margin: 0 auto;
				image{
					max-width: 100%;
					max-height: 100%;
				}
			}
			view text{ color: #595959; }
			.name{
				margin: 20rpx 0 8rpx;
				text{
					font-size: 36rpx;
				}
			}
			.phone text{
				font-size: 32rpx;
			}
		}
		.btns{
			button{
				width:640rpx;
				height:84rpx;
				line-height: 84rpx !important;
				background:rgba(84,93,255,1);
				box-shadow:0 10rpx 30rpx 0 rgba(84,93,255,.3);
				border-radius:20rpx;
				border: none;
				color: #fff;
				font-size: 32rpx;
			}
			button:last-child{
				background:rgba(84,93,255,.1);
				color: rgba(0,0,0,.25);
				margin-top: 32rpx;
				box-shadow: none;
			}
			button:after,button:before{
				content: none;
			}
		}
	}
</style>
