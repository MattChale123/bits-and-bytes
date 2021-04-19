import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router';

export default function Posts(props) {
    const [form, setForm] = useState({
        content: '',
      });
      const history = useHistory();

      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/v1/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: form.content,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              props.fetchPosts()
              history.push('/');
            }
          });
      };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>What are you thinking?</Form.Label><br />
                <Form.Control as="textarea" rows={3} onChange={handleChange} value={form.content}
              name="content" required /><br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
            </Form>
        </div>
    )
}