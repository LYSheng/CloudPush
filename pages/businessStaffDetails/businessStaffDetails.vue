<template>
		<scroll-view scroll-y="true" class="ScrollBox" @scrolltoupper="upper" @scrolltolower="lower">
			<view class="StaffDetails">
				<view class="header">
					<view class="left">
						<view>
							<image :src="StaffInfo.image" mode="aspectFill"></image>
						</view>
					</view>
					<view class="middle">
						<view>
							<text>{{StaffInfo.name}}</text>
						</view>
						<view>
							<text>{{StaffInfo.phone}}</text>
						</view>
					</view>
					<view class="right">
						<image src="../../static/image/delete.png" @click="deletaFun" mode="aspectFill"></image>
					</view>
				</view>
				<view class="block" @click="to(1,0)">
					<text>入驻奖励</text>
					<image src="../../static/image/detailsIcon.png"></image>
				</view>
				<view class="block" @click="to(2,1)">
					<text>交易分佣</text>
					<image src="../../static/image/detailsIcon.png"></image>
				</view>
				<view class="business-new-top">
					<view class="business-sou" v-if="HeadShow">
						<view class="business-sou-left">
							<view class="business-sou-icon">
								<image src="../../static/image/search.png" class="iconStyle" mode="aspectFit"></image>
							</view>
							<input type="text" @blur="search.searchFun" @confirm="search.searchFun" class="business-new-input" confirm-type='搜索' placeholder-style="color:#dfdfdf;font-size:16px"
							 placeholder="请输入商家名称/负责人" />
						</view>
						<view @click="shaiShow" class="business-shuai">
							<image src="../../static/image/icon1.png" class="iconStyle" mode="aspectFit"></image>
						</view>
					</view>
					<!-- 列表 -->
					<view class="business-box">
						<view class="business-new-top">
							<view class="business-tab">
								<view @tap="change(3)" :class="{active:btnnum == 3}" class="business-list">
									会员商家
								</view>
								<view @tap="change(2)" :class="{active:btnnum == 2}" class="business-list">
									普通商家
								</view>
								<view @tap="change(1)" :class="{active:btnnum == 1}" class="business-list">
									未激活
								</view>
							</view>
						</view>
						<view class="business-context">
							<view v-if="countFlag" class="business-datanone">
								<view class="none-box">
									<image class="none-img" src="/static/image/wu.png" mode="aspectFit"></image>
									<view class="none-text">
										暂无数据
									</view>
								</view>
							</view>
							<view v-else>
								<view @click.stop.prevent="detail(item.type,item.id)" class="business-lists" v-for="(item,index) in list"
								 :key='index'>
									<view class="business-left">
										<image v-if="item.type == 3" class="business-icon" src="/static/image/bb1.png" mode=""></image>
										<image v-if="item.type == 2" class="business-icon" src="/static/image/b1.png" mode=""></image>
										<image v-if="item.type == 1" class="business-icon" src="/static/image/bb2.png" mode=""></image>
									</view>
									<view class="business-con">
										<view class="business-title">
											{{item.name}}
										</view>
										<view class="business-text">
											{{item.addressDetail}}
										</view>
										<view class="business-text-lan">
											<view class="business-text-money" v-if="item.isShowTotalIncome">
												￥{{item.totalIncome}}
											</view>
										</view>
									</view>
									<view class="business-right">
										<view class="business-biao">
											{{item.merchantCategory}}
										</view>
										
										<view v-if="item.isShowBtnMarketUser" @click.stop.prevent="allotBtn(item.id)" class="business-phone">
											分配
										</view>
										<view v-if='item.isShowMarketUserName' class="business-text-fen">
											{{item.marketUserName}}
										</view>
										<view class="business-jiao" v-if='item.isShowRemainingDay'>
											{{item.remainingDay}}天
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		data() {
			return {
				StaffInfo:{},
				HeadShow:false,
				countFlag:false,
				scrollTop: 0,
				list:[],
				btnnum:3,
				search:'',
				listPage:{ pages: 1, pageSize: 10, pageNo: 1, count: 1, },
			}
		},
		created() {
			this.StaffInfo = uni.getStorageSync('StaffData');
			console.log(this.StaffInfo)
			
			this.StaffInfo.userId;
			this.getList();
		},
		methods: {
			upper(){
				
			},
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
			// 点击详情
			detail(res, id, qrcode) {
				// if (res != 1) {
					uni.navigateTo({
						url: '../businessDetails/businessDetails?type=' + res + '&id=' + id
					});
				// }
			},
			getList() {
				let data = this.listPage;
				//  type : this.btnnum,
				if (this.btnnum) {
					data.type = this.btnnum;
				}else{
					delete data.type;
				}
				
				if (this.marketUserId) {
					data.marketUserId = this.marketUserId;
				}else{
					delete data.marketUserId;
				}
				
				http.Request(api.MerchantList, 'POST', data, (res) => {
					for(let i in res){
						if(i !== 'list'){
							this.listPage[i] = parseInt(res[i]);
						}
					}
					
					for(let i = 0; i < res.list.length; i++){
						this.list.push(res.list[i]);
					}
					
					this.countFlag = this.list.length <= 0? true : false;
				})
			},
			// tab 切换 会员 普通 未激活
			change(e) {
				this.btnnum = e;
				this.setListPage();
			},
			setListPage(){
				this.listPage.pageNo = 1;
				delete this.listPage.pages;
				delete this.listPage.count;
				this.list = [];
				this.getList();
			},
			deletaFun(){
				uni.showModal({
				    content: '确认移除该员工？',
				    success:(res) => {
				        if (res.confirm) {
							this.DeleteStaffFun();
				        }
				    }
				});
			},
			DeleteStaffFun(){
				let data = {
					id: this.StaffInfo.userId,
				}
				http.Request(api.DeleteStaff, 'POST', data, (res) => {
					uni.showToast({
						title: "删除成功"
					})
					uni.reLaunch({
						url:'../businessHome/businessHome?type=1&idx=1'
					})
				})
			},
			to(type,tid){
				let userid = this.StaffInfo.userId;
				uni.navigateTo({
					url: '../residenceAward/residenceAward?type=' + tid + '&id=' + userid
				});
			}
		}
	}
