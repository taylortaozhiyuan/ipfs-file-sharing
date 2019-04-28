<?php
    $db = mysql_connect("localhost", "root");
    mysql_select_db("login_db", $db);
    $id = 0;
    if(isset($_GET['id'])) $id = $_GET['id'];
?>

<?php
echo "login complete!";
echo "<p>";
$num_STR=substr($_SERVER['QUERY_STRING'],3);

$sql = "SELECT * FROM login_sheet WHERE num='$num_STR'";
$res = mysql_query($sql);
                //echo $res;
$myrow = mysql_fetch_array($res);

echo $myrow['username'];
$style = "<link rel=\"stylesheet\" type=\"text/css\" href=\"theme.css\" />";
?>


<!--<form method="post" action="<?php echo $_SERVER['SCRIPT_NAME'] . "?$_SERVER[QUERY_STRING]" ?>">
    candidate1: <input type="Text" name="candidate1"><br>
    candidate2: <input type="Text" name="candidate2"><br>
    <input type="Submit" name="submit" value="submit">
    </form>-->


<?php


   if(isset($_GET['view'])){
        $sql = "SELECT * FROM vote_sheet";
        $result = mysql_query($sql);
        echo "<table border=1>\n";
        echo $style;
        echo "<tr><th>Name</th><th>Voted No.1</th><th>Voted No.2</th></tr>\n";
        while ($myrow = mysql_fetch_array($result))
        {
            printf("<tr><td>%s</td><td>%s</td><td>%s</td></tr>\n", $myrow['username'], $myrow['candidate1'], $myrow['candidate2']);
        }
        echo "</table>\n";

   }
 
?>

<form method="get" action="http://localhost/formreceive.php">
Who is the most sexy man in Depertment No.2?<p>
<input type=text name="id" value=<?php echo $num_STR?> style="display:none"><p>
<input type=checkbox name="Item_1"><a href="http://localhost/item_1.php">Item 1</a><p>
<input type=checkbox name="Item_2"><a href="http://localhost/item_2.php">Item 2</a><p>
<input type=checkbox name="Item_3"><a href="http://localhost/item_3.php">Item 3</a><p>
<input type=submit name="submit" value="submit"><p>
<input type=reset name="reset" value="reset"><p>
</form>
<p>


<a href="http://localhost/taotao3.php">HOME </a>
<p>
