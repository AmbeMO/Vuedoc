var app = new Vue({
    el: '#app',
    data: {
        product: 'Underwear',
        description: 'White underwear for women',
        image: "./img/white.jpg",
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
                variantColor:"white",
                variantImage: './img/white.jpg'
            },
            {
                variantId:322,
                variantColor:"cream",
                variantImage: './img/cream.jpg'
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
        updateProduct:function (variantImage) {// == updateProduct(variantImage){
            this.image = variantImage
        },
        decreaseFromCart(){// == decreaseFromCart:function(){
            this.cart -=1 && this.cart>0
        }
    }
})