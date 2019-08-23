<template>
	<view class="income-list-box"> 
		<view class="list-box-top"> 
			<view class="income-list-top">
				<image class="incomeListTopImg" src="/static/image/shouicon.png" mode=""></image>
				<view class="income-detail-box">
					<view v-if="types==1" class="income-detail-title">
						累计入驻奖励金额（元）
					</view>
					<view v-if="types==2" class="income-detail-title">
						累计交易分佣金额（元）
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
			<view v-else class="income-li" v-for="(item,index) in dataArray">
				<view v-if="item.companyType==1" class="income-jiaobiao">
					个人
				</view>
				<view v-if="item.companyType==2" class="income-jiaobiaoge ">
					公司
				</view>
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
				dataArray:[],
				money:'',
				pageNo:1,
				pageSize:10,
				id:'',
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
			console.log(options)
			this.money=options.money
			this.id=options.id
			if(options.type==0){
				this.types=1
				uni.setNavigationBarTitle({
				　　title:'入驻奖励'
				})
			}else if(options.type==1){
				this.types=2
				uni.setNavigationBarTitle({
				　　title:'交易分佣'
				})
			}
			this.transDetail()
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
					this.transDetail()
				}else if(this.pageNo==this.count){
					console.log('没数据了')
				}
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
			// 获取列表
			transDetail(){
				let self=this
				let param={
					type:this.types,
					userId:this.id,
					pageNo:this.pageNo,
					pageSize:this.pageSize
				}
				http.Request(api.transDetail,'POST',param,function(res){
					console.log(res)
					// self.dataArray=res
					self.money=res.data
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
