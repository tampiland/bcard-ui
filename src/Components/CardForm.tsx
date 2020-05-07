import React from "react";
import { Button, Form, Col } from "react-bootstrap";
import { Card } from "../API/cardApi";

interface CardFormProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
  card: Card;
  disabled?: boolean;
}

const srOnly = true;

const CardForm = (props: CardFormProps) => {
  return (
    <div>
      <Form onSubmit={props.onSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId='name'>
            <Form.Label srOnly={srOnly}>First name</Form.Label>
            <Form.Control
              required
              type='text'
              value={props.card.name}
              onChange={props.handleChange}
              placeholder='First name'
              disabled={props.disabled}
            />
          </Form.Group>
          <Form.Group as={Col} controlId='surName'>
            <Form.Label srOnly={srOnly}>Last name</Form.Label>
            <Form.Control
              type='text'
              value={props.card.surName}
              onChange={props.handleChange}
              placeholder='Last name'
              disabled={props.disabled}
            />
          </Form.Group>
        </Form.Row>{" "}
        <Form.Row>
          <Form.Group as={Col} controlId='telephone'>
            <Form.Label srOnly={srOnly}>Phone number</Form.Label>
            <Form.Control
              type='text'
              value={props.card.telephone}
              onChange={props.handleChange}
              placeholder='Phone'
              disabled={props.disabled}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId='email'>
            <Form.Label srOnly={srOnly}>Email address</Form.Label>
            <Form.Control
              type='email'
              value={props.card.email}
              onChange={props.handleChange}
              placeholder='Email address'
              disabled={props.disabled}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId='image'>
            <Form.Label srOnly={srOnly}>Image</Form.Label>
            <Form.File
              label={props.card.imageName || "Select a photo"}
              accept='image/*'
              custom
              onChange={props.handleImage}
              disabled={props.disabled}
            />
          </Form.Group>
        </Form.Row>
        <div>
          <Button
            variant='primary'
            size='sm'
            className='m-1'
            type='submit'
            disabled={props.disabled}>
            Submit
          </Button>
          <Button
            variant='secondary'
            size='sm'
            className='m-1'
            onClick={() => window.history.back()}
            disabled={props.disabled}>
            Back
          </Button>
          {props.onDelete && (
            <Button
              variant='danger'
              size='sm'
              className='m-1'
              onClick={props.onDelete}
              disabled={props.disabled}>
              Delete
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default CardForm;
