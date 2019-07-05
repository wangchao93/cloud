<template>
  
    <ul class="pagination">
        <li :class="{'disabled': current == 1}">
            <a href="javascript:;" @click="setCurrent(current - 1)"> « </a>
        </li>
        <li :class="{'disabled': current == 1}">
            <a href="javascript:;" @click="setCurrent(1)"> 首页 </a>
        </li>
        <li v-for="p in grouplist" >
            <a href="javascript:;" :class="{'active': current == p.val}" @click="setCurrent(p.val)"> {{ p.text }} </a>
        </li>
        <li :class="{'disabled': current == page}">
            <a href="javascript:;" @click="setCurrent(page)"> 尾页 </a>
        </li>
        <li :class="{'disabled': current == page}">
            <a href="javascript:;" @click="setCurrent(current + 1)"> »</a>
        </li>
        <li>
            共{{total}}条记录，每页显示<input type="text" v-model = "pageNum">条
            <a href="javascript:;" class="go"  @click="goCurrent(1)">GO</a>
        </li>
    </ul>
  
</template>

<script>
  export default{
    data(){
      return {
        current: this.currentPage,
        pageNum:this.display,
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      display: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce: function (v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    computed: {
      page: function () { // 总页数

        return Math.ceil(this.total / this.pageNum);
      },
      grouplist: function () { // 获取分页页码
        var len = this.page, temp = [], 
            list = [], 
            count = Math.floor(this.pagegroup / 2), 
            center = this.current;

        if (len <= this.pagegroup) {
            while (len--) {
                temp.push({text: this.page - len, val: this.page - len});
            };
            return temp;
        }
        while (len--) {
          temp.push(this.page - len);
        };

        var idx = temp.indexOf(center);

        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do {
          var t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        } while (temp.length);
        if (this.page > this.pagegroup) {
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    },
    methods: {
      setCurrent: function (idx) {
        
        if (this.current != idx && idx > 0 && idx < this.page + 1) {
            this.current = idx;
           
            this.$emit('pagechange', this.current,this.pageNum);
        }


      },
      goCurrent:function(idx){
        this.current = idx;
        this.$emit('pagechange', this.current,this.pageNum);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .pagination {
    overflow: hidden;
    display: table;
    margin: 0 auto;
    height: 50px;
    float: right;
    width: 90%;
    text-align: center;
    margin-top: 30px;

      li {
        display: inline;
        border-radius: 5px;
        margin: 3px;
        color: #ccc;
        list-style: none;

      a {
        display: inline-block;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
        border-radius: 5px;
        text-decoration: none;
        background: #14171e;
       
            &:hover {
             background: #000;

            }
        }
        .go{
          width: 40px;
        }
          input{
            width: 40px;
            height: 30px;
            text-align: center;
            font-size: 16px;
            border-radius: 4px;
            margin: 0 5px;
            border:1px solid #fff;
          }

        }
      .active {
        display: inline-block;
        background: #000;
        height: 30px;
        color:#fff;
      }
  }

</style>