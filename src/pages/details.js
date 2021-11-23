import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'wouter';
import { getDetail, getInfoUser } from '../utils/services'
function Details(props) {
    const [account, setAccount] = useState([])
    const [creditCards, setCreditCards] = useState([])
    const [listTransactions, setListTransactions] = useState([])

    useEffect(() => {
        console.log(props)
        async function getDetails() {
            let info = await getInfoUser(); console.log(info)
            let found = await info.find(element => element.id === parseInt(props.params.id));
            console.log(found)
            setAccount(found);
            let details = await getDetail(props.params.id);
            console.log(details)
            setListTransactions(details);
        }
        getDetails();
    }, [])

    const substrNumberAccount = (value) => {
        return value.substr(0, 15);
    }

    const transformTextDate = (date) => {
        const d = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return d.toLocaleString('es', options);
    }

    return (
        <Container >
            <Row>
                <Col className='details' md={{ span: 3, offset: 4 }}>
                    <Link href={"/"}>
                        <Row className='background-back'>
                            <Col md={1} lg={1} className='button-back'>
                                X
                            </Col>
                        </Row>
                    </Link>
                    <Card className='margin-top-2 height-40' >
                        <Card.Body className='align-center'>
                            <Card.Title className=' uppercase'>{account.name} <br />
                                <span className='span-style'>S/{account.balance} </span> <br />
                                <span className='span-style'>Saldo Disponible </span></Card.Title>
                        </Card.Body>
                    </Card>
                    <div className='margin-container-transactions'>
                        <Row>
                            <h6 className='align-left-text color-title-accounts'>ÚLTIMOS MOVIMIENTOS</h6>
                        </Row>
                        <Row>
                            {
                                listTransactions.length > 0 &&
                                listTransactions.map((item) => (
                                    <Row className='margin-bottom-2rem cursor' >
                                        <Col>
                                            <h6 className='align-left-text oblique-bold font-size-13px'>{transformTextDate(item.dateoperation)} </h6>
                                            <h6 className='align-left-text color-account-text'>{substrNumberAccount(item.description)}... </h6>
                                        </Col>
                                        <Col>
                                            <h6 className='align-right-text'>S/{item.amount.toFixed(2)} </h6>
                                        </Col>
                                    </Row>
                                ))
                            }
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container >
    );
}

export default Details;
