import { describe, expect, test } from '@jest/globals';
import fs from 'fs';
import jsonToCsv from '../src/converter';

describe('JSON to CSV converter', () => {
    test('converts valid JSON to CSV', () => {
        const jsonData = [
            { name: 'John Doe', age: 30, city: 'New York' },
            { name: 'Jane Doe', age: 25, city: 'San Francisco' },
        ];

        const jsonFilename = 'input.json';
        const csvFilename = 'output.csv';

        fs.writeFileSync(jsonFilename, JSON.stringify(jsonData));

        jsonToCsv(jsonFilename, csvFilename);

        const csvContent = fs.readFileSync(csvFilename, 'utf-8');

        expect(csvContent).toEqual(expect.stringContaining('name,age,city'));
        expect(csvContent).toEqual(expect.stringContaining('John Doe,30,New York'));
        expect(csvContent).toEqual(expect.stringContaining('Jane Doe,25,San Francisco'));

        // Let's Delete the created JSON and CSV files
        fs.unlinkSync(jsonFilename);
        fs.unlinkSync(csvFilename);
    });

    test('handles invalid JSON format', () => {
        const invalidJsonData = 'This is not valid JSON';

        const jsonFilename = 'invalid-input.json';
        const csvFilename = 'invalid-output.csv';

        fs.writeFileSync(jsonFilename, invalidJsonData);

        // Expect an error to be logged
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        jsonToCsv(jsonFilename, csvFilename);

        expect(consoleErrorSpy).toHaveBeenCalled();

        fs.unlinkSync(jsonFilename);
    });
});