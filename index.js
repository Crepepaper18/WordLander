let word = [];
let foundList = [];

fetch('words.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    word = data.words;
    let letterList = codeChar();

    for (let i = 0; i < 7; i++) {
        document.querySelectorAll(".letter-bubble")[i].addEventListener("click", function () {
            var letterValue = this.innerHTML;
            var currentValue = document.querySelector("input.fld").value;
            document.querySelector("input.fld").value = currentValue + letterValue;
        });
    }

    document.querySelector("input.fld").addEventListener("keydown", function (event) {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Shift'];
        if (!letterList.includes(event.key.toLowerCase()) && event.key.length === 1 && !allowedKeys.includes(event.key)) {
            alert("Letter not present in the bubbles!");
            event.preventDefault();
        }
    });

    let noOfWords = 0;
    var loss = 0;

    document.querySelector("button.enter").addEventListener("click", function () {
        var madeWord = document.querySelector("input.fld").value.toUpperCase();
        
        if(document.querySelector("input.fld").value.length<4)
        {
            alert("Word is too short!");   
        }
        else if (word.includes(document.querySelector("input.fld").value.toLowerCase())) {
            if(!foundList.includes(madeWord)){
                foundList.push(madeWord);
                console.log(foundList);
                if(noOfWords%17==0)
                {
                    const newWordList = document.createElement("div");
                    newWordList.className = "word-list";

                    document.querySelector(".space").appendChild(newWordList);

                    newWordList.innerHTML += `<div>${madeWord}</div>`;
                    document.querySelector("input.fld").value = "";
                } 
                else 
                {
                    const wordLists = document.querySelectorAll(".word-list");
                    const lastWordList = wordLists[wordLists.length - 1];
                    lastWordList.innerHTML += `<div>${madeWord}</div>`;
                    document.querySelector("input.fld").value = "";
                }

                noOfWords++;

                var prog = madeWord.length+5;
                addScore(prog);

            }
            else
            {
                alert("Word already found!");
            }
        }
         else {
            alert("Not a valid word!");     
            if (loss < document.querySelectorAll(".life div img").length) {
                document.querySelectorAll(".life div img")[loss].src = "Assets/Images/heart-svgrepo-com.svg";
                loss++;
            }
            else
            {
                document.querySelector(".popup").classList.add("show");
                document.querySelector(".highscore>span").innerHTML = progress;
                document.querySelector(".message").innerHTML = "Try Again!"
            }
        }
        
    });

    document.querySelector("button.erase").addEventListener("click", function () {
        document.querySelector("input.fld").value = document.querySelector("input.fld").value.slice(0, -1);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key == "Backspace") {
            document.querySelector("input.fld").value = document.querySelector("input.fld").value.slice(0, -1);
        }
    });

    document.querySelector(".win button").addEventListener("click",function(){
        document.querySelector(".popup").classList.remove("show");
    });
});

var progress = 0;

function addScore(value)
{
    progress+=value;
    if(progress<100)
    {
        document.documentElement.style.setProperty('--progress',`${progress}%`);
   }
    else
    {
        document.documentElement.style.setProperty('--progress',`${progress}%`);
        document.querySelector(".highscore>span").innerHTML = progress;
        document.querySelector(".popup").classList.add("show");
    }
}

function randomNumber() {
    var rn = Math.floor(word.length * Math.random());
    return rn;
}

function randomWord() {
    var index = randomNumber();
    var theWord = word[index];
    return theWord;
}

function hasDoubleLetters(i) {
    return /(.)\1/.test(i.toLowerCase());
}

function chosenLetter() {
    var letterNo = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(letterNo);
}

function codeChar() {
    let letters =[];
    
    while (letters.length < 7) {
        let newLetter = chosenLetter();
        if (!letters.includes(newLetter)) {
            letters.push(newLetter);
        }
    }

    p1 = letters[2].toUpperCase();
    p2 = letters[0].toUpperCase();
    p3 = letters[3].toUpperCase();
    p4 = letters[1].toUpperCase();
    p5 = letters[6].toUpperCase();
    p6 = letters[4].toUpperCase();
    p7 = letters[5].toUpperCase();

    document.querySelector(".b1").textContent = p1;
    document.querySelector(".b2").textContent = p2;
    document.querySelector(".b3").textContent = p3;
    document.querySelector(".b4").textContent = p4;
    document.querySelector(".b5").textContent = p5;
    document.querySelector(".b6").textContent = p6;
    document.querySelector(".b7").textContent = p7;

    return letters;
}
