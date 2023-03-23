import * as fs from 'fs'
import { dir, archive } from '../../index.js'

let sendDados = []
export async function ReadFileCsv() {
	/*const data = fs.readFileSync(dir+archive, {encoding:'utf8', flag:'r'});
  return data;*/

	fs.readFile(dir + archive, 'utf8', (err, dado) => {
		if (err) {
			console.log('erro ao ler')
			return
		}
		// console.log(dado)
		const dados = dado.split('\n')
		dados.shift()
		sendDados = dados
		// console.log(sendDados)
		return sendDados
	})
}

export { sendDados }
