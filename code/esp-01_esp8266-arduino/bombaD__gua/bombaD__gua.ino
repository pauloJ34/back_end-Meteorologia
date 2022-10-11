#include <DHT.h>
#include <SoftwareSerial.h>

#define DHTPIN 2
#define DHTYPE DHT22
const int bombaPin = 13;
//Instanciação de classes
DHT dht(DHTPIN, DHTYPE);

SoftwareSerial myserial(6,7);

void setup() {
  // put your setup code here, to run once:
// Inicializações
  Serial.begin(9600);
  myserial.begin(115200);
  pinMode(bombaPin, OUTPUT);
  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  float temperatura = dht.readTemperature();
  float umidade = dht.readHumidity();
  String buff ="";
  buff+=String(temperatura);
  buff+="#";
  buff+=String(umidade);
  buff+="#";
  
  if(temperatura <= 25.0){
    Serial.println("Bomba ligada");
     buff+=String(1);
     buff+="#";
    digitalWrite(bombaPin, HIGH);
  }
  else {//if(temperatura > 24.0){
    Serial.println("Bomba desligada");
     buff+=String(0);
     buff+="#";
    digitalWrite(bombaPin, LOW);
  }
  myserial.println(buff);
  Serial.println(buff);
  Serial.println(myserial.readString());
  
  

  delay(1000
 );
}
