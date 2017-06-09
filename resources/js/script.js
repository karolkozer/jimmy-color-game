$(document).ready(function(){
    
    var gameData = (function(){
    
    var colors, pickedColor;
    
    var randomColor = function(){
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        
        return "rgb("+ r +", " + g +", " + b +")";  
    }

    var generateRandomColors = function(numSquare){
        var arr = [];
        
        for(var i = 0; i < numSquare; i++){
            arr.push(randomColor());
        }
        
        return arr;
    }
    
    var pickColor = function(){
        random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }
    
    
    return {
         colorSquare: function(numSquare){
             return colors = generateRandomColors(numSquare);
        },
        
        pickedColorSquare: function(){
            return pickedColor = pickColor();
        }    
        
        
    }
    
})();

    var UIController = (function(){
        var DOM, animationEnd, square;

        DOM = {
            square: ".square",
            displayColor: "#display-picked-color",
            messageDisplay: "#result-display",
            modalScreen: ".modal-screen",
            playAgainBtn: "#restart",
            beardman: ".beardedman",
            restartBtn: "#reset",
            modalBtn: ".modal"
        }

        square = $(DOM.square);

        animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

        return {

             displayModal: function(el, color){

                $(DOM.modalScreen).addClass("animated tada").one(animationEnd, function(){
                    $(this).removeClass("animated tada");
                });

                $(DOM.modalScreen).css({
                    width: el,
                    backgroundColor: color
                });

             },

             displayMessage: function(){

                $(DOM.messageDisplay).css("opacity", "1");
                $(DOM.messageDisplay).addClass("animated bounceIn").one(animationEnd, function(){
                    $(this).removeClass("animated bounceIn");
                    $(this).css("opacity", "0");
                });

             },

             addSquareColors: function(el){

                for(var i = 0; i < el.length; i++){
                    if(el[i]){
                         square.eq(i).css("background-color", el[i]);
                         square.eq(i).css("display", "block");

                    }
                }

             },

            removeSquare: function(el){
                
                for(var i = el; i < 8; i++){
                    square.eq(i).css("background-color", "rgba(255, 167, 135, 0.3)");
                }
                
            },

             aniamtion: function(el, name){
                 
                 $(el).addClass("animated " + name);
                 
             },

             getDOM: DOM
        }
    
    })();


    var AppController = (function(UICrtl, gameDataCrtl){
    
        var DOMstring, colors, pickedColor, numSquare;

        DOMstring = UICrtl.getDOM;

        numSquare = 8;

        var levelMode = function(e){
            e.text() === "Easy" ? numSquare = 4 : numSquare = 8;
        }

        var checkAnswer = function(e, picked){

            if(e.css("background-color") === picked){
                console.log("Goood JOB");
                UICrtl.displayModal("100%", picked);
            }else{
                console.log("Wrong!!!!!!");
                UICrtl.displayMessage();
            }

        }

        var controller = function(){
            // Generate Colors
            colors = gameDataCrtl.colorSquare(numSquare);
            // Pick color
            pickedColor = gameDataCrtl.pickedColorSquare();
            //Display picked Color
            $(DOMstring.displayColor).text(pickedColor);
            console.log(pickedColor);
            // Add colors to square
            UICrtl.addSquareColors(colors);

        }

        // Set up buttons
        var setUpEventListeners = function(){

            $(DOMstring.modalBtn).click(function(){
                levelMode($(this));
                controller();
                UICrtl.removeSquare(numSquare);
            });

            $(DOMstring.restartBtn).click(function(){
                controller();
                UICrtl.displayModal("0%");
            });

            $(DOMstring.square).click(function(){
                 checkAnswer($(this), pickedColor);
             });

        }


        return {
            init: function(){
                UICrtl.aniamtion(DOMstring.beardman, "fadeInLeftBig");
                controller();
                setUpEventListeners();
            },

            test: function(){
                return colors;
            }
        }
    
    })(UIController, gameData);

    AppController.init();
});
