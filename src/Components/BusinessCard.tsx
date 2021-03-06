import React from "react";
import { Card, getImageUrl } from "../API/cardApi";
import defaultImage from "../default-person.png";
import { Container, Row, Col } from "react-bootstrap";

interface BusinessCardProps {
  card: Card;
}

const BusinessCard = (props: BusinessCardProps) => {
  const { card } = props;
  let imageUrl = getImageUrl(card);

  return (
    <Container
      className='border p-1 bg-white'
      style={{ width: "20em", height: "10em" }}>
      <Container className='text-left h-100'>
        <Row className='h-100'>
          <Col
            xs={"auto"}
            className='d-flex flex-column justify-content-end'
            style={{ width: "13em" }}>
            <h5>{`${card.name} ${card.surName}`}</h5>
            <span className='small'>{`Phone: ${card.telephone}`}</span>
            <span className='small mb-2'>{`Email: ${card.email}`}</span>
          </Col>
          <Col
            className='p-0 h-100'
            style={{ width: "6em", overflow: "hidden" }}>
            <img
              src={imageUrl || defaultImage}
              alt={`${card.name} ${card.surName}`}
              className='img-thumbnail'
              style={{
                objectFit: "cover",
                height: "67%",
                width: "100%",
              }}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default BusinessCard;
