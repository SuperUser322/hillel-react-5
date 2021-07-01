import React from 'react';
//import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
//import { removeItem,addQuantity,subtractQuantity} from '../ducks/cartActions';
//import Recipe from './Recipe';

export const CartPage = (state) => {
console.log(state);
    //to remove the item completely
  /*const handleRemove = (id)=>{
      removeItem(id);
  }
  //to add the quantity
  const handleAddQuantity = (id)=>{
      addQuantity(id);
  }
  //to substruct from the quantity
  const handleSubtractQuantity = (id)=>{
      subtractQuantity(id);
  }
  //console.log(props.items);
  let addedItems = props.item !== undefined ?  //props.item.length не существует точно так же как и самого props.item
    (props.items.map(item=>{
      return(
        <li className="collection-item avatar" key={item.id}>
          <div className="item-img">
            <img src={item.img} alt={item.img} className=""/>
          </div>

          <div className="item-desc">
            <span className="title">{item.title}</span>
            <p>{item.desc}</p>
            <p><b>Price: {item.price}$</b></p>
            <p>
              <b>Quantity: {item.quantity}</b>
            </p>useState,
            <div className="add-remove">
              <Link to="/cart"><i className="material-icons" onClick={()=>{handleAddQuantity(item.id)}}>arrow_drop_up</i></Link>
              <Link to="/cart"><i className="material-icons" onClick={()=>{handleSubtractQuantity(item.id)}}>arrow_drop_down</i></Link>
            </div>
            <button className="waves-effect waves-light btn pink remove" onClick={()=>{handleRemove(item.id)}}>Remove</button>
          </div>
        </li>
      )
    })
    ) : (
      <p>_Empty_</p>
    )
    return(
      <div className="container">
        <div className="cart">
          <h3>Your order:</h3>
          <ul className="collection">
              {addedItems}
          </ul>
        </div>
        <Recipe />
      </div>
   )*/
   return(
     <div>-Empty-</div>
   )

}

/*
const mapStateToProps = (state)=>{
  return{
    items: state.addedItems,
    //addedItems: state.addedItems
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    removeItem: (id)=>{dispatch(removeItem(id))},
    addQuantity: (id)=>{dispatch(addQuantity(id))},
    subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CartPage)
*/
