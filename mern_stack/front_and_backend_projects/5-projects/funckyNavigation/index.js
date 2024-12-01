const open=document.querySelector('#open');
const close =document.querySelector('#close');
const container=document.querySelector('.container');

open.addEventListner('click', () => container.classList.
add('show-nav'));

close.addEventListner('click', () => container.classList.
remove('show-nav'));