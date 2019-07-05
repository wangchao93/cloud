<template>
	<div class="mark">
		<div class="pop">
			<div class="top">
				<a href="javascript:;">基本信息</a>
				/
				<a href="javascript:;">扩展信息</a>
				<img src="@/assets/images/home/close_icon.png" @click = "cancel()" alt="">
			</div>
			<div class="user-info">
				<div class="left">
					<div class="info-item">
						<span>账户名：</span>
						<input type="text" >
					</div>
					<div class="info-item">
						<span>昵　称：</span>
						<input type="text">
					</div>
					<div class="info-item">
						<span>描　述：</span>
						<input type="text" >
					</div>
					<div class="info-item">
						<span>角　色：</span>
						<select name="" id="" >
							<option value=""></option>
						</select>
					</div>
					<div class="info-item">
						<span>头　像：</span>
						<el-upload
						  class="avatar-uploader"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						
					</div> 
				</div>

				<div class="right">
					<el-tree
					  :data="data"
					  show-checkbox
					  node-key="id"
					  :props="defaultProps">
					</el-tree>
				</div>
				<div class="expansion-info">
					<ul>
						<li class="">
							<span>真实姓名：</span>
							<input type="text" >
						</li>
						<li class="">
							<span>性　　别：</span>
							<select name="" id=""></select>
						</li>
						<li class="">
							<span>出生日期：</span>
							<input type="text" >
							<span class="msg">如:1999-09-09</span>
						</li>
						<li class="">
							<span>地　　址：</span>
							<input type="text" >
						</li>
						<li class="">
							<span>部　　门：</span>
							<select name="" id=""></select>
						</li>
						<li class="">
							<span>职　　务：</span>
							<select name="" id=""></select>
						</li>
						<li class="">
							<span>电子邮箱：</span>
							<input type="text" >
						</li>
						<li class="">
							<span>身份证号：</span>
							<input type="text" >
						</li>
						<li class="">
							<span>联系方式：</span>
							<input type="text" >
						</li>
						<li class="">
							<span>备　　注：</span>
							<input type="text" >
						</li>
					</ul>


				</div>
				
			</div>

			<div class="btn-box">
				<a href="javascript:;" class="save">保存</a>
				<a href="javascript:;" class="cancel" @click = "cancel">取消</a>
			</div>

		</div>
	</div>

</template>

<script>
  export default {
    data() {
      return {
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        imageUrl: ''
      };
    },
    methods: {
    	cancel(){
    		this.$emit("cancel",false);
    	},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
				return isJPG && isLt2M;
			}
    }
  };
</script>

<style lang = "scss">
	.mark{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		margin: auto;
		background: rgba(0,0,0,0.5);
		.pop{
			width: 800px;
			height: 450px;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			background: #fff;
			border-radius: 4px;
			overflow: hidden;
			input,select{
				width: 160px;
				height: 26px;
				margin-left: 5px;
				text-indent: 8px;

			}
			.top{
				width: 100%;
				height: 45px;
				font-size: 16px;
				line-height: 45px;
				background: #52627c;
				color: #fff;
				padding-left: 20px;
				img{
					float: right;
					margin-right: 20px;
					margin-top: 10px;
					width: 20px;
					cursor: pointer;
				}
			}
			.user-info{
				width: 200%;
				margin: auto;
				display: flex;
				margin-top: 20px;
				// margin-left: -800px;

				.left{
					width: 25%;
					.info-item{
						width: 100%;
						padding-left: 50px;
						color: #333;
						margin-bottom: 20px;
						display: flex;
						
						.avatar-uploader .el-upload {
							border: 1px dashed #d9d9d9;
							border-radius: 6px;
							cursor: pointer;
							position: relative;
							overflow: hidden;
						}
					}


				}
				.right{
					width: 25%;
					padding-left: 30px;
				}
				.expansion-info{
					width: 50%;
					li{
						width: 50%;
						float: left;
						padding-left: 50px;
						color: #333;
						margin-bottom: 20px;
						.msg{
							margin-left: 5px;
							font-size: 14px;
						}

					}
				}
				
			}
			.btn-box{
				width: 100%;
				margin: auto;
				text-align: center;
				margin-top: 15px;
				a{
					display: inline-block;
					width: 120px;
					height: 40px;
					background: #017fd6;
				    color: #fff;
				    font-size: 16px;
				    border-radius: 4px;
				    line-height: 40px;
				    margin-left: 30px;
				    margin-right: 30px;
				    &:hover{
						opacity: 0.8;
					}
				}
				

			}

		}
		

	}

.avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 100px;
	height: 100px;
	line-height: 100px;
	text-align: center;
}
.avatar {
	width: 100px;
	height: 100px;
	display: block;
}


</style>