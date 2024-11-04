import Carousel from 'react-bootstrap/Carousel';

const ImageCarrusel =({PageRefrence, reference}) => {
    return (
        <Carousel style={{ width: '125%', height: '400px', position: 'relative', bottom: '35px' }} interval={2500} fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../public/carusel1.jpg" // Cambia la ruta a la ubicación real de tu imagen
              alt="First slide"
              style={{ height: '400px' }}
            />
            <Carousel.Caption>
            <h1 style={{ color: '#fdcb5c', position: 'relative', bottom: '120px'}}>{PageRefrence}</h1>
            <strong><span style={{ color: '#fdcb5c', fontSize: '25px', position: 'relative', bottom: '10px'}}>{reference}</span></strong>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../public/carusel2.jpg" // Cambia la ruta a la ubicación real de tu imagen
              alt="Second slide"
              style={{ height: '400px'}}
            />
            <Carousel.Caption>
            <h1 style={{ color: '#fdcb5c', position: 'relative', bottom: '120px'}}>{PageRefrence}</h1>
            <strong><span style={{ color: '#fdcb5c', fontSize: '25px', position: 'relative', bottom: '10px'}}>{reference}</span></strong>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../../public/carusel3.jpg" // Cambia la ruta a la ubicación real de tu imagen
              alt="Third slide"
              style={{ height: '400px'}}
            />
            <Carousel.Caption>
            <h1 style={{ color: '#fdcb5c' , position: 'relative', bottom: '120px'}}>{PageRefrence}</h1>
            <strong><span style={{ color: '#fdcb5c', fontSize: '25px', position: 'relative', bottom: '10px'}}>{reference}</span></strong>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }

export default ImageCarrusel;