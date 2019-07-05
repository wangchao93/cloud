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
						<td class="name-text">工单编号</td>
						<td>{{detailsData.ID}}</td>
						<td class="name-text">设备名称</td>
						<td>{{detailsData.DeviceName}}</td>
					</tr>
					<tr>
						<td class="name-text">生成时间</td>
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

			<div class="upload-img-box">
				
				<span>图片：</span>
				<el-upload
					  action="https://jsonplaceholder.typicode.com/posts/"
					  list-type="picture-card"
					  :on-preview="handlePictureCardPreview"
					  :on-remove="handleRemove">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
					  <img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				<!-- <div class="upload-img">
					
				</div>
				<div class="upload-img">
					<input type="file">
				</div>
				<div class="upload-img">
					<input type="file">
				</div> -->
			</div>

			<div class="distribution-box" v-if = "workOrderType =='Unallocated'">
				<p class="distribution-title">工单分配</p>
				<div class="distribution-personal">
					
					<span>分配人员：</span>
					<select name="" id="" v-model = "userId">
						 <option value = "">请选择人员</option>
						<option :value = "item.ID" v-for = "item in userList" :key = "item.ID">{{item.Name}}</option>
					</select>
					<a class="distribution-btn" href="javascript:;" @click = "distribute">分配</a>
					<a class="cancel" href="javascript:;" @click = "cancel">取消</a>

				</div>
				<p class="unfinish-num">未完成工单数：<span>{{unfinishNum}}</span></p>

			</div>
			<div v-if = "workOrderType == 'Unfinished'">

				<div class="description-box">
					<div class="textarea-box">
						<el-input
						  type="textarea"
						  :rows="3"
						  placeholder="请输入内容"
						  v-model="textarea">
						</el-input>
						
					</div>
					<div class="radio-box">
						<el-radio v-model="radio" label="1">完成</el-radio>
						<el-radio v-model="radio" label="2">未完成</el-radio>
					</div>
					
				</div>
				<div class="btn-box">
					<a href="javascript:;" class="sure" @click = "reportWorkOrder">确定</a>
					<a href="javascript:;" class="cancel" @click = "cancel">取消</a>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	
	export default{
		data(){
			return{
				unfinishNum:0,//未完成工单数
				userId:'',//分配人员的id
				textarea: '',
				radio: '0',
				flag:0,
				dialogImageUrl: '',
        		dialogVisible: false,
        		
        		
			}
		},
		props:{
			detailsData:{ //详情数据
				type:Object,
				required:true
			},
			userList:{ //人员列表
				type:Array,
				required:true
			},
			wid:{ //当前工单id
				type:Number,
				required:true
			},
			workOrderType:{
				type:String,
				required:true
			},
		},

		methods:{

			distribute(){ //分配工单
				var token = localStorage.getItem("token");
				this.axios.get('http://222.180.250.162/Api/V3/DistributeWorkOrder',
				{params:{auth:"",token:token,wid:this.wid,uid:this.userId}})
				.then((response)=>{
					console.log(response.data);
					if(response.data.Status){
						alert("分配成功");
						this.cancel();
					}else{
						alert("分配失败")
					}
					
				
				})
				.catch((err)=>{
					console.log(err);
				})
			},
			reportWorkOrder(){
				var token = localStorage.getItem("token");
				var radio = 1;
				if(this.radio==2){
					 radio = 0
				}

				this.axios.get('http://222.180.250.162/Api/V3/ReportWorkOrder',
				{params:{auth:"",token:token,wid:this.wid,report:this.textarea,state:radio}})
				.then((response)=>{
					console.log(response.data);
					if(response.data.Status){
						alert("提交成功");
						this.cancel();
					}else{
						alert("提交失败");
					}
					
					
				
				})
				.catch((err)=>{
					console.log(err);
				})

			},
			cancel(){ //弹窗隐藏
				this.$emit("onoffClose",false);
	
			},
			handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    }

		}
	};
</script>
<style lang = "scss" scoped>
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
			width: 800px;
			height: 650px;
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
			.upload-img-box{
				width: 92%;
				margin: auto;
				display: flex;
				justify-content:flex-start;
				margin-top: 20px;
				.upload-img{
					width: 80px;
					height: 80px;
					border:1px solid #cccccc;
					overflow: hidden;
					margin-right: 10px;
					input{
						width: 100%;
						height: 100%;
						opacity: 0;

					}
				}

			}
			.distribution-box{
				width: 92%;
				margin: auto;
				text-align: center;
				margin-top: 30px;
				.distribution-title{
					color: #333;
					font-weight: 600;
					line-height: 30px;
				}
				.distribution-personal{
					margin-top: 20px;
					select{
						width: 120px;
						height: 30px;
					}
					a{
						display: inline-block;
						width: 90px;
						height: 30px;
						background: #0097ff;
						line-height: 30px;
						text-align: center;
						color: #fff;
						margin-left: 20px;
						border-radius: 4px;
						&:hover{
							opacity:0.8;

						}
					}
				}

				.unfinish-num{
					text-align: left;
					padding-left: 155px;
					padding-top: 20px;
				}
			}

			.description-box{
				width: 92%;
				margin: auto;
				margin-top: 30px;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.textarea-box{
					width: 80%;
					
				}
				.radio-box{
					width: 20%;
					padding-left: 30px;
					.el-radio{
						margin-bottom: 10px;
					}
				}

			}
			.btn-box{
				width: 92%;
				text-align: center;
				margin: auto;
				margin-top: 30px;
				a{
					display: inline-block;
					width: 100px;
					height: 40px;
					background: #0097ff;
					line-height: 40px;
					text-align: center;
					color: #fff;
					margin-left: 30px;
					border-radius: 4px;
					font-size: pxTorem(14px);
					&:hover{
						opacity:0.8;

					}
				}
			}

		}
	}
	.markShow{
		display: block;

	}
</style>