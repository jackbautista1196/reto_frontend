import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'wouter';
import { getInfoUser } from '../utils/services'
function Home() {
    const [accounts, setAccounts] = useState([])
    const [creditCards, setCreditCards] = useState([])

    useEffect(() => {
        async function getInfo() {
            let arrayAccounts = [];
            let arrayCreditCards = [];
            let info = await getInfoUser();
            info.map(item => {
                if (item.status === "ACTIVE") {
                    if (item.type === "CREDIT_CARD") {
                        arrayCreditCards.push(item)
                    } else {
                        arrayAccounts.push(item)
                    }
                }
            })
            setAccounts(arrayAccounts);
            setCreditCards(arrayCreditCards);
        }
        getInfo();
    }, [])

    const substrNumberAccount = (value) => {
        return value.substr(value.length - 4, 4);
    }

    return (
        <Container >
            <Row>
                <Col className='details' md={{ span: 3, offset: 4 }}>
                    <Card className='margin-top-2  height-40' >
                        <Card.Body className='align-center'>
                            <Card.Title className='align-left-text'>Hola Renzo <br /> <span className='span-style'>Bienvenido!</span></Card.Title>
                        </Card.Body>
                    </Card>
                    <Card className='margin-top-2' >
                        <Card.Body >
                            <Row>
                                <h6 className='align-left-text color-title-accounts'>CUENTAS</h6>
                            </Row>
                            {
                                accounts.length > 0 &&
                                accounts.map((item) => (
                                    <Link href={"/detail/" + item.id}>
                                        <Row className='margin-bottom-2rem cursor'>
                                            <Col>
                                                <h6 className='align-left-text color-account-text uppercase'>{item.name} </h6>
                                                <h6 className='align-left-text oblique-bold'>*{substrNumberAccount(item.number)} </h6>
                                            </Col>
                                            <Col>
                                                <h6 className='align-right-text'>S/{item.balance} </h6>
                                                <h6 className='align-right-text color-title-accounts'>Saldo disponible</h6>
                                            </Col>
                                        </Row>
                                    </Link>
                                ))
                            }

                        </Card.Body>
                    </Card>
                    <Card className='margin-top-2' >
                        <Card.Body >
                            <Row>
                                <h6 className='align-left-text color-title-accounts'>TARJETAS</h6>
                            </Row>
                            {
                                creditCards.length > 0 &&
                                creditCards.map((item) => (
                                    <Link href={"/detail/" + item.id} >
                                        <Row className='margin-bottom-2rem cursor'>
                                            <Col>
                                                <h6 className='align-left-text color-account-text uppercase'>{item.name} </h6>
                                                <h6 className='align-left-text oblique-bold'>*{substrNumberAccount(item.number)} </h6>
                                            </Col>
                                            <Col>
                                                <h6 className='align-right-text'>S/{item.balance} </h6>
                                                <h6 className='align-right-text color-title-accounts'>Saldo disponible</h6>
                                            </Col>
                                        </Row>
                                    </Link>
                                ))
                            }

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
