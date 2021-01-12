alert('Hello World');

let favFood = '';


function fed() {
    if (favFood === "Nothing" || favFood === '') {
        document.getElementById("response").innerHTML = "<br/>Bunny is sad.</br>Will you please feed Bunny?";
    }
    else if (favFood === "Carrot Cake") {
        document.getElementById('response').innerHTML = "<br/>Wow! You brought Bunny's Favorite Snack!<br/> Bunny Is beaming with joy!"
    }
    else  {
        document.getElementById("response").innerHTML = "<br/>Bunny ate the " + favFood + ". He loves it!<br/>Try giving him another snack!";
    }
}

function feed() {
    favFood = document.getElementById("snack").value;
    fed();
}
