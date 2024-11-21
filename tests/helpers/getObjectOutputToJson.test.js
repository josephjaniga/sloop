const { getObjectOutputToJson } = require('../../src/helpers');

describe('getObjectOutputToJson', () => {
    it('should convert GetObjectOutput to JSON', async () => {
        const mockGetObjectOutput = {
            Body: {
                transformToString: async () => JSON.stringify({
                    id: '123',
                    name: 'Test'
                })
            }
        };

        const result = await getObjectOutputToJson(mockGetObjectOutput);
        
        expect(result).toEqual({
            id: '123',
            name: 'Test'
        });
    });

    /**
     * i think this is an interesting idea but I am not sure that this mock is testing anything
     */
    xit('should handle empty response', async () => {
        const mockGetObjectOutput = {
            Body: {
                transformToString: async () => ''
            }
        };

        const result = await getObjectOutputToJson(mockGetObjectOutput);
        
        expect(result).toEqual({});
    });

    it('should handle invalid JSON', async () => {
        const mockGetObjectOutput = {
            Body: {
                transformToString: async () => 'invalid json'
            }
        };

        await expect(getObjectOutputToJson(mockGetObjectOutput))
            .rejects.toThrow(SyntaxError);
    });
}); 