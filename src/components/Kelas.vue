<template>
    <main>
        <div class="container-fluid px-4">
            <h2 class="mt-4">Grade</h2>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item active">Grade</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Grade

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#kelas_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Grade</button>
                </div>
                <div class="card-body">
                    <table id="kelas_table" class="table table-responsive table-striped table-hover">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>CLASS NAME</th>
                                <th>GROUP</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>NO</th>
                                <th>CLASS NAME</th>
                                <th>GROUP</th>
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="(kelas, index) in kelas" :key="index">
                                <td>{{ index+1 }}</td>
                                <td>{{ kelas.nama_kelas }}</td>
                                <td>{{ kelas.kelompok }}</td>
                                <td>
                                    <button class="btn btn-sm btn-info" @click="Edit(kelas)" data-bs-toggle="modal" data-bs-target="#kelas_modal" ><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-sm btn-danger" @click="Delete(kelas.id_kelas)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="kelas_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-md bg-primary">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Grade Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="nama_kelas" class="form-label">Class Name</label>
                            <input type="text" class="form-control" id="nama_kelas" v-model="nama_kelas" placeholder="Class Name">
                        </div>

                        <div class="mb-3">
                            <label for="kelompok" class="form-label">Group</label>
                            <input type="text" class="form-control" id="kelompok" v-model="kelompok" placeholder="Group">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>
<script>
module.exports = {
    data : function(){
        return {
            id_kelas: "",
            nama_kelas: "",
            kelompok: "",
            action: "",
            kelas: [],
        }
    },
    methods: {
        getData: function(){
            //token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            axios.get(api_url + "/kelas", token)
            .then( response => {
                this.kelas = response.data;
            })
        },
        Add: function() {
            this.id_kelas = ""
            this.nama_kelas = ""
            this.kelompok = ""
            this.action = "insert"
        },
        Edit: function(kelas){
            this.id_kelas = kelas.id_kelas
            this.nama_kelas = kelas.nama_kelas
            this.kelompok = kelas.kelompok
            this.action = "update"
        },
        Save: function() {
            //mapping header token
            let token = {
                headers : { 
                    "Authorization" : "Bearer " + this.$cookies.get("Authorization")
                }
            }
            //mapping data
            let form  = {
                'nama_kelas': this.nama_kelas,
                'kelompok': this.kelompok,
            }
            if(this.action === 'insert'){ //POST
                axios.post(api_url + '/kelas', form, token)
                .then( response => {
                    Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                })
            } else { //PUT
                axios.put(api_url + '/kelas/' + this.id_kelas, form, token)
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
        Delete: function(id_kelas){
            //mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            Swal.fire({
                title: 'Hapus Data Kelas',
                text: 'Apakah anda yakin menghapus data ini?',
                icon: 'warning',
                showDenyButton: true,
                showCancelbutton: false,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
            }).then((result) => {
                if (result.isConfirmed) {
                     axios.delete(api_url + '/kelas/' + id_kelas, token)
                    .then( response => {
                        Swal.fire({
                            title: 'Success!',
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        this.getData()
                    })
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
    }
}
</script>