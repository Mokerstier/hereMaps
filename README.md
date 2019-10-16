# MapBox ft. ESP32
Service to add markers to a map and adding data to the marker

In this repo will be explained how to set up a ESP32 and send data from the device to an server.
The data that was sent will be displayed on a map in the browser generated by [mapBox](https://www.mapbox.com/).

## Requirements
To be able to use this repo knowledge of [nodejs](https://nodejs.org/en/) and javascript is required.

- ESP32
- Grove Ligth Sensor
- Node server
- [Adafruit](https://io.adafruit.com/) account

### Step 1 (hardware)
First set up your ESP32
- Connect the wires
  - GROUND connects with GND (usually the black wire)
  - VCC connects with VIN(5v) (usually the red wire)
  - SIG connects with D32 (usually the yellow wire) _Make sure to choose this pin because other pins will fail when using analogRead when using a wifi connection._

### CHECKPOINT 1
If you connected the wires you can test if your Light Sensor is working with the following code:
```javascript
#define LIGHT_SENSOR 32

void setup() {
Serial.begin(115200);
}

void loop(){
int sensorValue = analogRead(LIGHT_SENSOR);
Serial.println("Data from LIGHT_SENSOR is:");
Serial.println(sensorValue);
}
```
If everything is working corectly your Serialmonitor would log something like this:

`Data from LIGHT_SENSOR is:`

`4095` <- (Max value = loads of light)

Well done you completed step 1 and your sensors are working!
### Step 2
Create a dashboard on [Adafruit](https://io.adafruit.com/) with 3 feeds.

- One for the Sensor that you want to display on the map for this project we will be using a Stream-block
- Another for latitude (StreamBlock)
- Another for longtitude (StreamBlock)

If you navigate to Feeds on your adafruit and select view all you will see a list of all your feeds like the image below.
Under the key tab you'll find the keys specific to each feed copy these keys you will need them in the next step!
![Screenshot of adafruit - Feed list](https://github.com/Mokerstier/hereMaps/blob/master/images/io.adafruit.com_Mokerstier_feeds.png?raw=true)

### Step 3
Connect your ESP32 to the internet and establish a connection with adafruit.
Before you are able to connect your ESP32 to adafruit you'll have to download their library:
 
 navigate to -> `tools` -> `Manage libraries` and search for __Adafruit IO Arduino__
 ![Adafruit libraries](https://github.com/Mokerstier/hereMaps/blob/master/images/Group.png?raw=true)
 
When you installed the library you can now set up your adafruit connection. For purpose of better structure in your files we are gonna make  adifferent tab on your arduino we'll call it `config.h`. See the image below.
![Screenshot of different tab](https://github.com/Mokerstier/hereMaps/blob/master/images/Group%202.png?raw=true)

_Don't forget to include it at the top of your file because you will need it when you run your code_

There are allot of examples that came with the library we can use one of them to connect to adafruit.
The example you can use is locate under `File` -> `Examples` -> `Adafruit IO Arduino` -> __adafruitio_00_publish__

For a neater file I cutted some parts out 
```
/************************ Adafruit IO Config *******************************/

// visit io.adafruit.com if you need to create an account,
// or if you need your Adafruit IO key.
#define IO_USERNAME  "{YOUR_ADAFRUIT_USERNAME}"
#define IO_KEY       "{YOUR_ADAFRUIT_AIO_KEY}"

/******************************* WIFI **************************************/
#define WIFI_SSID       "{YOUR_WIFI_NAME}"
#define WIFI_PASS       "{YOUR_WIFI_PASSWORD}"
/*********************************************************************/
// comment out the following lines if you are using fona or ethernet
#include "AdafruitIO_WiFi.h"

#if defined(USE_AIRLIFT) || defined(ADAFRUIT_METRO_M4_AIRLIFT_LITE)
  // Configure the pins used for the ESP32 connection
  #if !defined(SPIWIFI_SS) // if the wifi definition isnt in the board variant
    // Don't change the names of these #define's! they match the variant ones
    #define SPIWIFI SPI
    #define SPIWIFI_SS 10  // Chip select pin
    #define NINA_ACK 9    // a.k.a BUSY or READY pin
    #define NINA_RESETN 6 // Reset pin
    #define NINA_GPIO0 -1 // Not connected
  #endif
  AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS, SPIWIFI_SS, NINA_ACK, NINA_RESETN, NINA_GPIO0, &SPIWIFI);
#else
  AdafruitIO_WiFi io(IO_USERNAME, IO_KEY, WIFI_SSID, WIFI_PASS);
#endif
```
When you got this right you can start sending data to you ADAFRUIT feeds!

The correct way to connect to your feed is:
```
Serial.print("Connecting to Adafruit IO");
io.connect();

//Waiting for connection
while(io.status() < AIO_CONNECTED) {
Serial.print(".");
delay(500);
}

//Connection made
Serial.println();
Serial.println(io.statusText());
```

When the connection is established your serial monitor will tell you!

Now lets start sending data to adafruit!
_Make sure to be consistant in your variable names and feed names_
remember those feed keys you had to keep track on earlier?
This where you will be using them!
At: `io.feed("streemdata");`
You actually send the data with: `streemdata->save(sensorValue);`

```
void sendData(){

  AdafruitIO_Feed *streemdata = io.feed("streemdata");
  AdafruitIO_Feed *latdata = io.feed("latdata");
  AdafruitIO_Feed *londata = io.feed("londata");
  streemdata->save(sensorValue);
  latdata->save(lat);
  londata->save(lon);
}


void readData(){
 
  sensorValue = analogRead(LIGHT_SENSOR);

  sendData();
}
```
### CHECKPOINT 2
If you this working your adafruit should be looking something like this:
![StreamData](https://github.com/Mokerstier/hereMaps/blob/master/images/io.adafruit.com_Mokerstier_feeds%20(1).png?raw=true)
Good job you can now send data to Adafruit!

### Step 4

For a plug and play solution you can easily copy this repo locally and start modifing the nodejs application to your own liking!
open your CLI and run de following commands:
- `git clone https://github.com/Mokerstier/hereMaps.git`
- `touch .env`
- `npm install`

### Step 5
In your .env file you need to add 
- `PORT = 3000`
- `ADA_FEED_KEY = {YOUR_ADAFRUIT_AIO_KEY}`

You might need to make changes in the code here:
routes/routes.js
        `https://io.adafruit.com/api/v1/feeds/streemdata/data/last?x-aio-key=${process.env.ADA_FEED_KEY}`
    );
    let lonCall = await fetch(
        `https://io.adafruit.com/api/v1/feeds/londata/data/last?x-aio-key=${process.env.ADA_FEED_KEY}`
    );
    let latCall = await fetch(
        `https://io.adafruit.com/api/v1/feeds/latdata/data/last?x-aio-key=${process.env.ADA_FEED_KEY}`

if you're using other feednames.

When step 5 is completed you can start the server by running:

`npm run test`

In the CLI

### CHECKPOINT 3
When your node server is running without any problems you can open the browser and navigate to [localhost:3000](http://localhost:3000)
You should be able to see a map with a marker as in the image below!
![Screenshot of map in the browser](https://github.com/Mokerstier/hereMaps/blob/master/images/localhost_3000_%20(1).png?raw=true)
_When you hover the marker the Value of your sensor will appear in a popup!_
