// Last used on the following setup:
//
// Hardware:
//		RaspberryPi Zero W
//      WS2812B LED Strips - 86 LEDs, running 2x 43 in parallel
//      2x TB6600 Stepper Motor Controllers @ 24V
//      2x NEMA17 84oz/in Stepper Motors
//      Logic Level Shifter
// 
// Software:
//      Node.js v10.22.1
//		onoff v6.0.0 - https://www.npmjs.com/package/onoff
//		rpi-ws281x v1.0.34 - https://www.npmjs.com/package/rpi-ws281x
//		socket.io v2.3.0- https://socket.io/
// 

console.clear();

var path = require('path');
var fs = require('fs');
const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, '/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '/cert.pem'))
};
var https = require('https').createServer(httpsOptions, httpServer);
var io = require('socket.io')(https);
const Gpio = require('onoff').Gpio;
var ws281x = require('rpi-ws281x');

var jokeNumber = 0;
var tellingJoke = 0;

var numLEDs = 43;

// Create initial colors for default show (Flames)
var colorGreen = new Array(numLEDs);
var colorPosNeg = new Array(numLEDs);
var pixels = new Uint32Array(numLEDs);

for (var i = 0; i < numLEDs; i++) {
    colorGreen[i] = Math.floor(Math.random() * Math.floor(255));
    colorPosNeg[i] = Math.floor(Math.random() * Math.floor(2));
}

var ledLightShowName = 0;


class LEDLightShow {
    constructor() {
        this.config = {};
        // Number of leds
        this.config.leds = numLEDs;
        // Use DMA 10
        this.config.dma = 10;
        // Set brightness, 0 to 255
        this.config.brightness = 255;
        // GPIO Number
        this.config.gpio = 18;
        // The RGB sequence (rgb, grb, etc)
        this.config.type = 'grb';
        // Configure ws281x
        ws281x.configure(this.config);
    }

    run() {
        if (ledLightShowName == 'fire') {
            // Normal Mode (Flames) - Continuously varies the current color to give dynamic lighting
            for (var i = 0; i < this.config.leds; i++) {
                let change = Math.floor((Math.random() * Math.floor(5)) + 5);
                if (colorGreen[i] <= 10) {
                    colorPosNeg[i] = 1;
                }
                if (colorGreen[i] >= 245) {
                    colorPosNeg[i] = 0;
                }
                if (colorPosNeg[i] == 0) {
                    colorGreen[i] = colorGreen[i] - change;
                } else {
                    colorGreen[i] = colorGreen[i] + change;
                }
                if (stepperRunning == true && i >= 40) {
                    var red = 0,
                        green = 255,
                        blue = 0
                    var color = (red << 16) | (green << 8) | blue;
                } else {
                    var red = 255,
                        green = colorGreen[i],
                        blue = 0
                    var color = (red << 16) | (green << 8) | blue;
                }
                pixels[i] = color;
            }
            // Party Mode
        } else if (ledLightShowName == 'colorParty') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = Math.floor(Math.random() * Math.floor(255)),
                    green = Math.floor(Math.random() * Math.floor(255)),
                    blue = Math.floor(Math.random() * Math.floor(255))
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // Red Show
        } else if (ledLightShowName == 'colorRed') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 255,
                    green = 0,
                    blue = 0
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // Green Show
        } else if (ledLightShowName == 'colorGreen') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 0,
                    green = 255,
                    blue = 0
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // Blue Show
        } else if (ledLightShowName == 'colorBlue') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 0,
                    green = 0,
                    blue = 255
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // Purple Show
        } else if (ledLightShowName == 'colorPurple') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 128,
                    green = 0,
                    blue = 128
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // Pink Show
        } else if (ledLightShowName == 'colorPink') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 255,
                    green = 105,
                    blue = 180
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // Yellow Show
        } else if (ledLightShowName == 'colorYellow') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 255,
                    green = 255,
                    blue = 0
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // Orange Show
        } else if (ledLightShowName == 'colorOrange') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 255,
                    green = 165,
                    blue = 0
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // Turquoise Show
        } else if (ledLightShowName == 'colorTurquoise') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 64,
                    green = 224,
                    blue = 208
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // White Show
        } else if (ledLightShowName == 'colorWhite') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 255,
                    green = 255,
                    blue = 255
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // Lights Off
        } else if (ledLightShowName == 'colorBlack') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 0,
                    green = 0,
                    blue = 0
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
            // Brown Show
        } else if (ledLightShowName == 'colorBrown') {
            for (var i = 0; i < this.config.leds; i++) {
                var red = 139,
                    green = 69,
                    blue = 19
                var color = (red << 16) | (green << 8) | blue;
                pixels[i] = color;
            }
        }
        // Render to strip
        ws281x.render(pixels);
    }
};
var myLEDLightShow = new LEDLightShow();

