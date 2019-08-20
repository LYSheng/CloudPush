<template>
	<view class="business-box">
		<view class="business-search">
			<input type="text" placeholder-style="font-size:14px;color:#dfdfdf;" placeholder="请输入商家名称/负责人" class="business-search-input" value="" />
			<view class="business-search-icon">
				<image src="/static/image/search.png" class="bus-search-icon" mode=""></image>
			</view>
		</view>
		<view class="business-tab">
			<view @tap="change(0)" :class="{active:btnnum == 0}" class="business-list ">
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
		<view class="business-context">
			<view v-if="countFlag" class="business-datanone">
				<view class="none-box">
					<image class="none-img" src="/static/image/wu.png" mode=""></image>
					<view class="none-text">
						暂无数据
					</view>
				</view>
			</view>
			<scroll-view v-else  :scroll-top="scrollTop" scroll-y="true" class="business-ul" @scrolltoupper="upper" @scrolltolower="lower">
				<view  @click.stop.prevent="detail(item.type,item.qrurl)" class="business-lists" v-for="(item,index) in list">
					<view class="business-left" >
						<image v-if="item.type==2" class="business-icon" src="/static/image/b1.png" mode=""></image>
						<image v-if="item.type==3" class="business-icon" src="/static/image/bb1.png" mode=""></image>
						<image v-if="item.type==1" class="business-icon" src="/static/image/bb2.png" mode=""></image>
					</view>
					<view  class="business-con">
						<view class="business-title">
							{{item.name}}
						</view>
						<view class="business-text">
							负责人：{{item.leadingName}}
						</view>
						<view class="business-text">
							{{item.addressProvince}}  {{item.addressCity}}  {{item.addressCounty}}
						</view>
					</view>
					<view class="business-right">
						<view class="business-biao">
							{{item.merchantCategorySecond}}
						</view>
						<view @click.stop.prevent="phoneCall(item.phone)" class="business-phone">
							联系卖家
						</view>
					</view>
					<view class="business-jiao">
						14天
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	// import uniLoadMore from "@/components/load-more/load-more.vue"
	export default {
		data() {
			return {
				countFlag:false,
				btnnum:0,
				pageNo:1,
				pageSize:10,
				list:[],
				overFlag:false,
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				count:0,
			}
		},
		// components: {uniLoadMore},
		created(){
			this.setColor()
			this.pageNo=1;
			this.list=[];
			this.getList();
			uni.setNavigationBarTitle({
			　　title:'我的商家'
			})
		},
		methods: {
			// 设置导航背景色
			             setColor(){
			                 uni.setNavigationBarColor({
			                     // 字体颜色 仅支持 #ffffff 和 #000000
			                     frontColor: '#ffffff',
								 titleSize:'16px',
			                     //     背景颜色值，有效值为十六进制颜色
			                     backgroundColor: '#545DFF',
			                     // animation 结构
			                     // animation: {
			                         // duration: 动画时间
			                         // duration: 500,
			                         // timingFunc:动画效果
			                             // linear    动画从头到尾的速度是相同的。
			                             // easeIn    动画以低速开始
			                             // easeOut    动画以低速结束。
			                             // easeInOut    动画以低速开始和结束
			                         // timingFunc: 'easeIn'
			                     // }
			                 });
						},
			// 顶部事件
			upper(e){
				console.log(e)
			},
			// 底部事件
			lower(e){
				console.log(e)
				if(this.pageNo<this.count){
					// 
					this.pageNo=this.pageNo+1;
					this.getList()
				}else if(this.pageNo==this.count){
					console.log('没数据了')
				}
				// if(this.overFlag==false){
				// 	this.pageNo=this.pageNo+1;
				// 	this.getList()
				// }
			},
			// 回到顶部
			goTop: function(e) {
			            this.scrollTop = this.old.scrollTop
			            this.$nextTick(function() {
			                this.scrollTop = 0
			            });
			            uni.showToast({
			                icon:"none",
			                title:"纵向滚动 scrollTop 值已被修改为 0"
			            })
			},
			// getList
			getList(){
				let self=this
				let param={
					type:self.btnnum,
					pageNo:self.pageNo,
					pageSize:self.pageSize,
					
				}
				http.Request(api.list,'POST',param,function(res){
					console.log(res)
					// if(res.pages*1>0&&self.pageNo*1>=res.pages*1){
					// 	self.countFlag=false
					// }else{
					// 	self.countFlag=true
					// }
					self.count=res.pages;
					if(res.list.length>0){
						for (var i=0;i<res.list.length;i++){
						    self.list.push(res.list[i]);
						}
					}else{
						// 停止分页
						self.overFlag=true
					}
					
					// 数据判断
					if(res.pages>0){
						self.countFlag=false
					}else{
						self.countFlag=true
					}
					console.log(self.list)
				})
			},
			change(e){
				this.btnnum = e
				console.log(this.btnnum)
				this.pageNo=1
				this.list=[];
				this.overFlag=false;
				this.getList()
			},
			// 联系商家
			phoneCall(phone){
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			// 点击详情
			detail(res,code){
				console.log(res)
				if(res==1){
					
					uni.setStorageSync('codeUrl', code);
					uni.navigateTo({
						url: '../settledStepTwo/settledStepTwo?query=2'
					});
				}
			}
		}
	}
</script>

<style scoped>
@import url("./index.css");
</style>
