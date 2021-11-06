<template>
    <div>
        
            <div class="container"  >
                <form action="" class="form-horizontal">
                    <div class="form-group left row">
                      <div class="col">
                            <label for="" class="control-label col-sm-3">Nombre del Producto</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control"  v-model="form.nombre" >
                            </div>
                        </div>
                    </div>
                    <div class="form-group left row">
                      <div class="col">
                            <label for="" class="control-label col-sm-3">Modelo del Producto</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control"  v-model="form.modelo" >
                            </div>
                        </div>
                    </div>
                    <div class="form-group left row">
                      <div class="col">
                            <label for="" class="control-label col-sm-3">Precio del Producto</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control"  v-model="form.precio">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <b-button-group>
                      <b-button type="button" variant="info" v-on:click="guardar()" >Guardar</b-button>
                      
                      <b-button type="button" class="btn btn-dark margen" v-on:click="salir()"  >Salir</b-button>
                      </b-button-group>
                    </div> 
                </form>


            </div>
       

    </div>
</template>

<script>

import axios from 'axios';
export default {
    name:"NuevoTU",
    data:function(){
        return {
            form:{
                "id":"",
                "nombre":"",
                "modelo":"",
                "precio":""
            }
        }
    },
    

    methods:{
        
        guardar(){

            axios.post("http://localhost:3000/producto/",this.form)
            .then(res =>{
                this.makeToast("Hecho",res.data.success,"success");
                setTimeout(this.salir,1800);
                
            }).catch(err=>{
                let errors = err.response.data.errors
                console.log(errors)
                errors.forEach(error => {
                    this.makeToast("Error",error.msg,"danger")
                });
            })
        },
        salir(){
            this.$router.push("/listar");
        },
        makeToast(titulo,texto,tipo) {
            this.toastCount++
            this.$bvToast.toast(texto, {
            title: titulo,
            variant: tipo,
            autoHideDelay: 5000,
            appendToast: true
            })
        }
        
        
    }
}
</script>
<style scoped>
.left{
    text-align:  left;
}
</style>