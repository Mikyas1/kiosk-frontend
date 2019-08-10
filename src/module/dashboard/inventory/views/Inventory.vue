<template>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar parent="Inventory" icon="widgets" />

      <v-card class="mx-4 mb-5 mt-4 " min-height="305">
 
      <v-layout row wrap>
        <!-- <v-flex sm12>
          <h3>Complex Table</h3>
        </v-flex> -->
        <v-flex lg12>
          <v-card flat>
            <!-- TABLE TOOLBAR -->
            <v-toolbar flat color="white">
              <h2 class="mr-3 primary--text subheading font-weight-light" style="min-width: 100px">
                <v-icon class="primary--text">widgets</v-icon> Inventory
              </h2>
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Search Items..."
              v-model="search"
              hide-details
              class="ml-2"
              ></v-text-field>
              <v-btn 
                  fab
                  dark
                  class="secondary_1 white--text mt-5 c-btn"
                  @click="openAddDialog"
                >
                <v-icon>
                    add
                </v-icon>
              </v-btn>
            </v-toolbar>

            <!-- ADD ITEM DIALOG -->
            <v-dialog max-width="98%" v-model="addDialog">
                <AddItem @closeDialog="addDialog = !addDialog"></AddItem>
            </v-dialog>

            <v-divider></v-divider>

            <v-card-text flat class="pa-0">
              
              <v-data-table
                :headers="get_table_header"
                :search="search"
                :items="complex.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1 c-table"
                item-key="id"
                v-model="complex.selected"
                disable-initial-sort
                :dark="false"
                >

                  <template v-slot:items="props">
                    <!-- <td v-on:click="edit(props.item.name)">
                      <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                      ></v-checkbox>
                    </td> -->
                    <td v-on:click="edit(props.item.name)">
                      <v-avatar size="38">
                        <img :src="require('@/assets/alienware.jpg')" height="32" width="32" alt="">
                      </v-avatar> 
                      <!-- <img src="./alienware.jpg" height="50" width="60"> -->
                       <!-- <v-img :src="require('@/assets/alienware.jpg')" height="60" width="60"></v-img> -->
                    </td>
                    <td  v-on:click="edit(props.item.name)">{{ reduceText(props.item.name) }}</td>
                    <td  v-on:click="edit(props.item.name)">{{ props.item.price }} ETB</td>
                    <td  v-on:click="edit(props.item.name)">
                      <div v-for="branch in props.item.branch" :key="branch">
                        {{ branch }}
                      </div>
                    </td>
                    <td v-if="$vuetify.breakpoint.smAndUp" v-on:click="edit(props.item.name)">{{ props.item.quantity }}</td>
                    <td v-if="$vuetify.breakpoint.smAndUp">
                      <v-btn v-on:click="edit(props.item.name)" depressed outline icon fab dark color="primary" small>
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn v-on:click="delet(props.item.name)" depressed outline icon fab dark color="pink" small>
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </td>
                  </template>

                  <!-- <template v-slot:no-data>
                    <p>
                      No item available
                    </p>
                  </template> -->

              </v-data-table>

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      </v-card>

      <!-- SPACER -->
      <div style="height: 65px"></div>

    </v-container>

</template>

<script>

import Navbar from '@/components/BodyNav'
import AddItem from '../components/AddItem'

export default {
  name: 'inventory',
  methods: {
    openAddDialog() {
      this.addDialog = !this.addDialog;
    },
    edit(x) {
      alert(x)
    },
    delet(y){
      alert(y)
    },
    reduceText(text) {
      if(text.length < 41) {
        return text;
      } else if (text.length >= 41) {
        return text.slice(0, 38) + "...";
      }
    }
  },
  components: {
    Navbar,
    AddItem
  },
  computed: {
    get_table_header(){
      if(!this.$vuetify.breakpoint.smAndUp) {
        return this.complex.headers.slice(1,5)
      } else {
        return this.complex.headers
      }
    }
  },
  data() {
    return {
      search: '',
      addDialog: false,
      complex: {
        selected: [],
        headers: [
          {
            text: 'Image',
            value: 'image'
          },
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Price',
            value: 'price'
          },
          {
            text: 'Branch',
            value: 'branch'
          },
          {
            text: 'Quantity',
            value: 'quantity'
          },
          {
            text: 'Action',
            value: ''
          },
        ],
        items: [
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'branch': ['Main Branch', '2nd branch', '3rd branch', '4th branch'],
            'id': 1
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'branch': ['Main Branch'],
            'id': 2
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'branch': ['Main Branch'],
            'id': 3
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'branch': ['Main Branch'],
            'id': 4
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'branch': ['Main Branch'],
            'id': 5
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'branch': ['Main Branch'],
            'id': 6
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'branch': ['Main Branch'],
            'id': 7
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'branch': ['Main Branch'],
            'id': 8
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'branch': ['Main Branch'],
            'id': 9
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'branch': ['Main Branch'],
            'id': 10
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'id': 11
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'id': 12
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'id': 13
          },
          {
            'name': 'Alienware 1900R 34.1", Curved Gaming Monitor LED-Lit, WQHD 3440 x 1440p Resolution',
            'image': '@/assets/alienware.jpg',
            'price': 749,
            'quantity': 4,
            'id': 14
          },
        ]
      },
    }
  },
  created() {
      this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'inventory');
  }
}
</script>

<style scoped>
.c-table {
  box-shadow: none !important;
}
</style>
