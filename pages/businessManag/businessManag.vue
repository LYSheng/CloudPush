<template>
	<view class="business-box">
		<!-- 分配人员 -->
		<mpvue-picker ref="mpvuePicker" :mode="mode" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm"
		 @onCancel="onCancel" :pickerValueArray="pickerValueArray" confirmColor='#f00'></mpvue-picker>

		<!-- 筛选框 -->
		<view v-if="tanFlag" class="shai-box">
			<view class="rgba" @click="Close()"></view>
			<view class="business-sou shai-top">
				<view class="business-sou-left">
					<view class="business-sou-icon">
						<image src="../../static/image/search.png" class="iconStyle" mode="aspectFit"></image>
					</view>
					<input type="text" @blur="search.screenSearchFun" @confirm="search.screenSearchFun" class="business-new-input" placeholder-style="color:#dfdfdf;font-size:16px"
					 placeholder="请输入员工姓名" />
				</view>
				<view @click="chong" class="business-shuai shai-chong"> 重置 </view>
			</view>
			<view class="shai-content">
				
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="StaffListScroll">
					<view @click="StaffListClick(item.marketUserId)" class="shai-list" v-for="(item,idx) in staffList" :key='idx' >
						<view class="shai-left">
							<text>{{item.name}}</text>
							<text v-if='item.mobile' class='left'>-</text>
							<text v-if='item.mobile'>{{item.mobile}}</text>
						</view>
						<view class="shai-right">
							<view class="shai-right-icon">
								<image src="../../static/image/icon3.png" class="iconStyle" mode="aspectFit"></image>
							</view>
							<view class="shai-right-num">
								{{item.countMerchant}}家
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
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
			<view class="business-tab" v-if='HeadShow'>
				<view @tap="change('')" :class="{active:btnnum == 0}" class="business-list ">
					全部
				</view>
				<view @tap="change(2)" :class="{active:btnnum == 2}" class="business-list">
					普通商家
				</view>
				<view @tap="change(3)" :class="{active:btnnum == 3}" class="business-list">
					会员商家
				</view>
				<view @tap="change(1)" :class="{active:btnnum == 1}" class="business-list">
					未激活
				</view>
			</view>
			<view class="business-tab" v-else>
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
			<scroll-view v-else :scroll-top="scrollTop" scroll-y="true" class="business-ul" @scrolltoupper="upper"
			 @scrolltolower="lower">
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
							业务员：{{item.marketUserName}}
						</view>
						<view class="business-jiao" v-if='item.isShowRemainingDay'>
							{{item.remainingDay}}天
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/ly-picker.vue';
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	export default {
		components: {
			mpvuePicker
		},
		props: {
			HeadShow: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				search: {
					search: '', // 商家搜索
					screenSearch: '', // 员工搜索
					searchFun: (e) => {
						this.searchFun(e)
					},
					screenSearchFun: (e) => {
						this.screenSearchFun(e)
					}
				},
				staffSearch: {
					pageNo: 1,
					pageSize: 20,
				},
				staffList:'',		// 员工筛选列表
				allotId:'',
				countFlag: false,
				deepLength: 1,
				mode: 'selector',
				pickerValueDefault: [1],
				listPage:{ pages: 1, pageSize: 5, pageNo: 1, count: 1, },
				btnnum: '',
				pageNo: 1,
				pageSize: 10,
				list: [],
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				count: 0,
				tanFlag: false, // 筛选条件弹窗
				pickerValueArray: [{
						label: '住宿费',
						value: 1
					},
					{
						label: '活动费',
						value: 2
					}
				]
			}
		},
		created() {
			if (!this.HeadShow) {
				this.btnnum = 3;
			} else {
				this.btnnum = '';
			}
			this.setColor();
			this.pageNo = 1;
			this.list = [];
			// 获取商户列表
			this.getList();
			// 获取分配员列表
			this.allotList();
			// 获取员工筛选列表
			this.staffListFun();
		},
		// onLoad(){
		// 	this.getList()
		// },
		methods: {
			onConfirm(e) {
				console.log(e);
				this.$refs.mpvuePicker.hide();
				let data = {
					id:this.allotId,
					marketUserId:e.value[0],
				};
				uni.showModal({
					title: '确认分配给' + e.label,
					success: (res) => {
						if (res.confirm) {
							console.log(data)
							http.Request(api.allotTo, 'POST', data, (res) => {
								uni.showToast({
									title: '分配成功'
								});
								this.getList();
							})
							
						}
					}
				});
			},
			onCancel(e) {
				this.$refs.mpvuePicker.hide();
			},
			// 点击筛选条件
			shaiClick() {
				console.log(111)
			},
			// 筛选
			shaiShow() {
				this.tanFlag = true;
			},
			Close(){
				this.tanFlag = false;
			},
			// 重置筛选
			chong() {
				this.btnnum = '';
				this.marketUserId = '';
				this.search.search = '';
				this.setListPage();
				this.tanFlag = false;
			},
			// 设置导航背景色
			setColor() {
				console.log('123123')
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					titleSize: '16px',
					backgroundColor: '#545DFF'
				});
			},
			// 回到顶部
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			// getList
			getList() {
				let data = this.listPage;
				//  type : this.btnnum,
				if (this.btnnum) {
					data.type = this.btnnum;
				}else{
					delete data.type;
				}
				
				if (this.search.search) {
					data.keywords = this.search.search;
				}else{
					delete data.keywords;
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
					console.log(this.list)

					// 					let list = [{
					// 							"id":1,
					// 							"name": "宁波",
					// 							"merchantCategorySecond": "中餐",
					// 							"leadingName": "名额",
					// 							"phone": "13938565233",
					// 							"addressProvince": "北京市",
					// 							"addressCity": "市辖区",
					// 							"addressCounty": "东城区",
					// 							"addressDetail": "第一",
					// 							"type": 3,
					// 							"qrurl": "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQFe8DwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyZWEzbE5mLV9jX2sxMDAwMHcwN2UAAgQKCVVdAwQAAAAA"
					// 						},
					// 					];
					// 					self.list = list;
				})
			},
			
			// 筛选列表点击
			StaffListClick(id) {
				this.marketUserId = id;
				this.tanFlag = false;
				this.setListPage();
			},
			// 搜索
			searchFun(e) {
				this.search.search = e.detail.value;
				this.setListPage();
			},
			// tab 切换 会员 普通 未激活
			change(e) {
				this.btnnum = e;
				this.marketUserId = '';
				this.search.search = '';
				this.setListPage();
			},
			// 顶部事件
			upper(e) {
				// this.setListPage();
				// listPage:{ pages: 1, pageSize: 5, pageNo: 1, count: 1, },
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
			setListPage(){
				this.listPage.pageNo = 1;
				delete this.listPage.pages;
				delete this.listPage.count;
				this.list = [];
				this.getList();
			},
			
			// 员工筛选搜索
			screenSearchFun(e){
				console.log(e)
				this.search.screenSearch = e.detail.value;
				this.staffSearch.pageNo = 1;
				this.staffListFun();
			},
			// 获取员工筛选
			staffListFun() {
				let { staffSearch, search } = this;
				let data = {
					pageNo: staffSearch.pageNo,
					pageSize: staffSearch.pageSize,
				};
				if (search.screenSearch) {
					data.keywords = search.screenSearch;
				}else{
					delete data.keywords;
				}

				http.Request(api.StaffList, 'POST', data, (res) => {
					this.staffList = res.list;
				})
			},
			allotList() {

				http.Request(api.allotList, 'POST', {}, (res) => {
					this.pickerValueArray = res;
				})
			},
			// 分配
			allotBtn(id) {
				this.allotId = id;
				this.$refs.mpvuePicker.show();
			},
			// 点击详情
			detail(res, id, qrcode) {
				// if (res != 1) {
					uni.navigateTo({
						url: '../businessDetails/businessDetails?type=' + res + '&id=' + id
					});
				// }
				
				// if (res == 1) {
				// 	uni.setStorageSync('codeUrl', qrcode);
				// 	uni.navigateTo({
				// 		url: '../settledStepTwo/settledStepTwo?query=2'
				// 	});
				// }
			}
		}
	}
</script>

<style scoped>
	@import url("./index.css");


	.business-lists {
		position: relative;
		overflow: hidden;
		padding: 32upx 20upx;
	}

	.business-jiao {
		position: absolute;
		width: 120upx;
		height: 30upx;
		background-color: #FC6180;
		color: #FFFFFF;
		font-size: 20upx;
		text-align: center;
		right: -36upx;
		top: 16upx;
		transform: rotate(45deg);
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
</style>
