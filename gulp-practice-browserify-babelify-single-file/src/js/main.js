import { firstFunction } from './first';
import { secondFunction } from './second';
import $ from 'jquery';

let div = $('.first-div');
div.css({ background: 'blue', color: 'white' });
let divText = div.html();

console.log('divText: ', divText);
console.log('firstFunction: ', firstFunction());
console.log('secondFunction: ', secondFunction());
