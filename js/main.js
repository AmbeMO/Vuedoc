var app = new Vue({
    el: '#app',
    data: {
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
        }
    }
})