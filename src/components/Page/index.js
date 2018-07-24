import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Container } from 'bloomer';
import './index.scss';

const Page = ({ children, className }) => (
  <Container className={classNames('page__root', className)}>
    {children}
  </Container>
);
Page.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Page.defaultProps = {
  className: '',
};

export default Page;
