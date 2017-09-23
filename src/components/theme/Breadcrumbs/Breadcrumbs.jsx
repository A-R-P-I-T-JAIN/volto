/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import { getBreadcrumbs } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

@connect(
  state => ({
    items: state.breadcrumbs.items,
  }),
  dispatch => bindActionCreators({ getBreadcrumbs }, dispatch),
)
/**
 * Component to display breadcrumbs
 * @class Breadcrumbs
 * @extends Component
 */
export default class Breadcrumbs extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to get breadcrumbs
     */
    getBreadcrumbs: PropTypes.func.isRequired,
    /**
     * Pathname of the current object
     */
    pathname: PropTypes.string.isRequired,
    /**
     * List of breadcrumb items
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title of the breadcrumb
         */
        title: PropTypes.string,
        /**
         * Url of the breadcrumb
         */
        url: PropTypes.string,
      }),
    ).isRequired,
  };

  /**
   * Component will mount
   * @method componentWillMount
   */
  componentWillMount() {
    this.props.getBreadcrumbs(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getBreadcrumbs(getBaseUrl(nextProps.pathname));
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Segment secondary vertical>
        <Container>
          <Breadcrumb>
            <Link to="/" className="section">
              <FormattedMessage id="Home" defaultMessage="Home" />
            </Link>
            {this.props.items.map((item, index, items) => [
              <Breadcrumb.Divider
                icon="right angle"
                key={`divider-${item.url}`}
              />,
              index < items.length - 1 ? (
                <Link key={item.url} to={item.url} className="section">
                  {item.title}
                </Link>
              ) : (
                <Breadcrumb.Section key={item.url} active>
                  {item.title}
                </Breadcrumb.Section>
              ),
            ])}
          </Breadcrumb>
        </Container>
      </Segment>
    );
  }
}
