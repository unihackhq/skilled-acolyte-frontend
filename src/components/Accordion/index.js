import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardHeaderTitle, CardHeaderIcon, CardContent } from 'bloomer';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './index.scss';

class AccordionItem extends React.Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
  }

  state = { open: false };

  toggleOpen = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { title, children } = this.props;
    const { open } = this.state;

    return (
      <Card>
        <CardHeader>
          <CardHeaderTitle className="accordion__title">
            {title}
          </CardHeaderTitle>
          <CardHeaderIcon onClick={this.toggleOpen}>
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </CardHeaderIcon>
        </CardHeader>
        {open ? (
          <CardContent>
            {children}
          </CardContent>
        ) : null}
      </Card>
    );
  }
}

const Accordion = ({ children }) => (
  <div>
    {children}
  </div>
);
Accordion.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Accordion, AccordionItem };
