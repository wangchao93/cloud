<template>
  <div class="init plan">
  	<Condition :conditionNum = 'conditionNum' @getList = "getPlan"></Condition>

   <div class="table-box">
	   	<div class="btn-box">
	   		<a @click = "add()" class="add" href="javascript:;">添加</a>
	   	</div>
	   <table class="table">
	   	<tr>
	   		<th>城市</th>
	   		<th>项目</th>
	   		<th>组团</th>
	   		<th>站房名称</th>
	   		<th>设备</th>
	   		<th>主题</th>
	   		<th>实施时间</th>
	   		<th>操作</th>
	   	</tr>

	   	<tr v-for = "item in tableData " :key = "item.ID">
	   		<td>{{item.City}}</td>
		   	<td>{{item.Entry}}</td>
		   	<td>{{item.Group}}</td>
		   	<td>{{item.House}}</td>
		   	<td>{{item.Device}}</td>
		   	<td>{{item.StartTime}}</td>
	   		<td>{{item.Title}}</td>
		   	<td>
		   		<a href="javascript:;" class="edit" @click = "edit(item.ID)">编辑</a>
		   		<a href="javascript:;" class="delete" @click = "deletePlan(item.ID)">删除</a>
		   	</td>
	   </tr>
	   </table>

		<Page :display = "pageNumber"  :total = "total" :currentPage = "pageIndex" @pagechange = "changePage"></Page>
   </div>
   <transition name = "fade">
   		<Schedules :s = "s" :entityID = "entityID" :clickType = "clickType" :mid = "mid" :details = "details" v-if = 'show' @onOffClose = "onOffClose"></Schedules>
  </transition>
  </div>
</template>

<script>
import Page from "../../components/page.vue"
import Condition from "../../components/condition.vue"
import Schedules from "./schedules.vue"
export default {
	components:{
		Page,
		Condition,
		Schedules,

	},
	data() {
	  return {
	  	token : localStorage.getItem("token"),
	  	tableData: [],
	  	total:0,
	  	pageIndex:1,
	  	pageNumber:10,
	  	s:0,
	  	entityID:'',
	  	startTime:'',
	  	endTime:'',
	  	conditionNum:11,
	  	show:false,
	  	details:[],
	  	clickType:'',
	  	mid:0,
	   
	  }
	},
	
	// mounted:function(){//初始化
	// 	this.getPlan(0,'','','');
	// },
	methods:{
		getPlan(s,entityID,startTime,endTime){//获取计划列表
			
			this.s = s,this.entityID = entityID,this.startTime = startTime,this.endTime = endTime;
			this.axios.get('http://222.180.250.162/Api/V3/GetMTPlan',
				{params:{auth:"",token:this.token,scope:this.s,entityID:this.entityID,startTime:this.startTime,endTime:this.endTime,state:50,pageIndex:this.pageIndex,pageNumber:this.pageNumber}})
			.then((response)=>{
				console.log(response.data);
				this.tableData = response.data.Rows;
				this.total = response.data.Total;
			
			})
			.catch((err)=>{
				console.log(err);
			})

		},
		changePage(current){//分页切换
			this.pageIndex = current;
			this.getPlan(this.s,this.entityID,this.startTime,this.endTime);
			
		},
		edit(mid){
			this.mid = mid;
			this.clickType = "edit";
			this.show = true;
			this.axios.get('http://222.180.250.162/Api/V3/MTPlanDetail',{params:{auth:"",token:this.token,mid:this.mid}})
		          .then((response)=>{
		            console.log(response.data);
		            this.details = response.data.Rows;
		            
		          }).catch((err)=>{
		            console.log(err);
		          })
		},
		add(){
			this.clickType = "add";
			this.show = true;

		},
		deletePlan(mid){
			this.mid = mid;
			if(confirm("确实要删除吗？")){
				this.axios.get('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/DeleteMTPlan',{params:{auth:"",token:this.token,mid:this.mid}})
		          .then((response)=>{
		            console.log(response.data);
		            if(response.data.Status == 1){
		            	alert("删除成功");
		            	window.location.reload();

		            }else{
						alert("删除失败");
		            }
		            
		            
		          }).catch((err)=>{
		            console.log(err);
		          })
			}

			

		},
		onOffClose(show){
			this.show = show;
		}
		

	}
	
};
</script>


<style lang = "scss" scoped>
@import '../../assets/scss/util.scss';
@import '../../assets/scss/tableCommon.scss';
.btn-box{
	width: 100%;
	margin: auto;
	text-align: right;
	margin-top: 30px;
	.add{
		display: inline-block;
		width: 100px;
		height: 30px;
		border-radius: 4px;
		margin-left: 20px;
		line-height: 30px;
		text-align: center;
		color: #fff;
	    background: #2f8ac9;
	    &:hover{
	    	opacity:0.8;

	    }
	}
}
	

</style>
