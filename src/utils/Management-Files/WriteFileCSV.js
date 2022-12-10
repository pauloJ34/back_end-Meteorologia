import * as fs from 'fs';
import { dir,archive } from '../../index.js';
import { NewFileCSV } from './NewFileCSV.js';
import { Write } from './Write.js';

export async function WriteFileCsv(dados){
	const file=dir+archive;
	if(fs.existsSync(file)){
		Write(dados);
	}else{
		NewFileCSV();
		Write(dados);
	}
}