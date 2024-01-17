/*!
 * json-converter
 * Copyright (c) Mutasim
 * MIT Licensed
*/

import * as fs from 'fs';

interface DataObject {
    [key: string]: string | number | boolean | null | undefined;
}

export default function jsonToCsv(jsonFilename: string, csvFilename: string): void {
    try {
        const jsonData: DataObject[] = JSON.parse(fs.readFileSync(jsonFilename, 'utf-8'));
        console.log(jsonData);

        if (Array.isArray(jsonData) && jsonData.length > 0 && typeof jsonData[0] === 'object') {
            const header = Object.keys(jsonData[0]);
            const csvLines: string[] = [];

            // Create CSV header
            csvLines.push(header.join(','));

            // Create CSV lines
            jsonData.forEach((dataObj) => {
                const values = header.map((key) => String(dataObj[key]));
                csvLines.push(values.join(','));
            });

            // Write to CSV file
            fs.writeFileSync(csvFilename, csvLines.join('\n'));

            console.log(`Conversion successful! CSV file '${csvFilename}' created.`);
        } else {
            console.log("Invalid JSON format. The JSON data should be an array of objects.");
        }
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

export function csvToJson(csvFilename: string, jsonFilename: string): void {
    console.log('TODO');
}