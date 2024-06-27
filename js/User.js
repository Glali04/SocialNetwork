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


    login(){
        fetch(this.api_url + "/users")
        .then(response => response.json())
        .then(data => {
            let login_successful = 0;
            data.forEach(user => {
                if(user.email === this.email && user.password === this.password){
                    let session = new Session();
                    session.userId = user.id;
                    session.startSession();
                    login_successful = 1;
                    window.location.href = "hexa.html"
                }
            });

            if(login_successful === 0){
                alert("pogresan email ili lozinka");
            }

        });
    }

    async get(userId){
        let api_url = this.api_url + "/users/" + userId;

        let response = await fetch(api_url);
        let data = await response.json();

        return data;
    }

    edit(){
        let data = {
            username: this.username,
            email: this.email
        };

        data = JSON.stringify(data);

        let session = new Session();
        session_id = session.getSession()

        fetch(this.api_url + "/users/" + session_id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = "hexa.html"
        })
    }

    delete(){
        let session = new Session();
        session_id = session.getSession();

        fetch(this.api_url + "/users/" + session_id, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            let session = new Session;
            session.destroySession();

            window.location.href = "/";
        })
    }
}