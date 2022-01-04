<?php 
session_start();
?>

<html lang="en" id = "html">
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<!--<link rel="stylesheet" href="CSS/semantic.min.css">-->
         
<head>
    <!-- Script for google anaylitics -->
    <script>
        window.addEventListener('message', event => {
            var request = event.data; 
            var body = document.body, html = document.documentElement;
            if(request == "width"){
                var width = Math.max( body.scrollWidth, body.offsetWidth, 
                        html.clientWidth, html.scrollWidth, html.offsetWidth );
                console.log(width);
                window.parent.postMessage({"width" : width}, "*");
            }else if(request == "height"){
                var height = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight );
                console.log(height);
                window.parent.postMessage({"height" : height}, "*");
            }
        }); 
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-FN5PDGB3GH');
    </script>
    <link rel="stylesheet" type="text/css" href="CSS/websiteStyle.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=VT323">
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-FN5PDGB3GH"></script>
    <title>Jon Menard's Portfolio</title>
</head>

<div id="buttonH">
    <button rel="preload" id="home" class="menu"  onclick="window.location.href = 'index.php';" value="Home">Home</button>
    <button rel="preload" id="about" class="menu"  onclick="window.location.href = 'about.php';" value="About">About</button>
    <button rel="preload"id="projects" class="menu"  onclick="window.location.href = 'project.php';" value="Games">Projects</button>
    <button rel="preload"id="games" class="menu"  onclick="window.location.href = 'games.php';" value="Games">Games</button>
    <button rel="preload" id="login" class="menu" value="login" <?php if(isset($_SESSION['username'])){ ?> hidden <?php } ?>  > Login </button>
    <?php 
        if(isset($_SESSION['username'])){
            echo  '
                    <button rel="preload" id="usernameButton" class = "menu" value = '. $_SESSION['username'] . '>' .$_SESSION['username'] . '
                    <div id = "dropdown" hidden>
                        <br>
                        <p class = "editProfile menu" id="editUsername"> Change Username </p> 
                        <br>
                        <p class = "editProfile menu" id="editPassword"> Change Password </p>
                        <br>
                        <p class = "editProfile menu" id="editProfilePicture"> Change Profile Picture </p> 
                        <br>
                        <p class = "editProfile menu" id="logout"> Logout</p>
                    </div>
                </button>
           ';
           $fb = '\'updateFlappyBird.php\'';
           echo '<form action =' . $fb . 'method = "post">'; 
           echo '<input name = "flapyybirdScore" id = "flappybirdHighScore" type = "submit" value = '. $_SESSION['flappybirdScore'] .' hidden ></input></form>';
        }
    ?>
</div>

<div class = "formDiv" id = "popupDiv" hidden>
    <img id = "loginImg" src =  '<?php if(isset($_SESSION['profilePictureURL'])){   echo "UploadedImages\\" . $_SESSION['profilePictureURL']; }else{  echo "Images/loginImg.png"; }?>' >
    <button id="exit"> <img src="Images/exit.png" id = "exitImg" class = "menu"></button>
    <div  id = "loginFormDiv" hidden>
        <h5 class ="loginPage loginErrorMessage" id = "invalidLogin" hidden></h5>
        <form   id = "loginForm" class = "form" action = "loginToDatabase.php" method = "post">
            <input type = "text" class = "loginPage" placeholder = "User Name" name = "uName" required>
            <input type= "password" class = "loginPage" placeholder = "Password" name = "password" required>
            <input id = "loginSubmit" class = "loginPage" type = "submit" value = "Log in" name = "loginSubmit">
        </form>
        <h1  id = "or">OR</h1> 
        <button class = "optionB loginPage" id="resetPassword">Reset Password</button>
        <br>
        <button class = "optionB loginPage" id="createAccountButton">Create Account</button>
    </div>
    <div id = "createFormDiv" hidden>
        <h5 class ="loginPage loginErrorMessage" id = "invalidCreateAccount" hidden></h5>
        <form   id = "createForm" class = "form" method = "post" action = "createAccount.php" enctype="multipart/form-data">
            <input type = "text" class = "loginPage" placeholder = "Firstname" name = "fName" required>
            <input type = "text" class = "loginPage" placeholder = "Lastname" name = "lName" required>
            <input type = "text" class = "loginPage" placeholder = "Email" name = "email" required>
            <input type = "text" class = "loginPage" placeholder = "User Name" name = "uName" required>
            <input type= "password" class = "loginPage" placeholder = "Password" name = "password" required>
            <input class = "loginPage" id = "create" type = "submit" value = "Create Account" name = "creatAccountSubmit">
        </form>
        <h1  id = "or">OR</h1> 
        <button class = "optionB loginButton loginPage">Login</button>
    </div>
    
    <div  id = "editPasswordDiv" hidden>
        <h5 class ="loginPage loginErrorMessage" id = "passwordError" hidden></h5>
        <form   id = "passwordForm" class = "form" method = "post" action = "updatePassword.php" >
            <input type = "password" class = "loginPage" placeholder = "Old Password" name = "oldPassword" required>
            <input type = "password" class = "loginPage" placeholder = "New Password" name = "newPassword" required>
            <input type = "password" class = "loginPage" placeholder = "Repeat New Password" name = "newPassword2" required>
            <input class = "loginPage" id = "passwordSubmit" type = "submit" value = "Confirm" name = "edtPassword">
        </form>
        <h1  id = "or">OR</h1> 
        <button class = "optionB loginPage" id="viewPasswordChangeButton">Change Username</button>
    </div>

    <div id = "editUsernameDiv" hidden>
        <h5 class ="loginPage loginErrorMessage" id = "usernameChangeError" hidden></h5>
        
        <form   id = "usernameForm" class = "form" method = "post" action = "updateUsername.php" >
            <input type = "password" class = "loginPage" placeholder = "Password" name = "pswrd" required>
            <input type = "text" class = "loginPage" placeholder = "New Username" name = "newUsername" required>
            <input type = "text" class = "loginPage" placeholder = "Repeat New Username" name = "newUsername2" required>
            <input class = "loginPage" id = "usernameSubmit" type = "submit" value = "Confirm" name = "editUsername">
        </form>
        <h1 id = "or">OR</h1> 
        <button class = "optionB loginPage" id="viewUsernameChangeButton">Change Password</button>
    </div>

    <div id = "resetPasswordDiv" hidden>
        <h5 class ="loginPage loginErrorMessage" id = "resetPasswordMessage" hidden></h5>
        <form   id = "resetPasswordForm" class = "form" method = "post" action = "resetPassword.php" >
            <input type = "text" class = "loginPage" placeholder = "User Name" name = "usernameToReset" required>
            <input class = "loginPage" id = "resetPassword" type = "submit" value = "Reset Password" name = "resetPassword">
        </form>
        <h1  id = "or">OR</h1> 
        <button class = "optionB loginButton loginPage">Login</button>
    </div>

    <div id = "editProfilePictureDiv" hidden>
        <h5 class ="loginPage loginErrorMessage" id = "profilePictureChangeError" hidden></h5>
        <form   id = "profilePictureForm" class = "form" method = "post" action = "uploadProfilePicture.php" enctype="multipart/form-data">
            <input type = "file" id = "changefileID" class = "loginPage custom-file-input" placeholder = "Profile Image" name = "file" required>
            <input class = "loginPage" id = "profilePictureSubmit" type = "submit" value = "Confirm" name = "editUsername">
        </form>
    </div>
</div>
<div class="overlay"></div>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
<script src = "JavaScript/jquery-3.4.1.js"></script>
<script src = "JavaScript/login.js"></script>