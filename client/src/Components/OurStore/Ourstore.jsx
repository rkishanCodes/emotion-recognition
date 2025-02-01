import React from 'react'
import "./OurStore.css";

const Ourstore = () => {
    const popularbooks = [
        {
            image:"/Books/book1.avif"
        },
        {
            image:"/Books/book2.avif"
        },
        {
            image:"/Books/book3.avif"
        },
        {
            image:"/Books/book4.avif"
        },
        {
            image:"/Books/book5.avif"
        },
        {
            image:"/Books/book6.avif"
        },
        {
            image:"/Books/book7.webp"
        },
        {
            image:"/Books/book8.webp"
        },
        {
            image:"/Books/book9.webp"
        },
        {
            image:"/Books/book10.webp"
        },
    ]


  return (
    <div className="ourstore">
      <h1>Most Popular</h1>
      <div className="popular">
        {
            popularbooks.map((book,index)=>(
                <div className="book" key={index}>
                    <img src={book.image} alt="book"/>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Ourstore
