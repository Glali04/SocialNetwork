class User{
    userId = "";
    username = "";
    email = "";
    password = "";
    api_url = "https://667ab154bd627f0dcc9015b3.mockapi.io";

    create(){
        let data = {
            email: this.email,
            username: this.username,
            password: this.password
        }        
        data = JSON.stringify(data);

        fetch(this.api_url + "/users",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:data
        }).then(response => response.json())
        .then(data => {
            let session = new Session();
            session.userId = data.id;
            session.startSession();

            window.location.href = "hexa.html";
        })
    }
}