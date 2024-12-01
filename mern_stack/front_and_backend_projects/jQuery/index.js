
$(document).ready(function(){
    $('h1').css('color','red');
})
//if i added my jquer script to the end of my body i shouldn have to add my ready method

// $('h1').click(function(){
//     $('h1').css('color', 'purple')
// })

// for (let i=0;i<5;i++){
//     document.querySelectorAll('button')[i].addEventListener('click',()=>{

//         document.querySelector('h1').style.color='purple';
//     })
// }

//using jQuery
// $('button').click(function(){
//     $('h1').css('color', 'purple');
// })

// $('input').keypress(function(event){
// console.log(event.key);
// })
// $('body').keypress(function(event){
//     $('h1').text(event.key);
// })

//more organized way to add eventListner

$('button').on('click',function(){
    $('h1').slideToggle();
})