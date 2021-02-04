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
                variantColor:"white"
            },
            {
                variantId:322,
                variantColor:"cream"
            }
        ],
        sizes:[
            36,38,40,42
        ]

    }
})