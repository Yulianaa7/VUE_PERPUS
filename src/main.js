//base URL API
var api_url = "http://localhost:8000/api";
var api_url2 = "http://localhost:8000";

//konfigurasi route
var router = [
    {
        path: "/",
        name: "Home",
        component: httpVueLoader("./src/components/Home.vue")
    },
    {
        path: "/book",
        name: "Book",
        component: httpVueLoader("./src/components/Book.vue")
    },
    {
        path: "/member",
        name: "Member",
        component: httpVueLoader("./src/components/Member.vue")
    },
    {
        path: "/kelas",
        name: "Kelas",
        component: httpVueLoader("./src/components/Kelas.vue")
    },
    {
        path: "/peminjaman",
        name: "Peminjaman",
        component: httpVueLoader("./src/components/Peminjaman.vue")
    },
];


var routers = new VueRouter({ routes: router, base: "/" });

//instance vue 
var app = new Vue({
    el: "#app", //elemen yang di vue kan
    components: {
        "login": httpVueLoader("./src/components/Login.vue"),
        "apps" : httpVueLoader("./src/components/App.vue") 
    },
    data: { //state /variabel global
      user: {
          id_user: "",
          role: "",
          name: "",
          username: "",
      },
      mycomponent: "",
    },
    router: routers,
    methods: {
        CekToken: function(){
            //punya token di cookies apa tidak?
            if(this.$cookies.isKey('Authorization')){
                //kalau punya
                //maping header token dulu
                let token = {
                    headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
                }
                //cek kevalidan token di backend
                axios.get(api_url + '/login_check', token)
                .then( response => {
                    if(response.data.status === 1){
                        this.mycomponent = 'apps'
                    } else {
                        this.mycomponent = 'login'
                    }
                })

            } else {
                //kalau tidak punya
                this.mycomponent = 'login'
            }
            
        }
    },
    mounted(){
        this.CekToken();

    }


});