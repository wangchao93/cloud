<template>
	<nav>
		<ul>
			<li class="nav-item" v-for = "(item,index) in navList" :key = "index">
				<a href="javascript:;"  
				@click = "showToggle(index)" :class="{active  : index == isShow}">
					<span>
						  {{item.name}}
					</span>
				</a>

				<ul v-show = "index == isShow" class = "subNav-box" >
				
						<li v-for = "(nav,subIndex) in item.subItem" :key = "subIndex">
							
							<router-link :to="{name:nav.link}">
								<span :class = "{active : subIndex == isActive }" @click = "showActive(subIndex)">{{nav.text}}</span>
							</router-link>
						</li>
				
					
					
				</ul>
			</li>
		
		</ul>
		

	</nav>

</template>

<script>
	export default{
		data () {
			return {
				isShow:0,
				isActive:null,
				click:true,
				isHide:false,
				navList:[
					{
						name:"首页",
						link:"home",
						subItem:[],
						
					},
					{
						name:"工单管理",
						link:"Unallocated",
						subItem:[
							{
								link:"Unallocated",text:"未分配"
							},
							{
								link:"Unfinished",text:"未完成"
							},
							{
								link:"Finished",text:"已完成"
							}
						]
					},
					{
						name:"实时监控",
						link:"Water",
						subItem:[
							{
								link:"Water",text:"给水"
							},
							{
								link:"Power",text:"供配电"
							},
							{
								link:"HVAC",text:"暖通"
							}
						]
					},

				]
			}
		},
		methods:{
			showToggle: function(index){
				if(index == 0){
					this.$router.push("/");
				}

				this.isShow = index;
				this.isActive = null;
				sessionStorage.setItem("navIndex",this.isShow);

			},
			showActive: function(subIndex){

				this.isActive = subIndex;


			},

			navUrl:function(nav){ //手动输入url与导航相对应
				switch(nav){

					case "WorkOrder":this.isShow = 1 
						break;
					case "monitor":this.isShow = 2 
						break;

				}
			}
		},
		mounted(){
        	this.isShow = sessionStorage.getItem("navIndex");

        	let _this = this;
        	setTimeout(function(){
        		var navUrl = _this.$route.path.match(/\/(\S*)\//);
        		if(navUrl){
        			_this.navUrl(navUrl[1])
        		}else{
        			_this.isShow = 0
        		}
        		
        	},1)
        	
        	
    	},

	};


</script>

<style lang="scss" scoped>

 @import '../assets/scss/util.scss';

	nav{
		width: 8%;
		min-width: 140px;
		height: 100%;
		position: absolute;
		top: 90px;
		bottom: 0px;
		left: 0px;
		background: #14171e;
		overflow: hidden;
		.nav-item{
			width: 100%;
			color:#cccccc;
			a{
				display: block;
				height: 40px;
				line-height: 40px;
				padding-left:30px; 
				margin-left: 10px;
			}

		}
		
		
	}

	.active{
		color: #0191f4;
	}
	
	

</style>