import React from 'react';

const AdminPage = () => {
    return (
        <div className="admin-page">
            <h1>Panel de Administración</h1>
            <p>Bienvenido al panel de administración. Aquí podras administrar los productos tanto como sus categorías y subcategorías.
                Es decir, podras agregar, modificar y eliminar los datos de todo el catalogo de productos y todo lo relacionado a estos. Para ello debes acceder al panel de lo que sea 
                que quieras administrar, ya sean productos, categorías o subcategorías, y a partir de ahí realizar las acciones que desees.
            </p>
            <ul>
                <li>Agregar: Añadir un nuevo elemento a la página para que todo el mundo lo vea y pueda comprarlo</li>
                <br/>
                <p>Paso 1:</p>
                <img src="/Crear 1.png" alt="Crear1" className="AdminImage"/>
                <br/>
                <br/>
                <p>Paso 2:</p>
                <img src="/Crear 2.png" alt="Crear2" className="AdminImage"/>
                <br/>
                <br/>
                <p>Paso 3:</p>
                <img src="/Crear 3.png" alt="Crear3" className="AdminImage"/>
                <br/>
                <br/>
                <li>Modificar: Modificar un elemento existente en la página al cual quieras ya sea modificar algún dato en especifico o todo en general</li>
                <br/>
                <p>Paso 1:</p>
                <img src="/Modificar 1.png" alt="Modificar1" className="AdminImage"/>
                <br/>
                <br/>
                <p>Paso 2:</p>
                <img src="/Modificar 2.png" alt="Modificar2" className="AdminImage"/>
                <br/>
                <br/>
                <p>Paso 3:</p>
                <img src="/Modificar 3.png" alt="Modificar3"  className="AdminImage"/>
                <br/>
                <li>Eliminar: Eliminar un elemento existente en la página en caso de que ya no lo vendas o se haya agotado y no quieras mostrarlo al público</li>
                <p>Paso 1:</p>
                <img src="/Eliminar 1.png" alt="Eliminar1" className="AdminImage"/>
                <br/>
                <br/>
                <p>Paso 2:</p>
                <img src="/Eliminar 2.png" alt="Eliminar2" className="AdminImage"/>
                <br/>
                <br/>
                <p>Paso 3:</p>
                <img src="/Eliminar 3.png" alt="Eliminar3" className="AdminImage"/>
                <br/>
                <li>Favorito: <strong>Función exclusiva para productos</strong>. Esto sirve nomas para que decidas que productos mostrar en <strong>Home</strong></li>
                <img src="/Favorito.png" alt="Favorito" className="ImagenFavorita"/>
            </ul>
        </div>
    );
};

export default AdminPage;