setInterval(() => {
    myLEDLightShow.run()
}, 200);

// Setup Variables
//================================================================================
const stepperDirec = new Gpio(2, 'out');
const stepperPulse = new Gpio(3, 'out');
var stepperRunning = false;

var totTerminalConnected = false;
var totTerminalIP = null;
var totControllerConnected = false;
var totControllerIP = null;

var terminalConnected = null;

var remoteVideoLink = null;
var remoteScreenLink = null;
var displayMessage = null;
var totsServed = 0;


// Setup Web Server
//================================================================================
var dir = path.join(__dirname, 'www');
var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

function httpServer(httpRequest, httpResponse) {
    var httpRequestPath = httpRequest.url.toString().split('?')[0];
    var file = null;
    if (httpRequestPath == '/') {
        file = path.join(dir, '/index.html');
    } else {
        file = path.join(dir, httpRequest.url.toString());
    }

    if (file.indexOf(dir + path.sep) !== 0) {
        httpResponse.statusCode = 403;
        httpResponse.setHeader('Content-Type', 'text/plain');
        return httpResponse.end('Forbidden');
    }

    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var readFile = fs.createReadStream(file);

    readFile.on('open', function() {
        httpResponse.setHeader('Content-Type', type);
        readFile.pipe(httpResponse);
    });

    readFile.on('error', function() {
        httpResponse.setHeader('Content-Type', 'text/plain');
        httpResponse.statusCode = 404;
        httpResponse.end('Not found');
    });
};

https.listen(443, function() {
    console.log('Webserver Started! Listening on Port 443 for Connections...');
});

// Client-Server Socket Connections
//================================================================================
io.on('connection', function(socket) {

    // Send Current State
    updateClients();

    // Client Type Connections
    socket.on('totTerminalConnected', function(data) {
        totTerminalConnected = data;
        totTerminalIP = (((socket.handshake.address).split(':')).pop());
        console.log("totTerminalConnected @ " + (((socket.handshake.address).split(':')).pop()));
        updateClients();
    });
    socket.on('totControllerConnected', function(data) {
        totControllerConnected = data;
        totControllerIP = (((socket.handshake.address).split(':')).pop());
        console.log("totControllerConnected @ " + (((socket.handshake.address).split(':')).pop()));
        updateClients();
    });

    // Log Client Disconnect
    socket.on('disconnect', (reason) => {
        if ((((socket.handshake.address).split(':')).pop()) == totTerminalIP) {
            totTerminalConnected = false;
            totTerminalIP = null;
            console.log("Player Terminal @ " + (((socket.handshake.address).split(':')).pop()) + ' was disconnected due to a ' + reason);
            updateClients();
        } else if ((((socket.handshake.address).split(':')).pop()) == totControllerIP) {
            totControllerConnected = false;
            totControllerIP = null;
            console.log("Control Station @ " + (((socket.handshake.address).split(':')).pop()) + ' was disconnected due to a ' + reason);
            updateClients();
        } else {
            console.log('Client at ' + (((socket.handshake.address).split(':')).pop()) + ' was disconnected due to a ' + reason);
        }
    });

    // Client-Server Message Handling
    //================================================================================

    // Terminal Video Offer Message
    socket.on('messageToTerminal', function(data) {
        console.log("Transmitting Message: Controller > Terminal");
        io.emit('messageFromController', data);
    });

    // Control Station Video Offer
    socket.on('messageToController', function(data) {
        console.log("Transmitting Message: Terminal > Controller");
        io.emit('messageFromTerminal', data);
    });

    // Run Feeder
    socket.on('runFeeder', function(data) {
        runFeeder(data.data);
    })

    socket.on('lightShowChange', function(data) {
        ledLightShowName = data.showName;
    })

    socket.on('tellJoke', function(data) {
        tellJoke();
    })
});

