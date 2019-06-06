var deck = [
  "2C", "2D", "2H", "2S",
  "3C", "3D", "3H", "3S",
  "4C", "4D", "4H", "4S",
  "5C", "5D", "5H", "5S",
  "6C", "6D", "6H", "6S",
  "7C", "7D", "7H", "7S",
  "8C", "8D", "8H", "8S",
  "9C", "9D", "9H", "9S",
  "10C", "10D", "10H", "10S",
  "JC", "JD", "JH", "JS",
  "QC", "QD", "QH", "QS",
  "KC", "KD", "KH", "KS",
  "AC", "AD", "AH", "AS",
];
var playertotal = 0;
var dealertotal = 0;
var count = 0;
var playerace = 0;
var dealerace = 0;
var ps = 0;
var ds = 0;

function shuffle() {
    var end = deck.length;
    var temp, swap;

    while (end > 0) {
        swap = Math.floor(Math.random() * end);
        end--;
        temp = deck[end];
        deck[end] = deck[swap];
        deck[swap] = temp;
    }
}

function deal()
{
  document.getElementById("firstpc").src = images(0);
  playertotal += calc(deck[0], "player");
  document.getElementById("firstdc").src = images(1);
  dealertotal += calc(deck[1], "dealer");
  document.getElementById("secondpc").src = images(2);
  playertotal += calc(deck[2], "player");
  document.getElementById("seconddc").src = images("b");
  dealertotal += calc(deck[3], "dealer");
}

function calc(string, character)
{
  if(string.slice(0,2) == "10")
  {
    return 10;
  }
  else
  {
    string = string.slice(0,1);
  }
  if((string == "J") || (string == "Q") || (string == "K"))
  {
    return 10;
  }
  else if(string == "A")
  {
    if(character == "dealer")
    {
      dealerace += 1;
    }
    else if(character == "player")
    {
      playerace += 1;
    }
    return 11;
  }
  else
  {
    return parseInt(string);
  }
}

function images(search)
{
  if(search == "b")
  {
    return "gray_back.png";
  }
  switch(deck[search])
  {
    case "AC": return "AC.png"; break;
    case "AD": return "AD.png"; break;
    case "AH": return "AH.png"; break;
    case "AS": return "AS.png"; break;
    case "2C": return "2C.png"; break;
    case "2D": return "2D.png"; break;
    case "2H": return "2H.png"; break;
    case "2S": return "2S.png"; break;
    case "3C": return "3C.png"; break;
    case "3D": return "3D.png"; break;
    case "3H": return "3H.png"; break;
    case "3S": return "3S.png"; break;
    case "4C": return "4C.png"; break;
    case "4D": return "4D.png"; break;
    case "4H": return "4H.png"; break;
    case "4S": return "4S.png"; break;
    case "5C": return "5C.png"; break;
    case "5D": return "5D.png"; break;
    case "5H": return "5H.png"; break;
    case "5S": return "5S.png"; break;
    case "6C": return "6C.png"; break;
    case "6D": return "6D.png"; break;
    case "6H": return "6H.png"; break;
    case "6S": return "6S.png"; break;
    case "7C": return "7C.png"; break;
    case "7D": return "7D.png"; break;
    case "7H": return "7H.png"; break;
    case "7S": return "7S.png"; break;
    case "8C": return "8C.png"; break;
    case "8D": return "8D.png"; break;
    case "8H": return "8H.png"; break;
    case "8S": return "8S.png"; break;
    case "9C": return "9C.png"; break;
    case "9D": return "9D.png"; break;
    case "9H": return "9H.png"; break;
    case "9S": return "9S.png"; break;
    case "10C": return "10C.png"; break;
    case "10D": return "10D.png"; break;
    case "10H": return "10H.png"; break;
    case "10S": return "10S.png"; break;
    case "JC": return "JC.png"; break;
    case "JD": return "JD.png"; break;
    case "JH": return "JH.png"; break;
    case "JS": return "JS.png"; break;
    case "QC": return "QC.png"; break;
    case "QD": return "QD.png"; break;
    case "QH": return "QH.png"; break;
    case "QS": return "QS.png"; break;
    case "KC": return "KC.png"; break;
    case "KD": return "kD.png"; break;
    case "KH": return "KH.png"; break;
    case "KS": return "KS.png"; break;
  }
}

function newgame()
{
  document.getElementById("firstpc").src = "red_back.png";
  document.getElementById("firstdc").src = "red_back.png";
  document.getElementById("secondpc").src = "red_back.png";
  document.getElementById("seconddc").src = "red_back.png";
  document.getElementById("thirdpc").src = "red_back.png";
  document.getElementById("thirddc").src = "red_back.png";
  document.getElementById("fourthpc").src = "red_back.png";
  document.getElementById("fourthdc").src = "red_back.png";
  document.getElementById("fifthpc").src = "red_back.png";
  document.getElementById("fifthdc").src = "red_back.png";
  document.getElementById("space").innerHTML = ""
  document.getElementById("space").className = "t1"
  playertotal = 0;
  dealertotal = 0;
  count = 0;
  playerace = 0;
  dealerace = 0;
  shuffle();
  deal();
  document.getElementById("newgame").disabled = true;
  document.getElementById("hit").disabled = false;
  document.getElementById("stand").disabled = false;
  check();
}

