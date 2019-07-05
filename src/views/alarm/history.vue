<template>
  <div class="init history">
  	<Condition :conditionNum = 'conditionNum' @getList = "getHistoryList"></Condition>
   	<div class="table-box">
	   <table class="table">
	   	<tr>
	   		<th>项目</th>
	   		<th>设备位置</th>
	   		<th>设备名称</th>
	   		<th>报警内容</th>
	   		<th>报警时间</th>
	   		<th>结束时间</th>
	   		<th>操作</th>
	   	</tr>
	   	<tr v-for = "(item,index) in tableData " :key = "index">
	   		<td>{{item.Address}}</td>
		   	<td>{{item.Address}}</td>
		   	<td>{{item.DeviceName}}</td>
		   	<td>{{item.Description}}</td>
		   	<td>{{item.StartTime}}</td>
			<td>{{item.StartTime}}</td>
		   	<td>
		   		<a href="javascript:;" class="details" @click = "getDetails(item.EID)">详情</a>
		   		
		   	</td>
	   </tr>
	   </table>

		<Page :total = "total" :currentPage = "pageIndex" @pagechange = "changePage"></Page>
    </div>
    <transition name = "fade">
     	<alarmDetails :detailsData = "detailsData" v-if = "show" @onoffClose = "onoffClose"></alarmDetails> 
    </transition>
  </div>

</template>

<script>
import Page from "../../components/page.vue"
import Condition from "../../components/condition.vue"
import alarmDetails from "./alarmDetails.vue"
export default {
	components:{
		Page,
		Condition,
		alarmDetails,
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
	  	hType:'',
	  	detailsData:{},
	  	isReal:false,
	  	aid:'',
	  	conditionNum:0,
	  	show:false,
	  
	   
	  }
	},
	
	methods:{
		getHistoryList(s,entityID,startTime,endTime,hType){//获取报警列表
			this.s = s,this.entityID = entityID,this.startTime = startTime,this.endTime = endTime,this.hType = hType;
			console.log(s,entityID,startTime,endTime,hType)
			var token = localStorage.getItem("token");

			this.axios.get('http://222.180.250.162:9618/Api/V3/GetHistoryAlarm',
				{params:{auth:"",token:token,scope:this.s,entityID:this.entityID,hType:this.hType,startTime:this.startTime,endTime:this.endTime,pageIndex:this.pageIndex,pageNumber:this.pageNumber}})
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
			this.getHistoryList(this.s,this.entityID);
			
		},
		getDetails(aid){
			var token = localStorage.getItem("token");
			this.aid = aid;
			this.axios.get('http://222.180.250.162/Api/V3/GetAlarmDetail',//获取报警详情
				{params:{auth:"",token:token,aid:aid,isReal:this.isReal}})
			.then((response)=>{
				console.log(response.data);
				this.detailsData = response.data.Rows;
				this.show = true
			
			})
			.catch((err)=>{
				console.log(err);
			})

		},
		onoffClose(show){
			this.show = show;
		}

	}
	
};
</script>


<style lang = "scss" scoped>
@import '../../assets/scss/util.scss';
@import '../../assets/scss/tableCommon.scss';

	

</style>
