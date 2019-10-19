//creating the politician object a repeating function
var createPolitician = function(firstName, partyColor, countryVotes) {

  var politician = {};
    politician.politicianName = firstName
    politician.color = partyColor;
//electoral vote parameters
    politician.electionResults = null;
    politician.totalVotes = 0;
//total votes parameters
    politician.cVotes = countryVotes[0];
    politician.votesPerState = null;
    politician.percentofVote = 0;
    politician.percentofTotalVotes = 0;
    politician.totalVotesCast = 0;

//adding up all of the electoral state results
    politician.addingTally = function(state) {

      this.totalVotes = 0;

      for (var i = 0; i < this.electionResults.length; i++) {
        this.totalVotes = this.totalVotes + this.electionResults[i];
      }
    };

//their votes as a percentage of the total votes they recieved for each individual state
politician.percent = function(state) {

   this.percentofVote = 0;


    for (var i = 0; i < this.votesPerState.length; i++){
       this.percentofVote = (this.votesPerState[i] / this.cVotes) * 100;
        }
};

//their votes as a percentage of the overall votes cast in the election
    politician.percentTotal = function() {
      //can this be entered once as a parameter?
      this.totalVotesCast = 138800000;
      this.percentofTotalVotes = (this.cVotes / this.totalVotesCast) * 100;
      this.percentofTotalVotes = this.percentofTotalVotes.toFixed(2);
  };

return politician;
};

//assigning data to the politician objects
var candidate1 = createPolitician("CLINTON", [62, 20, 226], [65853514]);
var candidate2 = createPolitician("TRUMP", [234, 20, 14], [62984828]);

//results of the candidates by electoral votes and by total votes cast
candidate1.electionResults = [0, 0, 0, 0, 55, 9, 7, 3, 3, 0, 0, 3, 0, 20, 0, 0, 0, 0, 0, 2, 10, 11, 0, 10, 0, 0, 0, 0, 6, 4, 14, 5, 29, 0, 0, 0, 0, 7, 0, 4, 0, 0, 0, 0, 0, 3, 13, 8, 0, 0, 0, 0];
candidate2.electionResults = [9, 3, 11, 6, 0, 0, 0, 0, 0, 29, 16, 0, 4, 0, 11, 6, 6, 8, 8, 0, 0, 0, 16, 0, 6, 10, 3, 2, 0, 0, 0, 0, 0, 15, 3, 18, 7, 0, 20, 0, 9, 3, 11, 36, 6, 0, 0, 5, 10, 3, 3];

candidate1.votesPerState = [718084, 93007, 936250, 378729, 7362490, 1208095, 884432, 235581, 260223, 4485745, 187300, 251853, 189677, 2977498, 10319553, 650790, 414788, 628834, 779535, 354873, 1497951, 1964768, 2268193, 1366676, 462001, 1054889, 174521, 273858, 537753, 348521, 2021756, 380724, 4143874, 2162074, 93526, 2317001, 419788, 934631, 2844705, 249902, 849469, 117442, 867110, 3867816, 274188, 178179, 1916845, 1610524, 187457, 1382210, 55949];
candidate2.votesPerState = [1306925, 130415, 1021154, 677904, 7362490, 1136354, 668266, 185103, 11553, 4605515, 2068623, 121648, 407199, 2118179, 1556220, 798923, 656009, 1202942, 1178004, 334838, 873646, 1083069, 2279805, 1322891, 678457, 15585753, 274120, 485819, 511319, 345789, 1535513, 315875, 2640570, 2339603, 216133, 2771984, 947934, 742506, 2912941, 179421, 1143611, 227701, 1517402, 4681590, 452086, 95053, 1731156, 1129120, 187457, 1382210, 174248];

//calculating the totals for their votes
candidate1.addingTally();
candidate2.addingTally();

//calculating the percentage of their votes per state out of their total number of Votes
candidate1.percent(state);
candidate2.percent(state);

//calculating the percentage of their votes out of the total votes cast
candidate1.percentTotal();
candidate2.percentTotal();

//declaring a global winner variable
var winner = "...";

  if (candidate1.totalVotes> candidate2.totalVotes) {
    winner = candidate1.polticianName; }
  else if (candidate2.totalVotes > candidate1.totalVotes) {
    winner = candidate2.politicianName; }
  else {
    winner = "It's a draw";
}

//calculating the results for each state, filling the bottom table and the details of each state's results
var setStateResults = function(state) {

  theStates[state].winner = null;

  if (candidate1.electionResults[state] > candidate2.electionResults[state]) {
    theStates[state].winner = candidate1;
  }
  else if (candidate2.electionResults[state] > candidate1.electionResults[state]) {
    theStates[state].winner = candidate2;
}

var stateWinner = theStates[state].winner;

  if (theStates[state].winner !== null) {
    theStates[state].rgbColor = stateWinner.color;
  }
  else { theStates[state].rgbColor = [139, 174, 127];
}

var bottomTable = document.getElementById("stateResults");

  var topColumn = bottomTable.children[0].children[0];
  var stateName = topColumn.children[0];
  var stateAbbr = topColumn.children[1];
  stateName.innerText = theStates[state].nameFull;
  stateAbbr.innerText = theStates[state].nameAbbrev;

  var secondColumn = bottomTable.children[1].children[0];
  var thirdColumn = bottomTable.children[1].children[1];

  secondColumn.children[0].innerText = candidate1.politicianName;
  thirdColumn.children[0].innerText = candidate2.politicianName;

  secondColumn.children[1].innerText = candidate1.electionResults[state];
  thirdColumn.children[1].innerText = candidate2.electionResults[state];
  secondColumn.children[2].innerText = candidate1.percentofVote[state]toFixed(2);
  thirdColumn.children[2].innerText = candidate2.percentofVote[state]toFixed(2);

  var fourthColumn = bottomTable.children[1].children[2];

  if (stateWinner === null) {
    fourthColumn.children[1].innerText = "DRAW";
  }
  else {
    fourthColumn.children[1].innerText = theStates[state].winner.politicianName;
  }
};

//accessing the top table and populating the electoral votes and overall WINNER
var topTable = document.getElementById("countryResults");
var topTableRow = topTable.children[0].children[0];
topTableRow.children[0].innerText = candidate1.politicianName;
topTableRow.children[1].innerText = candidate1.totalVotes;
topTableRow.children[2].innerText = candidate2.politicianName;
topTableRow.children[3].innerText = candidate2.totalVotes;
topTableRow.children[5].innerText = winner;

//accessing other percentage table to display the percentage of votes across the country
var percentTable = document.getElementById("overallResults");
var topPercentRow = percentTable.children[0].children[0];
var secondPercentRow = percentTable.children[1].children[0];
var thirdPercentRow = percentTable.children[1].children[1];
topPercentRow.children[0].innerText = candidate1.politicianName;
topPercentRow.children[1].innerText = candidate2.politicianName;
secondPercentRow.children[0].innerText = candidate1.percentofTotalVotes + " %" ;
secondPercentRow.children[1].innerText = candidate2.percentofTotalVotes + " %";
thirdPercentRow.children[0].innerText = candidate1.cVotes;
thirdPercentRow.children[1].innerText = candidate2.cVotes;
