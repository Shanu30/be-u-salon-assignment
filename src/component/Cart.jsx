import React from "react";
import {useState, useEffect} from 'react'
import axios from "axios"

export default function Cart() {
  const [list, setList] = useState([]);
  const [cart, setCart] = useState([]);

  const getList = async () => {
    let res = await fetch("http://localhost:3000/list");
    let data = await res.json();
    setList(data);
  };
  useEffect(() => {
    getList();
  }, []);

  const getCart = async () => {
    let res = await fetch("http://localhost:3000/cart");
    let data = await res.json();
    setCart(data);
  };
  useEffect(() => {
    getCart();
  }, []);

  const postcart = async(cartname) => {
    await axios.post("http://localhost:3000/cart",{name:cartname});
    getCart()
  }
  const removecart = async(id) => {
    await axios.delete(`http://localhost:3000/cart/${id}`);
    getCart()
  }

  return (
    <div className="App">
      <h1>Cart items:{cart.length}</h1>
      <hr/>
      <h3>List</h3>
      {list.map((item) => {
        return (
            <div key={item.id}>
                <hr/>
                <span>{item.name}</span>
                <button onClick={()=>postcart(item.name)}>Add to cart</button>
            </div>
        )
      })}
      <hr/>
      <h3>Cart</h3>
      {cart.map((item) => {
        return (
            <div key={item.id}>
                <hr/>
                <span>{item.name}</span>
                <button onClick={()=>removecart(item.id)}>Remove</button>
            </div>
        )
      })}
    </div>
  );
}
