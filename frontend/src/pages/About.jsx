import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Col, Row, Button} from 'react-bootstrap';
import '../styles/About.css';
import Image1 from '../img/other/IMG_4831.JPEG';
import Image2 from '../img/other/IMG_4815.JPEG';

function AboutUs(){
    return(
        <div>
            <Container className='text-center mt-4'>
                <h1 >Race-001 Autókölcsönző - Rólunk</h1>
                <p>Ismerd meg jobban a csapatunkat</p>
                <Button as={Link} to="/Contact" className='mb-5' variant="outline-dark">Kapcsolatfelvétel</Button>
            </Container>

                <Container className='mb-5 welcome bg-body-tertiary pt-3'>
                    <Row>
                        <Col xs={12} md={4} className='text-center'>
                            <p><span className="initial">Ü</span>dvözlünk a Race-001 Autókölcsönző weboldalán! Mi egy két fős csapat vagyunk, akiknek közös szenvedélye az autók világa. Hiszünk abban, hogy egy igazán különleges autó nem csupán egy közlekedési eszköz, hanem egy élmény, amely minden utazást felejthetetlenné tesz.
                                A mi gondolatunk a kényelem, az elegancia és a luxus köré épül. A célunk, hogy a legjobb prémium autókat kínáljuk ügyfeleinknek, akik értékelik a minőséget és a stílust. Minden autót, amit kölcsönözhetsz tőlünk, úgy válogattunk, hogy a legmagasabb szintű vezetési élményt biztosítsa, miközben minden utazás kényelmes és emlékezetes marad.
                                Csapatunk elkötelezett abban, hogy a legjobb autós élményeket nyújtsa számodra, és segítsen megtalálni az ideális járművet bármilyen alkalomra.</p>
                        </Col>
                        <Col md={4} className='text-center'>
                            <p></p>
                        </Col>
                        <Col xs={12} md={4}>
                            <img src={Image1} alt='Kép1' className='small-image'></img>
                        </Col>
                    </Row>
                </Container>

                <Container className='welcome bg-body-tertiary pt-3'>
                    <Row>
                        <Col xs={12} md={4} className=''>
                            <img src={Image2} alt='Kép2' className='small-image'></img>
                        </Col>
                        <Col md={4} className=''>
                            <p></p>
                        </Col>
                        <Col xs={12} md={4} className='text-center'>
                            <p><span className="initial">A</span>Race-001 Autókölcsönző weboldalán rengeteg prémium autó márka közül válogathatsz, így biztosan megtalálod azt a járművet, amelyik a legjobban illik hozzád. Legyen szó egy kényelmes városi autóról, vagy egy elegáns sportkocsiról, nálunk mindenki talál számára megfelelő opciót. Mi mindig a legjobb minőségre törekszünk, hogy az autózás élménye valóban különleges legyen.
                                Emellett az ügyfélszolgálatunk 0-24 órában elérhető, így bármikor kereshetsz minket, ha kérdésed van, vagy segítségre van szükséged.
                                Az adatkezelés kiemelt figyelmet kap nálunk, mindent megteszünk annak érdekében, hogy a személyes adataid teljes biztonságban legyenek. Mi biztosítjuk, hogy minden információ védve legyen, és nyugodtan használhatod a szolgáltatásainkat anélkül, hogy aggódnod kellene.</p>
                        </Col>
                    </Row>
                </Container>        
        </div>
    )
}
export default AboutUs;