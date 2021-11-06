<template>
     
  <b-container fluid>
    <!-- User Interface controls -->
    
<b-row>
      <b-col lg="9" class="my-1">
        <b-form-group
          label-for="filter-input"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Buscar"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>      
    </b-row>
    <div class="table-responsive" style="max-height:400px"> 
    <!-- Main table element -->
    <b-table
      sticky-header
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="editarProd(row.item, row.index, $event.target)" class="mr-1">
          editar modal
        </b-button>
        <b-button size="sm" @click="modEliminar(row.item, row.index, $event.target)" class="mr-1">
          eliminar
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>
    </div>
<b-row>
      <b-col sm="5" md="6" class="my-1" >
        <b-form-group
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetEditarModal">
      <EditarP :key="keyEditar" :producto="producto"/>
    </b-modal>

    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetEliminarModal">
      <EditarP :key="keyEditar" :producto="producto"/>
    </b-modal> -->
    
  </b-container>
</template>

<script>
import axios from 'axios'
import EditarP from './EditarP.vue'
  export default {
    components: {
    EditarP
  },
    data() {
      
      return {
      keyEditar:0,
       ProductoVacio:{
                "idProducto":"",
                "modeloProd":"",
                "nombreProd":"",
                "precioProd":""
            },
        producto: this.ProductoVacio,
        items: [],
        fields: [
          { key: 'nombreProd', label: 'Producto', sortable: true, sortDirection: 'desc' },
          { key: 'modeloProd', label: 'Modelo', sortable: true, class: 'text-center' },
          {
            key: 'precioProd',
            label: 'Precio ',
            sortable: true,
            sortByFormatted: true,
            filterByFormatted: true
          },
          { key: 'actions', label: 'Acciones' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Mostrar todo" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
   
      mounted:function(){
        let direccion = "http://localhost:3000/producto/";
        
                axios.get(direccion).then( res =>{
                    if (res.status===200){
                        console.log(res.status)
                    this.items = res.data;
                    this.totalRows = res.data.length
                    console.log(this.items)
                    }else{
                    setTimeout(this.salir,1800);
                    console.log(res.status)
                    }
                }); 
       
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      editarProd(item, index, button) {
        this.infoModal.title = `Editar Producto: ${item.nombreProd}`
        this.producto = item
        this.keyEditar++
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      /* modEliminar(item, index, button) {
        this.infoModal.title = `Editar Producto: ${item.nombreProd}`
        this.producto = item
        this.keyEditar++
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      }, */
      resetEditarModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
       resetEliminarModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      
    }
  }
</script>
   
  