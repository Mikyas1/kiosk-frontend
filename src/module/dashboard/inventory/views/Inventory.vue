<template>

    <v-container class="c-body pa-0" fluid="true">
      <Navbar parent="inventory" icon="widgets" />

      <!-- LOADER -->
      <v-progress-linear v-if="loading" v-bind:indeterminate="true" class="my-0"></v-progress-linear>

      <v-card 
        class="mb-5 mt-4" min-height="305"
        v-bind:class="$vuetify.breakpoint.xsOnly && 'mx-1' || 'mx-4'"
        >
 
      <v-layout v-if="show" row wrap>
        <!-- <v-flex sm12>
          <h3>Complex Table</h3>
        </v-flex> -->
        <v-flex class="xs12">
          <v-card flat>
            <!-- TABLE TOOLBAR -->
            <v-toolbar flat color="white">
              <h2 
                class="primary--text subheading font-weight-light px-0" 
                style="min-width: 85px"
                v-bind:class="$vuetify.breakpoint.xsOnly && 'mr-0' || 'mr-3'"
              >
                <v-icon class="primary--text">widgets</v-icon> {{ items.length }} 
                <span v-if="$vuetify.breakpoint.smAndUp">Different</span> Items
              </h2>
              <v-text-field
              flat
              solo
              prepend-icon="search"
              placeholder="Search Items..."
              v-model="search"
              hide-details
              v-bind:class="$vuetify.breakpoint.xsOnly && 'mr-0' || 'ml-2'"
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
                v-if="renderTable"
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
                    <td class="c-point" v-on:click="openDetail(props.item)">
                      <!-- <v-avatar size="38">
                        <img :src="props.item.images[0].path" height="62" width="62" alt="">
                      </v-avatar>  -->
                      <img class="mt-1" :src="getMainImageHere(props.item).path" height="50" width="60">
                       <!-- <v-img :src="require('@/assets/alienware.jpg')" height="60" width="60"></v-img> -->
                    </td>
                    <td class="c-point" v-on:click="openDetail(props.item)">{{ reduceText(props.item.name) }}</td>
                    <td class="c-point" v-on:click="openDetail(props.item)">{{ props.item.price }} ETB</td>
                    <!-- <td  v-on:click="openDetail(props.item)">
                      <div v-for="branch in props.item.branch" :key="branch">
                        {{ branch }}
                      </div>
                    </td> -->
                    <td class="c-point" v-on:click="openDetail(props.item)">{{ props.item.quantity }}</td>
                    <td class="c-point" v-on:click="openDetail(props.item)">{{ props.item.token }}</td>
                    <td>
                      

                      <v-layout v-if="$vuetify.breakpoint.smAndDown">
                        <v-flex>
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
                        </v-flex>
                        <v-flex>
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
                        </v-flex>
                        <v-flex>
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
                        </v-flex>
                      </v-layout>

                    <div v-if="$vuetify.breakpoint.smAndUp">
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
                    </div>
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
        <EditItem 
          :item="editItem"
          :branch="editItemBranch"
          v-on:closeDialog="editDialog = !editDialog"
          @editItemSuc="editItemFn"
          @resetFeaturesHandler="resetFeatures"
          @removeImage="removeImage"
          @updateImageList="updateImageList"
        >
        </EditItem>
      </v-dialog>

      <!-- Dynamic dialog -->
      <!-- DETAIL DIALOG -->
      <v-dialog v-model="detailDialog" fullscreen>
        <div slot="activator"></div>
        <v-card>
          <DetailItem 
            :item="detailItem"
            @closeDialog="detailDialog=!detailDialog"  
          >
          </DetailItem>
        </v-card>
      </v-dialog>

      <!-- DELETE DIALOG -->
      <v-dialog v-model="deleteDialog"
      v-bind:max-width="$vuetify.breakpoint.xsOnly && '100%' || '70%'"
      >
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
              <v-layout row wrap>
                <v-flex md4 class="mt-1 ml-3">
                  <v-img
                    :src="getMainImageHere(detailItem).path"
                    crossorigin="anonymous"
                    :lazy-src="require('@/assets/loading.png')"
                    max-height="200"
                    max-width="200"
                    aspect-ratio="1.7"
                    width="255"
                    contain
                    position
                  ></v-img>
                </v-flex>
                <v-flex md7 class="">
                  <span class="c-detail-name">Name: </span><span class="c_selected_btn--text">{{ detailItem.name }}</span>
                  <br>
                  <span class="c-detail-name">Price: </span><span class="c_selected_btn--text">{{ detailItem.price }} ETB</span>
                  <br>
                  <span class="c-detail-name">Quantity: </span><span class="c_selected_btn--text">{{ detailItem.quantity }}x</span>
                  <br>
                  <span class="c-detail-name">Condition: </span><span class="c_selected_btn--text">{{ detailItem.condition }}</span> 
                  <br>
                  <span class="c-detail-name">Brand: </span><span class="c_selected_btn--text">{{ detailItem.brand }}</span>
                  <br>
                  <span class="c-detail-name">Listing Priority: </span><span class="c_selected_btn--text">{{ detailItem.token }}</span>
                </v-flex>
              </v-layout>
              
                
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

      <!-- NO TOKEN DIALOG -->
        <v-dialog v-model="noEnoughTokenDialog"
          v-bind:max-width="$vuetify.breakpoint.xsOnly && '100%' || '60%'"
        >
          
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
import { getMainImage } from "@/resources/helper";

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
      editItemBranch: [],      
      // for delete dialog
      deleteDialog: false,
      deleteBtn: false,
      addBtn: false,
      noEnoughTokenDialog: false,
      noEnoughTokenDialogMessage: '',
      items: [],
      renderTable: true,
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
      // fnClearFeatureHandler
      fnClearFeatureHandler: null,
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
        return this.headers;
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
        this.editItemBranch = this.editItem.branch;
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
    getMainImageHere(item){
      return getMainImage(item);
    },
    editItemFn(editData) {
      let index = this.items.findIndex(x => x.id == editData.id);
      console.log(index);
      this.items[index] = null;
      this.items[index] = editData;
      this.forceRerenderTable();
    },
    forceRerenderTable() {
      this.renderTable = false;
      this.$nextTick(() => {
        this.renderTable = true;
      });
    },
    resetFeatures(fn) {
      this.fnClearFeatureHandler = fn;
    },
    removeImage(data) {
      if (data.replaceImageId == null) {
        var item = this.items.filter(x => x.id == data.itemId)[0];
        item.images = item.images.filter(x => x.id != data.imageId);
      } else {
        var item = this.items.filter(x => x.id == data.itemId)[0];
        item.images = item.images.filter(x => x.id != data.imageId);
        var index = item.images.findIndex(x => x.id == data.replaceImageId);
        if (index != -1) {
          item.images[index].isMain = true;
        }
      }
    },
    updateImageList(data) {
      var item = this.items.filter(x => x.id == data.itemId)[0];
      item.images = data.data;
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
  },
  watch: {
    editDialog: function(val) {
      this.fnClearFeatureHandler();
    }
  }
}
</script>

<style scoped>
.c-table {
  box-shadow: none !important;
}
.c-point:hover {
  cursor: pointer;
}
</style>
