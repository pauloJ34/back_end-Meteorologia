import * as fs from 'fs';
import { dir} from '../../index.js';


export async function NewRepository(){
	const directory = dir+"/dados";
	if(!fs.existsSync(dir)){
		fs.mkdir(directory,(err)=>{
			if(err){
				console.log("erro ao criar o diretório!");
				return;
			}
			console.log("diretório criado com sucesso.");
		})
	}else{ console.log("diretório já existe."); }
}