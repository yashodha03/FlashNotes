var word = "";
var space = [];
var choice;
var wrong = 0;
var correct = 0;
var flip = true;
var pscore = 0;

function off()
{
  for(i=1; i<27; i++)
  {
    document.getElementById("l".concat(i).toString()).disabled = true;
  }
}

function newgame()
{
  space = [];
  wrong = 0;
  correct = 0;
  for(i=0; i<12; i++)
  {
    document.getElementById((i+1).toString()).className = "hide";
    document.getElementById(((i+1).toString()).concat("t")).innerHTML = "";
  }
  for(i=1; i<27; i++)
  {
    document.getElementById("l".concat(i).toString()).disabled = false;
  }

  word = words[Math.floor(Math.random() * words.length)];
  document.getElementById("message").innerHTML = "";
  document.getElementById("newgame").disabled = true;
  document.getElementById("man").src = "0.jpg";
  spaces();
}



function spaces()
{
  for(i=0; i<word.length; i++)
  {
    document.getElementById((i+1).toString()).className = "nohide";
    document.getElementById(((i+1).toString()).concat("t")).className = "hide";
    space[i] = word.slice(i,i+1);
    document.getElementById((i+1).toString()).src = "line.jpg";
    document.getElementById(((i+1).toString()).concat("t")).innerHTML = word[i];
  }
}

function score()
{

}

function guess()
{
    for(i=0; i<word.length; i++)
    {
      if(word[i] == choice)
      {
        document.getElementById(((i+1).toString()).concat("t")).className = "nohide";
        correct += 1;
        flip = false;
      }
    }
    if(flip == true)
    {
      wrong += 1;
    }
    if(wrong == 1)
    {
      document.getElementById("man").src = "1.jpg";
    }
    else if(wrong == 2)
    {
      document.getElementById("man").src = "2.jpg";
    }
    else if(wrong == 3)
    {
      document.getElementById("man").src = "3.jpg";
    }
    else if(wrong == 4)
    {
      document.getElementById("man").src = "4.jpg";
    }
    else if(wrong == 5)
    {
      document.getElementById("man").src = "5.jpg";
    }
    else if(wrong == 6)
    {
      document.getElementById("man").src = "6.jpg";
      document.getElementById("message").innerHTML = "You guessed incorrectly too many times! Try a new word.";
      document.getElementById("newgame").disabled = false;
      for(i=1; i<27; i++)
      {
        document.getElementById("l".concat(i).toString()).disabled = true;
      }
    }
    else if(correct == word.length)
    {
      pscore += 1;
      document.getElementById("message").innerHTML = "You guessed the word correctly!";
      document.getElementById("pscore").innerHTML = pscore;
      document.getElementById("newgame").disabled = false;
    }
    flip = true;
}

function chosen(character, i)
{
  if(word != ""){
    choice = character.toString();
    guess();
  }
  document.getElementById("l".concat(i).toString()).disabled = true;
}
