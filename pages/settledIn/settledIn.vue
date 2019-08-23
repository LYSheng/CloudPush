<template>
	<view class="income-list-box">
		<view class="list-box-top"> 
			<view class="income-list-top">
				<image class="incomeListTopImg" src="/static/image/b1.png" mode=""></image>
				<view class="income-detail-box">
					<view class="income-detail-title">
						入驻奖励金额（元）
					</view>
					<view class="income-detail-money">
						{{money}}
					</view>
				</view>
				<view class="income-bian">
					
				</view>
			</view>
		</view>
<!-- list -->
		<scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower" class="income-uls">
			<view v-if="countFlag" class="business-datanone">
				<view class="none-box">
					<image class="none-img" src="/static/image/wu.png" mode=""></image>
					<view class="none-text">
						暂无数据 
					</view>
				</view>
			</view>
			<view v-else class="income-li" v-for="(item,index) in list">
				<view class="income-li-left">
					<view class="income-name">
						{{item.name}}
					</view>
					<view class="income-yuan">
						业务员：{{item.userName}}
					</view>
					<view class="income-time">
						<text>{{item.createTime}}</text>
						<!-- <text>12:30:98</text> -->
					</view>
				</view>
				<view class="income-li-right">
					￥{{item.transAmount}}
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
				types:0,
				merchantId:'test_merchant_11102',
				money:'',
				list:[],
				pageNo:1,
				pageSize:10,
				count:0,
				overFlag:false,
				countFlag:false,
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
			}
		},
		onLoad(options) {
			this.types=options.type
			this.merchantId=options.merchantId
			this.getData()
		},
		methods: {
// 顶部事件
			upper(e){
				console.log(e)
			},
			// 底部事件
			lower(e){
				console.log(e)
				if(this.pageNo<this.count){
					this.pageNo=this.pageNo+1;
					this.getData()
				}else if(this.pageNo==this.count){
					console.log('没数据了')
				}
			},
			// 获取
			getData(){
				let self=this
				let param={
					merchantId:self.merchantId,
					type:1,
				}
				http.Request(api.transDetail,'POST',param,function(res){
					console.log(res)
					self.money=res.data
					self.count=res.pages
					// self.list=res.list
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
			}			
		}
	}
</script>

<style>
@import url("../purchase/index.css");
</style>
