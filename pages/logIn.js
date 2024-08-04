
    
    function validate()
    {
        if(document.querySelector("#userName").value == "")
        {
            document.querySelector("#userName").focus();
            alert("Enter a user name!");
            return false;
        }
        if(document.querySelector("#password").value == "")
        {
            document.querySelector("#password").focus();
            alert("Enter a password");
            return false;
        }
        let userName = document.querySelector("#userName").value;
        localStorage.setItem('userName', userName);
        let password = document.querySelector("#password").value;
        localStorage.setItem('password',password);
        return true;
    }

    function removeLocalStorage(){
        let s = 0;
        localStorage.setItem('scoreNow',s);
        console.log(localStorage.getItem('scoreNow'));
    }
   
    
    