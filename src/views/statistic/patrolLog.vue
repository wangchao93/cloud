<template>
  <div class="init finished">
  	<Condition  @getList = "getLog" :conditionNum = "conditionNum"></Condition>
   <div class="table-box">
	   <table class="table">
	   	<tr>
	   		<th>城市</th>
	   		<th>项目</th>
	   		<th>组团</th>
	   		<th>站房名称</th>
	   		<th>设备名称</th>
	   		<th>用电量(KW.H)</th>
	   		<th>时间</th>
	   	</tr>
	   	<tr v-for = "(item,index) in tableData " :key = "index">
	   		<td>{{item.ID}}</td>
		   	<td>{{item.Address}}</td>
		   	<td>{{item.DeviceName}}</td>
		   	<td>{{item.Content}}</td>
		   	<td>{{item.StartTime}}</td>
	   		<td>{{item.EndTime}}</td>
		   	<td></td>
	   </tr>
	   </table>

		<Page :display = "pageNumber"  :total = "total" :currentPage = "pageIndex" @pagechange = "changePage"></Page>
   </div>
  
  </div>
</template>

<script>
import Page from "../../components/page.vue"
import Condition from "../../components/condition.vue"

export default {
	components:{
		Page,
		Condition,

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
	  	conditionNum:3
	  
	  }
	},
	
	methods:{
		getLog(s,entityID,startTime,endTime){
			this.s = s,this.entityID = entityID,this.startTime = startTime,endTime = endTime;
			var token = localStorage.getItem("token");
			this.axios.get('http://222.180.250.162/Api/V3/GetInspection',
				{params:{auth:"",token:token,scope:this.s,entityID:this.entityID,startTime:this.startTime,endTime:this.endTime,pageIndex:this.pageIndex,pageNumber:this.pageNumber}})
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
			this.getLog(this.s,this.entityID,this.startTime,this.endTime);
			
		},

	}
	
};
</script>


<style lang = "scss" scoped>
@import '../../assets/scss/util.scss';
@import '../../assets/scss/tableCommon.scss';

</style>
