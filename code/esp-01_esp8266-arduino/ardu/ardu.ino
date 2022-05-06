#include <DHT.h>
#include <SoftwareSerial.h>
#define DHTYPE DHT22

// Pinos do sensor ultrassônico
#define trigPin 8
#define echoPin 9

// variáveis usadas no sensor ultrassônico
long duration;
int distance;


SoftwareSerial myserial(6,7);

DHT dht_sensor(2, DHTYPE);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  myserial.begin(115200);

  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(A0, INPUT);
  pinMode(A1, INPUT);
  
    
  dht_sensor.begin();  
}

void loop() {
  String buff="";
  // put your main code here, to run repeatedly:
  Serial.print("Temperature: ");
  Serial.println(dht_sensor.readTemperature());
  Serial.print("Humidity: ");
  Serial.println(dht_sensor.readHumidity());
  Serial.print("Distance: ");
  Serial.println(calculateDistance());
  Serial.print("Luminosity: ");
  Serial.println(analogRead(A0));
  Serial.print("Ground Humidity: ");
  Serial.println(map(analogRead(A1), 1023, 150, 0, 100));
  
  buff+=String(dht_sensor.readTemperature());
  buff+='#';
  buff+=String(dht_sensor.readHumidity());
  buff+='#';
  buff+=String(calculateDistance());
  buff+='#';
  buff+=String(analogRead(A0));
  buff+='#';
  buff+=String(map(analogRead(A1), 1023, 150, 0, 100));
  buff+='#';

  Serial.println(buff);
  myserial.println(buff);

  delay(5000);
}


int calculateDistance(void){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 /2;

  return distance;
}
