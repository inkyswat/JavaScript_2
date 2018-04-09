var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


    // var canvas2 = document.getElementById('menu');
    // window.ctx2 = canvas2.getContext('2d');


    // var getCanvas = function () {
//     var canvas = document.getElementById('canvas');
//     var ctx = canvas.getContext('2d');
//     return ctx;
// }
// var counter = 1;
function main_loop() {

}


// RefreshCanvas();
function RefreshCanvas(arg, content) {

    switch (arg) {
        case 1:
            console.log(content);
            console.log("nr 1 toimib!");
            break;
        case 2:
            console.log(content);
            console.log("nr 2 toimib!");
            break;
        case 3:
            console.log(content);
            console.log("nr 3 toimib!");
            break;
        case 4:
            console.log(content);
            console.log("nr 4 toimib!");
            break;

            
        default:
            break;
    }


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(RefreshCanvas); // refreshimine jääb seisma kui mujale tab'i peale minna
}

// RefreshCanvas(1,"Sisku!"); // refreshimine jääb seisma kui mujale tab'i peale minna


function myFunction() {
    var FrmData = [];
    var x = document.getElementById("frm1");
    var text = "";
    for (var i = 0; i < x.length; i++) {
        text = x.elements[i].value;
        
        FrmData.push(text);
    }
    
    RefreshCanvas(parseInt(FrmData[0]), FrmData[1]);
}