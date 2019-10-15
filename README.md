# MapBox ft. ESP32
Service to add markers to a map and adding data to the marker

In this repo will be explained how to set up a ESP32 and send data from the device to an browser.
The data that was sent will be displayed on a map generated by [mapBox](https://www.mapbox.com/).

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
If everything is working corectly your Serialmonitor would log somethign like this:

`Data from LIGHT_SENSOR is:`

`4095` <- (Max value = loads of light)

Well done you completed step 1
### Step 2
Create a dashboard on [Adafruit](https://io.adafruit.com/) with 3 feeds.

- One for the Sensor that you want to display on the map for this project we will be using a Stream-block
- Another for latitude (StreamBlock)
- Another for longtitude (StreamBlock)

If you navigate to Feeds on your adafruit and select view all you will see a list of all your feeds like the image below.
Under the key tab you'll find the keys specific to each feed copy these keys you will need them in the next step!

### Step 3
Connect your ESP32 to the internet and establish a connection with adafruit.


