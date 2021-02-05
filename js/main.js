Vue.component('product-details', {
    props: {
        storages: {
            type:Array,
            required: true
        }
    }
})



Vue.component('product', {
    props: {
      premium: {
          type: Boolean,
          required: true,
      }
    },
    template:`
    <div class="product">

                        <div class="product__img">
                            <img v-bind:src="image" v-bind:alt="altImage">
                        </div>

                        <div class="product__info">
                            <h1>{{title}}</h1>
                            <p>{{description}}</p>

                            <a :href="underWearLink">supplier</a>

                            <p v-if="inventory > 10">In Stock</p>
                            <p v-else-if="inventory< 10 && inventory>0">Almost out of stock</p>
                            <p v-else>Out of stock</p>


                            <p :class="{onSaleLine: onSale}">ON SALE</p>
                            <p>{{sale}}</p>
                            
                            <p>Shipping:{{ shipping }}</p>

                            <p>Consist of</p>
                            <ul>
                                <li v-for="storage in storages">{{storage}}</li>
                            </ul>

                            <div v-for="(variant, index) in variants"
                                 :key="variant.variantColor"
                                 class="color-box"
                                 :style="{ backgroundColor: variant.variantColor}"
                                 @mouseover="updateProduct(index)">
                            </div>

                            <p>Avaiable sizes</p>
                            <ul>
                                <li v-for="size in sizes">{{size}}</li>
                            </ul>

                            <button v-on:click="addToCart"
                                    :disabled="!inStock"
                                    :class="{disabledButton: !inStock}">Add to cart</button>
                            <button v-on:click="decreaseFromCart">Decrease from cart</button>
                            <div class="cart">
                                <p>Cart({{cart}})</p>
                            </div>

                        </div>

                </div>
    `,
    data() {
        return{
            brand: 'Calvin Klein',
            product: 'Underwear',
            description: 'White underwear for women',
            selectedVariant:0,//based on index
            altImage: 'White Underwear',
            underWearLink: 'https://www.calvinklein.us/en',
            inventory: 5,
            onSale: true,
            storages:[
                '80% cotton',
                '20% polyester'

            ],
            variants:[
                {
                    variantId:228,
                    variantColor:'#f7f7f7',
                    variantImage: './img/white.png',
                    variantQuantity: 5
                },
                {
                    variantId:322,
                    variantColor:"#e2b6a9",
                    variantImage: './img/cream.png',
                    variantQuantity: 0
                }
            ],
            sizes:[
                36,38,40,42
            ],
            cart:0,
        }
    },
    methods:{
        addToCart: function () {// == addToCart(){
            this.cart +=1
        },
        updateProduct:function (index) {// == updateProduct(variantImage){
            this.selectedVariant = index
            console.log(index)
        },
        decreaseFromCart(){// == decreaseFromCart:function(){
            this.cart -=1 && this.cart>0
        }
    },
    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale(){
            if( this.onSale){
                return this.brand + ' ' + this.product + 'are on sale'
            }
            return  this.brand + ' ' + this.product + 'aren`t on sale'
        },
        shipping() {
            if ( this.premium) {
                return " Free "
            }
            return ' ' + 2.99
        }
    }

})



var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})