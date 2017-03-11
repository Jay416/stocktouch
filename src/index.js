'use strict';

import _ from 'lodash';

import 'babel-polyfill';

import './a.assets';

import RootController from './d.controller/root.controller';

(new RootController(document.getElementById('root')));

const clickElement = document.getElementsByClassName('click');
_.forEach(clickElement, (element) => {
  element.addEventListener('click', (e) => {
    const parent = e.currentTarget.parentElement;
    const level = parent.getAttribute('data-level');
    const nextLevel = parseInt(level) + 1;
    const nextElement = document.getElementsByClassName('level-' + nextLevel)[0];
    const position = e.currentTarget.getBoundingClientRect();
    const nextPosition = parent.getBoundingClientRect();

    const scaleX = position.width / nextPosition.width;
    const scaleY = position.height / nextPosition.height;
    const originX = position.left / (nextPosition.width - position.width) * 100;
    const originY = position.top / (nextPosition.height - position.height) * 100;


    nextElement.classList.toggle('no-transition', true);
    nextElement.style['transform'] = `scale(${scaleX}, ${scaleY})`;
    nextElement.style['transform-origin'] = `${originX}% ${originY}%`;


    setTimeout(() => {
      nextElement.classList.toggle('no-transition', false);
      nextElement.classList.toggle('opened', true);
      nextElement.style['transform'] = 'scale(1, 1)';

      parent.style['transform-origin'] = `${originX}% ${originY}%`;
      parent.style['transform'] = `scale(${1 / scaleX}, ${1 / scaleY})`;
    });
  })
});

const backElement = document.getElementsByClassName('back');
_.forEach(backElement, (element) => {
  element.addEventListener('click', (e) => {
    const parent = e.currentTarget.parentElement;
    const level = parent.getAttribute('data-level');
    const prevLevel = parseInt(level) - 1;
    const prevElement = document.getElementsByClassName('level-' + prevLevel)[0];

    const matchScale = prevElement.style.transform.match(/scale\(([0-9/.]+), ([0-9/.]+)\)/);
    const scaleX = 1 / matchScale[1];
    const scaleY = 1 / matchScale[2];

    prevElement.style['transform'] = 'scale(1, 1)';
    parent.style['transform'] = `scale(${scaleX}, ${scaleY})`;
    parent.style['transform-origin'] = prevElement.style['transform-origin'];
    parent.classList.toggle('opened', false);

  })
});