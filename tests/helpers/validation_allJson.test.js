const { validation_AllJson } = require('../../src/helpers');

describe('validation_AllJson', () => {
    it('should throw error for duplicate guid', () => {
        const allJson = [{
            guid: '123',
            id: '1'
        }];
        const data = {
            guid: '123',
            id: '2'
        };
        expect(() => validation_AllJson({ data, allJson }))
            .toThrow('A record with guid 123 already exists.');
    });

    it('should throw error for duplicate id', () => {
        const allJson = [{
            guid: '123',
            id: '1'
        }];
        const data = {
            guid: '456',
            id: '1'
        };
        expect(() => validation_AllJson({ data, allJson }))
            .toThrow('A record with id 1 already exists.');
    });

    it('should not throw error for valid new record', () => {
        const allJson = [{
            guid: '123',
            id: '1'
        }];
        const data = {
            guid: '456',
            id: '2'
        };
        expect(() => validation_AllJson({ data, allJson })).not.toThrow();
    });
}); 