
var counter;
var timer;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var q = 1;
var correctAnswer = "";
var answersArray = [];

var trivia = {

    questions: [
        "Who is Princess Aurora's prince?",
        "Who is Simba's love interest in the Lion King?",
        "What is the name of Disney's well-known, big-eared elephant?",
        "How long was the Genie from Aladdin stuck in the lamp?",
        "What does the Evil Queen in Snow White use to poison her?",
        "In the Jungle Book, who teaches Mowgli about the 'Bare Necessities of Life?",
        "Cruella de Vil is the villain in which Disney movie?",
        "What is the name of the kid who owns Woody and Buzz Lightyear in Toy Story?",
        "What is the name of the most famous song from Frozen, which Elsa sings while building her ice castle?",
        "In Finding Nemo, which country has Nemo been taken to?",
        "What does the Tick-Tock Crocodile from Peter Pan swallow?",
        "What does Cinderella's fairy godmother turn into a carriage?",
        "Which was the first Disney movie to receive an Oscar nomination for Best Picture?",
        "What type of animal does Jasmine have for a pet in Aladdin?",
        "What is the name of Hercules' sidekick, who he receives as a gift from his parents?",
        "In Robin Hood, what type of animal was Robin?"],
    q1: ["Prince Philip", "Prince Florian", "Prince Henry", "Prince Eric"],
    q2: ["Nala", "Sabari", "Sazú", "Shenzi"],
    q3: ["Dumbo", "Elliott", "Lumpy", "Tantor"],
    q4: ["10000 years", "1 hour", "500 years", "1000 years"],
    q5: ["Apple", "Watermelon", "Orange", "Actual poison"],
    q6: ["Baloo", "Bagheera", "Shere Khan", "Kaa"],
    q7: ["101 Dalmatians", "The Hound and the Fox", "Lady and the Tramp", "The Little Mermaid"],
    q8: ["Andy", "Merida", "Sid", "Wendy"],
    q9: ["Let It Go", "Do You Want To Build A Snowman?", "Love Is An Open Door", "For The First Time In Forever"],
    q10: ["Australia", "China", "Republic of Congo", "Mexico"],
    q11: ["Clock", "Ship", "Tinker Bell", "Hat"],
    q12: ["Pumpkin", "Boat", "Potato", "Mouse"],
    q13: ["Beauty and the Beast", "Snow White", "Cinderella", "Hercules"],
    q14: ["Tiger", "Koala", "Camel", "Snake"],
    q15: ["Pegasus", "Abu", "Maximus", "Mushu"],
    q16: ["Fox", "Dog", "Spider", "Rabbit"],
    images: [
        ["assets/images/prince-philip.gif", "assets/images/prince-philip-2.gif"],
        ["assets/images/Nala.gif", "assets/images/Nala-2.gif"],
        ["assets/images/dumbo.gif", "assets/images/dumbo-2.gif"],
        ["assets/images/genie.gif", "assets/images/genie-2.gif"],
        ["assets/images/evil-queen.gif", "assets/images/evil-queen-2.gif"],
        ["assets/images/baloo.gif", "assets/images/baloo-2.gif"],
        ["assets/images/cruella.gif", "assets/images/cruella-2.gif"],
        ["assets/images/andy.gif", "assets/images/andy-2.gif"],
        ["assets/images/elsa.gif", "assets/images/elsa-2.gif"],
        ["assets/images/nemo.gif", "assets/images/nemo-2.gif"],
        ["assets/images/croc.gif", "assets/images/croc-2.gif"],
        ["assets/images/pumpkin.gif", "assets/images/pumpkin-2.gif"],
        ["assets/images/beauty-beast.gif", "assets/images/beauty-beast-2.gif"],
        ["assets/images/rajah.gif", "assets/images/rajah-2.gif"],
        ["assets/images/pegasus.gif", "assets/images/pegasus-2.gif"],
        ["assets/images/robin-hood.gif", "assets/images/robin-hood-2.gif"]
    ]
}

$(document).ready(function () {

    $("#start").click(function () {

        initialize();

        $(".title span").animate({'top': '50px'}, 100, 'linear').css('animation-iteration-count', '2');

        $(".button-container").addClass('hide');
        $(".questions-container").removeClass('hide');

        setQA();
    });

    $(".answer").click(function () {

        clearInterval(timer);

        change();

        var selectedAnswer = $(this).text();

        if (selectedAnswer === correctAnswer) {
            $(".feedback img").attr('src', trivia.images[q - 2][0]);
            $(".check").text("Correct");
            $(".correct").addClass('hide');
            correct++;
        }
        else {
            $(".feedback img").attr('src', trivia.images[q - 2][1]);
            $(".check").text("Incorrect");
            $(".correct-answer").text(correctAnswer);
            $(".correct").removeClass('hide');
            incorrect++;
        }

        if (q <= 16) {
            setTimeout(nextQuestion, 4000);
        }
        else {
            finished();
        }
    });

    $(".over").click(function() {
        $(".results").toggleClass('hide');
        $(".options").toggleClass('hide');
        $(".question").toggleClass('hide');

        q = 1;
        correct = 0;
        incorrect = 0;
        unanswered = 0;

        initialize();

        setQA();
    })

    function initialize() {

        timer = setInterval(function () {

            counter--;

            if (counter === 0) {
                change();
                $(".feedback img").attr('src', trivia.images[q - 2][1]);
                $(".check").text("Out of time");
                $(".correct-answer").text(correctAnswer);
                $(".correct").removeClass('hide');
                clearInterval(timer);
                setTimeout(nextQuestion, 4000);
                unanswered++;
            }

            $(".seconds").text(counter);
        }, 1000)

        counter = 30;
        $(".seconds").text(counter);
    }

    function setQA() {
        $(".question").text(trivia.questions[q - 1]);

        answersArray = trivia["q" + q].slice();
        correctAnswer = answersArray[0];

        answersArray.sort(function () {
            return 0.5 - Math.random();
        });

        for (var i = 1; i <= answersArray.length; i++) {
            $("#a" + i).text(answersArray[i - 1]);
        }

        q++;
    }

    function change() {
        $(".options").toggleClass('hide');
        $(".feedback").toggleClass('hide');
        $(".question").toggleClass('hide');
    }

    function nextQuestion() {
        initialize();

        setQA();

        change();
    }

    function finished() {
        clearInterval(timer);
        setTimeout(function () {
            var mickey = new Audio('mickey-whistle.mp3');
            mickey.play();

            $(".feedback").toggleClass('hide');
            $(".results").toggleClass('hide');
            $(".correct-points").text(correct);
            $(".incorrect-points").text(incorrect);
            $(".unanswered-points").text(unanswered);
        }, 4000);

    }
});