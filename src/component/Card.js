import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './contextreducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef(null);
  const { foodItem, options, imgsrc, description } = props;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleCart = async () => {
  
      let food = []
      for (const item of data) {
        if (item.id === foodItem._id) {
          food = item;
  
          break;
        }
      }
  
      if (food !== []) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
          console.log("Size different so simply ADD one more to the list")
          return
        }
        return
      }
  
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
  
  
      // setBtnEnable(true)
  
    }

  let finalPrice = qty * parseInt(options[size] || 0); // Ensure valid calculation

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, [priceRef]);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img className="card-img-top" src={imgsrc} alt={foodItem.name} style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <p className="card-text">{description}</p>
          <div className='container w-100'>
            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)} value={qty}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)} value={size}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>{data}</option>
              ))}
            </select>
            <div className='d-inline h-100 fs-5'>
              ₹{finalPrice}/-
            </div>
            <hr />
            <button className='btn btn-success justify-center ms-2' onClick={handleCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
