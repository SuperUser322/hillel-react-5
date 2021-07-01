import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
//import { addDelivery } from '../ducks/cartActions'

const Recipe = (props) => {
  console.log(props);
    const delivery = useRef(null);

    useEffect(() => {
      if(delivery.checked)
        props.substractDelivery()
    }, [props]);

    const handleChecked = (e) => {
      if(e.target.checked){
        props.addDelivery();
      }
      else{
        props.substractDelivery();
      }
    }

    return(
      <div className="container">
        <div className="collection">
          <li className="collection-item">
            <label>
              <input type="checkbox" inputref="delivery" onChange={handleChecked} />
              <span>Delivery(+5$)</span>
            </label>
            </li>
            <li className="collection-item"><b>Total: {props.total} $</b></li>
          </div>
          <div className="checkout">
            <button className="waves-effect waves-light btn">Checkout</button>
        </div>
     </div>
    )
}

const mapStateToProps = (state)=>{
  return{
    addedItems: state.addedItems,
    total: state.total
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    addDelivery: ()=>{dispatch({type: 'ADD_DELIVERY'})},
    substractDelivery: ()=>{dispatch({type: 'SUB_DELIVERY'})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
