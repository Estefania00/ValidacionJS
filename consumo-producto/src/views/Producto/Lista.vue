<template>
    <div>
        
            <div class="container izquierda">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <b-button variant="info" v-on:click="nuevo()" >Nuevo Producto</b-button>
                </div>
                
                <br><br>
                
                
                <div class="table-responsive" style="max-height:400px">
                
                <table class="table table-striped table-hover">
                <thead class="sticky-top table-secondary ">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Producto</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="producto in ListaProducto" :key="producto.idProducto" v-on:click="editar(producto.idProducto)">
                        <th scope="row">{{ producto.idProducto}}</th>
                        <td>{{ producto.nombreProd }}</td>
                        <td>{{ producto.modeloProd }}</td>
                        <td>{{ producto.precioProd }}</td>                   
                    </tr>
            
                </tbody>
                </table>
                </div>
            </div>

        
    </div>
</template>
<script>

import axios from 'axios';
export default {
    
    data(){
        return {
            ListaProducto:null,
           
            
        }
    },
    
    methods:{
          

            editar(id){
                this.$router.push('/editar/'+ id);
                console.log(id)
            },
            nuevo(){
                this.$router.push('/nuevo');
            }
    },
    makeToast(titulo,texto,tipo) {
            this.toastCount++
            this.$bvToast.toast(texto, {
            title: titulo,
            variant: tipo,
            autoHideDelay: 5000,
            appendToast: true
            })
        },
    mounted:function(){
        let direccion = "http://localhost:3000/producto/";
        
                axios.get(direccion).then( res =>{
                    if (res.status===200){
                        console.log(res.status)
                    this.ListaProducto = res.data;
                    console.log(this.ListaProducto)
                    }else{
                    setTimeout(this.salir,1800);
                    console.log(res.status)
                    }
                }); 
        },
        salir(){
            this.$router.push("/");
        },
    
}
</script>
<style  scoped>
    .izquierda{
        text-align: left;
    }
</style>