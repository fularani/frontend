import axios from 'axios'
import { useEffect, useState } from 'react'
import '../styles/Home.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'  
import 'react-toastify/dist/ReactToastify.css'; 
import io from 'socket.io-client';
export const socket = io('http://localhost:1337');

const Home = () => {
    const [products, setProducts] = useState([])

    const getProductData=async()=>{
      await axios.get("http://localhost:1337/api/products?populate=*")
        .then(response => {
          setProducts(response.data.data);
          console.log(response.data.data);
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {  
      
      // socket.on("connect",(data)=>{
      //   console.log(data,socket.connected);
      // })
      socket.on("test", (data) => {
        toast.success(data);
        console.log(data,"test");
      })

      socket.on('newProductAdded', (data) => {
        toast.info('A new product has been added')
        console.log(data)
        // setProducts((products) => [res.product, ...products])
      })

      getProductData()
        
    }, [])

  return (
    <div className="container">
          <h1>Products</h1>
          <div className="products-container">
            {products.map((product) => (
              <Link className="product" to={`/${product.id}`} key={product.id}>
                <img src={`http://localhost:1337${product.attributes.images.data.attributes.formats.thumbnail.url}`} alt=''/>
                <h2 className="product-name">{product.attributes.name}</h2>
                <p className="product-desc">{product.attributes.description}</p>
              </Link>
            ))}
          </div>
        </div>
  )
}

export default Home