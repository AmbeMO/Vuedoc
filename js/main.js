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
                            <button v-on:click="decreaseFromCart">Clean the cart</button>
                            
                        </div>
                        
                        
                        <div>
                            <h2>Reviews: </h2>
                            <p v-if="!reviews.length">There are no reviews yet.</p>
                            <ul>
                                <li v-for="review in reviews">
                                <p>{{ review.name }}</p>
                                <p>Rating: {{ review.rating }}</p>
                                <p>{{ review.review }}</p>
                                <p>Is recommended: {{ review.recommend }}</p>
                                </li>
                            </ul>
                        </div>
                        
                        
                       <product-review @review-submitted="addReview"></product-review>
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
                    variantQuantity: 15
                },
                {
                    variantId:322,
                    variantColor:"#e2b6a9",
                    variantImage: './img/cream.png',
                    variantQuantity: 10
                }
            ],
            sizes:[
                36,38,40,42
            ],
            reviews: []
        }
    },
    methods:{
        addToCart: function () {// == addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId )
        },
        updateProduct:function (index) {// == updateProduct(variantImage){
            this.selectedVariant = index
            console.log(index)
        },
        decreaseFromCart(){// == decreaseFromCart:function(){
            this.$emit('clean-the-cart', this.variants[this.selectedVariant].variantId )

        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

Vue.component('product-review',{
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
        
        <p v-if="errors.length">
            <b>Please correct the following errors(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>
        
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option disabled value="">Choose one</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        
        <p>
            <label for="recommend">Would u recommend this product: </label><br>
         
           
            <input type="radio" name="recommend" value="recommended" v-model="recommend" >
            <label for="recommended">YES</label>
            
            <input type="radio" name="recommend" value="notRecommended" v-model="recommend">
            <label for="notRecommended">NO</label>
            
        </p>
        
        <p>
            <input type="submit" value="Submit">
        </p>
        
        
        
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if(this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            }
            else {
                if(!this.name) this.errors.push("Name required")
                if(!this.review) this.errors.push("review required")
                if(!this.rating) this.errors.push("rating required")
                if(!this.recommend) this.errors.push("recommend required")
            }
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart : []
    },
    methods: {
        updateCart(id){
            this.cart.push(id)
        },
        decreaseFromCart(id) {
            for( var i = this.cart.length - 1; i >= 0; i--){
                if ( this.cart[i] === id) {
                    this.cart.splice(i,1);
                }
            }
        }

    }
})

