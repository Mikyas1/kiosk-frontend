<template>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar parent="inventory" icon="widgets" />

      <!-- LOADER -->
      <v-progress-linear v-if="loading" v-bind:indeterminate="true" class="my-0"></v-progress-linear>

      <v-card class="mx-4 mb-5 mt-4" min-height="305">
 
      <v-layout v-if="show" row wrap>
        <!-- <v-flex sm12>
          <h3>Complex Table</h3>
        </v-flex> -->
        <v-flex lg12>
          <v-card flat>
            <!-- TABLE TOOLBAR -->
            <v-toolbar flat color="white">
              <h2 class="mr-3 primary--text subheading font-weight-light" style="min-width: 100px">
                <v-icon class="primary--text">widgets</v-icon> {{ items.length }} Items
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
                v-on:click="openAddPage"
                v-bind:loading="addBtn"
              >
                <v-icon>
                    add
                </v-icon>
              </v-btn>

            <!-- GO TO ADD ITEM DIALOGS -->
            <v-dialog v-model="addDialog" fullscreen>
              
              <div slot="activator"></div>
              
              <!-- ADD ITEM DIALOG -->
                <AddItem
                  v-on:closeDialog="addDialog = !addDialog"
                  :category="category"
                  :tags="tags"
                  @newItem="addItem"
                >
                </AddItem>
            </v-dialog>

          </v-toolbar>

            <v-divider></v-divider>

            <v-card-text flat class="pa-0">
              
              <v-data-table
                :headers="get_table_header"
                :search="search"
                :items="items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1 c-table"
                item-key="id"
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
                    <td v-on:click="openDetail(props.item)">
                      <!-- <v-avatar size="38">
                        <img :src="props.item.images[0].path" height="62" width="62" alt="">
                      </v-avatar>  -->
                      <img class="mt-1" :src="getMainImage(props.item).path" height="50" width="60">
                       <!-- <v-img :src="require('@/assets/alienware.jpg')" height="60" width="60"></v-img> -->
                    </td>
                    <td  v-on:click="openDetail(props.item)">{{ reduceText(props.item.name) }}</td>
                    <td  v-on:click="openDetail(props.item)">{{ props.item.price }} ETB</td>
                    <!-- <td  v-on:click="openDetail(props.item)">
                      <div v-for="branch in props.item.branch" :key="branch">
                        {{ branch }}
                      </div>
                    </td> -->
                    <td v-if="$vuetify.breakpoint.smAndUp" v-on:click="openDetail(props.item)">{{ props.item.quantity }}</td>
                    <td v-on:click="openDetail(props.item)">{{ props.item.token }}</td>
                    <td v-if="$vuetify.breakpoint.smAndUp">
                      
                      <v-btn 
                        v-on:click="edit(props.item)"
                        depressed
                        outline
                        icon
                        fab
                        dark
                        color="primary"
                        small>
                          <v-icon>post_add</v-icon>
                      </v-btn>

                      <v-btn 
                        v-on:click="edit(props.item)"
                        depressed
                        outline
                        icon
                        fab
                        dark
                        color="primary"
                        small>
                          <v-icon>edit</v-icon>
                      </v-btn>

                      <v-btn
                        depressed 
                        outline 
                        icon 
                        fab 
                        dark
                        color="pink" 
                        small
                        v-on:click="openDelete(props.item)"
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>

                    </td>
                  </template>

                  <!-- <template v-slot:no-data>
                    <p>
                      No item available
                    </p>
                  </template> -->
                  <!-- <template slot="no-results">
                    <p v-if="items.length != 0">
                      No item found {{ items.length }}
                    </p>
                    <p v-else>
                      No item to display in this page go back to veiw your items.
                    </p>
                  </template> -->

              </v-data-table>

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout v-else>
        <p v-if="error">Loading faild!!</p>
        <p v-else>Loading...</p>
      </v-layout>

      </v-card>

      <!-- Dynamic dialog -->
      <!-- EDIT DIALOG -->
      <v-dialog v-model="editDialog" fullscreen>
        <div slot="activator"></div>
        <EditItem :item="editItem">
        </EditItem>
      </v-dialog>

      <!-- Dynamic dialog -->
      <!-- DETAIL DIALOG -->
      <v-dialog v-model="detailDialog" max-width="75%">
        <div slot="activator"></div>
        <v-card>
          <DetailItem :item="detailItem">
          </DetailItem>
        </v-card>
      </v-dialog>

      <!-- DELETE DIALOG -->
      <v-dialog v-model="deleteDialog" max-width="70%">
      <div slot="activator"></div>
      <v-card>
          <div primary-title>
            <div class="headline pt-4 ml-4"><v-icon class="error--text">delete</v-icon> Delete Item - {{detailItem.name}}</div>
          </div>
          <v-card-text>
            <div class="ml-3 mb-2 mt-0 warning--text">
              <v-icon small color="warning">info</v-icon>
                Deleting your item will remove it from your item listings. And it will not be found on your website. The tokens of this item will not be returned even if you delete the item.
            </div>
            <p>
              {{ detailItem }}
            </p>
            <div class="ml-0 mb-2 mt-4">
              <v-icon small color="warning">warning</v-icon>
                {{ $t('delete_store_info_prompt') }}
            </div>
              <v-btn
                flat
                dark
                class="error ml-0 text-capitalize"
                v-on:click="deleteItem(detailItem.id)"
                v-bind:loading="deleteBtn"
              >{{ $t('delete') }}</v-btn>
              <v-btn
                flat
                class="c_selected_btn text-capitalize white--text"
                v-on:click="deleteDialog=!deleteDialog"
              >{{ $t('cancle') }}</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- NO TOKEN TO ADD ITEM -->
        <v-dialog v-model="noEnoughTokenDialog" max-width="60%">
          
          <div slot="activator"></div>
          
            <LowTokenWarn
              v-on:closeDialog="noEnoughTokenDialog = !noEnoughTokenDialog"
            >
            <span v-if="noEnoughTokenDialogMessage == 'Add'">
              Adding items requires token. You use tokens to set the listing priority of an item, 
            items with higher listing priority value will have a higher probability of being found 
            by buyers.
            </span>
            <span v-if="noEnoughTokenDialogMessage == 'Edit'">
              Editing items requires token. You use tokens to set the listing priority of an item, 
            items with higher listing priority value will have a higher probability of being found 
            by buyers. You have to set token (listing priority) again when editing an item.
            </span>
            </LowTokenWarn>
        </v-dialog>


      <!-- SPACER -->
      <div style="height: 65px"></div>

    </v-container>

