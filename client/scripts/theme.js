let posts = document.getElementById("posts");
let commentBtns = document.getElementsByClassName("coment-click");
let boxses = document.getElementsByClassName("box");

function showComments(evt){
    const parent = evt.target.parentNode;
    const postsArr = posts.getElementsByClassName("post");
    for(let i = 0; i < postsArr.length; i++){
        if(postsArr[i] === parent){
            if(boxses[i].style.display === "block"){
                boxses[i].style.display = "none";
            }else{
                boxses[i].style.display = "block";
                
            }
            break;
        }
    }
    
}

for(let i = 0; i < commentBtns.length; i++){
    commentBtns[i].addEventListener("click", showComments);
}