import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Alert, Row, Col, Container } from "react-bootstrap";
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
      if (!newPeople.length) throw new Error("No Data");
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
        <Row>
          {cards.map((card) => (
            <Col key={card._id} className='p-1'>
              <BusinessCard card={card} />{" "}
              <Link to={`/edit/${card._id}`}>
                <p className=''>Edit</p>
              </Link>
            </Col>
          ))}
        </Row>
      );
    else return <p>[No data loaded]</p>;
  };

  return (
    <>
      {!!error && <Alert variant='danger'>{error}</Alert>}
      <Container>
        <h4>All the business cards</h4>
        <Container className='gray pt-3'>{renderListOfCards()}</Container>
      </Container>
    </>
  );
}

export default ListAll;
