import inquirer from 'inquirer';
import jsonToCsv from './converter';

export default async function runConverter(): Promise<void> {
    const questions = [
        {
            type: 'input',
            name: 'inputFile',
            message: 'Enter the name of the input file:',
        },
        {
            type: 'list',
            name: 'conversionType',
            message: 'Select the conversion type:',
            choices: ['JSON to CSV', 'CSV to JSON'],
        },
        {
            type: 'input',
            name: 'outputFile',
            message: 'Enter the name of the output file:',
        },
    ];

    const answers = inquirer.prompt(questions);

    const { inputFile, conversionType, outputFile } = await answers;

    try {
        if (conversionType === 'JSON to CSV') {
            jsonToCsv(inputFile, outputFile);
        } else if (conversionType === 'CSV to JSON') {
            console.log('TODO');
        } else {
            console.log('Invalid conversion type selected.');
        }
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

runConverter();
