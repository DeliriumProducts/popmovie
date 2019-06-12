import App, { Container } from 'next/app';
import Router from 'next/router';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import ContextProvider from '../context/providers/contextProvider.jsx';
import Head from 'next/head';
import { Layout, Menu } from 'antd';
import React from 'react';
import NProgress from 'nprogress';
import '../assets/nprogress.less';

const { Header, Content, Footer } = Layout;
const { Item } = Menu;

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

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
                font-family: 'Josefin Sans';
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
            <StyledLayout>
              <Header>
                <HeaderContainer>
                  <h1>The largest movie database ever.</h1>{' '}
                  <Menu mode="horizontal" theme="dark">
                    <Item key="login">Login with Google!</Item>
                  </Menu>
                </HeaderContainer>
              </Header>
              <StyledContent>
                <Component {...pageProps} />
              </StyledContent>
              <Footer>Delirium Products! ©2019</Footer>
            </StyledLayout>
          </Container>
        </ContextProvider>
      </>
    );
  }
}
