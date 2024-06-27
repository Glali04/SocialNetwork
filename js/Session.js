class Session{
    userId = "";

    startSession() {
        const date = new Date();
        date.setTime(date.getTime() + (2*24*60*60*1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = "userId=" + this.userId + ";" + expires;
    }

    getSession() {
        let name = "userId="
        let ca = document.cookie.split(";");

        for (let index = 0; index < ca.length; index++) {
            let c = ca[index];
            while (c.charAt[0] == " "){
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0){
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    destroySession(){
        let cookies = document.cookie.split(";");

        for(let index = 0; index < cookies.length; index++){
            let cookie = cookies[index];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}