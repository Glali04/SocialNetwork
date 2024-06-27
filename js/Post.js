class Post {
    postId = "";
    postContent = "";
    userId = "";
    likes = "";
    api_url = "https://667ab154bd627f0dcc9015b3.mockapi.io";

    async createPost( ){
        let session = new Session(); //uzmemo usera koji je ulogovan 
        session_id = session.getSession()

        let data = {
            userId: session_id,
            content: this.postContent,
            likes: 0
        }
        data = JSON.stringify(data);

        let response = await fetch(this.api_url + "/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        });

        data = await response.json();
        return data;
    }
}