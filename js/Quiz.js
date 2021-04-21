class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){

    //write code here to hide question elements
    question.hideElements();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    textSize(75);
    text("RESULTS", 280, 75);


    //call getContestantInfo( ) here

    Contestant.getPlayerInfo();
    
    //write condition to check if contestantInfor is not undefined

    //write code to add a note here
    textSize(25);
    text("The contestant who answered correctly is given in green color", 120, 250);

    //write code to highlight contest who answered correctly
    if(allContestants !== undefined){ 
      var display_position = 300; 
      for(var plr in allContestants){ 
        //console.log(allContestants[plr].answer);
        if (allContestants[plr].answer - 2 === 0)
        fill("green");
        else
        fill("red");
        display_position+=20; 
        textSize(25); 
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 350,display_position);
      } 
    }
  }
}