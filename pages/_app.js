import App, {Container} from 'next/app';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import startI18n from '../src/startI18n';
import { getTranslation } from '../src/translationHelpers';

export default class customApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const lang = ctx.query.lang || 'es'; //MOVER AL SERVER!
    const translations = await getTranslation(
      lang,
      ['common', 'index'],
      'http://localhost:3000/static/locales/' // PONER URL EN .ENV
    );

    return { pageProps, translations, lang };
  }

  constructor (props) {
    super(props);
    this.i18n = startI18n(props.translations, props.lang);
  }

  render () {
    const {Component, pageProps} = this.props;
    return (
      <Container>
        <I18nextProvider i18n={this.i18n}>
          <Component {...pageProps} />
        </I18nextProvider>
      </Container>
    );
  }
}
