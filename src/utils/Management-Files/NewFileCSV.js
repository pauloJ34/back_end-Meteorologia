import * as fs from 'fs';
import { dir, archive } from './../../index.js';


export async function NewFileCSV(){
	const directory = dir+archive;
	const dado = "data,time,temperatura,umidade do ar,pluviometro,luminosidade,umidade do solo";
	//console.log(fs.existsSync(directory))
	if(!fs.existsSync(directory)){
		fs.writeFile(directory,dado,(err)=>{
			if (err) {
				console.log("erro ao criar o arquivo");
				return;
			}console.log("arquivo criado com sucesso.");
		})
	}else{ console.log("arquivo já existe."); }
}