function updateClients() {
    io.emit('terminalConnectedEvent', totTerminalConnected);
}

// Other Functions
//================================================================================
async function runFeeder(feedAmount) {
    if (stepperRunning == true) {
        console.log("Feed already running... please wait " + Math.random(100).toString());
    } else {
        totsServed++;
        io.emit('totsServed', totsServed);
        stepperRunning = true;
        //Run Forward
        stepperDirec.writeSync(0);
        for (let index = 0; index < feedAmount; index++) {
            stepperPulse.writeSync(1);
            await sleep(1);
            stepperPulse.writeSync(0);
            await sleep(1);
        }
        await sleep(500);
        stepperRunning = false;
    }
    ledLightShowName = "fire";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function tellJoke() {
    if (tellingJoke == 1) {
        return;
    } else {
        tellingJoke = 1;
        if (jokeNumber == 0) {
            var joke = {
                type: "displayMessage",
                data: "What is in a ghost’s nose?"
            }
            var punchline = {
                type: "displayMessage",
                data: "Boo-gers!"
            }
        }
        if (jokeNumber == 1) {
            var joke = {
                type: "displayMessage",
                data: "Why didn’t the scarecrow eat dinner?"
            }
            var punchline = {
                type: "displayMessage",
                data: "He was already stuffed!"
            }
        }
        if (jokeNumber == 2) {
            var joke = {
                type: "displayMessage",
                data: "Which fruit is a vampire’s favorite?"
            }
            var punchline = {
                type: "displayMessage",
                data: "Neck-tarines!"
            }
        }
        if (jokeNumber == 3) {
            var joke = {
                type: "displayMessage",
                data: "What does a panda ghost eat?"
            }
            var punchline = {
                type: "displayMessage",
                data: "Bam-Boo!"
            }
        }
        if (jokeNumber == 4) {
            var joke = {
                type: "displayMessage",
                data: "What is a ghost's favorite kind of street?"
            }
            var punchline = {
                type: "displayMessage",
                data: "A Dead End!"
            }
        }
        if (jokeNumber == 5) {
            var joke = {
                type: "displayMessage",
                data: "What is a ghost's favorite search engine?"
            }
            var punchline = {
                type: "displayMessage",
                data: "Ghoul-gle!"
            }
        }
        if (jokeNumber == 6) {
            var joke = {
                type: "displayMessage",
                data: "How do spiders communicate?"
            }
            var punchline = {
                type: "displayMessage",
                data: "Through the world wide web!"
            }
        }
        if (jokeNumber == 7) {
            var joke = {
                type: "displayMessage",
                data: "Who do vampires buy their cookies from?"
            }
            var punchline = {
                type: "displayMessage",
                data: "The Ghoul Scouts!"
            }
        }
        if (jokeNumber == 7) {
            var joke = {
                type: "displayMessage",
                data: "Who did Frankenstein take to the prom?"
            }
            var punchline = {
                type: "displayMessage",
                data: "His ghoul friend!"
            }
        }

        io.emit('messageFromController', joke);
        await sleep(4500);
        io.emit('messageFromController', punchline);
        await sleep(4500);
        var message = {
            type: "defaultDisplay",
        }
        io.emit('messageFromController', message);
        if (jokeNumber == 7) {
            jokeNumber = 0;
        } else {
            jokeNumber++;
        }
    }
    tellingJoke = 0;
}

// On Program Exit or Ctrl + C
//================================================================================
process.on('SIGINT', function() {

    //Finally Exit
    process.exit();
});