import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import AddToCartButton from '../components/AddToCartButton'; // Asegúrate de ajustar la ruta según tu estructura

const ItemListContainer = ({ greeting, productsData, addToCart }) => {
    return (
        <div style={{ fontWeight: "bold", textAlign: "center", color: "lightblue" }}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>{greeting}</div>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
                {
                    productsData.map(product => {
                        return (
                            <div key={product.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Card bg="primary" text="info" style={{ width: '19rem', height: "550px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    <Link to={`/producto/${product.id}`}>
                                        <Card.Img variant="top" style={{ height: "300px", width: "250px", objectFit: "cover" }} src={product.imagen} />
                                    </Link>
                                    <Card.Body style={{ textAlign: "center" }}>
                                        <Card.Title style={{ color: "white" }}>{product.nombre}</Card.Title>
                                        <div style={{ color: "white" }}><strong>Cantidad en venta:</strong> {product.stock}</div>
                                        <div style={{ color: "white" }}>$ {product.precio}</div>
                                        {/* Aquí se incluye el componente AddToCartButton */}
                                        <AddToCartButton product={product} addToCart={addToCart} />
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default ItemListContainer;
