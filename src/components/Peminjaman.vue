<template>
        <div>
              <div class="container-fluid px-4">
                <h1 class="mt-4">Borrowing Book</h1>
                <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item"><a href="/home">Home</a></li>
                        <li class="breadcrumb-item active">Borrowing</li>
                </ol>
                
                <div class="card mb-4">
                <div class="card-header">
                        <i class="fas fa-table me-1"></i>
                        List Borrowing

                        <button @click="Add()" data-bs-toggle="modal" data-bs-target="#borrowing_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw" data-bs-dismiss="modal"></i>Add Borrowing</button>
                        
                </div>
                <div class="card-body">
                        <table id="borrowing_table" class="table table-hover table-striped">
                        <thead>
                                <tr>
                                <th>NO</th>
                                <th>STUDENT NAME</th>
                                <!-- <th>CLASS</th> -->
                                <th>BORROWING DATE</th>
                                <th>RETURNING DATE</th>
                                <th>ACTION</th>
                                </tr>
                        </thead>
                        <tbody>
                             <tr v-for="(ls, index) in list_transaction" :key="ls">
                                <td>{{ index+1 }}</td>
                                <td>{{ ls.nama_siswa }}</td>
                                <!-- <td><span class="badge bg-dark" >{{ ls.nama_kelas + ' '}}</span></td> -->
                                <td>{{ ls.tanggal_pinjam }}</td>
                                <td>{{ ls.tanggal_kembali }}</td>
                                <td>
                                    <button class="btn btn-sm btn-info" @click="Detail(ls)" data-bs-toggle="modal" data-bs-target="#borrowing_detail_modal" ><i class="fas fa-list fa-fw"></i></button>
                                    <button class="btn btn-sm btn-success" @click="Return(ls.id_siswa)" data-bs-toggle="modal" data-bs-target="#borrowing_modal"><i class="fas fa-check fa-fw"></i></button>
                                </td> 
                        </tbody>
                        </table>
                </div>
                </div>
        </div>

         <!-- Modal -->
        <div class="modal fade" id="borrowing_detail_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Borrowing Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-responsive table-stripped">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>COVER</th>
                                    <th>BOOK NAME</th>
                                    <th>AUTHOR</th>
                                </tr>
                            </thead>
 
                            <tbody>
                                <tr v-for="(detail, index) in list_detail_transaction" :key="detail">
                                    <td>{{index+1}}</td>
                                    <td>
                                        <img v-if="detail.image !== null" :src="api_url2 + '/images/' + detail.image" width="150">
                                        <span v-else>No Image</span>
                                    </td>
                                    <td>{{ detail.nama_buku }}</td>
                                    <td>{{ detail.pengarang }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="borrowing_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Borrowing Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card">
                                    <div class="card-body">
                                         <div class="mb-3">
                                            <div class="form-group">
                                                <label for="id_siswa" class="form-label">Student Name</label>
                                                <select class="form-control" v-model="id_siswa">
                                                    <option value="" disabled>-- Choose Student --</option>
                                                    <option v-for="ls in student_list" :key="ls.id_siswa" :value="ls.id_siswa">{{ ls.nama_siswa }}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="tanggal_pinjam" class="form-label">Date of Borrowing</label>
                                            <input type="date" class="form-control" id="tanggal_pinjam" v-model="tanggal_pinjam" placeholder="Date of Borrowing">
                                        </div>
                                        <div class="mb-3">
                                            <label for="tanggal_kembali" class="form-label">Date of Returning</label>
                                            <input type="date" class="form-control" id="tanggal_kembali" v-model="tanggal_kembali" placeholder="Date of Returning">
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                            <div class="col-md-9">
                                <div class="card">
                                    <div class="card-body">
                                        <button @click="addItem" class="btn btn-sm btn-primary text-white"><i class="mdi mdi-plus btn-icon-prepend"></i> Add Item</button>
                                        <br><br>
                                        <div class="row" v-for="(detail, counter) in transaction_detail" :key="counter">
                                            <br><br>
                                            <div class="col-md-8">
                                                <div class="form-group">
                                                    <select class="form-control" v-model="detail.id_buku">
                                                        <option value="" disabled>-- Choose Book --</option>
                                                        <option v-for="lb in list_book" :key="lb.id_buku" :value="lb.id_buku">{{ lb.nama_buku }} - {{ lb.pengarang }}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <input class="form-control" placeholder="Qty" type="number" v-model="detail.qty"> 
                                                </div>
                                            </div>
                                            <div class="col-md-1">
                                                <button class="btn btn-danger btn-sm" @click="deleteItem(counter)"><i class="fas fa-trash-alt fa-fw"></i> </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button @click="Save" class="btn btn-block btn-lg btn-success">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        </div>
</template>
<script>
module.exports = {
        //state
        data : function(){
                return {
                         id_siswa: "",
                         tanggal_pinjam: "",
                         tanggal_kembali: "",
                         list_transaction: [],
                         list_detail_transaction: [],
                         //for transaction form
                         list_book: [],
                         student_list: [],
                         transaction_detail: [],
                }
        },
        methods: {
                addItem(){
                    this.transaction_detail.push({
                         id_buku: '',
                         qty: '',
                     })
                },

                deleteItem(counter){
                    this.transaction_detail.splice(counter,1);

        },
         getBook: function(){
            //ambil data buku untuk dropdown
            let config = { headers: 
                         { "Authorization": "Bearer " + this.$cookies.get("Authorization")} };
            axios.get(api_url + "/buku", config)
            .then(response => {
                this.list_book= response.data;
            })
        },
          getStudent: function(){
            //ambil data student untuk dropdown
            let config = { headers: {  "Authorization": "Bearer " + this.$cookies.get("Authorization") } };
            axios.get(api_url + "/siswa", config)
            .then(response => {
                this.student_list= response.data;
            })
        },
          getData: function(){
            let config= {
                headers : { "Authorization": "Bearer " + this.$cookies.get("Authorization") }
            }
            axios.get(api_url + "/peminjaman_buku", config)
            .then( response => {
                this.list_transaction = response.data;
            })
        },

         // statusCheck: function(date_of_returning){
          //  const status = moment().isBefore(moment(date_of_returning))
           // if(status){
          //      return true
           // } else {
           //     return false
           // }
       // },
          Add: function() {
            this.id_siswa = ""
            this.tanggal_pinjam = ""
            this.tanggal_kembali = ""
            this.getBook()
            this.getStudent()
        },
           Detail: function(data) {
            this.id_siswa = data.id_siswa
            this.tanggal_pinjam = data.tanggal_pinjam
            this.tanggal_kembali = data.tanggal_kembali
            //get detail
            let config = {
                headers : { "Authorization": "Bearer " + this.$cookies.get("Authorization")}
            }
            axios.get(api_url + "/detail_peminjaman_buku/" + data.id_peminjaman_buku, config)
            .then( response => {
                this.list_detail_transaction = response.data
            })
        },
        Save: function() {
            let config = {
                headers : { 
                   "Authorization": "Bearer " + this.$cookies.get("Authorization")
                }
            }
            
            let form = {
                "id_siswa": this.id_siswa,
                "tanggal_pinjam": this.tanggal_pinjam,
                "tanggal_kembali": this.tanggal_kembali,
                "detail": this.transaction_detail
            }
            axios.post(api_url + '/peminjaman_buku', form, config)
            .then( response => {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            })
            this.getData()
        }
    },
    mounted(){
            this.getData()
    },
}
</script>