var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvas2 = document.getElementById('menu');
var ctx2 = canvas2.getContext('2d');
var wheels = [];
var running = 0;



var menu = {
    border: 2,
    bg_color: "#a0e2de",
    text_color: "#010101",
	FontHeight: 19,
    fontSize: "19px serif",
	header__text: "debug data:",
	rowHeight: 4,
	row1: "text 1:",
	row2: "text 2:",
	row3: "text 3:",
	
}
// Converts from degrees to radians.
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};

class wheel {
    constructor(posX, posY, MoveSpeed, radius, radiusChange, direction, Accel) {
        this.posX = posX;
        this.posY = posY;
        this.MoveSpeed = MoveSpeed;
        this.radius = radius;
        this.radiusChange = radiusChange;
        this.direction = direction;
        this.Accel = Accel;
    }
    manipul(direction = this.direction) {

            this.radius += this.radiusChange; // radius ei tohi olla negatiivne, siis peksab seghašt!
            this.MoveSpeed += this.Accel;

            if (this.radius < 1) { // paneme raadiuse nulliks kui tahab negatiivseks minna
                this.radius = 0;
            }
            else if (this.direction > 0 && this.direction < 90 || this.direction > 270 && this.direction < 360) {
                this.posY += this.MoveSpeed * Math.sin(Math.radians(this.direction));
                this.posX += this.MoveSpeed * Math.cos(Math.radians(this.direction));
            }
            else if (this.direction > 90 && this.direction < 180 || this.direction > 180 && this.direction < 270) {
                this.posY += this.MoveSpeed * Math.sin(Math.radians(this.direction));
                this.posX += this.MoveSpeed * Math.cos(Math.radians(this.direction));
            }
            else if (direction == 0 || direction == 360) {
                this.posX += this.MoveSpeed;
            }
            else if (direction == 90) {
                // console.log(this.MoveSpeed);
                this.posY += this.MoveSpeed;
            }
            else if (direction == 180) {
                this.posX -= this.MoveSpeed;
            }
            else if (direction == 270) {

                this.posY -= this.MoveSpeed;
            }
            else {

            }

    }
    draw(posX, posY, radius) {
        var BallCol = 0+(parseInt(this.direction) * 1).toString(); //direction.toString();

        ctx.beginPath();
        ctx.arc(posX, posY, radius, 0, 2 * Math.PI);
        // this.ctx.fillStyle = "#" + BallCol;//"#0a0178";

        if (this.direction >= 0) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#" + BallCol;//"#0a0178";
            ctx.stroke();

        }
        if (this.direction < 0) {
            ctx.fillStyle = "#" + BallCol;//"#0a0178";
            // ctx.fillStyle = "#" + (parseInt(this.direction) * 5).toString();//"#0a0178";
            ctx.fill();
        }
    }
}




function ClearCanvas() {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
		
}


function DrawMenu() {
    ctx2.fillStyle = menu.bg_color;
    ctx2.fillRect(menu.border, menu.border, canvas2.width - menu.border * 2, canvas2.height - menu.border * 2);
    ctx2.fillStyle = menu.text_color;
    ctx2.font = menu.fontSize;
    ctx2.fillText(menu.header__text, menu.border + 4, menu.border + menu.FontHeight);
    ctx2.fillText(menu.row1, menu.border + 4, menu.border + menu.FontHeight*2 + menu.rowHeight*2);
    ctx2.fillText(menu.row2, menu.border + 4, menu.border + menu.FontHeight*3 + menu.rowHeight*3);
    ctx2.fillText(menu.row3, menu.border + 4, menu.border + menu.FontHeight*4 + menu.rowHeight*4);
	
}


// RefreshCanvas();
function RefreshCanvas(run) {
    if (run == 1) {
        running = 1;
    }
    if (run == -1) {
        running = 0;
    }
    if (running == 1) {
        ClearCanvas();
        for (let i = 0; i < wheels.length; i++) {
            wheels[i].draw(wheels[i].posX, wheels[i].posY, wheels[i].radius);
            wheels[i].manipul();
        }
        
        requestAnimationFrame(RefreshCanvas); // refreshimine jääb seisma kui mujale tab'i peale minna
    }
    
}


function SendForm() {
    var FrmData = [];
    var x = document.getElementById("frm1");
    var text = "";
    for (var i = 0; i < x.length; i++) {
        text = x.elements[i].value;
        
        FrmData.push(text);
        
    }
    document.getElementById("status_inf").innerHTML = FrmData[0];
    switch (parseInt(FrmData[0])) {
        case 1:
        example_1();
        RefreshCanvas(1);

        break;
        case 2:
        RefreshCanvas(1);
        break;
        case 3:
        RefreshCanvas(1);
        break;
        case 4:
        stopRefresh();
        RefreshCanvas(-1);
        break;
        
        
        default:
        break;
        
    }
 }


// default running fns
DrawMenu();
    document.getElementById("wheels_array").innerHTML = ": " + wheels.length;


// examples

function example_1() {
	if (wheels.length != 0) {
		wheels.splice(0, 360);
	}
    for (let i = 0; i < 180; i++) {
        let r = parseInt(30 + Math.random() * 1);
        let x = parseInt(r + Math.random() * (canvas.width - 2 * r)); // et pall tekiks canvase alass on vaja ruudu laius maha lahutada
        let y = parseInt(r + Math.random() * (canvas.height - 2 * r));
        let MoveSpeed = 6.6; // + parseInt(Math.random() * 0);
        let direction = 360 * Math.random();
        let Accel = Math.random() * 0.01;
        let radiusChange = -0.1;//Math.random() * 2.3 - 2.9;
        if (wheels.length > 360) {
	//		wheels.splice(0, 360);
            // wheel(300, 300, MoveSpeed, r, radiusChange, direction, 0);
//     constructor(posX, posY, MoveSpeed, radius, radiusChange, direction, Accel) {

        }
        wheels.push(new wheel(300, 300, MoveSpeed, r, radiusChange, direction, Accel));
    }
    document.getElementById("wheels_array").innerHTML = ": " + wheels.length;

}

function stopRefresh() {

    document.getElementById("status_inf").innerHTML = "seisab!";
}