import React,{Fragment, useEffect} from 'react'
import {CgMouse} from  "react-icons/cg"
import Product from './ProductCard.js';
import "./Home.css"
import MetaData from '../layout/MetaData.js'
import { getProduct ,clearErrors} from '../../actions/productAction.js';
import {useSelector,useDispatch} from "react-redux";
import Loader from '../layout/loader/Loader.js';
import {useAlert} from "react-alert"

const Home = () => {
const dispatch=useDispatch();
const alert=useAlert();
const {loading,error,products} =useSelector((state)=>state.products)
useSelector((state)=>console.log(state));
useEffect(() => {
  if(error){
    alert.error(error)
    dispatch(clearErrors())
}
  dispatch(getProduct());
}, [dispatch,error,alert]);

  return (
    <Fragment>
      {loading?(<Loader/>):
    (<Fragment>
    <MetaData title="ECOMMERCE"/>
     <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
              Scroll <CgMouse/>
          </button>
        </a>
     </div>
     <h2 className='homeHeading'>Featured Products</h2>
     <div className="container" id="container">
      {products && products.map((product)=><Product product={product}/>)}
     </div>
  </Fragment>)}
    </Fragment>
  )
}

export default Home