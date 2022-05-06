#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

 
const char* ssid = "wIFRN-IoT";
const char* password = "deviceiotifrn";
/*const char* ssid = "LAPTOP";
const char* password = "vaitersenhanao";*/
const char* keyWrite = "2ZLXHRY3WMCEQXX8";//chave conta compartilhada
unsigned long mytime=0;
String dados[5];

void setup () {
 
  Serial.begin(115200);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }
}
 
void loop() {
 
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    if(millis() - mytime > 900000){   //Send a request every 15 minutes
      mytime = millis();
      String res=Serial.readString();
      int n= 0;
      String buff="";
      for(int x=0 ; x < res.length() ; x++){
        if(res[x]=='#'){
          dados[n]=buff;
          buff="";
          n++;
        }else{
          buff+=res[x];
        }
      }
      //temp=Serial.readString();
      
      HTTPClient http;  //Declare an object of class HTTPClient
      WiFiClient client;
      
      String urlGET="http://api.thingspeak.com/update?api_key=";
      urlGET+=keyWrite;
      urlGET+="&field1=";
      urlGET+= String(dados[0]);
      urlGET+="&field2=";
      urlGET+= String(dados[1]);
      urlGET+="&field3=";
      urlGET+= String(dados[2]);
      urlGET+="&field4=";
      urlGET+= String(dados[3]);
      urlGET+="&field5=";
      urlGET+= String(dados[4]);
  
  
  
      Serial.println(urlGET);
      if(http.begin(client, urlGET)){//Specify request destination
        Serial.println("ok http.begin()");
      }
      int httpCode = http.GET();                                  //Send the request
   
      if (httpCode > 0) { //Check the returning code
        String payload = http.getString();   //Get the request response payload
        Serial.println(payload);             //Print the response payload
      }
      else{
          Serial.print("Error code: ");
          Serial.println(httpCode);
      }
      http.end();   //Close connection
    }    
  }else{
      Serial.println("WiFi Disconnected");
  }
}
