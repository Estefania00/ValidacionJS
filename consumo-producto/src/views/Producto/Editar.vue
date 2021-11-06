<template>
     <div>         
            <div class="container">
                <form action="" class="form-horizontal">
                    <input type="hidden" name="id" id="id" v-model="form.id">


                    <div class="form-group left row ">
                        <div class="col">
                              <label for="" class="control-label col-sm-2">Producto</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" name="nomP" id="nomP" v-model="form.nombre">
                            </div>
                        </div>
                       
                        
                    </div>
                    <div class="form-group left row ">
                        <div class="col">
                              <label for="" class="control-label col-sm-2">Modelo</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" name="nomP" id="nomP" v-model="form.modelo">
                            </div>
                        </div>
                        
                    </div>
                    <div class="form-group left row ">
                     <div class="col">
                              <label for="" class="control-label col-sm-2">Precio</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" name="nomP" id="nomP" v-model="form.precio">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                      <b-button-group>
                      <b-button type="button" variant="info" v-on:click="editar()" >Editar</b-button>
                      <b-button type="button" variant="danger" v-on:click="borrar()" >Borrar</b-button>
                      <b-button type="button" class="btn btn-dark margen" v-on:click="salir()"  >Salir</b-button>
                      </b-button-group>
                    </div> 
                </form>
            </div>
          
        </div>
</template>
<script>

import axios from 'axios';

export default{
 
  data:function(){
        return{
          id:"",
            form:{
                "id":"",
                "nombre":"",
                "modelo":"",
                "precio":""
            }
        }       

  },
  methods:{
      salir(){
        this.$router.push("/listar");
      },
      borrar(){
        console.log("object")
            axios.delete("http://localhost:3000/producto/"+this.idConten.id)
            .then(res=>{
              if(res.status===201){  
              console.log(res)
              this.makeToast("Eliminado",res.data.success,"info");
                   setTimeout(this.salir,1800);
            }else{
              console.log("object")
              this.makeToast("Error",res.data.mensage,"danger");
            }
            })
        },
      editar(){
          axios.put("http://localhost:3000/producto", this.form)
          .then(res =>{ 
              console.log(res)
              this.makeToast("Actualizado",res.data.success,"info");
                   setTimeout(this.salir,2300);
            
          }).catch(err=>{
           let errors = err.response.data.errors
                console.log(errors)
                errors.forEach(error => {
                    this.makeToast("Error",error.msg,"danger")
                });
            
          })
      },
      
      makeToast(titulo,texto,tipo) {
            this.toastCount++
            this.$bvToast.toast(texto, {
            title: titulo,
            variant: tipo,
            autoHideDelay: 5000,
            
            })
        }
       
  },
  
      mounted:function(){
      this.idConten = {
        id:this.$route.params.id
      }
      
      axios.post("http://localhost:3000/producto/id", this.idConten)
      .then( res => {
        console.log(res)
        
        this.form.id = res.data.idProducto;
        this.form.nombre= res.data.nombreProd;
        this.form.modelo= res.data.modeloProd;
        this.form.precio= res.data.precioProd;



        console.log(this.form);

      })
     
  } 

}
</script>

