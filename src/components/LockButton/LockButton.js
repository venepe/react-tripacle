import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionLock from 'material-ui/svg-icons/action/lock';
import ActionLockOpen from 'material-ui/svg-icons/action/lock-open';
import './LockButton.css';

import { connect } from 'react-redux';
import { onLockCategory } from '../../actions';

class LockButton extends Component {
  static propTypes = {
    index: PropTypes.number,
  }

  static defaultProps = {
    index: 0,
  }

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      isCategoryLocked: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    });
  }

  onClick() {
    let isCategoryLocked = !this.state.isCategoryLocked;
    let index = this.state.index;
    this.setState({
      isCategoryLocked,
    });
    this.props.onLockCategory({
      payload: {
        isCategoryLocked,
        index,
      },
    });
  }

  render() {
    let isLockIcon = this.state.isCategoryLocked ? (<ActionLock />) : (<ActionLockOpen />);
    return (
      <IconButton
        iconStyle={styles.smallIcon}
        style={styles.small}
        onClick={this.onClick}
      >
        {isLockIcon}
      </IconButton>
    );
  }
}

const styles = {
  smallIcon: {
    width: 18,
    height: 18,
  },
  small: {
    width: 36,
    height: 36,
  },
};

export default connect(
  null,
  { onLockCategory },
)(LockButton);
