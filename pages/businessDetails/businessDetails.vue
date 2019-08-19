<template>
	<view class="business-detail">
		<view class="business-lists">
			<view class="business-left">
				<image class="business-icon" src="/static/image/b1.png" mode=""></image>
			</view>
			<view  class="business-con">
				<view class="business-title">
					杨老板的小店
				</view>
				<view class="business-text">
					上海市 杨浦区 平凉路
				</view>
				<view class="business-text">
					商家负责人：杨某
				</view>
			</view>
			<view class="business-right">
				<view class="business-biao">
					数码产品
				</view>
				<button v-if='isMember'>联系商家</button>
				<button v-else >分配</button>
			</view>
		</view>
		<view class="business-infolist">
			<view class="member" v-if='isMember'>
				<view class="list">
					<text>所属公司</text>
					<text>上海翼倍信息科技有限公司</text>
				</view>
				<view class="list">
					<text>累计收益（元）</text>
					<text>12345</text>
				</view>
				<view class="list">
					<text>进货</text>
					<image src="../../static/image/detailsIcon.png" mode="aspectFill"></image>
				</view>
				<view class="list">
					<text>入驻</text>
					<image src="../../static/image/detailsIcon.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="common" v-else>
				<view class="list">
					<text>商家保护结束时间</text>
					<text>2019-08-12</text>
				</view>
				<view class="text">
					<text>注：该商家还未成为会员商家，请在保护期内尽快联系商家购买会员，保护期结束后可与其他业务员关联绑定关系</text>
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
				isMember:true,
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
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>
