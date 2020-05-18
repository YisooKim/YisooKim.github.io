function fold(id){
    var tagPost = document.getElementById(id);
    tagPost.style.display=(tagPost.style.display=='inline-block')? 'none' :'inline-block';
    var button = document.getElementById(id+'click');
    button.className = (tagPost.style.display=='inline-block')? 'fa fa-chevron-up' :'fa fa-chevron-down';
}