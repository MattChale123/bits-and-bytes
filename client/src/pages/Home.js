import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  Route, Switch, useHistory } from 'react-router';
import Posts from '../components/Posts'
import { setUser } from '../redux/actions';
import { Button, Navbar } from 'react-bootstrap'
import Login from '../pages/Login';
import Register from '../pages/Register';
import { Link } from 'react-router-dom';
import Comments from '../components/Comments';
import navImage from '../img/cogs.jpeg'
import background from '../img/main-page.jpeg'

export default function Home() {
    const [ posts, setPosts ] = useState([])
    const [userStatus, setUserStatus] = useState('LOADING');
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const logout = () => {
        fetch('/api/v1/users/logout')
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert(data.success);
              dispatch(setUser(null));
              history.push('/login');
            }
          });
      };
    const fetchPosts = () => {
        fetch('/api/v1/posts')
        .then((res) => res.json())
        .then((data) => {
            setPosts(data)
        });
    }
    useEffect(() => { 
        fetchPosts()
    }, [])
    useEffect(() => {
        fetch('/api/v1/users/current')
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    dispatch(setUser(data))
                }
                setUserStatus('CHECKED')
            })
    }, [dispatch])
    let styles = {
        border: '1px solid black',
        borderRadius: '50px',
        margin: '5px',
        width: 'calc(50% - 10px)',
        display: 'flex',
        flexDirection: 'column'
   };
   let containerStyles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
};
   
    return (
        <div style={{ 
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'noRepeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            minHeight: '900px'
           }}>            
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                <img
                    alt=""
                    src={navImage}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Bits and Bytes
                </Navbar.Brand>
                <div>
                    <Button as={Link} to='/login' style={{marginLeft: '10px'}}>Log In</Button>
                    <Button as={Link} to='/register' style={{marginLeft: '10px'}}>Register</Button>
                    <Button onClick={logout} style={{marginLeft: '10px'}}>Log Out</Button>
                </div>
            </Navbar>
            <Container>
                <Switch>
                    <Route path='/' exact>
                        <Posts fetchPosts={fetchPosts}/>
                        <div style={containerStyles}>
                            {posts.slice(0).reverse().map((post) => {
                                return (
                                    <Card style={styles} key={post.id}>
                                        <Card.Body>
                                            <Card.Text>{post.content}</Card.Text>
                                            <Comments postId={post.id} />
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </div>
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                </Switch>
            </Container>
        </div>
    )
}

