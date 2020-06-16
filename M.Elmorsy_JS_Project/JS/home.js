$(function(){ //load
    $("input[value='Play Game']").click(function(){ 
        if($(":text").val() == "") //check if a name is entered in the text box
            {
                alert("Please enter your name");
            }
        else
            { //store the name and redirect to the game page
                var playerName = $(":text").val();
                localStorage.setItem("name",playerName);
                window.location.href="Sudoku.html"; 
            }

            }) 
})