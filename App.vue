<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let uid=''
			 uid=uni.getStorageSync('uid');
			 console.log(uid)
			if(uid==''){
				uni.showToast({
					icon:'none',
					title: '您还没有登录，请登录'
				});
				uni.navigateTo({
					url: '/pages/login/login?type=1'
				});
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		width: 100%;
		height: 100%;
	}
	button{
		padding: 0px!important;
		line-height: 0 !important;
	}
	.join{
		font-size: 32upx;
		width: 640upx;
		height: 84upx;
		line-height: 84upx;
		text-align: center;
		color: #fff;
		background-color: #545DFF;
		margin: 0 auto;
		margin-top: 35px;
		border-radius: 20upx;
	}
	.join-hui{
		font-size: 32upx;
		width: 640upx;
		height: 84upx;
		line-height: 84upx;
		text-align: center;
		color: rgba(0, 0, 0, 0.25);
		background-color:rgba(84,93,255,0.1);
		margin: 0 auto;
		margin-top: 30upx;
		border-radius: 20upx;
	}
	
	/* 注册列表开始 */
	.register-li{
		display: flex;
		padding: 30upx 56upx;
		border-bottom: 1px solid #EBEBEB;
		background-color: #fff;
		align-items: center;
	}
	.register-name{
		width: 200upx;
		flex-grow: 0;
		flex-shrink: 0;
		font-size: 32upx;
		color: #595959;
	}
	.register-right{
		flex-grow: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.register-input{
		font-size: 32upx;
		color: #222565;
	}
	.getPhone{
		width: 120upx;
		height: 48upx;
		text-align: center;
		line-height: 48upx;
		border-radius: 4px;
		color: #545DFF;
		border: 1px solid #545DFF;
		font-size: 24upx;
		line-height: 47upx!important;
		background-color: #FFFFFF!important;
	}
	.register-picker{
		width: 100%;
		height: 50upx;
		color:#222565;
		font-size: 32upx;
	}
	.register-upload-header{
		padding: 16upx 56upx;
		background-color: #FAFBFC;
		font-size: 32upx;
		color: #485465;
	}
	.register-ul{
		padding-bottom: 15px;
		}
	.join{
		font-size: 32upx;
		width: 640upx;
		height: 84upx;
		line-height: 84upx;
		text-align: center;
		color: #fff;
		background-color: #545DFF;
		margin: 0 auto;
		margin-top: 35px;
		border-radius: 20upx;
	}
	
	.upload-list{
		padding: 20upx 56upx;
		display: flex;
	}
	.upImg{
		width: 176upx;
		height: 176upx;
		
	}
	.upImgmargin{
		/* display: block; */
		margin-left: 15upx;
	}
	.imgaboust{
		position: relative;
	}
	.imgOut{
		width: 24upx;
		height: 24upx;
		position: absolute;
		right: -12upx;
		top: -12upx;
	}
	.register-uptext{
		font-size: 20upx;
		color: #999;
		text-align: center;
	}
	.uphe{
		
	}
	/* 注册结束 */
	
	/* 弹窗 */
	.register-box{
		width: 100%;
		height: 100%;
	}
	.phone-mask{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0px;
		top: 0px;
		background-color: rgba(0,0,0,0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99;
	}
	.phone-me{
		width: 600upx;
		height: 472upx;
		border-radius: 24upx;
		background-color: #fff;
	}
	.phone-me-list{
		padding: 20upx 30upx;
		border-bottom: 1px solid #E5E5E5;
		display: flex;
		align-items: center;
	}
	.phone-me-name{
		flex-grow: 0;
		flex-shrink: 0;
		margin-right:30upx;
		width: 126upx;
	}
	.phone-me-right{
		flex-grow: 1;
		display: flex;
		align-items: center;
		
	}
	.phone-font{
		font-size: 28upx;
		color: #222565;
	}
	.phone-place{
			font-size: 28upx;
		color: #B2B2B2;
	}
	.phone-me-get{
		display: block;
		color: #545DFF;
		font-size: 24upx;
		flex-grow: 0;
			background-color: #545DFF;
		color: #FFFFFF;
		width: 200upx;
		padding: -20upx 0upx;
		padding-left: 20upx;
		height: 60upx;
		line-height: 60upx !important;
	}
	.phone-me-input{
		flex-grow: 1;
	}
	.phone-me-bottom{
		padding: 54upx 50upx;
		display: flex;
		justify-content: space-between;
	}
	.phone-me-btn{
		width: 240upx;
		height: 84upx;
		text-align: center;
		line-height: 84upx;
		border-radius: 12upx;
		background-color: #545DFF;
		color: #FFFFFF;
		font-size: 32upx;
	}
	.phone-me-btn-none{
		color: #808080;
		background-color: #dfdfdf;
		color: #fff;
	}
	
	/* 商家  管理列表   开始 */
	.business-box{
		  display:flex;    
		  flex-direction:column; 
		  height:100%;      
	}
	.business-context{
		flex: 1;
		overflow-y: auto;
	}
	.business-tab{
		/* flex: 0; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #545DFF;
		padding: 20upx;
	}
	.business-list{
		width: 156upx;
		height: 70upx;
		border: 1px solid #fff;
		text-align: center;
		line-height: 70upx;
		font-size: 28upx;
		color: #FFFFFF;
		border-radius:12upx;
	}
	.active{
		background-color: #FFFFFF;
		color: #545DFF;
	}
	.business-ul{
		width: 100%;
		height: 100%;
		/* padding: 0px 20upx; */
		overflow-y: auto;
	}
	.business-lists{
		display: flex;
	/* 	width: 100upx; */
		border-radius: 16upx;
		padding: 32upx 36upx;
		background-color: #FFFFFF;
		margin-top: 20upx;
		justify-content: space-between;
		align-items: center;
		box-shadow:0px 4px 20px 0px rgba(41,47,76,0.1);
		width: 85%;
		margin: 20upx auto;
	}
	.business-left{
		flex-grow: 0;
		flex-shrink: 0;
	}
	.business-icon{
		
	}
	.business-con{
		flex-grow: 1;
	}
	.business-right{
		flex-grow: 0;
		flex-shrink: 0;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		width: 124upx;
	}
	.business-title{
		color: #595959;
		font-size: 24upx;
		margin-bottom: 10upx;
		font-weight: bold;
	}
	.business-text{
		font-size:22upx;
	font-weight:400;
	color:#595959;
	}
	.business-left{
		width: 112upx;
		height: 112upx;
		border-radius: 50%;
		margin-right: 24upx;
		overflow: hidden;
		box-shadow: 0px 0px 20px 0px rgba(41,47,76,0.1);
	}
	.business-icon{
		width: 100%;
		height: 100%;
	}
	.business-biao{
		font-size:24upx;
	font-weight:400;
	color:rgba(89,89,89,1);
	line-height:34upx;
	}
	.business-phone{
		width: 120upx;
		height: 48upx;
		border-radius:8upx;
	border:1px solid rgba(84,93,255,1);
	text-align: center;
	line-height: 48upx;
	margin-top: 10upx;
	font-size: 24upx;
	color: #545DFF;
	}
	.none-box{
		margin: 0 auto;;
	}
	.none-img{
		display: block;
		width: 200upx;
		height: 200upx;
		margin: 0 auto;
	}
	.none-text{
		font-size: 28upx;
		text-align: center;
	}
	.business-datanone{
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
	/* 结束 */
	.m20{
		margin-top: 20upx;
	}
	@import url("./static/css/base.css");
</style>
