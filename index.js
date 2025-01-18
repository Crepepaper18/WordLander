let word = [];
let foundList = [];
var inputField = document.querySelector("input.fld");
fetch('words.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    word = data.words;
    let letterList = chooseLetters();

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

                var prog = madeWord.length;
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

function chooseWord()
{
    var chosenWordIndex = Math.floor(Math.random() * word.length);
    if(word[chosenWordIndex].length==7)
    {
        return word[chosenWordIndex];
    }
    else
    {
        return chooseWord();
    }
}

function chooseLetters()
{
    var letterArray = [];
    var selectWord = chooseWord();
    for(let letter of selectWord)
    {
        if(!letterArray.includes(letter))
        {
            letterArray.push(letter);
        }
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    while (letterArray.length < 7) {
        let randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        if (!letterArray.includes(randomLetter)) {
            letterArray.push(randomLetter);
        }
    }

    letterArray = letterArray.sort(() => Math.random() - 0.5);

    for(var i = 0;i<7;i++)
    {
        document.querySelectorAll(".letter-bubble")[i].innerHTML = letterArray[i].toUpperCase();
    }

    return letterArray;
}
