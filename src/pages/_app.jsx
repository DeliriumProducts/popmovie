import App, { Container } from 'next/app';
import Router from 'next/router';
import { Global, css } from '@emotion/core';
import ContextProvider from '../context/providers/contextProvider.jsx';
import Head from 'next/head';
import { Layout } from 'antd';
import React from 'react';
import NProgress from 'nprogress';
import '../assets/nprogress.less';

const { Header, Content, Footer } = Layout;

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
            <Layout>
              <Header> The largest movie database ever.</Header>
              <Content>
                <Component {...pageProps} />
              </Content>
              <Footer>Footer</Footer>
            </Layout>
          </Container>
        </ContextProvider>
      </>
    );
  }
}
