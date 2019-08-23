export default {
	createUser:'/createUser',
	journalismApi:'/journalismApi',
	queryMiniOpenid:'/business-user/v1/yt/queryMiniOpenid',//获取openid
	register:'/business-user/v1/yt/register',//注册
	queryWxMiniMobile:'/business-user/v1/yt/queryWxMiniMobile',//获取手机号
	saveMerchant:'/business-user/v1/yt/saveMerchant',//商户入驻
	uploadImage:'/business-user/v1/yt/uploadImage',//上传图片
	queryCategory:'/business-user/v1/yt/queryCategory',//获取商户类型
	list:'/business-user/v1/yt/list',//商户列表
	push:'/business-user/v1/yt/push',//扫码回调
	getSmsCode:'/business-user/v1/yt/getSmsCode',//获取验证码
	checkSmsCode:'/business-user/v1/yt/checkSmsCode',//验证手机验证码
	queryBasicInfo:'/business-user/v1/yt/queryBasicInfo',//获取基本信息
	transDetail:'/business-user/v1/yt/transDetail',//入驻奖励，交易分佣
	withdrawDetail:'/business-user/v1/yt/withdrawDetail',//提现记录
	queryBankInfo:'/business-user/v1/yt/queryBankInfo',//获取银行卡信息
	addBankInfo:'/business-user/v1/yt/addBankInfo',//添加银行卡信息
	queryBankInfoByCardNumber:'/business-user/v1/yt/queryBankInfoByCardNumber',//根据卡号获取银行信息
	queryBankList:'/business-user/v1/yt/queryBankList',//获取银行卡列表
	withdraw:'/business-user/v1/yt/withdraw',//提现
	leave:'/business-user/v1/yt/leave',//退出公司
	queryUserInfo:'/business-user/v1/yt/queryUserInfo',//获取个人企业信息
	updateUserInfo:'/business-user/v1/yt/updateUserInfo',//修改信息
	// transDetail:'/business-user/v1/yt/transDetail',//入驻奖励，交易分佣   入驻   进货
	
	
	
		// 企业版
	SmsCode:		'/business-user/v1/yt/marketMerchantCompany/getSmsCodeForLogin'	,			// 登录获取手机验证码
	RegSmsCode:		'/business-user/v1/yt/marketMerchantCompany/getSmsCodeForRegister',			// 注册获取手机验证码
	FirmReg:		'/business-user/v1/yt/marketMerchantCompany/register',						// 注册企业账号
	FirmLogin:		'/business-user/v1/yt/marketMerchantCompany/login',							// 企业账号登录
	MerchantList:	'/business-user/v1/yt/marketMerchantCompany/merchant/list',					// 商家列表
	StaffList:		'/business-user/v1/yt/marketMerchantCompany/merchant/con/marketUserList',	// 员工列表
	businessDetails:'/business-user/v1/yt/detail',												// 商家详情
	allotList:		'/business-user/v1/yt/marketMerchantCompany/merchant/allo/marketUserList',	// 分配 业务员列表
	allotTo:		'/business-user/v1/yt/marketMerchantCompany/merchant/allo/marketUser',		// 分配业务员
	StaffManage:	'/business-user/v1/yt/accountList',											// 员工管理
	DeleteStaff:	'/business-user/v1/yt/leave',												// 删除员工
	QRGetStaffInfo:	'/business-user/v1/yt/scanUserInfo',										// 扫码后获取业务员信息
	AddStaff:		'/business-user/v1/yt/scanAddUser',											// 绑定业务员
	FirmInfo:		'/business-user/v1/yt/queryUserInfo',										// 获取企业信息
	UpDateFirmInfo:	'/business-user/v1/yt/updateUserInfo',										// 修改企业信息
	ChangeSmsCode:	'/business-user/v1/yt/smsCode',												// 更换负责人获取手机验证码
	ChangePrincipal:'/business-user/v1/yt/updateLeading',										// 更换负责人
}