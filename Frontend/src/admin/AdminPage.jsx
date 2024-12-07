import React from 'react';

const AdminPage = () => {
    return (
        <div>
            <h1>Panel de Administración</h1>
            <p style={{ fontSize: "20px", textAlign: "justify"}}>Bienvenido al panel de administración. Aquí podras administrar los productos tanto como sus categorías y subcategorías.
                Es decir, podras agregar, modificar y eliminar los datos de todo el catalogo de productos y todo lo relacionado a estos. Para ello debes acceder al panel de lo que sea 
                que quieras administrar, ya sean productos, categorías o subcategorías, y a partir de ahí realizar las acciones que desees.
            </p>
            <ul style={{ fontSize: "20px", textAlign: "justify"}}>
                <li>Agregar: Añadir un nuevo elemento a la página para que todo el mundo lo vea y pueda comprarlo</li>
                <br/>
                <p style={{ fontSize: "20px", textAlign: "justify"}}>Paso 1:</p>
                <img src="./public/Crear 1.png" alt="Crear1" style={{width:'500px' , height: '300px'}}/>
                <br/>
                <br/>
                <p style={{ fontSize: "20px", textAlign: "justify"}}>Paso 2:</p>
                <img src="./public/Crear 2.png" alt="Crear2" style={{width:'500px' , height: '300px'}}/>
                <br/>
                <br/>
                <p style={{ fontSize: "20px", textAlign: "justify"}}>Paso 3:</p>
                <img src="./public/Crear 3.png" alt="Crear3" style={{width:'500px' , height: '300px'}}/>
                <br/>
                <br/>
                <li>Modificar: Modificar un elemento existente en la página al cual quieras ya sea modificar algún dato en especifico o todo en general</li>
                <br/>
                <p style={{ fontSize: "20px", textAlign: "justify"}}>Paso 1:</p>
                <img src="./public/Modificar 1.png" alt="Modificar1" style={{width:'500px' , height: '300px'}}/>
                <br/>
                <br/>
                <p style={{ fontSize: "20px", textAlign: "justify"}}>Paso 2:</p>
                <img src="./public/Modificar 2.png" alt="Modificar2" style={{width:'500px' , height: '300px'}}/>
                <br/>
                <br/>
                <p style={{ fontSize: "20px", textAlign: "justify"}}>Paso 3:</p>
                <img src="./public/Modificar 3.png" alt="Modificar3" style={{width:'500px' , height: '300px'}}/>
                <br/>
                <li>Eliminar: Eliminar un elemento existente en la página en caso de que ya no lo vendas o se haya agotado y no quieras mostrarlo al público</li>
                <p style={{ fontSize: "20px", textAlign: "justify"}}>Paso 1:</p>
                <img src="./public/Eliminar 1.png" alt="Eliminar1" style={{width:'500px' , height: '300px'}}/>
                <br/>
                <br/>
                <p style={{ fontSize: "20px", textAlign: "justify"}}>Paso 2:</p>
                <img src="./public/Eliminar 2.png" alt="Eliminar2" style={{width:'500px' , height: '300px'}}/>
                <br/>
                <br/>
                <p style={{ fontSize: "20px", textAlign: "justify"}}>Paso 3:</p>
                <img src="./public/Eliminar 3.png" alt="Eliminar3" style={{width:'500px' , height: '300px'}}/>
                <br/>
                <li>Favorito: <strong>Función exclusiva para productos</strong>. Esto sirve nomas para que decidas que productos mostrar en <strong>Home</strong></li>
                <img src="./public/Favorito.png" alt="Favorito" style={{width:'800px' , height: '100px'}}/>
            </ul>
        </div>
    );
};

export default AdminPage;