</template>

<script>
import { mapGetters } from "vuex";
import Navbar from '@/components/BodyNav'
import AddItem from '../components/AddItem'
import DetailItem from '../components/DetailItem'
import EditItem from '../components/EditItem'
import LowTokenWarn from '../components/LowTokenWarn'

import { getErrorMessage } from "@/resources/helper";

export default {
  name: 'inventory',

  components: {
    Navbar,
    AddItem,
    DetailItem,
    EditItem,
    LowTokenWarn
  },
  
  data() {
    return {
      search: '',
      addDialog: false,
      deleteItemId: "",
      // for detail dialog
      detailDialog: false,
      detailItem: {},
      // for edit dialog
      editDialog: false,
      editItem: {},      
      // for delete dialog
      deleteDialog: false,
      deleteBtn: false,
      addBtn: false,
      noEnoughTokenDialog: false,
      noEnoughTokenDialogMessage: '',
      items: [],
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
          // {
          //   text: 'Branch',
          //   value: 'branch'
          // },
          {
            text: 'Quantity',
            value: 'quantity'
          },
          {
            text: 'Token',
            value: 'token'
          },
          {
            text: 'Action',
            value: ''
          },
        ],
      loading: false,
      category: {},
      tags: {},
      show: false,
      error: false,
    }
  },
  
  computed: {
    ...mapGetters({
      sellerCategory: "dashboard/storeCategory",
      branchs: "dashboard/branchs",
      storeTags: "dashboard/storeTags",
      storeToken: "dashboard/storeToken"
    }),
    get_table_header(){
      if(!this.$vuetify.breakpoint.smAndUp) {
        return this.headers.slice(1,5);
      } else {
        return this.headers;
      }
    }
  },

  methods: {
    openAddPage() {
      // this should be performed when users want to add item
      // if (this.storeTags != null) {
      //   // alert("not featching")
      //   this.category = this.storeTags.category;
      //   this.tags = this.storeTags.tags;
      //   this.addDialog = !this.addDialog;
      //   return;
      // }
      // alert("featching")
      if(this.storeToken > 0) {
        this.addBtn = true;
        this.$store.dispatch("dashboard/get_store_tag")
        .then(response=> {
          this.category = response.data.category;
          this.tags = response.data.tags;
          this.addBtn = false;
          this.addDialog = !this.addDialog;
        })
        .catch(error=> {
          this.$store.commit("SET_SNACKBAR", {
                message: getErrorMessage(error),
                value: true,
                status: "error"
              });
          this.addBtn = false;
        })
      } else {
        this.noEnoughTokenDialog = !this.noEnoughTokenDialog;
        this.noEnoughTokenDialogMessage = 'Add';
      }
    },
    edit(item) {
      if(this.storeToken > 0) {
        this.editDialog = true;
        this.editItem = JSON.parse(JSON.stringify(item));
      } else {
        this.noEnoughTokenDialog = !this.noEnoughTokenDialog;
        this.noEnoughTokenDialogMessage = 'Edit';
      }
    },
    openDetail(item) {
      this.detailDialog = true;
      this.detailItem = item;
    },
    openDelete(item) {
      this.deleteDialog = true;
      this.detailItem = item;
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
    },
    deleteItem(id) {
      this.deleteBtn = true;
      this.$store
        .dispatch("dashboard/delete_item", id)
        .then(response => {
          this.$store.commit("SET_SNACKBAR", {
              message: "Successfully deleted an Item!",
              value: true,
              status: "success"
          });
          this.items = response;
          this.deleteBtn = false;
          this.deleteDialog = false;
        })
        .catch(error => {
          console.log(error)
          this.$store.commit("SET_SNACKBAR", {
            message: getErrorMessage(error),
            value: true,
            status: "error"
          });
          this.deleteBtn = false;
        })
    },
    addItem(newItem) {
      this.items.push(newItem);
    },
    getMainImage(item) {
      return item.images.filter(x => x.isMain == true)[0];
    }
  },

  created() {
    this.$store.commit('dashboard/SET_ACTIVE_PAGE', 'inventory');
    this.loading = true;
    this.$store.dispatch("dashboard/get_inventory")
    .then(response => {
      this.items = response;
      this.loading = false;
      this.show = true;
    })
    .catch(error => {
      this.$store.commit("SET_SNACKBAR", {
            message: getErrorMessage(error),
            value: true,
            status: "error"
          });
      this.loading = false;
      this.error = true;
    })
  }
}
</script>

<style scoped>
.c-table {
  box-shadow: none !important;
}
</style>
