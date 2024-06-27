let session = new Session();
session_id = session.getSession();

if(session_id !== ""){

    async function populateUserData(){
        let user = new User();
        user = await user.get(session_id);
    
        document.querySelector("#username").innerText = user["username"];
        document.querySelector("#email").innerText = user["email"];

        document.querySelector("#userName").value = user["username"];
        document.querySelector("#editEmail").value = user["email"];
    }

    populateUserData();
}else{
    window.location.href = "/";
}

document.querySelector("#logout").addEventListener("click", e=> {
    e.preventDefault();

    session.destroySession();
    window.location.href = "/";
})

document.querySelector("#editAccount").addEventListener("click", ()=>{
    document.querySelector(".custom-modal").style.display = "block";
});

document.querySelector("#closeModal").addEventListener("click", ()=>{
    document.querySelector(".custom-modal").style.display = "none";
});

document.querySelector("#editForm").addEventListener("submit", e => {
    e.preventDefault();
    let user = new User();
    user.username = document.querySelector("#userName").value;
    user.email = document.querySelector("#editEmail").value;
    user.edit();
});

document.querySelector("#deleteProfile").addEventListener("click", event => {
    event.preventDefault();

    let text = "Da li ste sigurni da zelite da obrisete profil";

    if(confirm(text) === true){
        let user = new User();
        user.delete();
    }
});

document.querySelector("#postForm").addEventListener("submit", event => {
    event.preventDefault();

    async function createPost(){
        let content = document.querySelector("#postContent").value;
        document.querySelector("#postContent").value = "";
        let post = new Post();
        post.postContent = content;
        post = await post.createPost();

        let current_user = new User();
        current_user = await current_user.get(session_id);

        let deletePostHTML = "";
        if(session_id === post.userId){
            deletePostHTML = `<button class = "remove-btn" onclick="removeMyPost(this)">Remove</button>`;
        }

        document.querySelector("#allPostsWrapper").innerHTML = `<div class="single-post" data-post_id="${post.postId}">
        <div class = "post-content">${post.postContent}</div>
             
        
            <div class = "post-comments">
                <form>
                    <input placeholder = "Napisi komentar..." type = "text">
                    <button onclick="commentPostSubmit(event)">Comment</button>
                </form>
            </div>
        </div>`
    };

    createPost();
})

const commentPostSubmit = event => {

}

const removeMyPost = el => {

}