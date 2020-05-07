import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { Card, createNew, blankCard } from "../API/cardApi";
import CardForm from "./CardForm";
import BusinessCard from "./BusinessCard";

function New() {
  const [card, setCard] = useState<Card>({ ...blankCard });
  const [error, setError] = useState<string>("");
  const [newId, setNewId] = useState<string | undefined>(undefined);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id in card)
      setCard({ ...card, ...{ [event.target.id]: event.target.value } });
    else console.error("Specified key not available for this object");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newCard = await createNew(card);
      setNewId(newCard._id);
      setCard({ ...blankCard });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      try {
        const fileArray = await file.arrayBuffer();
        setCard({
          ...card,
          ...{
            image: {
              data: Buffer.from(fileArray).toJSON(),
              contentType: file.type,
            },
            imageName: file.name,
          },
        });
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    }
  };

  return (
    <>
      {error && <Alert variant='danger'>{error}</Alert>}
      {newId && (
        <Alert variant='success'>
          New person successfully created.{" "}
          <Link to={`/edit/${newId}`}>Edit the card.</Link>
        </Alert>
      )}

      <Container>
        <Row>
          <Col>
            <h4>Create new card</h4>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={12} sm={10} md={8} lg={6} className='gray p-2'>
            <CardForm
              handleChange={handleChange}
              handleImage={handleImage}
              onSubmit={handleSubmit}
              card={card}
            />
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col>
            <h5>Preview:</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <BusinessCard card={card} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default New;
