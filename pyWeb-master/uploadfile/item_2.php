<?php
    $db = mysql_connect("localhost", "root");
    mysql_select_db("login_db", $db);?>

<html>
<head>
    <style>
        .name {
            width: 660px;
            height: 200px;
            left: 0px;
            position: absolute;
            top: 20px;
        }

        .pic {
            left: 660px;
            position: absolute;
            top: 20px;
            width: 1400px;
            height: 200px;
        }

        .basic_info {
            width: 2000px;
            height: 180px;
            position: absolute;
            top: 220px;
        }

        .profile {
            width: 2000px;
            height: 400px;
            position: absolute;
            top: 400px;
        }

        .relationship {
            width: 2000px;
            height: 300px;
            position: absolute;
            top: 800px;
        }

        .botton {
            width: 2000px;
            height: 100px;
            position: absolute;
            top: 1100px;
        }

        .td {
            border: none;
            border-bottom: dashed 1px #ddd;
            width: 200px;
        }


        h1 {
            color: green;
            position: absolute;
            top: 20%;
            left: 60%;
        }

        h2 {
            color: grey;
            position: absolute;
            top: 0%;
            left: 0%;
        }
    </style>
</head>
<body>
    <div class="name">
        <?php

        $sql = "SELECT * FROM basic_info WHERE sign=2";
        $res = mysql_query($sql);
        $myrow = mysql_fetch_array($res);
        $nameout= $myrow['name'];
        echo "<h1>$nameout</h1>" ;
        ?>

    </div>
    <div id="div1" class="pic ">
        <img src="item_2pic/headhaizei.jpg" width="400px" ; height="200px" ; style="position:absolute; top:0%;left:0%; ">

    </div>
    <!--/////////////////////////////////////////////////////////////-->
    <div id="div2" class="basic_info ">
        <?php

        $sql = "SELECT * FROM basic_info WHERE sign=2";
        $res = mysql_query($sql);
        $myrow = mysql_fetch_array($res);
        $v11= $myrow['name'];
        $v12= $myrow['style'];
        $v21=$myrow['playdate'];
        $v22=$myrow['outdate'];
        $v31=$myrow['music'];
        $v32=$myrow['produce'];
        $v41=$myrow['place'];
        $v42=$myrow['staff'];
        $intro=$myrow['profile'];
		mysql_close($db);
        ?>


        <img src="item_2pic/basichaizei.jpg" width="400px" ; height="180px" ; style="position:absolute; top:5%;left:1%; ">

        <table border=0; style="position:absolute;top:15%;left:22%;">

            <tr valign=middle>
                <th class="td"> name </th>
                <td class="td"> <?php echo "$v11" ?> </td>
                <th class="td"> style </th>
                <td class="td"> <?php echo "$v12" ?> </td>
            </tr>

            <tr valign=middle>
                <th class="td"> playdate </th>
                <td class="td"> <?php echo "$v21" ?> </td>
                <th class="td"> outdate </th>
                <td class="td"> <?php echo "$v22" ?> </td>
            </tr>

            <tr valign=middle>
                <th class="td"> music </th>
                <td class="td"><a href="https://baike.baidu.com/item/%E7%94%B0%E4%B8%AD%E5%85%AC%E5%B9%B3"> <?php echo "$v31" ?> </a> </td>
                <th class="td"> company </th>
                <td class="td"><a href="https://baike.baidu.com/item/%E4%B8%9C%E6%98%A0%E5%8A%A8%E7%94%BB"><?php echo "$v32" ?> </a> </td>
            </tr>

            <tr valign=middle>
                <th class="td"> original from</th>
                <td class="td"> <?php echo "$v41" ?> </td>
                <th class="td"> dubbing </th>
                <td class="td"><?php echo "$v42" ?></td>
            </tr>

        </table>
    </div>
    <!--/////////////////////////////////////////////////////////////-->
    <div id="div3" class="profile ">
        <h2>introduction</h2>
        <hr style="position:absolute; top:7.5%;left:9%; " align=center width=1300color =#987cb9 size=1>
        <img src="item_2pic/introhaizei.jpg" width="300px" ; height="200px" ; style="position:absolute; top:12%;left:29%; ">
        <p style="text-align:center; width:1000px; margin:0 auto; font-size:16px;line-height:25px;position:absolute; top:65%;left:13%;"> <?php echo "$intro" ?> </p>
    </div>

    <!--/////////////////////////////////////////////////////////////-->
    <div id="img_box" class="relationship ">

        <script type="text/javascript">
	function changeImg(num){
    var img = document.getElementById('img_box').getElementsByTagName('img');
    for(i=0;i<=img.length;i++){
    if(i==num+1) img[i].style.display="inline";
    else img[i].style.display="none";
   if(num==4) img[0].style.display="inline";
                               }
                            }
        </script>
        <h2>picshow</h2>


        <hr style="position:absolute; top:10%;left:9%; " align=center width=1300color =#987cb9 size=1>
        <img src="item_2pic/tu1.jpg" width="400px" ; height="300px" onclick="changeImg(0)" style="display:inline;position:absolute; top:15%;left:27%;" />
        <img src="item_2pic/tu2.jpg" width="400px" ; height="300px" onclick="changeImg(1)" style="display:none;position:absolute; top:15%;left:27%;" />
        <img src="item_2pic/tu3.jpg" width="400px" ; height="300px" onclick="changeImg(2)" style="display:none;position:absolute; top:15%;left:27%;" />
        <img src="item_2pic/tu4.jpg" width="400px" ; height="300px" onclick="changeImg(3)" style="display:none;position:absolute; top:15%;left:27%;" />
        <img src="item_2pic/tu5.jpg" width="400px" ; height="300px" onclick="changeImg(4)" style="display:none;position:absolute; top:15%;left:27%;" />
    </div>
    <!--/////////////////////////////////////////////////////////////-->
    <div id="div5" class="botton ">
        <form name="frm">
            <input style="position:absolute; top:55%;left:35%;" type="button" value="Backpage" onclick="goback()">
        </form>
        <script language="javascript">
        function goforward()
       {
        history.go(1);
        }
       function goback()
       {
       history.go(-1)
       }
        </script>
    </div>
</body>
</html>



