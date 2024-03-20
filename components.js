import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { LoadingMessage, EmptyStateMessage } from './styles';

// Componente Header
const Header = ({ title }) => {
  const styles = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#333',
    color: '#fff',
  };

  return (
    <header style={styles}>
      <h1>{title}</h1>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// Componente Footer
const Footer = () => {
  const styles = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#333',
    color: '#fff',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  };

  return (
    <footer style={styles}>
      <p>Copyright 2024 UVG</p>
    </footer>
  );
};

// Componente Post
const Post = ({ title, body }) => {
  return (
    <li>
      <h2>{title}</h2>
      <p>{body}</p>
    </li>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

// Componente Posts
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const apiResponse = await fetch('https://api.tiburoncin.lat/22266/posts');
        const jsonPosts = await apiResponse.json();
        const formattedPosts = jsonPosts.map(({ title, content }) => ({ title, body: content }));
        setPosts(formattedPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  if (posts.length === 0) {
    return <EmptyStateMessage>No posts available.</EmptyStateMessage>;
  }

  return (
    <ul>
      {posts.map(({ title, body }, index) => (
        <Post key={index} title={title} body={body} />
      ))}
    </ul>
  );
};

// Componente App
const App = () => {
  return (
    <div>
      <Header title="WELCOME TO MY BLOG" />
      <Posts />
      <Footer />
    </div>
  );
};

export default App;

