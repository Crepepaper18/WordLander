let word = [];
let foundList = [];
var inputField = document.querySelector("input.fld");
fetch('words.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    word = data.words;
    let letterList = codeChar();

    for (let i = 0; i < 7; i++) {
        document.querySelectorAll(".letter-bubble")[i].addEventListener("click", function () {
            inputField.value += this.innerHTML;
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
            document.querySelector("input.fld").value = "";     
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

function hasDoubleLetters(i) {
    return /(.)\1/.test(i.toLowerCase());
}

const consonants = ['j', 'q' , 'v', 'w', 'x', 'y', 'z'];
const mostcons = ['b', 'c', 'd', 'f', 'g','h','k', 'l', 'm', 'n', 'p','s','t','r','a', 'e', 'i', 'o', 'u'];

function chosenLetter() {
    let letterNo = [];
    while(letterNo.length<6)
    {
        var con = Math.floor(Math.random() * mostcons.length);
        if(!letterNo.includes(mostcons[con]))
        {
            letterNo.push(mostcons[con]);
        }
    }
    
    var rare = Math.floor(Math.random() * consonants.length);
    letterNo.push(consonants[rare]);
    return letterNo;
}

function codeChar() {
    letters = chosenLetter();

    document.querySelector(".b1").textContent = letters[0].toUpperCase();
    document.querySelector(".b2").textContent = letters[1].toUpperCase();
    document.querySelector(".b3").textContent = letters[3].toUpperCase();
    document.querySelector(".b4").textContent = letters[2].toUpperCase();
    document.querySelector(".b5").textContent = letters[4].toUpperCase();
    document.querySelector(".b6").textContent = letters[5].toUpperCase();
    document.querySelector(".b7").textContent = letters[6].toUpperCase();

    return letters;
}
