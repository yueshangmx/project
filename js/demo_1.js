let app = new Vue({
  el: "#app",
  data: {
    tips: "* 我们不会保存您的帐号密码，仅采集与您信用相关的信息。您的信息将受到严密保护，不会对外公开！",
    account: "",
    password: "",
    proValue: '北京市',
    cityValue: '市辖区',
    areaValue: '东城区',
    cityData: [],
    areaData: [],
    isSelectPro: false,
    isSelectCity: false,
  },
  computed: {
    addrData: function () {
      return addrData;
    }
  },
  methods: {
    loginbtn: function () {
      if (!(this.account && this.password)) {
        // alert("请输入用户名或密码");
        $.jqtimeralert('请输入用户名或密码！');
      } else if (!$(".check-box").is(':checked')) {
        // alert("必须先同意授权协议！");
        $.jqalert('必须先同意本站协议！')
      }
      else {
        alert("account: " + this.account + "\npassword: " + this.password);
      }
    },
    selectPro: function () {
      this.addrData.forEach(function (ev) {
        if (ev.name == app.proValue) {
          app.cityData = ev.city;
        }
      });
      if (!this.isSelectPro) return this.isSelectPro = true;
      //设置默认选中第一个，看起来会饱满一点
      app.cityValue = app.cityData[0].name;
      this.selectCity();
    },
    selectCity: function () {
      this.cityData.forEach(function (ev) {
        if (ev.name == app.cityValue) {
          app.areaData = ev.area;
        }
      });
      if (!this.isSelectCity) return this.isSelectCity = true;
      app.areaValue = app.areaData[0].name;
    },
    selectArea: function () {
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.selectPro();
      this.selectCity();
    })
  },
});