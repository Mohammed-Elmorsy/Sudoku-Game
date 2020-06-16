function emptyCells(){ //function to count the empty cells
    var emptyCell = 0;
    for(var i=0;i<16;i++)
    {
        if($("td:eq("+i+")").html() == "")
            emptyCell++;
    }
    return emptyCell;
};
//------------checking the rows,cols and quarters by getting the ids of pictures which are 1,2,3,4--------
//------------parsing it into integers and calculate the sum .. so the sum should be 10-------------------

function checkRowSum(_row){ //function to check if the row has different 4 pictures
    var id = "" ;
    sum = 0;
    for(_col=0;_col<4;_col++)
    {
        id = $("tr:eq("+_row+") td:eq("+_col+")").children().attr("id");
        sum += parseInt(id);
    }
    return sum;
}
function checkColSum(_col){ //function to check column
    var id = "" ;
    sum = 0;
    for(_row=0;_row<4;_row++)
    {
        id = $("tr:eq("+_row+") td:eq("+_col+")").children().attr("id");
        sum += parseInt(id);
    }
    return sum;
}
function checkQuarterSum(){ //function to check the four quarters
    var id = "" ;
    quarterOneSum = 0;
    quarterTwoSum = 0;
    quarterThreeSum = 0;
    quarterFourSum = 0;
    checkedQuarter = 0;
    for(var _row=0;_row<2;_row++)//quarter one check 
    {
        for(var _col=0;_col<2;_col++)
        {
            id = $("tr:eq("+_row+") td:eq("+_col+")").children().attr("id");
            quarterOneSum += parseInt(id);
        }
    }
    if(quarterOneSum == 10 && emptyCells() == 0)
        checkedQuarter++; //first quarter is checked
    
    for(var _row=0;_row<2;_row++)//quarter two check
    {
        for(var _col=2;_col<4;_col++)
        {
            id = $("tr:eq("+_row+") td:eq("+_col+")").children().attr("id");
            quarterTwoSum += parseInt(id);
        }
    }
    if(quarterTwoSum == 10 && emptyCells() == 0)
        checkedQuarter++; //second quarter is checked
    
    for(var _row=2;_row<4;_row++)//quarter three check
    {
        for(var _col=0;_col<2;_col++)
        {
            id = $("tr:eq("+_row+") td:eq("+_col+")").children().attr("id");
            quarterThreeSum += parseInt(id);
        }
    }
    if(quarterThreeSum == 10 && emptyCells() == 0)
        checkedQuarter++;//third quarter is checked
    
    for(var _row=2;_row<4;_row++)//quarter four check
    {
        for(var _col=2;_col<4;_col++)
        {
            id = $("tr:eq("+_row+") td:eq("+_col+")").children().attr("id");
            quarterFourSum += parseInt(id);
        }
    }
    if(quarterFourSum == 10 && emptyCells() == 0)
        checkedQuarter++; //fourth quarter is checked
    
    if(checkedQuarter == 4)
        return true;
    else
        return false;        
}
function allChecked(){ //function to check all the rules : rows,cols and quarters
    var checkedRows = 0;
    var checkedCols = 0;
    for(var i=0;i<4;i++) //0,1,2,3--> four rows and four columns
        {
            if(checkRowSum(i) == 10 && emptyCells() == 0)//check four rows
                checkedRows++;
            if(checkColSum(i) == 10 && emptyCells() == 0)//check four columns
                checkedCols++;      
        }
    if(checkedRows == 4 && checkedCols == 4 && checkQuarterSum())
        return true;
    else
        return false;
}
//------------------------------------after page loading--------------------------------------------------
$(function(){ //load
    $("#welcome").text("Welcome : "+localStorage.getItem("name"));//welcome the player
    $("button").on("click",function(){ //start button to start the game
        $("button").hide();    
    //------------------------------moving between table cells using arrow keys---------------------------
        row = 0;
        col = 0;
        $(document).on("keydown",function(Event){
           switch(Event.which)
               {
                   case 39: //right arrow button
                        col++;
                        if(col > 3)
                            {col = 0;}
                        $("td").removeClass("highlight");
                        $("tr:eq("+row+") td:eq("+col+")").addClass("highlight");
                        break;

                   case 37: //left arrow button
                        col--;
                        if(col < 0)
                            {col = 3;}
                        $("td").removeClass("highlight");
                        $("tr:eq("+row+") td:eq("+col+")").addClass("highlight");
                        break;

                   case 38: //up arrow button
                       row--;
                       if(row < 0)
                           {row = 3;}
                        $("td").removeClass("highlight");
                        $("tr:eq("+row+") td:eq("+col+")").addClass("highlight");
                        break;

                   case 40: //down arrow button
                       row++;
                       if(row > 3)
                           {row = 0;}
                        $("td").removeClass("highlight");
                        $("tr:eq("+row+") td:eq("+col+")").addClass("highlight");
                        break;  
        //----------------------inserting pictures in cells using numbers 1,2,3,4-------------------------
                    case 49:
                    case 97: //number one key on top of keyboard and on numeric keyboard
                        if($("tr:eq("+row+") td:eq("+col+")").html() == "")
                            $("tr:eq("+row+") td:eq("+col+")").html("<img id='1' src='../images/1.PNG'/>");
                    break;
                       
                    case 50:
                    case 98://number two key on top of keyboard and on numeric keyboard
                        if($("tr:eq("+row+") td:eq("+col+")").html() == "")
                            $("tr:eq("+row+") td:eq("+col+")").html("<img id='2' src='../images/2.PNG'/>");
                    break;
                       
                    case 51:
                    case 99://number thee key on top of keyboard and on numeric keyboard
                        if($("tr:eq("+row+") td:eq("+col+")").html() == "")
                            $("tr:eq("+row+") td:eq("+col+")").html("<img id='3' src='../images/3.PNG'/>");
                    break;
                       
                    case 52:
                    case 100://number four key on top of keyboard and on numeric keyboard
                        if($("tr:eq("+row+") td:eq("+col+")").html() == "")
                            $("tr:eq("+row+") td:eq("+col+")").html("<img id='4' src='../images/4.PNG'/>");
                    break;
                    //-------------------------------delete inserted picture------------------------------
                    case 8://backspace button
                       //check if it is not one of the 4 steady random pictures
                       if(!$("tr:eq("+row+") td:eq("+col+")").hasClass("steadyPictures"))
                            $("tr:eq("+row+") td:eq("+col+")").html("");
                    break;
               }    
        })
        //-----------------------randomize the four steady pictures on screen-----------------------------
        function random(){
            return Math.floor((Math.random()*10)/3);
        }
        for(var i=1;i<=4;i++)
            {
                var cell = $("tr:eq("+random()+") td:eq("+random()+")");
                //check if the cell is empty 
                if(cell.html() == "") 
                    {
                        cell.html("<img id="+i+" src='../images/"+i+".PNG'/>");
                        cell.addClass("steadyPictures");
                    }
                //stay at the same i in loop till the if condition is true 
                else
                    i--;
            }
        //---------------------------------check if the player won or lost--------------------------------
        var timer = 120;
        var setID = setInterval(function(){ //timer
            timer--;
            $("#timer").text("Timer : "+timer);
            
            if(allChecked() && emptyCells() == 0) //in case of getting the solution right before time out
                {
                    
                    clearInterval(setID);
                                        
                    //check if the player want to play again after time is out
                    var dialog = window.confirm("Congratulations You Have Won! \nDo you want to play again ?");
                    
                    if (dialog === true) 
                        window.location.href= 'Sudoku.html';
                    else
                        window.location.href = 'Home.html';
                }
            else if(timer == 0) //in case time is out
                {  
                    clearInterval(setID);

                    var dialog = window.confirm("Sorry you have lost! \nDo you want to play again ?");
                    //check if the player want to play again after time is out
                    if (dialog === true) 
                        window.location.href= 'Sudoku.html';
                    else
                        window.location.href = 'Home.html';
                }
        },1000)
    }) 
})