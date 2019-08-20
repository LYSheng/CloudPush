<template>
	<view class="StaffDetails">
		<view class="header">
			<view class="left">
				<view>
					<image src="../../static/image/bb1.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="middle">
				<view>
					<text>杨员工</text>
				</view>
				<view>
					<text>13635420155</text>
				</view>
			</view>
			<view class="right">
				<image src="../../static/image/delete.png" @click="deletaFun" mode="aspectFill"></image>
			</view>
		</view>
		<view class="block">
			<text>入驻奖励</text>
			<image src="../../static/image/detailsIcon.png"></image>
		</view>
		<view class="block">
			<text>交易分佣</text>
			<image src="../../static/image/detailsIcon.png"></image>
		</view>
		<businessManag :HeadShow='HeadShow'></businessManag>
	</view>
</template>

<script>
	import businessManag from '../businessManag/businessManag'
	export default {
		components:{
			businessManag,
		},
		data() {
			return {
				HeadShow:false,
			}
		},
		methods: {
			deletaFun(){
				uni.showModal({
				    content: '确认移除该员工？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.business-box{
		width: 670upx;
		margin: 0 auto;
		.business-tab{
			padding: 20upx 0;
			.business-list{
				width: 208upx;
			}
		}
	}
	.StaffDetails{
		.header{
			box-sizing: border-box;
			height: 192upx;
			padding: 0 40upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2upx solid #EBEBEB;
			& > view{
				display: flex;
			}
			.left{
				width: 20%;
				view{
					width: 84upx;
					height: 84upx;
					border-radius: 50%;
					background-color: #545DFF;
					position: relative;
					image{
						position: absolute;
						top: 6upx;
						left: 6upx;
						width: 84upx;
						height: 84upx;
						border-radius: 50%;
						overflow: hidden;
					}
				}
			}
			.middle{
				width: 60%;
				flex-wrap: wrap;
				view{
					display: flex;
					width: 100%;
					align-items: center;
				}
				text{
					color: #595959;
					font-size: 24upx;
					font-weight: 400;
				}
				view:nth-child(1){
					text{
						font-size: 32upx;
						font-weight: 500;
					}
				}
			}
			.right{
				width: 20%;
				justify-content: center;
				align-items: center;
				image{
					width: 38upx;
					height: 38upx;
				}
			}
		}
		.block{
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 120upx;
			padding: 0 40upx;
			border-bottom: 2upx solid #ebebeb;
			text{
				color: #595959;
				font-size: 28upx;
			}
			image{
				width: 8upx;
				height: 32upx;
			}
		}
	}
</style>
