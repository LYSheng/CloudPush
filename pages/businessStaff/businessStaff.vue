<template>
	<view class="Staff">
		<view class="SearchBox">
			<view class="input">
				<image src="../../static/image/search.png" mode="aspectFill"></image>
				<input placeholder-style='color:#fff' type="text" placeholder="请输入员工姓名/手机号">
			</view>
			<view class="scan" @click="Camera">
				<image src="../../static/image/icon2.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="StaffList">
			<view class="list" @click="toDetails">
				<view class="left">
					<view>
						<image src="../../static/image/bb1.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="middle">
					<view>
						<text>杨员工</text>
						<image src="../../static/image/phone.png" mode="aspectFill"></image>
					</view>
					<view>
						<text>￥564</text>
						<image src="../../static/image/tip.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="right">
					<image src="../../static/image/f12.png" mode="aspectFill"></image>
					<text>12家</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			toDetails(){
				uni.navigateTo({
					url:'../businessStaffDetails/businessStaffDetails'
				})
			},
			Camera(){
				uni.scanCode({
				    onlyFromCamera: true,
				    success: function (res) {
						if(res.result){
							uni.navigateTo({
								url:'../addStaff/addStaff?uid=' + res.result
							})
						}
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.Staff{
		.SearchBox{
			height: 100upx;
			background-color: #3E47E1;
			padding: 0 40upx;
			display: flex;
			align-items: center;
			.input{
				display: flex;
				width: 580upx;
				height: 100%;
				justify-content: space-between;
				align-items: center;
				image{
					width: 32upx;
					height: 34upx;
				}
				input{
					display: inline-block;
					font-size: 28upx;
					color: #fff;
					width: calc( 100% - 58upx);
				}
			}
			.scan{
				display: flex;
				height: 62upx;
				box-sizing: border-box;
				width: calc(100% - 590upx);
				border-left: 2upx solid #fff;
				padding-left: 40upx;
				
				image{
					width: 44upx;
					height: 44upx;
				}
			}
		}
		.StaffList{
			padding: 20upx 40upx;
			.list{
				box-sizing: border-box;
				width: 670upx;
				height: 136upx;
				padding: 0 40upx;
				margin: 0 auto 20upx;
				box-shadow:0px 4upx 20upx 0px rgba(41,47,76,0.1);
				border-radius: 20upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
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
					view:nth-child(1){
						text{
							color: #595959;
							font-size: 24upx;
							margin-right: 10upx;
							margin-bottom: 10upx;
						}
						image{
							width: 28upx;
							height: 28upx;
						}
					}
					view:nth-child(2){
						text{
							font-size: 28upx;
							color: #545DFF;
							font-weight: 500;
							margin-right: 8upx;
						}
						image{
							width: 16upx;
							height: 16upx;
						}
					}
				}
				.right{
					width: 20%;
					justify-content: center;
					align-items: center;
					image{
						width: 44upx;
						height: 44upx;
						margin-right: 10upx;
					}
					text{
						color: #595959;
						font-size: 28upx;
					}
				}
			}
			.list:last-child{
				margin-bottom: 0;
			}
		}
	}
</style>
