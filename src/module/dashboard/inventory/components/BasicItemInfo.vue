<template>
    
    <div>
        <h2 class="font-weight-regular mb-3">1: Basic Item info</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur earum officia deserunt, corporis reprehenderit nisi atque eligendi dolor! Ratione ipsum, ducimus molestias nam corporis expedita porro est consequuntur quam sit?</p>


        <v-form ref="add" v-on:submit.prevent="addItem">
            <v-text-field
                label="* Item Name"
                class="input-group--focused pr-4 pl-2 mt-2"
                v-bind:rules="inputRules"
                v-model="newItem.name"
            ></v-text-field>

            <v-select
                class="input-group--focused pr-4 pl-2 mt-2"
                v-bind:items="compSellerCategory"
                label="* Root Category"
                item-text="text"
                item-value="val"
                v-model="rootCategory"
                persistent-hint
                v-bind:rules="[(v) => v != null || 'Category is required']"
            ></v-select>
            <!-- {{ compSellerCategory }} -->

            <!-- <div 
                v-if="rootCategory"
            >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, assumenda illum maxime aliquam ratione, dolores ut quis id alias odio tenetur ipsum. Assumenda officia dolorem exercitationem repellat sunt, harum maxime.</p>
                <v-radio-group 
                    v-model="newItem.category">
                    <v-radio
                        v-for="category in subRootCategories"
                        :key="categoryListDisp(category)"
                        :label="categoryListDisp(category)"
                        :value="category"
                    ></v-radio>
                </v-radio-group>
            </div> -->


            <v-select
                v-if="rootCategory"
                class="input-group--focused pr-4 pl-2 mt-2"
                v-model="newItem.category"
                :items="subRootCategories"
                item-text="text"
                item-value="val"
                label="* Detail category"
                hint=" - Your item will be listed under the chosen Detail category list."
                persistent-hint
                v-bind:rules="[(v) => v != null || 'Detail Category is required']"
            ></v-select>

            <!-- <div v-if="rootCategory">{{ subRootCategories }}</div>      -->


            <div v-if="newItem.category">

                <!-- <v-text-field
                    label="* Conditon"
                    class="input-group--focused pr-4 pl-2 mt-2"
                ></v-text-field>

                <v-radio-group v-model="addConditon">
                    <v-radio
                        v-for="tag in tags.Condition.ELECTORNICS[0]"
                        :key="tag"
                        :label="tag"
                        :value="tag"
                    ></v-radio>
                </v-radio-group>

                {{ addConditon }} -->

                <v-select
                    class="input-group--focused pr-4 pl-2 mt-2"
                    v-model="newItem.condition"
                    :items="getTags('Condition')"
                    label="* Condition"
                    persistent-hint
                    v-bind:rules="[(v) => v != null || 'Condition is required']"
                ></v-select>

                <!-- <v-text-field
                    label="* Brand"
                    class="input-group--focused pr-4 pl-2 mt-2"
                ></v-text-field>

                <v-radio-group v-model="addBrand">
                    <v-radio
                        v-for="tag in tags.Brand.ELECTORNICS[0]"
                        :key="tag"
                        :label="tag"
                        :value="tag"
                    ></v-radio>
                </v-radio-group>
 -->
                
                <v-select
                    class="input-group--focused pr-4 pl-2 mt-2"
                    v-model="newItem.brand"
                    :items="getTags('Brand')"
                    label="* Brand"
                    persistent-hint
                    v-bind:rules="[(v) => v != null || 'Brand is required']"
                ></v-select>

            </div>
            
            <!-- <h1 class="mb-3 ml-2 body-1">* Branch</h1>

            <v-checkbox 
                v-for="branch in branchs" 
                :key="branch.id"
                class="my-0 py-0 ml-3" 
                v-model="newItem.branchs"
                :label="branch.branchName" 
                :value="branch.id">
            </v-checkbox> -->

            <v-select
                class="input-group--focused pr-4 pl-2 mt-2"
                v-model="newItem.branchs"
                :items="allBranchs"
                item-text="branchName"
                item-value="id"
                label="* Branchs"
                multiple
                chips
                hint="At which branch will this new item exist."
                persistent-hint
            ></v-select>

            <v-text-field
                label="* Quantity"
                class="input-group--focused pr-4 pl-2 mt-2"
                v-model="newItem.quantity"
            ></v-text-field>

            <v-text-field
                label="* Price"
                class="input-group--focused pr-4 pl-2 mt-2"
                v-model="newItem.price"
            ></v-text-field>

            {{ newItem }}

    </v-form>
    </div>

</template>

<script>

import { mapGetters } from "vuex";
import { capitalize } from "@/resources/helper";

export default {
    name: 'BasicItemInfo',
    props: { 
        category: {
            type: Object,
            required: true
        },
        tags: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters({
            sellerCategory: "dashboard/storeCategory",
            branchs: "dashboard/branchs",
            }),
        subRootCategories() {
            return this.category[this.rootCategory].map(x => {
                return {
                    val: x,
                    text: this.categoryListDisp(x)
                }
            });
        },
        compSellerCategory() {
            return this.sellerCategory.map(x => {
                return {
                    val: x,
                    text: capitalize(x)
                }
            })
        },
        allBranchs() {
            var allBranchs = [{
                branchName: 'Main Branch', 
                id: 'main'
            }]
            for (var index in this.branchs){
                allBranchs.push({
                    branchName: this.branchs[index].branchName,
                    id: this.branchs[index].id
                })
            }
            return allBranchs;
        }
    },
    methods: {
        categoryListDisp(catList) {
            var dispCat = '';
            // return catList.length;
            for (var cat in catList) {
                if (dispCat == '') {
                    dispCat += capitalize(catList[cat]);
                } else {
                    dispCat += ' > ' + capitalize(catList[cat]);
                }
            }
            return dispCat;
        },
        getLastElement(array) {
            return array[array.length - 1];
        },
        getTags(tag){
            var ret = [];
            try{
                ret.push(...this.tags[tag][this.getLastElement(this.newItem.category)][0]);
            }catch{}
            ret.push('Not listed');
            return ret;
        },
    },
    data(){
        return {
            rootCategory: null,
            newItem: {
                name: '',
                category: null,
                branchs: [],
                quantity: null,
                price: null,
                condition: null,
                brand: null,
            },
            inputRules: [
                v => v.length >= 3 || "Minimum length is 3 characters"
                // 'Required',
            ],
        }
    }
}
</script>


<style>

</style>