function check()
{
  if(playerace == 1)
  {
    if(playertotal > 21)
    {
      playertotal -= 10;
    }
  }
  else if(playerace == 2)
  {
    if(playertotal > 21)
    {
      playertotal -= 11;
    }
    if(playertotal > 21)
    {
      playertotal -= 10;
    }
  }
  if(dealerace == 1)
  {
    if(dealertotal > 21)
    {
      dealertotal -= 10;
    }
  }
  else if(dealerace == 2)
  {
    if(dealertotal > 21)
    {
      dealertotal -= 11;
    }
    if(dealertotal > 21)
    {
      dealertotal -= 10;
    }
  }
  if((playertotal > 21) || (dealertotal == 21))
  {
    document.getElementById("space").className = "t2"
    document.getElementById("space").innerHTML = "Dealer Wins!"
    document.getElementById("newgame").disabled = false;
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("seconddc").src = images(3);
    score("dealer");
  }
  else if((playertotal == 21) || (dealertotal > 21))
  {
    document.getElementById("space").className = "t2"
    document.getElementById("space").innerHTML = "You Win!"
    document.getElementById("newgame").disabled = false;
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("seconddc").src = images(3);
    score("player");
  }
}

function compare()
{
  document.getElementById("space").className = "t2"
  document.getElementById("seconddc").src = images(3);
  document.getElementById("newgame").disabled = false;
  if(dealertotal > playertotal)
  {
    document.getElementById("space").innerHTML = "Dealer Wins!"
    score("dealer");
  }
  else if(dealertotal < playertotal)
  {
    document.getElementById("space").innerHTML = "You Win!"
    score("player");
  }
  else
  {
    document.getElementById("space").innerHTML = "It's a tie!"
  }
}

function score(character)
{
  if(character == "player")
  {
    ps += 1;
  }
  else if(character == "dealer")
  {
    ds += 1;
  }
  document.getElementById("ps").innerHTML = ps;
  document.getElementById("ds").innerHTML = ds;
}

function stand()
{
  document.getElementById("seconddc").src = images(3);
  document.getElementById("hit").disabled = true;
  document.getElementById("stand").disabled = true;
  if((dealertotal >= 17) && (dealertotal <= 21))
  {
    compare();
  }
  else if((count == 4) && (dealertotal < 17))
  {
    if(document.getElementById("fourthdc").src == images(7))
    {
      document.getElementById("fifthdc").src = images(8);
    }
    else if(document.getElementById("thirddc").src == images(7))
    {
      document.getElementById("fourthdc").src == images(8)
    }
    dealertotal += calc(deck[8], "dealer");
    check();
    count += 1;
    stand();
  }
  else if((count == 3) && (dealertotal < 17))
  {
    if(document.getElementById("fourthdc").src == images(6))
    {
      document.getElementById("fifthdc").src = images(7);
    }
    else if(document.getElementById("thirddc").src == images(6))
    {
      document.getElementById("fourthdc").src == images(7)
    }
    else
    {
      document.getElementById("thirddc").src = images(7);
    }
    dealertotal += calc(deck[7], "dealer");
    check();
    count += 1;
    stand();
  }
  else if((count == 2) && (dealertotal < 17))
  {
    if(document.getElementById("fourthdc").src == images(5))
    {
      document.getElementById("fifthdc").src = images(6);
    }
    else if(document.getElementById("thirddc").src == images(5))
    {
      document.getElementById("fourthdc").src == images(6)
    }
    else
    {
      document.getElementById("thirddc").src = images(6);
    }
    dealertotal += calc(deck[6], "dealer");
    check();
    count += 1;
    stand();
  }
  else if((count == 1) && (dealertotal < 17))
  {
    if(document.getElementById("thirddc").src == images(4))
    {
      document.getElementById("fourthdc").src = images(5);
    }
    else
    {
      document.getElementById("thirddc").src = images(5);
    }
    dealertotal += calc(deck[5], "dealer");
    check();
    count += 1;
    stand();
  }
  else if((count == 0) && (dealertotal < 17))
  {
    document.getElementById("thirddc").src = images(4);
    dealertotal += calc(deck[4], "dealer");
    check();
    count += 1;
    stand();
  }
}

function hit()
{
  if(count == 2)
  {
    document.getElementById("fifthpc").src = images(6);
    playertotal += calc(deck[6], "player");
    check();
    count += 1;
  }
  else if(count == 1)
  {
    document.getElementById("fourthpc").src = images(5);
    playertotal += calc(deck[5], "player");
    check();
    count += 1;
  }
  else if(count == 0)
  {
    document.getElementById("thirdpc").src = images(4);
    playertotal += calc(deck[4], "player");
    check();
    count += 1;
  }
}
