<template>
  <div class="container">
  	<Header></Header>
    <section>
      <elNav></elNav>
      <router-view/>
    </section>
  </div>
</template>

<script>
	import Header from "@/components/header.vue"
	import Nav from "@/components/nav.vue"
  import elNav from "@/components/elNav.vue"
	import Page from "@/components/page.vue"

  export default {
    name: '',
    components:{
			Header,
			Nav,
			Page,
      elNav
	},
    
  };



</script>
<style lang="scss">

@import './assets/scss/public.scss';

.container{
  width: 100%;
  height: 100%;
  margin: auto;
}
section{
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex;
  justify-content:space-between;
  position: relative;
  .init{
    flex:9;
    min-height: 850px;
    margin-left: 150px;
    background: #0e0e0f;
    padding-bottom: 60px;

  }
 
}

</style>
