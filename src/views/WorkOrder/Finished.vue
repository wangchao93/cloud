<template>
  <div class="init finished">
  	<Condition :conditionNum = 'conditionNum'  @getList = "getWorkOrder"></Condition>
   <div class="table-box">
	   <table class="table">
	   	<tr>
	   		<th>编号</th>
	   		<th>设备位置</th>
	   		<th>设备名称</th>
	   		<th>报警内容</th>
	   		<th>生成时间</th>
	   		<th>完成时间</th>
	   		<th>操作</th>
	   	</tr>
	   	<tr v-for = "(item,index) in tableData " :key = "index">
	   		<td>{{item.ID}}</td>
		   	<td>{{item.Address}}</td>
		   	<td>{{item.DeviceName}}</td>
		   	<td>{{item.Content}}</td>
		   	<td>{{item.StartTime}}</td>
	   		<td>{{item.EndTime}}</td>
		   	<td><a href="javascript:;" class="details" @click = "getDetails(item.ID)">详情</a></td>
	   </tr>
	   </table>

		<Page  :total = "total" :currentPage = "pageIndex" @pagechange = "changePage"></Page>
   </div>
   <transition name = "fade">
   		<workOrderDetails :detailsData = "detailsData" :userList = "userList" :wid = "wid" :workOrderType = "workOrderType" @onoffClose = "onoffClose" v-if = "show"></workOrderDetails>
   </transition>
  </div>
</template>

<script>
import Page from "../../components/page.vue"
import Condition from "../../components/condition.vue"
import workOrderDetails from "./workOrderDetails.vue"
export default {
	components:{
		Page,
		Condition,
		workOrderDetails,

	},
	data() {
	  return {
	  	tableData: [],
	  	total:0,
	  	pageIndex:1,
	  	pageNumber:10,
	  	s:0,
	  	entityID:'',
	  	startTime:'',
	  	endTime:'',
	  	detailsData:{},
	  	userList:[],
	  	wid:0, //当前工单的id
	  	workOrderType:"Finished",
	  	conditionNum:6,
	  	show:false
	  
	   
	  }
	},
	
	methods:{
		getWorkOrder(s,entityID,startTime,endTime){//获取工单列表
			this.s = s,this.entityID = entityID,this.startTime = startTime,this.endTime = endTime;
			var token = localStorage.getItem("token");

			this.axios.get('http://222.180.250.162:'+this.GLOBAL.host+'/Api/V3/GetWorkOrder',
				{params:{auth:"",token:token,scope:this.s,entityID:this.entityID,startTime:this.startTime,endTime:this.endTime,state:50,pageIndex:this.pageIndex,pageNumber:this.pageNumber}})

			.then((response)=>{
				console.log(response.data);
				this.tableData = response.data.Rows;
				this.total = response.data.Total;
			
			})
			.catch((err)=>{
				console.log(err);
			})

		},
		changePage(current,display){//分页切换
			this.pageIndex = current;
			this.pageNumber = display;
			this.getWorkOrder(this.s,this.entityID,this.startTime,this.endTime);
			
		},
		getDetails(wid){
			var token = localStorage.getItem("token");
			this.wid = wid;
			this.axios.get('http://222.180.250.162/Api/V3/GetWorkOrderDetail',//获取工单详情
				{params:{auth:"",token:token,wid:wid}})
			.then((response)=>{
				console.log(response.data);
				this.detailsData = response.data.Rows;
			
			})
			.catch((err)=>{
				console.log(err);
			})

			this.axios.get('http://222.180.250.162/Api/V3/GetUser4WorkOrder',//获取分配人员
					{params:{auth:"",token:token,wid:wid}})
			.then((response)=>{
				console.log(response.data);
				this.userList = response.data.Rows;
			
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		onoffClose(show){
			this.show = show
		}

	}
	
};
</script>


<style lang = "scss" scoped>
@import '../../assets/scss/util.scss';
@import '../../assets/scss/tableCommon.scss';

</style>
