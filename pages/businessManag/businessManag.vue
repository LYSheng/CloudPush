<template>
	<view class="business-box">
		<!-- 分配人员 -->
		    <mpvue-picker ref="mpvuePicker" :mode="mode" :pickerValueDefault="pickerValueDefault" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>

		<!-- 筛选框 -->
		<view v-if="tanFlag" class="shai-box">
			<view class="business-sou shai-top">
				<view class="business-sou-left">
					<view class="business-sou-icon">
						1
					</view>
					<input type="text" class="business-new-input" placeholder-style="color:#fff;font-size:14px" placeholder="请输入商家名称/负责人" value="" />
				</view>
				<view @click="chong" class="business-shuai shai-chong">
					重置
				</view>
			</view>
			<view class="shai-content">
				<view @click="shaiClick" class="shai-list">
					<view class="shai-left">
						无人维护
					</view>
					<view class="shai-right">
						<view class="shai-right-icon">
							1
						</view>
						<view class="shai-right-num">
							12家
						</view>
					</view>
				</view>
				
				<view class="shai-list">
					<view class="shai-left">
						杨某某 - 18677777777
					</view>
					<view class="shai-right">
						<view class="shai-right-icon">
							1
						</view>
						<view class="shai-right-num">
							12家
						</view>
					</view>
				</view>
				
				
			</view>
		</view>
		<view class="business-new-top">
			<view class="business-sou">
				<view class="business-sou-left">
					<view class="business-sou-icon">
						1
					</view>
					<input type="text" class="business-new-input" placeholder-style="color:#fff;font-size:14px" placeholder="请输入商家名称/负责人" value="" />
				</view>
				<view @click="shaiShow" class="business-shuai">
					2
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
		</view>

		<view class="business-context">
			<view v-if="countFlag" class="business-datanone">
				<view class="none-box">
					<image class="none-img" src="/static/image/zw.png" mode=""></image>
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
							{{item.addressProvince}}  {{item.addressCity}}  {{item.addressCounty}}
						</view>
						<view class="business-text-lan">
							<view class="business-text-money">
								￥345,67
							</view>
							<view class="business-text-lan-icon">
								1
							</view>
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
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '../../components/ly-picker.vue';
	import http from '../../utils/http.js'
	import api from '../../utils/api.js'
	// import uniLoadMore from "@/components/load-more/load-more.vue"
	export default {
		data() {
			return {
				countFlag:false,
				deepLength:1,
				mode: 'selector',
				pickerValueDefault: [1],
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
				tanFlag:false,// 筛选条件弹窗
				pickerValueArray:[
					{
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
		components: {
			mpvuePicker
		},
		created(){
			this.setColor()
			this.pageNo=1;
			this.list=[];
			this.getList();
		},
		// onLoad(){
		// 	this.getList()
		// },
		methods: {
			onConfirm(e) {
			  console.log(e);
			  this.$refs.mpvuePicker.hide();
			},
			onChange(e) {
			  console.log(e);
			 
			},
			onCancel(e) {
			  console.log(e);
			   this.$refs.mpvuePicker.hide();
			},
			// 点击筛选条件
			shaiClick(){
				console.log(111)
			},
			// 筛选
			shaiShow(){
				this.tanFlag=true
			},
			// 重置筛选
			chong(){
				this.tanFlag=false
			},
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
				this.$refs.mpvuePicker.show();
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
