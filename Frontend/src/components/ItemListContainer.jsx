import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton'; // Asegúrate de ajustar la ruta según tu estructura

const ItemListContainer = ({className ,greeting, productsData, addToCart }) => {
    return (
        <div style={{ fontWeight: "bold", textAlign: "center", color: "#11456e" }}>
            <div style={{fontSize: "3rem"}} className="greeting">{greeting}</div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" , marginBottom: "150px"}}>
                {
                    productsData.map(product => {
                        return (
                            <Card className="outer-card" key={product.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "transparent"}}>
                            <Card text="info" className="inner-card" style={{  display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "white", position: "relative", bottom: "8.5px" }}>
                                <Link to={`/producto/${product.id}`}>
                                    <Card.Img variant="top" style={{  objectFit: "contain" }} src={product.imagen} />
                                </Link>
                                <Card.Body style={{ textAlign: "center" }}>
                                    <Card.Title style={{ color: "black" }} className='pNombre'>{product.nombre}</Card.Title>
                                    <div style={{ color: "black" }} className='pPrecio'>$ {product.precio}</div>
                                </Card.Body>
                            </Card>
                            <AddToCartButton product={product} addToCart={addToCart} />
                        </Card>                        
                        )
                    })
                }
            </div>
        </div>
    )
};

export default ItemListContainer;
