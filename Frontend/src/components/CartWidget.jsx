import { Link } from 'react-router-dom';
import CartWidget from './public/carrito.png';

const CartWidget = () =>{

    return(
        <Link to="/cart">
        <div style={{color: 'white', fontSize:'18px', marginRight: '50px'}} className="cart-widget">
            <span><img src={CartWidget} style={{width:'30px' , height: '30px'}}></img></span>  
        </div>
        </Link>
        
    )
}

export default CartWidget;