<template>
	
	<view class="Staff">
		<!-- <view class="SearchBox">
			<view class="input">
				<image src="../../static/image/search.png" mode="aspectFill"></image>
				<input placeholder-style='color:#dfdfdf;font-size:16px;' type="text" @input='searchChangeFun' @confirm='searchFun' placeholder="请输入员工姓名/手机号" confirm-type='完成'>
			</view>
			<view class="scan" @click="Camera">
				<image src="../../static/image/icon2.png" mode="aspectFill"></image>
			</view>
		</view> -->
		<view class="business-sou shai-top">
			<view class="business-sou-left">
				<view class="business-sou-icon">
					<image src="../../static/image/search.png" class="iconStyle" mode="aspectFit"></image>
				</view>
				<input type="text" @input='searchChangeFun' @confirm='searchFun' class="business-new-input" confirm-type='完成' placeholder-style="color:#dfdfdf;font-size:16px"
				 placeholder="请输入员工姓名/手机号" />
			</view>
			<view @click="Camera" class="business-shuai shai-chong">
				<image class="iconStyle" src="../../static/image/icon2.png" mode="aspectFill"></image>
			</view>
		</view>
		<scroll-view scroll-y="true" class="ScrollBox" @scrolltolower="lower">
			<view class="StaffList">
				<view class="list" @click="toDetails(item)" v-for="(item,idx) in listData" :key='idx'>
					<view class="left">
						<view>
							<image :src="item.image" mode="aspectFill"></image>
						</view>
					</view>
					<view class="middle">
						<view>
							<text>{{item.name}}</text>
							<image src="../../static/image/phone.png" mode="aspectFill" @click.stop.prevent="CallPhone(item)" ></image>
						</view>
						<view>
							<text>￥{{item.income}}</text>
						</view>
					</view>
					<view class="right">
						<image src="../../static/image/f12.png" mode="aspectFill"></image>
						<text>{{item.merchantCount}}家</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		data() {
			return {
				num:'1',
				listPage:{ pages: 1, pageSize: 10, pageNo: 1, count: 1, },
				search:'',
				listData:[],
			};
		},
		onShow(){
			
		},
		created() {
			this.getListData();
		},
		methods:{
			// 底部事件
			lower(e) {
				console.log(this.listPage.pageNo)
				this.listPage.pageNo = this.listPage.pageNo + 1;
				
				if(this.listPage.pageNo > this.listPage.pages){
					uni.showToast({
						icon: "none",
						title: "没有更多数据了..."
					})
					return false;
				}else{
					this.getList();
				}
			},
			// 获取数据列表
			getListData(){
				let data = this.listPage;
				
				if(this.search){
					data.name = this.search;
				}else{
					delete data.name;
				}
				
				
				http.Request(api.StaffManage, 'POST', data, (res) => {
					
					for(let i in res){
						if(i !== 'list'){
							this.listPage[i] = parseInt(res[i]);
						}
					}
					
					for(let i = 0; i < res.list.length; i++){
						this.listData.push(res.list[i]);
					}
				})
			},
			CallPhone(item){
				uni.makePhoneCall({
					phoneNumber: item.phone
				});
			},
			searchChangeFun(e){
				console.log(e)
				if(e.detail.value == ''){
					this.searchFun({detail:{value:""}});
				}
			},
			// 搜索
			searchFun(e){
				this.search = e.detail.value;
				this.listPage.pageNo = 1;
				this.listData = [];
				this.getListData();
				
			},
			toDetails(item){
				uni.setStorageSync('StaffData', item);
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
			background-color: #3E47E1;
			padding: 20upx 6upx 20upx 40upx;
			display: flex;
			align-items: center;
			.input{
				display: flex;
				width: 580upx;
				height: 100%;
				justify-content: space-between;
				align-items: center;
				image{
					width: 38upx;
					height: 38upx;
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
			padding: 20upx;
			width: 100%;
			box-sizing: border-box;
			.list{
				box-sizing: border-box;
				width: 100%;
				height: 176upx;
				padding: 0 20upx;
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
						width: 112upx;
						height: 112upx;
						border-radius: 50%;
						background-color: #545DFF;
						position: relative;
						image{
							position: absolute;
							top: 6upx;
							left: 6upx;
							width: 112upx;
							height: 112upx;
							border-radius: 50%;
							overflow: hidden;
						}
					}
				}
				.middle{
					width: 60%;
					flex-wrap: wrap;
					box-sizing: border-box;
					padding-left: 10upx;
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
	
	.Staff{
		display:flex;    
		flex-direction:column; 
		height:100%;      
	}
	.ScrollBox{
		flex: 1;
		overflow-y: auto;
		padding-bottom: 100upx;
	}
	
	
	
	
	.business-sou{
		padding: 6upx 0 6upx 40upx;
		background-color: #3E47E1;
		display: flex;
	}
	.business-sou-left{
		flex-grow: 1;
		display: flex;
		align-items: center;
	}
	.business-shuai{
		flex-grow: 0;
		flex-shrink: 0;
		width: 80upx;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-left: 1px solid #fff;
	}
	.shai-chong{
		font-size: 28upx;
		color: #fff;
		width: 80rpx;
	}
	.business-sou-icon{
		width: 40upx;
		height: 40upx;
		flex-grow: 0;
		flex-shrink: 0;
		
	}
	.business-new-input{
		flex-grow: 1;
		color: #dfdfdf;
		font-size: 28upx;
		padding-left: 30upx;
	}
	.iconStyle{
		width: 38rpx;
		height: 38rpx;
	}
	
	
</style>
