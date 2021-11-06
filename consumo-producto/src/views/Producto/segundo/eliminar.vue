<template>
    <div>
         
    Desea eliminar al id {{this.form.idProducto}}
          
    </div>
</template>
<script>

export default{
    props: {
    producto: Object 
  },
  data:function(){
        return{
          'form':{
              idProducto:''
          }
            
        }       
  },
  mounted:function(){
      this.form = this.producto
  }
}
</script>

