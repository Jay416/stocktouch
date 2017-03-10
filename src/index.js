'use strict';

import _ from 'lodash';

import 'babel-polyfill';

import './a.assets';

const clickElement = document.getElementsByClassName('click')
_.forEach(clickElement, (element) => {
  element.addEventListener('click', (e) => {
    const parent = e.currentTarget.parentElement;
    const level = parent.getAttribute('data-level');
    const nextLevel = parseInt(level) + 1;
    const nextElement = document.getElementsByClassName('level-' + nextLevel)[0];
    const position = e.currentTarget.getBoundingClientRect();

    nextElement.style['transform'] = 'scale(0.5, 0.5)';
    nextElement.style['transform-origin'] = position.left + 'px ' + position.top + 'px';
    setTimeout(() => {
      nextElement.classList.toggle('opened', true);
      nextElement.style['transform'] = 'scale(1, 1)';
    });
  })
});