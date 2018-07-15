import React from 'react';
import { Container, Columns, Column } from 'bloomer';

import './Footer.scss';

const Footer = () => (
  <footer className="sa-footer">
    <Container>
      <Columns>
        <Column>
          <p className="links">
            <span className="link">
              <a href="https://unihack.net/press">Press Kit</a>
            </span>
            <span className="link">
              <a href="https://unihack.net/privacy">Privacy Policy</a>
            </span>
            <span className="link">
              <a href="https://unihack.net/terms">Terms of Service</a>
            </span>
          </p>
          <p>
            Made with <i className="fa fa-heart love" /> and{' '}
            <a className="coffeetime">
              C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>
            </a>{' '}
            in 🇦🇺
          </p>
          <p className="copyright">&copy; 2018 UNIHACK INCORPORATED. All Rights Reserved.</p>
        </Column>
      </Columns>
    </Container>
  </footer>
);

export default Footer;
