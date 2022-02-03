let btn = document.getElementsByClassName('options');
let startBtn = document.getElementById("start");
let questionLimit = 0;
let correct = 0;

let triviaQuestion = document.getElementById('question');
     let a = document.getElementById('optionA');
      let b = document.getElementById('optionB');
       let c = document.getElementById('optionC');
        let d = document.getElementById('optionD');

let questionArray = [a, b, c, d];        

  startBtn.addEventListener('click', function(){

    let ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://opentdb.com/api.php?amount=1&type=multiple');
    ourRequest.onload = function load() {
    let ourData = JSON.parse(ourRequest.responseText);
    console.log(ourData);
    
    questionLimit++;
    
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
         arr[i] = arr[j];
         arr[j] = temp;
   }       
   return arr;
}
shuffleArray(questionArray);

triviaQuestion.innerHTML = ourData.results[0].question;
  questionArray[0].innerHTML = ourData.results[0].correct_answer;
    questionArray[1].innerHTML =  ourData.results[0].incorrect_answers[0];
      questionArray[2].innerHTML =  ourData.results[0].incorrect_answers[1];
        questionArray[3].innerHTML =  ourData.results[0].incorrect_answers[2];

        function removeCorrectClass() {
           questionArray[0].classList.remove("select");
        } 

         function removeIncorrectClassOne() {
           questionArray[1].classList.remove("incorrect");
        } 

         function removeIncorrectClassTwo() {
           questionArray[2].classList.remove("incorrect");
        } 

         function removeIncorrectClassThree() {
           questionArray[3].classList.remove("incorrect");
        } 

        questionArray[0].onclick = function(){
          questionArray[0].classList.add('select');

          if(questionArray[0].innerHTML === ourData.results[0].correct_answer){
             correct++;
          }
          setTimeout(removeCorrectClass, 900);
        };

        questionArray[1].onclick = function(){
          questionArray[1].classList.add('incorrect');
          
          setTimeout(removeIncorrectClassOne, 900);
        };

        questionArray[2].onclick = function(){
          questionArray[2].classList.add('incorrect');
          
          setTimeout(removeIncorrectClassTwo, 900);
        };

        questionArray[3].onclick = function(){
          questionArray[3].classList.add('incorrect');
          
          setTimeout(removeIncorrectClassThree, 900);
        };

     if(questionLimit > 10){
       triviaQuestion.innerHTML = 'The end, your score is ' + correct +'/10. Reload page for new set of questions!';
       questionArray[0].innerHTML = '';
       questionArray[1].innerHTML =  '';
       questionArray[2].innerHTML =  '';
       questionArray[3].innerHTML = ''; 
  };
}
ourRequest.send();
  })

