import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Alert, Button, Row, Col, Container } from "react-bootstrap";
import { Card, fetchAll } from "../API/cardApi";
import BusinessCard from "./BusinessCard";

function ListAll({ match }: RouteComponentProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getPeople();
  }, [match.params]);

  const getPeople = async () => {
    try {
      const newPeople = await fetchAll();
      if (!newPeople.length) throw new Error("The database is empty");
      setCards(newPeople);
      setError("");
    } catch (err) {
      setCards([]);
      setError(err.message);
    }
  };

  const renderListOfCards = () => {
    if (!error)
      return (
        <Row className='justify-content-around'>
          {cards.map((card) => (
            <Col xs={"auto"} key={card._id} className='p-1'>
              <BusinessCard card={card} />
              <div className='text-right'>
                <Link to={`/edit/${card._id}`}>
                  <Button variant='secondary' size='sm' className='m-1 py-0'>
                    Edit
                  </Button>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      );
    else
      return (
        <Row>
          <Col>
            <p>...</p>
          </Col>
        </Row>
      );
  };

  return (
    <>
      {!!error && <Alert variant='danger'>{error}</Alert>}
      <Container className='p-0'>
        <h4>All the business cards</h4>
        <Container className='gray pt-3'>{renderListOfCards()}</Container>
      </Container>
    </>
  );
}

export default ListAll;
