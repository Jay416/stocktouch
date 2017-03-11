'use strict';

import _ from 'lodash';
import $ from  'jquery';
import BackboneEvents from 'backbone-events';

export default class CoreController {
  constructor(element) {
    _.extend(this, BackboneEvents);
    this.bindRootElement(element);
    this.bindRootTemplate();
    this.componentWillMount();
    this.render();
    this.bindElements();
    this.componentDidMount();
  }

  bindRootElement(elemetn) {
    this.rootElement = $(elemetn);
  }

  bindRootTemplate() {
    this.tempalte = _.template(this.getTemplate());
  }

  bindElements() {
    this.ref = {};
    _.forEach(this.getBindElements(), ({ selector, field }) => this.bindElement(selector, field))
  }

  bindElement(selector, field) {
    this.ref[field] = this.rootElement.find(selector);
  }

  // Overridden function
  getTemplate() {
    return '<span></span>';
  }

  // Overridden function
  getBindElements() {
    return [];
  }

  // Overridden function
  componentWillMount() {

  }

  // Overridden function
  render() {
    this.rootElement.append(this.tempalte());
  }

  // Overridden function
  componentDidMount() {

  }
}