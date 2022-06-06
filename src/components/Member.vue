<template>
    <div>
       <div class="container-fluid px-4">
            <h1 class="mt-4">STUDENT</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item active">Student</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Student

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#student_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Student</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>ID STUDENT</th>
                                <th>PHOTO</th>
                                <th>STUDENT NAME</th>
                                <th>DATE OF BIRTH</th>
                                <th>GENDER</th>
                                <th>ALAMAT</th>
                                <th>ID CLASS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                                <th>ID STUDENT</th>
                                <th>PHOTO</th>
                                <th>STUDENT NAME</th>
                                <th>DATE OF BIRTH</th>
                                <th>GENDER</th>
                                <th>ALAMAT</th>
                                <th>ID CLASS</th>
                                <th>ACTION</th>
                        </tfoot>
                        <tbody>
                            <tr v-for="lb in list_student" :key="lb">
                                <td>{{ lb.id_student }}</td>
                                <td><img :src="api_url2 + '/images/' + lb.image" width="150"></td>
                                <td>{{ lb.nama_siswa }}</td>
                                <td>{{ lb.tanggal_lahir }}</td>
                                <td>
                                    <span class="badge bg-info" v-if="lb.gender === 'L'">Laki-Laki</span>
                                    <span class="badge bg-warning" v-if="lb.gender === 'P'">Perempuan</span>
                                </td>
                                <td>{{ lb.alamat }}</td>
                                <td><span class="badge bg-dark" >{{ lb.nama_kelas + ' '}}</span></td>
                                <td>
                                    <button class="btn btn-default" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#studentfoto_modal" ><i class="fas fa-image fa-fw"></i></button>
                                    <button class="btn btn-info" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#student_modal" ><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger"  @click="Delete(lb.id_siswa)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="student_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Student Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="nama_siswa" class="form-label">Student Name</label>
                            <input type="text" class="form-control" id="nama_siswa" v-model="nama_siswa" placeholder="Student Name">
                        </div>

                        <div class="mb-3">
                            <label for="tanggal_lahir" class="form-label">Date Of Birth</label>
                            <input type="date" class="form-control" id="tanggal_lahir" v-model="tanggal_lahir" placeholder="Tanggal Lahir">
                        </div>

                        <div class="mb-3">
                            <label for="gender" class="form-label">Gender</label>
                            <input type="text" class="form-control" id="gender" v-model="gender" placeholder="Gender">
                        </div>

                        <div class="mb-3">
                            <label for="alamat" class="form-label">Alamat</label>
                            <textarea class="form-control" id="alamat" v-model="alamat" rows="3"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="id_kelas" class="form-label">ID Kelas</label>
                            <input type="text" class="form-control" id="id_kelas" v-model="id_kelas" placeholder="ID Kelas">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!--modal_book_cover-->
        <div class="modal fade" id="studentfoto_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Student Foto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="student_foto" class="form-label">Student Foto</label>
                            <input type="file" class="form-control" id="student_foto" @change="uploadFoto($event)">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(id_siswa)" data-bs-dismiss="modal">Submit</button>
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
            nama_siswa: "",
            tanggal_lahir: "",
            gender: "",
            alamat: "",
            id_kelas:"",
            student_foto: "",
            action: "",
            list_student: [],
        }
    },
    methods: {
        getData: function(){
            //token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            axios.get(api_url + "/siswa", token)
            .then( response => {
                this.list_student = response.data;
            })
        },
        Add: function() {
            this.id_siswa = ""
            this.nama_siswa = ""
            this.tanggal_lahir = ""
            this.gender = ""
            this.alamat = ""
            this.id_kelas = ""
            this.action = "insert"
        },
        Edit: function(lb){
            this.id_siswa = lb.id_siswa
            this.nama_siswa = lb.nama_siswa
            this.tanggal_lahir = lb.tanggal_lahir
            this.gender = lb.gender
            this.alamat = lb.alamat
            this.id_kelas = lb.id_kelas
            this.action = "update"
        },

        uploadFoto: function(e){
            this.student_foto = e.target.files[0]
        },

        Upload: function(id){
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization"), 
                    'Content-Type' : 'multipart/form-data',
                }
            }
            let form  = new FormData()
            form.append("student_foto", this.student_foto)
            axios.post(api_url + '/siswa/UploadFoto/'+ id, form, token)
            .then( response => {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                this.getData()
            })
        },
        Save: function() {
            //mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            //mapping data
            let form  = {
                //backend       //state
                'nama_siswa': this.nama_siswa,
                'tanggal_lahir': this.tanggal_lahir,
                'gender': this.gender,
                'alamat' : this.alamat,
                'id_kelas' : this.id_kelas,
                'student_foto' : this.student_foto
            }
            if(this.action === 'insert'){ //POST
                axios.post(api_url + '/siswa', form, token)
                .then( response => {
                    Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }) 
                })
            } else { //PUT
                axios.put(api_url + '/siswa/' + this.id_siswa, form, token)
                .then( response => {
                     Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                })
            }
            this.getData()
        },
        Delete: function(id_siswa){
            //mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            Swal.fire({
                title: 'Hapus Data Siswa',
                text: 'Apakah anda yakin menghapus data ini?',
                icon: 'warning',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
            }).then((result) => {
                if (result.isConfirmed) {
                     axios.delete(api_url + '/siswa/' + id_siswa, token)
                    .then( response => {
                        Swal.fire({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        this.getData()
                    })
                    //Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire({
                        title: 'Batal!',
                        text: 'Data tidak jadi dihapus',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                }
            })
        }
    },
    mounted() {
        this.getData()
    },
}
</script>