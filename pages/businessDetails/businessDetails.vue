<template>
	<view class="business-detail">
		<view  class="business-lists" v-for="(item,index) in list">
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
					{{item.addressProvince}}  {{item.addressCity}}  {{item.addressCounty}}
				</view>
				<view class="business-text">
					商家负责人：{{item.leadingName}}
				</view>
			</view>
			<view class="business-right">
				<view class="business-biao">
					{{item.merchantCategorySecond}}
				</view>
				<view v-if="item.type==1" @click.stop.prevent="phoneCall(item.phone)" class="business-phone">
					分配
				</view>
				<view v-else class="business-text-fen">
					业务员：杨某
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
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
		onLoad() {
			this.getList()
		},
		methods: {
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
					self.count=res.pages;
					  self.list.push(res.list[0]);
					if(res.list.length>0){
						for (var i=0;i<res.list.length;i++){
						    // self.list.push(res.list[0]);
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
		}
	}
</script>

<style scoped>
	@import url("./index.css");
</style>
