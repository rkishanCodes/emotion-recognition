import React from 'react'
import './Products.css';
import Products_card from '../Product_card/Products_card';
const Products = () => {

    const products=[
        {
            productname:"Picture Books",
            image:"/products/book1.png",
            color:"#c14d87"
        },
        {
            productname:"Fact Books",
            image:"/products/book2.png",
            color:"#ffa61a"
        },
        {
            productname:"Easy to  Read",
            image:"/products/book3.png",
            color:"#faa4cb"
        },
    ]


  return (
    <div className="product_section">
        {
            products.map((product,index)=>(
                <Products_card product_name={product.productname} product_image={product.image} color={product.color}/>
            ))
        }
    </div>
  )
}

export default Products
