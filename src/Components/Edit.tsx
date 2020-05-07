import React, { useState, useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { Alert, Container, Row, Col } from "react-bootstrap";
import { Card, fetchById, modify, deleteById, blankCard } from "../API/cardApi";
import CardForm from "./CardForm";
import BusinessCard from "./BusinessCard";

interface MatchParams {
  id: string;
}

function Edit({ match }: RouteComponentProps<MatchParams>) {
  const [card, setCard] = useState<Card>({ ...blankCard });
  const [error, setError] = useState<string>("");
  const [editedId, setEditedId] = useState<string | undefined>(undefined);
  const [deleted, setDeleted] = useState<boolean>(false);

  useEffect(() => {
    if (match.params.id) getCard();
    // eslint-disable-next-line
  }, []);

  const getCard = async () => {
    try {
      setCard(await fetchById(match.params.id));
      setError("");
    } catch (err) {
      setCard({ ...blankCard });
      setError(err.message);
    }
  };

  const deleteCard = async () => {
    try {
      if (!card || !card._id) {
        throw new Error("Card ID not available");
      }
      await deleteById(card._id);
      setError("");
      setDeleted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id in card)
      setCard({ ...card, ...{ [event.target.id]: event.target.value } });
    else
      console.error(
        `Specified key "${event.target.id}" not available for this object`
      );
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (card._id) {
      try {
        const modifiedCard = await modify(card._id, card);
        setEditedId(modifiedCard._id);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      {deleted && (
        <Alert variant='warning'>
          Card successfully deleted.{" "}
          <Link to={"/all"}>See all remaining cards.</Link>
        </Alert>
      )}
      {!!error && (
        <Alert variant='danger'>
          {error} <Link to={"/all"}>Go to list of cards.</Link>
        </Alert>
      )}
      {editedId && (
        <Alert variant='success'>
          Person successfully edited.{" "}
          <Link to={"/all"}>Go back to list of all cards.</Link>
        </Alert>
      )}
      <Container>
        <Row>
          <Col>
            <h4>Edit card</h4>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={12} sm={10} md={8} lg={6} className='gray p-2'>
            <CardForm
              handleChange={handleChange}
              handleImage={handleImage}
              onSubmit={handleSubmit}
              onDelete={deleteCard}
              card={card}
              disabled={!!error || deleted}
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

export default Edit;
