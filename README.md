# CandyBot: A no-touch, candy dispensing and joke telling kiosk built for socially-distanced Trick-or-Treating during the COVID-19 pandemic. 


### Kiosk consists of
* Built using recycled pallets and scrap wood.
* Raspberry Pi Zero W
  * Webserver for Kiosk and Control Station (NodeJS)
  * Signalling Server for WebRTC (NodeJS)
  * Stepper Controller (Pulsing GPIO pins)
  * RGB Lighting Controller (rpi-ws281x-nodejs)
  * Kiosk Signalling and Control (Socket.IO)
* Intel NUC
  * Runs display/graphics/webpage on Kiosk Screen
  * Encodes Audio/Video from Webcams/Microphone
    * 1 Webcam for seeing users
    * 1 Webcam looking into dispenser to monitor level and jamming
    * 1 Microphone (Webcam mics were low-quality)
* Custom Built Candy Dispenser using two NEMA 17 Steppers and a conveyor belt
  * My wife sewed a conveyor belt and then added hot-glue strips for better candy grippage
* 2x TB6600 Stepper Drivers on a 24V PSU
* RGB Lighting (2 x 43 LED Strips running in parallel)
  * Custom lighting modes
    * 'Flame' for normal operation, randomly fades each LED between red, orange, yellow
    * Selectable colors for interactivity with kids
    * 'Party', randomly changes the color of each LED to any color
* Logic Level Shifter
  * Changes 3.3V to 5V for RGB Lighting Strip


### Control station
* A laptop/desktop which can receive audio/video streams from kiosk


### Notes
* This system could be run over WiFi, but works best on ethernet.
* Firefox browser was used on the Kiosk and Control Station.
* I used candy which was consistent in size  as differing sizes caused unreliable feeding and jamming.
* Due to limitations with WebRTC, in order to stream the desktop of the Kiosk display you must enable it by clicking a button on the display page.  I accomplished this by using VNC to remote into the kiosk and starting the stream.  Once enabled everything can be controlled from the control station.

The code is a little rough around the edges, but the functionality is 100%.  Some of the code is unused and some is not complete as I ran out of time at the end of the project.  Getting WebRTC to stream audio/video was difficult for me to implement and is likely messier than it needs to be.
