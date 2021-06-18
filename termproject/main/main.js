var coupon_div = document.querySelector('.explanation_coupon_div');
var cart_div = document.querySelector('.explanation_cart_div');
var shopping_div = document.querySelector('.explanation_shopping_div');

//각각 마우스가 들어가고 나올 때 event를 걸어줌(확대와 축소)
coupon_div.addEventListener('mouseenter', e => expand(e));
coupon_div.addEventListener('mouseleave', e => contract(e));
cart_div.addEventListener('mouseenter', e => expand(e));
cart_div.addEventListener('mouseleave', e => contract(e));
shopping_div.addEventListener('mouseenter', e => expand(e));
shopping_div.addEventListener('mouseleave', e => contract(e));

//확대
function expand(e){
    e.target.style.transform = "scale(1.1)";
    e.target.style.zIndex = 30;
    e.target.style.transition = 'all 0.8s'
}

//축소
function contract(e){
    e.target.style.transform = "scale(1)";
    e.target.style.zIndex = 0;
    e.target.style.transition = 'all 0.8s'
}