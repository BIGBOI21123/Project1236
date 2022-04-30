var time = 0
var alldrawings = ["aircraft_carrier","airplane","alarm_clock","ambulance","angel","animal_migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball_bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday_cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling_fan","cello","cell_phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee_cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise_ship","cup","diamond","dishwasher","diving_board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire_hydrant","fireplace","firetruck","fish","flamingo","flashlight","flip_flops","floor_lamp","flower","flying_saucer","foot","fork","frog","frying_pan","garden","garden_hose","giraffe","goatee","golf_club","grapes","grass","guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter","helmet","hexagon","hockey_puck","hockey_stick","horse","hospital","hot_air_balloon","hot_dog","hot_tub","hourglass","house","house plant","hurricane","ice cream","jacket","jail","kangaroo","key","keyboard","knee","knife","ladder","lantern","laptop","leaf","leg","light_bulb","lighter","lighthouse","lightning","line","lion","lipstick","lobster","lollipop","mailbox","map","marker","matches","megaphone","mermaid","microphone","microwave","monkey","moon","mosquito","motorbike","mountain","mouse","moustache","mouth","mug","mushroom","nail","necklace","nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint_can","palm_tree","panda","pants","paper_clip","parachute","parrot","passport","peanut","pear","peas","pencil","penguin","piano","pickup_truck","picture_frame","pig","pillow","pineapple","pizza","pliers","police_car","pond","pool","popsicle","postcard","potato","power_outlet","purse","rabbit","raccoon","radio","rain","rainbow","rake","remote_control","rhinoceros","rifle","river","roller_coaster","rollerskates","sailboat","sandwich","saw","saxophone","school_bus","scissors","scorpion","screwdriver","sea_turtle","see_saw","shark","sheep","shoe","shorts","shovel","sink","skateboard","skull","skyscraper","sleeping_bag","smiley_face","snail","snake","snorkel","snowflake","snowman","soccer_ball","sock","speedboat","spider","spoon","spreadsheet","square","squiggle","squirrel","stairs","star","steak","stereo","stethoscope","stitches","stop_sign","stove","strawberry","streetlight","string_bean","submarine","suitcase","sun","swan","sweater","swingset","sword","syringe","table","teapot","teddy-bear","telephone","television","tennis_racquet","tent","The_Eiffel_Tower","The_Great_Wall_of_China","The_Mona_Lisa","tiger","toaster","toe","toilet","tooth","toothbrush","toothpaste","tornado","tractor","traffic_light","train","tree","triangle","trombone","truck","trumpet","tshirt","umbrella","underwear","van","vase","violin","washing_machine","watermelon","waterslide","whale","wheel","windmill","wine_bottle","wine_glass","wristwatch","yoga","zebra","zigzag"]
var scoreL = 0
var labels = null

changedrawing()
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    labels = results[0].label
    console.log(labels)
    document.getElementById('Guess').innerHTML = 'Label: ' + labels;
    document.getElementById('Confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    Canvas = createCanvas(300, 300);
    Canvas.center();
    background("white");
    Canvas.mouseReleased(classifyCanvas);
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function Clearcanvas() {
    background("white");
}

function changedrawing() {
    document.getElementById("SketchtoDraw").innerHTML = alldrawings[Math.floor(Math.random() * alldrawings.length)]
}

function checkdrawing() {
    if (labels == document.getElementById("SketchtoDraw").innerHTML) {
        document.getElementById("Score").innerHTML = "Score: " + scoreL + 1
        Clearcanvas()
        changedrawing()
        time = 0
        console.log(labels)
    }
}

async function timers() {
    while (time < 200) {
        await wait(60)
        time++
        document.getElementById("Timer").innerHTML = "Time: " + time
        if (time > 199) {
            time = 0
            Clearcanvas()
            changedrawing()
        }
        checkdrawing()
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

timers()