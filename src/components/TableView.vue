<template>
  <div id="input">
      <h1>{{ msg }}</h1>
      <input class="form-control" id="input-username" placeholder="用户名" v-model="username">
      <input class="form-control" id="input-userage" placeholder="年龄" v-model="userage">
      <input class="form-control" id="input-usersex" placeholder="性别" v-model="usersex">
      <input class="form-control" id="input-usercountry" placeholder="所在国家" v-model="usercountry">
      <input class="form-control" id="input-userprovince" placeholder="所在省或州" v-model="userprovince">
      <input class="form-control" id="input-userstreet" placeholder="所在街道" v-model="userstreet">
      <input class="form-control" id="input-comments" placeholder="备注" v-model="comments">
      <br/>
      <button type="submit" class="btn btn-default" @click="register">登记</button>
      <br/>
      <div>
          <input class="form-control" id="input-searchitem" placeholder="username or country" v-model="searchitem">
          <input type="button" class="search" @click="getSingleInfo()" value="模糊查询">
          <button type="submit" class="btn btn-default" @click="getAllAccount()">列出全部信息</button>
        </div>
      <div>
        <table id="t1">
          <tr>
            <th>id</th>
            <th>用户名</th>
            <th>年龄</th>
            <th>性别</th>
            <th>所在国家</th>
            <th>所在省或州</th>
            <th>所在街道</th>
            <th>备注</th>
          </tr>
        </table>
      </div>
      <!-- <model :list='selectedlist' :isactive="isActive" v-cloak @change="changeOverlay" @modify="modify"></model> -->
  </div>
</template>

<script>
export default {
  name: 'TableView',
  data () {
    return {
      msg: '用户信息数据',
      isActive: false,
      selected: -1,
      selectedlist: {},
      // slist: [],
      // searchlist: [],
      // list: [
      //   {},
      // ]
    }
  },
  created() {
    console.log(Date.now());
    this.setSlist(this.list);
  },
  methods: {
    register () {
      let params = {
        username: this.username,
        userage: this.userage,
        usersex: this.usersex,
        usercountry: this.usercountry,
        userprovince: this.userprovince,
        userstreet: this.userstreet,
        comments: this.comments
      }
      this.$http.post('/api/user/register', params)
        .then((response) => {
          console.log(response)
          var message = response.body.message
          if (response.body.status === 1001) {
            // message = this.projectname + ' ' + message;
            alert(message);
          }
        })
        .catch((reject) => {
          console.log(reject)
        }) 
    },
    getAllAccount () {
      console.log('call getAllInfos');
      var regex = /(http|ftp|https:\/\/[\w\-_]+\.{1}[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/gi;
      this.$http.get('/api/user/all')
        .then((response) => {
          console.log(response);
          //删除之前展示的数据重新从数据中取数据。
          var t1 = document.getElementById("t1");
          var childs = t1.childNodes; 
          for(let j = childs.length - 1; j >0 ; j--) { 
            // alert(childs[i].nodeName); 
            console.log(childs[j].nodeName);
            t1.removeChild(childs[j]); 
          }
          //动态展示从数据库中获取数据并展示。
          for (let i = 0; i < response.body.length; i++){
            // console.log(response.body[i]);
            // 创建一行 
            var  row = document.createElement("tr");
            row.innerHTML='<td>'+i+'</td>'+
            '<td>'+response.body[i].username+'</td>'+
            '<td>'+response.body[i].userage+'</td>'+
            '<td>'+response.body[i].usersex+'</td>'+
            '<td>'+response.body[i].usercountry+'</td>'+
            '<td>'+response.body[i].userprovince+'</td>'+
            '<td>'+response.body[i].userstreet+'</td>'+
            '<td>'+response.body[i].comments+'</td>'
            // '<td><button v-on:click="$emit(\'remove\')">删除</button></td>';
            // '<td><button type="delete" class="btn btn-default" onclick=this.$options.methods.deleteRowsss()>删除</button></td>';
            // '<td><input type="button" value="删除" onclick="this.deleteRowsss()"></td>';//this代表当前元素对象
            t1.appendChild(row);
            // console.log(this.list);
            // alert(response.body[i].projectname);
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    getSingleInfo () {
      console.log('call getSingleInfo')
      var regex = /(http|ftp|https:\/\/[\w\-_]+\.{1}[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/gi;
      this.$http.get('/api/user/single')
        .then((response) => {
          console.log(response);
          //删除之前展示的数据重新从数据中取数据。
          var t1 = document.getElementById("t1");
          var childs = t1.childNodes; 
          for(let j = childs.length - 1; j >0 ; j--) { 
            // alert(childs[i].nodeName); 
            console.log(childs[j].nodeName);
            t1.removeChild(childs[j]); 
          }
          //动态展示从数据库中获取数据并展示。
          for (let i = 0; i < response.body.length; i++){
            // console.log(response.body[i]);
            if ((response.body[i].username.toLowerCase().indexOf(this.searchitem.toLowerCase()) != -1) || (response.body[i].usercountry.toLowerCase().indexOf(this.searchitem.toLowerCase()) != -1)) {
              var  row = document.createElement("tr");
              row.innerHTML='<td>'+i+'</td>'+
              '<td>'+response.body[i].username+'</td>'+
              '<td>'+response.body[i].userage+'</td>'+
              '<td>'+response.body[i].usersex+'</td>'+
              '<td>'+response.body[i].usercountry+'</td>'+
              '<td>'+response.body[i].userprovince+'</td>'+
              '<td>'+response.body[i].userstreet+'</td>'+
              '<td>'+response.body[i].comments+'</td>'
              t1.appendChild(row);
            }
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    }
  }
}
</script>
<strip
