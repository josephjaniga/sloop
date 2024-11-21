const { validation_LookupTableJson } = require('../../src/helpers');

describe('validation_LookupTableJson', () => {
    it('should throw error for duplicate id', () => {
        const lookupTableJson = {
            '1': 'guid123'
        };
        const data = {
            id: '1',
            guid: 'guid456'
        };
        expect(() => validation_LookupTableJson({ data, lookupTableJson }))
            .toThrow('The id already exists in the lookupTable.json file');
    });

    it('should throw error for duplicate guid', () => {
        const lookupTableJson = {
            '1': 'guid123'
        };
        const data = {
            id: '2',
            guid: 'guid123'
        };
        expect(() => validation_LookupTableJson({ data, lookupTableJson }))
            .toThrow('The guid already exists in the lookupTable.json file');
    });

    it('should not throw error for valid new record', () => {
        const lookupTableJson = {
            '1': 'guid123'
        };
        const data = {
            id: '2',
            guid: 'guid456'
        };
        expect(() => validation_LookupTableJson({ data, lookupTableJson })).not.toThrow();
    });
}); 