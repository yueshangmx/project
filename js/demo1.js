let app1 = new Vue({
  el: "#app1",
  data: {
    tips: "我们不会保存您的帐号密码，仅采集与您信用相关的信息。您的信息受严密保护，不对外公开",
    account: "",
    password: ""
  },
  methods: {
    nextbtn: function () {
      if (!(this.account && this.password)) {
        alert("请输入用户名或密码");
      }else if(!$(".check-box").is(':checked')){
        alert("必须先同意授权协议！")
      }
      else {
        alert("account: " + this.account + "\npassword: " + this.password);
      }
    }
  }
});