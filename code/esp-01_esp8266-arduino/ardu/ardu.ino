//Bibliotecas utilizadas
#include <DHT.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C.h>

//Defines
#define DHTPIN 2
#define DHTYPE DHT22
#define trigPin 8
#define echoPin 9
#define LDRPIN A0
#define HIGROPIN A1

//Instanciação de classes
DHT dht(DHTPIN, DHTYPE);
LiquidCrystal_I2C lcd(0x27,16,2);
SoftwareSerial myserial(6,7);

void setup() {

  // Inicializações
  Serial.begin(9600);
  myserial.begin(115200);
  dht.begin();
  lcd.init();
  lcd.setBacklight(HIGH);
  lcd.setCursor(0, 0);
  lcd.print("TEMP: ");
  lcd.setCursor(0, 1);
  lcd.print("UMID: ");
  
  //Pinmodes
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(LDRPIN, INPUT);
  pinMode(HIGROPIN, INPUT);
  
}

void loop() {
  updateLCD();
  enviarDados();
  delay(5000);
}

//Atualiza visor LCD
void updateLCD(){
  lcd.setCursor(6, 0);
  lcd.print(String(dht.readTemperature()));
  lcd.setCursor(6, 1);
  lcd.print(String(dht.readHumidity()));
}

//Ler humidade do solo
int readSoilMoisture(){
  return map(analogRead(HIGROPIN), 1023, 150, 0, 100);
}

//Caucular distancia do HC-SR04
int calculateDistance(void){
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  int distance = duration * 0.034 /2;
  return distance;
}

//Envio arduino esp
void enviarDados(){
  String buff="";
  buff+=String(dht.readTemperature());
  buff+='#';
  buff+=String(dht.readHumidity());
  buff+='#';
  buff+=String(calculateDistance());
  buff+='#';
  buff+=String(analogRead(LDRPIN));
  buff+='#';
  buff+=String(readSoilMoisture());
  buff+='#';
  myserial.println(buff);

  //Debug
  Serial.println(buff);
  Serial.println(myserial.readString());
}
