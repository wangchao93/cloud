<template>
	<div class="mark">
		<div class="pop">
			<div class="top">
				<span>工单详情</span>
				<img src="../../assets/images/home/close_icon.png" @click = "cancel()" alt="">
			</div>

			<div class="details-box">
				
				<table class="details">
					<tr>
						<td class="name-text">报警编号</td>
						<td>{{detailsData.ID}}</td>
						<td class="name-text">设备名称</td>
						<td>{{detailsData.DeviceName}}</td>
					</tr>
					<tr>
						<td class="name-text">报警时间</td>
						<td>{{detailsData.StartTime}}</td>
						<td class="name-text">完成时间</td>
						<td>{{detailsData.EndTime}}</td>
					</tr>
					<tr>
						<td class="name-text">设备位置</td>
						<td colspan="3">{{detailsData.Address}}</td>
					</tr>
					<tr>
						<td class="name-text">设备编号</td>
						<td colspan="3">{{detailsData.DeviceNo}}</td>
					</tr>
					<tr>
						<td class="name-text">报警内容</td>
						<td colspan="3">{{detailsData.Content}}</td>
					</tr>

				</table>
			</div>
		</div>
		
	</div>

</template>

<script>
	export default{
		data(){
			return{


			}
		},
		props:{
			detailsData:{ //详情数据
				type:Object,
				required:true
			},
		},
		methods:{
			cancel(){
				this.$emit("onoffClose",false)

			}
		}
	};
</script>

<style lang = "scss" scoped >
	@import '../../assets/scss/util.scss';
	.mark{
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
		background: rgba(0,0,0,0.4);
		z-index: 100;
		.pop{
			width: 700px;
			height: 300px;
			position: absolute;
			top: 0px;
			left: 0px;
			right: 0px;
			bottom: 0px;
			margin: auto;
			background: #fff;
			border-radius: 6px;
			.top{
				width: 100%;
				height: 40px;
				background: #14171e;
				line-height: 40px;
				color: #fff;
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;

				span{
					margin-left: 30px;
				}
				img{
					float: right;
					margin-right: 20px;
					margin-top: 10px;
					width: 20px;
					cursor: pointer;
				}

			}
			.details{
				width: 92%;
				margin: auto;
				border:1px solid #999;
				text-align: center;
				margin-top: 30px;

				tr{
					height: 40px;
					td{
						border:1px solid #cccccc;
						color: red;
						font-size: pxTorem(14px)
					}
					.name-text{
						width: 100px;
						background: #e6e6e6;
						color: #333333;
						font-size: pxTorem(16px)
					}
				}
			}
			
		}
	}
</style>