<template>
	<div class="mark">
		<div class="pop">
			<p class="title">
				<span>低区泵 > 维保计划表</span>
				<img src="../../assets/images/home/close_icon.png" @click = "cancel()" alt="">
			</p>
			<div class="schedules-box">
				<p class="schedules-title">计划书</p>
				<table>
					<tr>
						<td>项目名称</td>
						<td><input type="text" value="" v-model = "maintenance.Project"></td>
						<td>现场位置</td>
						<td><input type="text" value="" v-model = "maintenance.Address"></td>
						<td>下达部门</td>
						<td><input type="text" value="" v-model = "maintenance.Assign"></td>
						<td>下达时间</td>
						<td><input type="text" value="" v-model = "maintenance.CreateTime"></td>
					</tr>
					<tr>
						<td>要求完成时间</td>
						<td><input type="text" value="" v-model = "maintenance.FinishTime"></td>
						<td>实施部门</td>
						<td><input type="text" value="" v-model = "maintenance.Practice"></td>
						<td>准备时间</td>
						<td><input type="text" value="" v-model = "maintenance.ReadinessTime"></td>
						<td>实施时间</td>
						<td><input type="text" value="" v-model = "maintenance.PracticeTime"></td>
					</tr>
					<tr>
						<td>主题</td>
						<td colspan="7" class="text-left">
							<div class="quill-editor-box">
								<quill-editor 
							      v-model="maintenance.Title" 
							      ref="myQuillEditor" 
							      :options="editorOption" 
							      @blur="onEditorBlur($event)" 
							      @focus="onEditorFocus($event)"
							      @change="onEditorChange($event)">
							    </quill-editor>

							</div>
							

						</td>
						
					</tr>
					<tr>
						<td>工作内容</td>
						<td colspan="7" class="text-left">
							<div class="quill-editor-box">
								<quill-editor 
							      v-model="maintenance.Content" 
							      ref="myQuillEditor" 
							      :options="editorOption" 
							      @blur="onEditorBlur($event)" 
							      @focus="onEditorFocus($event)"
							      @change="onEditorChange($event)">
							    </quill-editor>

								
							</div>

						</td>
						
					</tr>
					<tr>
						<td>作业标准</td>
						<td colspan="7" class="text-left">
							<div class="quill-editor-box">
								<quill-editor 
							      v-model="maintenance.Operate" 
							      ref="myQuillEditor" 
							      :options="editorOption" 
							      @blur="onEditorBlur($event)" 
							      @focus="onEditorFocus($event)"
							      @change="onEditorChange($event)">
							    </quill-editor>

								
							</div>
							

						</td>
						
					</tr>
					<tr>
						<td>注意事项</td>
						<td colspan="7" class="text-left">
							<div class="quill-editor-box">
								<quill-editor 
							      v-model="maintenance.Attention" 
							      ref="myQuillEditor" 
							      :options="editorOption" 
							      @blur="onEditorBlur($event)" 
							      @focus="onEditorFocus($event)"
							      @change="onEditorChange($event)">
							    </quill-editor>

								
							</div>
						</td>
						
					</tr>
					<tr>
						<td>检修标准</td>
						<td colspan="7" class="text-left">
							<div class="quill-editor-box">
								<quill-editor 
							      v-model="maintenance.Overhauling" 
							      ref="myQuillEditor" 
							      :options="editorOption" 
							      @blur="onEditorBlur($event)" 
							      @focus="onEditorFocus($event)"
							      @change="onEditorChange($event)">
							    </quill-editor>

								
							</div>
						</td>
						
					</tr>
					<tr>
						<td>工作票</td>
						<td colspan="7" class="text-left">
							<div class="quill-editor-box">
								<quill-editor 
							      v-model="maintenance.WorkTicket" 
							      ref="myQuillEditor" 
							      :options="editorOption" 
							      @blur="onEditorBlur($event)" 
							      @focus="onEditorFocus($event)"
							      @change="onEditorChange($event)">
							    </quill-editor>

								
							</div>
						</td>
						
					</tr>
					<tr>
						<td>操作票</td>
						<td colspan="7" class="text-left">
							<div class="quill-editor-box">
								<quill-editor 
							      v-model="maintenance.OpTicket" 
							      ref="myQuillEditor" 
							      :options="editorOption" 
							      @blur="onEditorBlur($event)" 
							      @focus="onEditorFocus($event)"
							      @change="onEditorChange($event)">
							    </quill-editor>

							</div>
						</td>
						
					</tr>
				</table>
			</div>
			<div class="btn">
				<a href="javascript:;" class="cancel" @click = "cancel()">取消</a>
				<a href="javascript:;" class="sure" @click = "save()">保存</a>
			</div>
		</div>
	</div>

