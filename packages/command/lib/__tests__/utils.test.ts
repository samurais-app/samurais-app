import { normalizeToKebabOrSnakeCase } from '../src/utils';


describe('command lib utils', () => {
    it('normalizeToKebabOrSnakeCase', () => {
        const name = normalizeToKebabOrSnakeCase('/dir/testDemo');
        expect(name).toEqual('/dir/test-demo');
    });
    it('normalizeToKebabOrSnakeCase empty', () => {
        const name = normalizeToKebabOrSnakeCase('');
        expect(name).toEqual('');
    });
});