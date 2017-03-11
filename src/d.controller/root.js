'use strict';

// import _ from 'lodash';
// import $ from  'jquery';

// import rootTemplate from '../c.view/root.html';

import CoreController from '../e.utils/core-controller';

export default class RootController extends CoreController{
  getTemplate() {
    return '<span>RootController</span>';
  }

  getBindElements() {
    return [
      { selector: '.level-1', field: 'level1' },
      { selector: '.level-2', field: 'level2' },
      { selector: '.level-3', field: 'level3' },
      { selector: '.level-4', field: 'level4' },
    ];
  }

  componentWillMount() {

  }

  // render() {
  //   this.rootElement.append(this.tempalte());
  // }

  componentDidMount() {
    debugger;
  }
}