import Menu from '../../components/menu';
import Cabecalho from '../../components/cabecalho';
import { Carousel } from 'react-bootstrap';

import Banner from '../../assets/banner1.jpg';
import Banner1 from '../../assets/banner2.png';

import './style.css';

export default function Home() {

    return (
        <div>
            <Menu/>
            <div className="container">
                <Cabecalho titulo='Home' links={[{titulo: 'Home', url: '/'}, {titulo: '', url: ''}]}/>

                <Carousel className='slide'>
                    <Carousel.Item>
                        <img className="slide-img d-block w-100" src={Banner} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="slide-img d-block w-100" src={Banner1} alt="Third slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="slide-img d-block w-100" src={Banner} alt="Third slide" />
                    </Carousel.Item>
                </Carousel>

                <h1 className='home-titulo'>Principais notícias</h1>

            </div>
        </div>
    )
}