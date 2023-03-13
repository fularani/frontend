import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/ProductDetail.css'

const ProductDetail = () => {
    const { product_id } = useParams()
      const [product, setProduct] = useState(null)

      useEffect(() => {
        axios({
          method: 'get',
          url: `http://localhost:1337/api/products/${product_id}?populate=*`,
        }).then((res) => {
          setProduct(res.data.data)
          console.log("ProductDetail Response",res.data.data)
        })
      }, [])

  return (
    <div className="container">
          {!product ? (
            <span>Loading...</span>
          ) : (
            <div className="product-detail-container">
              <h1>{product.attributes.name}</h1>
              <div className="product-img-container">
                <img src={`http://localhost:1337${product.attributes.images.data.attributes.formats.thumbnail.url}`} alt="" />
              </div>
              <p>{product.attributes.description}</p>
              <div className="product-reviews">
                <h2>Reviews ({product.attributes.reviews.length})</h2>
                {product.attributes.reviews.data.map((review) => (
                  <div className="product-review" key={review.id}>
                    <h3>{review.attributes.reviewer_name}</h3>
                    <p>{review.attributes.review}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
  )
}

export default ProductDetail