<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <!--<router-view/>-->
    <h1><label for="sname"> {{ msg }} </label></h1>
    <input type="text" id="sname" v-model="itemNew" v-on:keyup.enter="addNew">
    <ol class="view">
      <li v-for="(item,index) in items" :class="{student:item.student}" v-on:click="turnRed" :index="index">
        <span>姓名：</span>
        {{ item.name }}
      </li>
    </ol>
    <p>在姓名上点击，标记是否是学生，红色为学生</p>
  </div>
</template>

<script>
  import Storage from './localstorage';

  export default {
    name: 'app',
    data() {
      return {
        msg: "Type name and mark who is student",
        items: Storage.fetch(),
        itemNew: ''
      }
    },
    methods: {
      addNew: function () {
        this.items.push({
          name: this.itemNew,
          student: false
        });
        this.itemNew = null;
      },
      turnRed: function (e = window.event) {
        //逆反布尔值
        let index = e.target.getAttribute("index");
        this.items[index].student = !this.items[index].student;
        Storage.save(this.items);
      }
    },
    watch: {
      items: function (items) {
        Storage.save(items);
      }
    }
  }
</script>

<style>
  .view {
    width: 500px;
    margin: 50px auto;
    border: 1px solid #0c5460;
  }

  .view li {
    position: relative;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .view li span {
    position: absolute;
    left: 150px;
    display: inline-block;
    width: 50px;
  }

  .student {
    color: #f00;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
