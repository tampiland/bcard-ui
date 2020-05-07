import React from "react";
import { Card } from "../API/cardApi";
import defaultImage from "../default-person.png";
import { Container, Row, Col } from "react-bootstrap";

interface BusinessCardProps {
  card: Card;
}

const BusinessCard = (props: BusinessCardProps) => {
  const { card } = props;
  let imageUrl = "";

  if (card.image) {
    try {
      const buffer = Buffer.from(card.image.data.data);
      const arrayBuffer = Uint8Array.from(buffer);
      const blob = new Blob([arrayBuffer], { type: card.image.contentType });
      const urlCreator = window.URL || window.webkitURL;
      imageUrl = urlCreator.createObjectURL(blob);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container
      className='border p-1 bg-white'
      style={{ width: "20em", height: "10em" }}>
      <Container className='text-left h-100'>
        <Row className='h-100'>
          <Col xs={8} className='d-flex flex-column justify-content-end'>
            <h5>{`${card.name} ${card.surName}`}</h5>
            <span className='small'>{`Phone: ${card.telephone}`}</span>
            <span className='small mb-2'>{`Email: ${card.email}`}</span>
          </Col>
          <Col xs={4} className='p-0'>
            <img
              src={imageUrl || defaultImage}
              alt={`${card.name} ${card.surName}`}
              className='img-thumbnail'
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default BusinessCard;
