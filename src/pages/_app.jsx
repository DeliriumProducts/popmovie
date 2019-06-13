import App, { Container } from 'next/app';
import Router from 'next/router';
import { Global, css } from '@emotion/core';
import Link from 'next/link';
import styled from '@emotion/styled';
import Spinner from '../components/Spinner';
import ContextProvider from '../context/providers/contextProvider.jsx';
import Head from 'next/head';
import { Layout, Button, Divider } from 'antd';
import React from 'react';
import NProgress from 'nprogress';
import '../assets/nprogress.less';
import firebase from '../firebase/index';

const { Header, Content, Footer } = Layout;

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const StyledContent = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  state = {
    user: null,
    loading: true
  };

  componentDidMount() {
    this.unsubscribe = firebase.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loading: false,
          user
        });
      } else {
        this.setState({
          user: null,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleLogin = async () => {
    await firebase.loginWithPopup('google');
  };

  handleLogout = async () => {
    await firebase.logout();
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Frontend template!</title>
        </Head>
        <ContextProvider>
          <Global
            styles={css`
              body {
                min-height: 100%;
                background-color: #282c34;
              }

              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font-family: 'Nunito';
              }

              html {
                height: 100%;
              }

              #__next {
                min-height: 100vh;
              }
            `}
          />
          <Container>
            <Layout>
              <Header>
                <HeaderContainer>
                  <h1>
                    <Link href="/">
                      <strong style={{ cursor: 'pointer' }}>
                        Popmovie!
                        <span aria-label="popcorn" role="img">
                          🍿
                        </span>
                      </strong>
                    </Link>
                    - The largest movie database ever
                  </h1>
                  {this.state.loading ? (
                    <Spinner />
                  ) : this.state.user ? (
                    <div>
                      Hello, {this.state.user.displayName}
                      <Divider type="vertical" />
                      <Button onClick={this.handleLogout}>Logout!</Button>
                    </div>
                  ) : (
                    <Button key="login" onClick={this.handleLogin}>
                      Login with Google!
                    </Button>
                  )}
                </HeaderContainer>
              </Header>
              <StyledContent>
                <Component {...pageProps} />
              </StyledContent>
              <Footer>Delirium Products! ©2019</Footer>
            </Layout>
          </Container>
        </ContextProvider>
      </>
    );
  }
}
