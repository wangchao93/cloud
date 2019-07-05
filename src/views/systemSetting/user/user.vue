<template>
  <div class="init user">
  	<div class="btn-box">
  		<a href="javascript:;" class="add" @click = "add">添加</a>
  		<a href="javascript:;" class="delete">删除</a>
  	</div>
   	<div class="table-box">
	   <table class="table">
	   	<tr>
	   		<th>
	   			<label for="all">
	   				<input type="checkbox" id = "all" value="all"  class="check-all" @click = "getCheckbox($event)"/>全选
	   			</label>
	   		</th>
	   		<th>用户名称</th>
	   		<th>用户描述</th>
	   		<th>用户角色</th>
	   		<th>是否使用</th>
	   		
	   	</tr>
	   	<tr v-for = "(item, index) in tableData" :key = "index">
	   		<td><input type="checkbox" :value="item.ID" class="checkItem" v-model = "checkedNames"></td>
		   	<td class="user-name"><a href="javascript:;">{{item.UserName}}</a></td>
		   	<td>{{item.Description}}</td>
		   	<td>{{item.RoleName}}</td>
		   	<td>{{item.Usable}}</td>
		   	
	   </tr>
	  
	   </table>

		<Page :total = "total" :currentPage = "pageIndex" @pagechange = "changePage"></Page>
    </div>
    <transition name = "fade">
    	<Info v-if = "show" @cancel = "cancel"></Info>
	</transition>
  </div>

</template>

<script>

import Page from "@/components/page.vue"
import Info from "./userInfo.vue"

export default {
	components:{
		Page,
		Info,

	},
	data() {
	  return {
	  	token:localStorage.getItem("token"),
	  	tableData:[],
	  	total:0,
	  	pageIndex:1,
	  	pageNumber:10,
	  	keyWord:"",
	  	checkedNames:[],
	  	show:false
	  }
	},
	watch:{
		checkedNames:{
			handler(){
				var checkItemLen = document.querySelectorAll('.checkItem').length;

				if(this.checkedNames.length == checkItemLen){
					document.querySelector('#all').checked = true;

				}else{
					document.querySelector('#all').checked = false;
				}
			},
			deep: true // 深度监视
		}
	},
	mounted:function(){
		this.getUser();
	},
	methods:{
		getUser(){//获取用户列表
			let data = {auth:"",token:this.token,keyWord:this.keyWord,pageIndex:this.pageIndex,
				pageNumber:this.pageNumber}
			this.axios.post('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/GetUsers',data)
			.then((response)=>{
				console.log(response.data);
				this.tableData = response.data.Rows;
				this.total = response.data.Total

			})
			.catch((err)=>{
				console.log(err);
			})

		},
		changePage(current,display){//分页切换
			this.pageIndex = current;
			this.pageNumber = display;
			
		},
		getCheckbox(e){
			var checkObj = document.querySelectorAll('.checkItem'); // 获取所有checkbox项
			if(e.target.checked){
				for(var i = 0;i<checkObj.length;i++){
					if(!checkObj[i].checked){
						this.checkedNames.push(checkObj[i].value);
						
					}
				}

				
			}else{
				this.checkedNames = [];

			}
		},
		add(){
			this.show = true

		},
		cancel(show){
			this.show = show;

		},
		

	}
	
};
</script>


<style lang = "scss" scoped>
@import '@/assets/scss/util.scss';
@import '@/assets/scss/tableCommon.scss';
.btn-box{
	margin: 30px 20px 0 20px;
    background: #14171e;
    color: #fff;
    padding: 20px;
    border-radius: 4px;
    overflow: hidden;
    font-size: 0.875rem; 
    a{
    	display: inline-block;
	    width: 100px;
	    height: 30px;
	    border: 1px solid #0097ff;
	    border-radius: 4px;
	    margin-left: 20px;
	    line-height: 30px;
	    text-align: center;
	    color: #0097ff;
    }
}
.table-box{
	.table{
		.check-all{
			margin-right: 8px;
		}
		.user-name{
			color: #0097ff;
			a{
				display: inline-block;
				width: 100%;
				height: 100%;
			}
		}
	}
}

	 	
</style>
