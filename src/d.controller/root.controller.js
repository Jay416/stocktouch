'use strict';

import CoreController from '../e.utils/core-controller';
import template from '../c.view/root.view.html';

import AssetAllController from './asset-all.controller.js';
import AssetOneController from './asset-one.controller.js';
import MarketAllController from './market-all.controller.js';
import MarketOneController from './market-one.controller.js';

export default class RootController extends CoreController{
  getTemplate() {
    return template;
  }

  getBindElements() {
    return [
      { selector: '.level-1', field: 'marketAll' },
      { selector: '.level-2', field: 'marketOne' },
      { selector: '.level-3', field: 'assetAll' },
      { selector: '.level-4', field: 'assetOne' }
    ];
  }

  // componentWillMount() {
  //
  // }
  //
  // render() {
  //   this.rootElement.append(this.tempalte());
  // }

  componentDidMount() {
    (new MarketAllController(this.ref.marketAll));
    (new MarketOneController(this.ref.marketOne));
    (new AssetAllController(this.ref.assetAll));
    (new AssetOneController(this.ref.assetOne));
  }
}