import Carousel from 'react-bootstrap/Carousel';
import carrusel1 from '../../public/carusel1.jpg';
import carrusel2 from '../../public/carusel2.jpg';
import carrusel3 from '../../public/carusel3.jpg';

const ImageCarrusel =({PageRefrence, reference}) => {
    return (
        <Carousel style={{ width: '125%', height: '400px', position: 'relative', bottom: '35px' }} interval={2500} fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={carrusel1} // Cambia la ruta a la ubicación real de tu imagen
              alt="First slide"
              style={{ height: '400px' }}
            />
            <Carousel.Caption>
            <h1 style={{ color: '#11456e', position: 'relative', bottom: '120px'}}>{PageRefrence}</h1>
            <strong><span style={{ color: '#11456e', fontSize: '25px', position: 'relative', bottom: '10px'}}>{reference}</span></strong>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={carrusel2} // Cambia la ruta a la ubicación real de tu imagen
              alt="Second slide"
              style={{ height: '400px'}}
            />
            <Carousel.Caption>
            <h1 style={{ color: '#11456e', position: 'relative', bottom: '120px'}}>{PageRefrence}</h1>
            <strong><span style={{ color: '#11456e', fontSize: '25px', position: 'relative', bottom: '10px'}}>{reference}</span></strong>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={carrusel3} // Cambia la ruta a la ubicación real de tu imagen
              alt="Third slide"
              style={{ height: '400px'}}
            />
            <Carousel.Caption>
            <h1 style={{ color: '#11456e' , position: 'relative', bottom: '120px'}}>{PageRefrence}</h1>
            <strong><span style={{ color: '#11456e', fontSize: '25px', position: 'relative', bottom: '10px'}}>{reference}</span></strong>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }

export default ImageCarrusel;