const { createGuid } = require('../../src/helpers');

describe('createGuid', () => {
    it('should create a valid UUID', () => {
        const guid = createGuid();
        expect(guid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it('should create unique UUIDs', () => {
        const guid1 = createGuid();
        const guid2 = createGuid();
        expect(guid1).not.toBe(guid2);
    });
}); 