</template>

<script>
	import { quillEditor } from 'vue-quill-editor'
	export default{
        data(){
            return {
            	taken:localStorage.getItem("token"),
            	maintenance:{
            		ID:'',
            		SourceID:'',
            		SourceType:'',
	        		Project:'',
	        		Address:'',
	        		Assign:'',
	        		CreateTime:'',
	        		FinishTime:'',
	        		Practice:'',
	        		ReadinessTime:'',
	        		PracticeTime:'',
	                Title:null,
	                Content:null,
	                Operate:null,
	                Attention:null,
	                Overhauling:null,
	                WorkTicket:null,
	                OpTicket:null,
                },
                editorOption:{
                	placeholder: '请输入文本...',
                	modules:{
                        toolbar:[
                          ['bold', 'italic', 'underline', 'strike'],//富文本功能选择
                          
                        ],
                       
                    },
                   
                },
               
            }
        },
        props:{
        	s:{
        		type:Number,
        		required:true
        	},
        	entityID:{
        		type:String,
        		required:true
        	},
        	mid:{
        		type:Number,
        		required:true
        	},
        	details:{
        		type:Array,
        		required:true
        	},
        	
        	clickType:{
        		type:String,
        		required:true
        	},

        },
        
        methods:{
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            	//console.log(this.content)
            },
            save(){
            	this.maintenance.ID = this.mid;
            	this.maintenance.SourceID = this.entityID;
            	this.maintenance.SourceType = this.s;
            	if(this.clickType=="add"){
            		this.axios.post('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/AddMTPlan',{params:{auth:"",token:this.token,maintenance:this.maintenance}})
		          .then((response)=>{
		            console.log(response.data);
		            window.localtion.reload();
		            if(response.data.Status == 1){
		            	alert("添加成功");
		            	window.location.reload();

		            }else{
						alert("添加失败");
		            }
		            
		          }).catch((err)=>{
		            console.log(err);
		          })
		      }else{
		      	this.axios.post('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/UpdateMTPlan',{params:{auth:"",token:this.token,maintenance:this.maintenance}})
		          .then((response)=>{
		            console.log(response.data);
		            if(response.data.Status == 1){
		            	alert("修改成功");
		            	window.location.reload();

		            }else{
						alert("修改失败");
		            }

		            
		          }).catch((err)=>{
		            console.log(err);
		          })
		      }
            	
            	

            },
            cancel(){
            	this.$emit("onOffClose",false);
            },

        }
    };
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/util.scss';
	.mark{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background: rgba(0,0,0,0.8);
		z-index: 100;
		
		.pop{
			width: 800px;
			height: 600px;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			background: #fff;
			border-radius: 4px;
			.title{
				width: 100%;
				height: 40px;
				background: #14171e;
				color:#fff;
				line-height: 40px;
				font-size: pxTorem(14px);

				span{
					padding-left: 20px;
				}
				img{
					float: right;
					margin-right: 20px;
					margin-top: 10px;
					width: 20px;
					cursor: pointer;

				}

			}
			.schedules-box{
				width: 100%;
				height: 500px;
				overflow: auto;
			}
			.schedules-title{
				width: 100%;
				margin: auto;
				padding: 30px 0 20px 0;
				font-weight: 600;
				font-size: pxTorem(16px);
				text-align: center;
			}
			table{
				width: 92%;
				margin: auto;
				border: 1px solid #cccccc;

				tr{
					border: 1px solid #cccccc;
					td{
						padding: 10px;
						border: 1px solid #cccccc;
						width: 12.5%;
						text-align: center;
						font-size: pxTorem(14px);
						&:nth-child(odd){
							background: #e6e6e6;
						}

					}
					.work-content{
						
					}
					.text-left{
						text-align: left;

					}
					input{
						width: 100%;
						height: 40px;
						border: none;
						font-size: pxTorem(16px);

					}
				}
			}
			.btn{
				width: 100%;
				margin: auto;
				text-align: center;
				margin-top: 10px;
				a{
					display: inline-block;
					width: 100px;
					height: 40px;
					border-radius: 4px;
					text-align: center;
					line-height: 40px;
					margin-left: 20px;
					margin-right: 20px;
					&:hover{
						opacity: 0.8
					}
				}
				.cancel{
					border:1px solid #0097ff;
					color: #0097ff;
					background: #fff;

				}
				.sure{
					background: #0097ff;
					color: #fff;
				}

			}
		}
	}

</style>