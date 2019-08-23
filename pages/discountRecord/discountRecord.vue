<template>
	<view class="income-list-box">
		<view class="list-box-top"> 
			<view class="income-list-top">
				<image class="incomeListTopImg" src="/static/image/shouicon.png" mode=""></image>
				<view class="income-detail-box">
					<view class="income-detail-title">
						累计提现金额（元）
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
		<scroll-view scroll-view :scroll-top="scrollTop" scroll-y="true" @scrolltoupper="upper" @scrolltolower="lower" class="income-uls">
			<view v-if="countFlag" class="business-datanone">
				<view class="none-box">
					<image class="none-img" src="/static/image/wu.png" mode=""></image>
					<view class="none-text">
						暂无数据
					</view>
				</view>
			</view>
			<view v-else class="income-li" v-for="(item,index) in dataArray">
				<view class="income-li-left">
					<view v-if="item.status==0" class="income-txz">
						提现中
					</view>
					<view v-if="item.status==1" class="income-gg">
						提现成功
					</view>
					<view v-if="item.status==2" class="income-fail">
						提现失败
					</view>
					<view class="income-time">
						<text>{{item.createTime}}</text>
						<!-- <text>12:30:98</text> -->
					</view>
				</view>
				<view class="income-li-right">
					￥{{item.amount}}
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
				pageNo:1,
				pageSize:10,
				dataArray:[],
				money:'',
				overFlag:false,
				countFlag:false,
				scrollTop: 0,
				old: {
				    scrollTop: 0
				},
				count:0,
			}
		},
		onLoad(options) {
			//1：个人提现，2：公司提现
			this.types=options.id
			this.withdrawDetail()
			this.money=options.money
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
					// 
					this.pageNo=this.pageNo+1;
					this.withdrawDetail()
				}else if(this.pageNo==this.count){
					console.log('没数据了')
				}
				// if(this.overFlag==false){
				// 	this.pageNo=this.pageNo+1;
				// 	this.getList()
				// }
			},
			// 获取记录
			withdrawDetail(){
				let self=this
				let param={
					type:self.types,//1：个人提现，2：公司提现
					pageNo:self.pageNo,
					pageSize:self.pageSize
				}
				http.Request(api.withdrawDetail,'POST',param,function(res){
					console.log(res)
					// self.dataArray=res
					self.count=res.pages;
					if(res.list.length>0){
						for (var i=0;i<res.list.length;i++){
						    self.dataArray.push(res.list[i]);
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
					console.log(self.dataArray)
				})					
			}
		}
	}
</script>

<style>
@import url("./index.css");
</style>