</script>

<style lang="scss">
	.business-box{
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		.business-tab{
			padding: 20upx;
			padding-bottom: 0;
			.business-list{
				width: 208upx;
			}
		}
		.business-lists{
			width: 710upx;
			padding: 32rpx 20rpx;
			margin: 20rpx auto;
			box-sizing: border-box;
			box-shadow:0px 4px 20px 0px rgba(41,47,76,.1);
		}
	}
	.StaffDetails{
		.header{
			box-sizing: border-box;
			height: 192upx;
			padding: 0 20upx;
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
				justify-content: flex-end;
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
	
	.business-tab{
		background-color: transparent;
		padding-bottom: 0upx;
	}
	.business-list{
		border: 1px solid #545DFF;
		color: #545DFF;
	}
	.active{
		background-color:#545DFF ;
		color: #FFFFFF;
	}
	
	.business-search{
		padding: 26upx 40upx;
		background-color: #3E47E1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.bus-search-place{
		color: #dfdfdf;
		font-size: 28upx;
	}
	.business-search-input{
		font-size: 28upx;
		color: #fff;
		flex-grow: 1;
	}
	.business-search-icon{
		width: 36upx;
		height: 38upx;
		flex-grow: 0;
		flex-shrink: 0;
	}
	.business-tab{
		background-color: transparent;
		padding-bottom: 0upx;
	}
	.business-list{
		border: 1px solid #545DFF;
		color: #545DFF;
	}
	.active{
		background-color:#545DFF ;
		color: #FFFFFF;
	}
	.business-lists{
		position: relative;
		overflow: hidden;
	}
	.business-jiao{
		position: absolute;
		width:120upx;
		height: 30upx;
		background-color: #FC6180;
		color: #FFFFFF;
		font-size: 20upx;
		text-align: center;
		right: -36upx;
		top: 16upx;
		transform: rotate(45deg);
	}
	.bus-search-icon{
		width: 36upx;
		height: 38upx;
	}
	.business-title{
		margin-bottom: 2upx;
		font-size: 26upx;
	}
	.business-text{
		font-size: 24upx;
	}
	.business-biao{
		font-size: 26upx;
	}
	
	.business-text-fen{
		color:#545DFF;
		font-size:24rpx;
		margin-top:10rpx;
		width: 100%;
		text-align: center;
	}
	.business-text-money{
		font-size:28rpx;
		color:#545DFF;
		font-weight:bold;
	}

	
	
	.shai-content{
		height: 100%;
	}
	.StaffListScroll{
		height: 70%;
	}
	.shai-left,.shai-right{
		display: flex;
		align-items: center;
	}
	.shai-right > view:first-child{ 
		display: flex;
		align-items: center;
		margin-right: 5px;
	}
	.shai-left .left{
		margin: 0 5upx;
	}
	page{
		height: 100%;
	}
	.ScrollBox {
		height: 100%;
	}
</style>
