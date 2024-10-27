const { readFile } = require('fs/promises')
const { join } = require('path')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ["id", "name", "profession", "age"]
}

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath)
        const validation = File.isValid(content)

        if(validation.valid) throw new Error(validation.error)

        return content
    }

    static async getFileContent(filePath) {
        const fileName = join(__dirname, filePath)
        return ((await readFile(fileName)).toString("utf-8"))
    }

    static async isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...fileWithoutHeader] = await csvString.split('\n')
        const isHeaderValid = header === options.fields.join(',')
        if (!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }
    }
}

(async () => {
    try {
        //const result = await File.csvToJson('./../mocks/thereItems-valid.csv');
        const result = await File.csvToJson('./../mocks/fourItems-valid.csv');
        console.log('resultado', result);
    } catch (error) {
        console.error('Erro ao ler o arquivo CSV:', error);
    }
})();