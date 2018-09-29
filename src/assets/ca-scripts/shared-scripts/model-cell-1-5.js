//Cell Klasse
/// Die Kernfunktion des Automaten wird von den Zellen selbst ausgeführt:
/// Jedes Zellobjekt kennt seinen Nachbarn und kann seinen neuen Zustand 
/// selbstständig berechnen

function Cell(initialState, automaton) 
{
  this._automaton = automaton;
  this._state = initialState;
  this._history = [];

/// lädt den Startzustand jeder Zelle in ihr History-Array.
  this.initialise = function()
  {
    //this._history.push(this._state);
  }
} 

/////////prototype
Cell.prototype._formerState = 0;
Cell.prototype._age = 0;
Cell.prototype._position = 0;;
Cell.prototype.leftNeighbour = null;
Cell.prototype.rightNeighbour = null;

Cell.prototype.setState = function(newState){
  this._state = newState;
}
Cell.prototype.setPosition = function(position){
  this._position = position;
}
Cell.prototype.setRightNeighbour = function(cell){
  this.rightNeighbour = cell;
};

Cell.prototype.setLeftNeighbour = function(cell){
  this.leftNeighbour = cell;
};

  ///// Überträgt das Regelwerk des Automaten auf eine Zelle:
  ///// Der Rückgabewert der Funktion ist der neue Zellzustand.
  ///// Die Übergabeparameter left und right sind die Zustände der linken und rechten Nachbarzellen.
  ///// Über den String "Triplet" wird die Nachbarschaftskonstellation einer Zelle zu einem bestimmten Zeitpunkt als Binärzahl ermittelt.
  ///// Der Wert der ermittelten Binärzahl entspricht dem Index im _ruleset-Array des Automaten, der die information über den neuen Zellzustand der mittleren Zelle 
  ///// für diese Nachbarschaftkonstellation enthält.
  Cell.prototype.calculateState= function(left,right)
  {
    let triplet = "";
    triplet = triplet + left + this._state +  right;
    let result = this._automaton._ruleset[parseInt(triplet,2)];
    return result;
  };

  /*
    Hier wird der eigentliche Automaten-Algorithmus ausgeführt:
    Jedes Zellobjekt ändert seine Zustandseigenschaft mithilfe der calculateState-Methode.
    Dadurch, dass nicht alle Zellzustände gleichzeitig berechnet werden, sondern nacheinander durch das Zellarray iteriert wird,
    benötigt eine Zelle zur Berechnung ihres neuen Zustandes den aktuellen Zustand ihres rechten Nachbarn, aber den vorherigen Zustand ihres 
    linken Nachbarn, da dieser seinen neuen aktuellen Zustand zum zeitpunkt der Berechnung bereits erhalten hat.
    Ausnahmen bilden durch ihre besondere Nachbarschaftsverknüpfung die beiden Zellen an den Rändern des Arrays.
  */
 Cell.prototype.generateCellParameters= function()
 {
  let left = (this._position ==0)? this.leftNeighbour._state : this.leftNeighbour._formerState;
  let right = (this._position == (this._automaton._cells.length)-1)? this.rightNeighbour._formerState: this.rightNeighbour._state;
  this._formerState= this._state;
  this._state = this.calculateState(left, right);
  this.setAge();
  //this._history.push(this._state);
};

Cell.prototype.setAge = function(){
  this._age = ((this._state==1)&&(this._formerState==1))? this._age++ : 0;
};

Cell.prototype.reset = function(){
  this._state = 0;
  this._age = 0;
  this._formerState = 0;
  //this._history = [];
};  

