<?php
    $db = mysql_connect("localhost", "root");
    mysql_select_db("login_db", $db);
         $id = 0;
    if (isset($_GET['id'])) $id = $_GET['id'];
?>
<?php
   if (isset($_POST['submit'])) {
        //提交之后更新数据库id=0就是插入新的
        // data is for new record if no 'id' input, else for existen one
        //这里是进入了单个人的数据页面
        if (!$id) {
            $sql0 = "SELECT * FROM login_sheet WHERE username='$_POST[user_name]'";
            $res0 = mysql_query($sql0);
            if(mysql_num_rows($res0)<1){
                $rand_num=rand(1000000,9999999);
                $sql = "INSERT INTO login_sheet (username,password,num) VALUES ('$_POST[user_name]', '$_POST[pass_word]','$rand_num')";
                $sql1 = "INSERT INTO vote_sheet (username) VALUES ('$_POST[user_name]')";
                $ok = "INSERT OK!<br>\n";
            // makeuserspage($_POST['user_name']);
                $result = mysql_query($sql);
                $result = mysql_query($sql1);
                echo $ok;
            }else{
                echo "username already exists,please click Login button";
            }
        }else{
            $sql = "SELECT * FROM login_sheet WHERE username='$_POST[user_name]'";
            $res = mysql_query($sql);
            if (!$res) {echo "wrong username";}
            else{
                //echo $res;
                $myrow = mysql_fetch_array($res);
               // echo $myrow['password'];
               // echo "\n";
               // echo '$_POST[pass_word]';
                if($myrow['password']==$_POST['pass_word']){
                   userspage($myrow[num]);
                    }
                else{
                    echo"wrong password!";
                }
            }
        }
   }else{
       if($id){
           echo"<br>This is the login page!<br>";
       }
   }
          
?>
    <form method="post" action="<?php echo $_SERVER['SCRIPT_NAME'] . "?id=". "$id" ?>">
    username: <input type="Text" name="user_name"><br>
    password: <input type="Text" name="pass_word"><br>
    <input type="Submit" name="submit" value="submit">
    </form>
    
<?php
        
    echo "<a href=\"" . $_SERVER['SCRIPT_NAME'] . "\">HOME</a><br>";
    echo "<a href=\"" . $_SERVER['SCRIPT_NAME'] . "?id=1\">login</a><br>";
    mysql_close($db);
?>



<?php
function makeuserspage($username)
{
    global $glo_username;
    $glo_username=$username;
}
?>


<?php
function userspage($num)
{
    global $glo_username;
    $glo_username=$username;
    header("Location:http://localhost/userpage2.php?id=$num");
   // echo "<a href=\"" . $_SERVER['SCRIPT_NAME'] . "?id=$username\">jump</a><br>";
    
}
?>