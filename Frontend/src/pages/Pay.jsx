import ImageCarrusel from '../components/ImageCarrusel';
import React, { Component } from 'react'

const Pay = () => {
  


    return (
      <>
      <ImageCarrusel PageRefrence="Formas de Pago" reference="Home/Formas de Pago"/>
      <p className="pay" style={{ fontSize: "20px" , textAlign: "justify", color: "#11456e", marginTop: "20px"}}>
      <img 
          src="../../public/Tarjeta.png" 
          alt="Imagen tarjeta" 
          style={{ width: "20%", height: "180px", float: "left", marginLeft: "15px", position: "relative", bottom: "50px", right: "12px"}}
        />
        Para realizar una compra de algún producto desde la página web, los principales requisitos son:
        estar logeado en la página web y que la compra tenga un valor minimo de 2000 pesos. Una vez cumplido
        dichos requisitos, podra ingresando al carrito de compras realizar la compra ya sea por mercado pago o 
        por efectivo.
      </p>
      <p className="pay" style={{ fontSize: "20px" , textAlign: "justify", color: "#11456e", marginTop: "20px"}}>
      <img 
          src="../../public/mercadoPago.png" 
          alt="Imagen tarjeta" 
          style={{ width: "20%", height: "185px", float: "right", marginRight: "15px", position: "relative", bottom: "20px", left: "12px"}}
        />
        Al realizar una compra con mercado pago usted tiene la libertad de decidir de que manera pagar según las configuraciones de 
        pago que usted maneje en su cuenta de mercado pago. Estas pueden ser tarjetas de crédito, tarjetas de debito, dinero almacenado
        en su cuenta de mercado pago, etc. Al clickear al boton para pagar con mercado pago desde nuestra página web esta lo redigira a 
        un formulario donde usted decidira que medio de pago útilizar. Eso si, tenga en cuenta que si decide pagar vía mercado pago se 
        le cobrara el total más dos comisiónes, la primera de 5.99% + IVA, es decir un 5.99% más el 22% de de ese 5.99%, y la segunda de 
        2.49% + IVA, es decir un 2.49% mas el 22% de de ese 2.49%.
      </p>
      <br/>
      <p className="pay" style={{ fontSize: "20px" , textAlign: "justify", color: "#11456e", marginTop: "20px"}}>
      <img 
          src="../../public/efectivo.png" 
          alt="Imagen tarjeta" 
          style={{ width: "20%", height: "180px", float: "left", marginLeft: "15px"}}
        />
        Para poder pagar en efectivo y recibir el producto debera asistir a nuestro local de manera presencilmente. Al clickear en el boton 
        para pagar en efectivo, recibiremos un mail con los datos de la compra, dichos datos contienen el perfil que realizo la compra, 
        el monto total de la compra y los productos que compro. A diferencia de la paga con mercado pago, la paga en efectivo no tiene 
        comision, por ende el monto total de la compra es el mismo que aparece en primera instancia en el carrito.
      </p>
      </>
    )
}

export default Pay