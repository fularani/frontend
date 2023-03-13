import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import "../styles/AddProduct.css"
import { socket } from './Home'
import axios from 'axios'

const AddProduct = () => {
    const [name, setName] = useState(null)
      const [description, setDescription] = useState(null)
      const [loading, setLoading] = useState(false)
      const [images, setimages] = useState(File|null)
      const [imageUrl, setImageUrl] = useState("")
    //   const [processing, setProcessing] = useState(false)

    // const formSubmit = (e) => {
    //     e.preventDefault()
    //     setProcessing(true)

    //     socket.emit('addProduct', { name, description }, (product) => {
    //       setProcessing(false)
    //       toast.success('Product added successfully!')
    //       setTimeout(() => {
    //         window.location.href = `/${product.id}`
    //       }, 1000)
    //     })
    //   }

    const handleUpload = (event) => {
        if (event.target.files!=null) {
            setimages(event.target.files[0])
        }
    }

    useEffect(() => {
    
        if (images) {
          setImageUrl(URL.createObjectURL(images))
        }
      
      }, [images])

    const onformSubmit=(e)=>{
        e.preventDefault();
        setLoading(true)

        let formData= new FormData();
        formData.append("files.images", images);

        let body={
            "name":name,
            "description":description,   
            "images":images         
        }

        formData.append('data', JSON.stringify(body));

        axios
          .post("http://localhost:1337/api/products",formData)
          .then(response => {
            if ([200, 201].includes(response.status)) {
                setLoading(true)
                console.log('<----------------get data----------->');
                if (response.data && response.data.data) {
                  setTimeout(() => {
                  console.log("Now set state and response is",JSON.stringify(response.data.data, null, 2));
                  setLoading(false)
                  }, 1000)
                  toast.success('Product added successfully!', {
                    position: toast.POSITION.TOP_CENTER
                  })

                  console.log({ name, description, images });
                  socket.emit('addProduct', {
                    name,
                    description,
                    images,
                 });
                //   setTimeout(() => {
                //   window.location.href = `/${response.data.data.id}`
                //   }, 1000)
                }
              }
              else{
                setLoading(false)
                toast.error(`${response.status} ${response.statusText}`, {
                  position: toast.POSITION.TOP_CENTER
                });
              }
          })
          .catch(err => {
            setLoading(false)
            console.error(err);
            
            toast.error('Something Wrong !', {
              position: toast.POSITION.TOP_CENTER
            });
          });

          setName("")
          setDescription("")
          setimages(null)
    }

  return (
    <div className="container">
          <div className="add-product">
            <h1>Add Product</h1>
            <form onSubmit={onformSubmit}>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="description">Description</label>
                <input onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className='input-group'>
              <label htmlFor="images">Product Image</label>
              <input
                      id='images'
                      type='file'
                      className='form-control form-control-lg form-control-solid'
                      name='images'
                      accept='image/*'
                      onChange={handleUpload}
                    />
              {imageUrl && images && (
                <div className='d-flex justify-content-center mt-5'>
                  <img src={imageUrl} alt={images} className="h-50 w-50" />
                </div>
              )}
              </div>
              <button disabled={loading} type="submit">
                {loading ? 'Processing' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
  )
}

export default AddProduct