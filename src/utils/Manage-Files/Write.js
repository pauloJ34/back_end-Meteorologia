import * as fs from 'fs'
import { dir, archive } from './../../index.js'

export async function Write(dados) {
	fs.appendFile(dir + archive, dados, (err) => {
		if (err) {
			console.log('erro ao escrever no arquivo')
			return Promise.resolve()
		}
		console.log('escrivo no arquivo com sucesso')
	})
}
