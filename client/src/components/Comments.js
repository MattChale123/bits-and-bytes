import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'


export default function Comments(props) {
    const [text, setText] = useState('')
    const [comments, setComments] = useState([])
    const user = useSelector(state => state.user)

    const handleChange = (e) => {
        setText({
          ...text,
          [e.target.name]: e.target.value,
        });
      };
      const getComments = () => {
        console.log(props)
        fetch(`/api/v1/posts/${props.postId}/comments`)
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              setComments(data);
            }
          });
      };
    
        useEffect(() => {
            getComments();
        }, []);
    
        const handleSubmit = (e) => { 
          e.preventDefault();
            fetch(`/api/v1/posts/${props.postId}/comments`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                text: text.content
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  alert(data.error);
                } else {
                  setText('');
                  getComments();
                }
              });
          };
    return (
        <div>
          
            <div>
                {comments.slice(0).reverse().map((comment) => {
                    return (
                        <div key={comment.id} style={{textDecoration: 'underline overline'}}>
                            <div>{comment.text} by {comment.User.userName}</div>
                        </div>
                    )
                })}<br />
                {user && (
                  <div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>What are you thinking?</Form.Label><br />
                                    <Form.Control type="text" as="textarea" rows={3} onChange={handleChange} value={text.content}
                                    name="content" required /><br /> 
                                    <Button variant="primary" type="submit">
                                        Reply
                                    </Button>
                            </Form.Group>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    )
}
