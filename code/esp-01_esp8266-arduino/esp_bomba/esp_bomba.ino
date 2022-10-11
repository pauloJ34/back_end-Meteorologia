        #include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <ESP8266WiFiMulti.h>
#include <WiFiClientSecureBearSSL.h>
 
const char* ssid = "wIFRN-IoT";
const char* password = "deviceiotifrn";

ESP8266WiFiMulti WiFiMulti;

const char fingerprint[] PROGMEM =  "28 B6 E6 50 1C 29 57 A2 39 6C 6C C3 F5 7C 36 69 B7 4E DB FA";

String dados[3];

void setup () {
 
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

}
 
void loop() {
 
  //if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
   if ((WiFiMulti.run() == WL_CONNECTED)){
      std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
      client->setFingerprint(fingerprint);
      Serial.println("connected...");
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
        
      HTTPClient http;  //Declare an object of class HTTPClient
      //WiFiClient client;
      String urlGET = "https://backend-meteorologia.pauloj34.repl.co/update";
      urlGET+="?field1=";
      urlGET+= String(dados[0]);
      urlGET+="&field2=";
      urlGET+= String(dados[1]);
      urlGET+="&field3=";
      urlGET+= String(dados[2]);
      Serial.println(urlGET);

      if(http.begin(*client, urlGET)){//Specify request destination
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
      delay(1000*60*1);// 1 minutos
  }else{
      Serial.println("WiFi Disconnected");
  }

}
