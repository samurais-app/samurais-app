import { inputBgColor, inputBorderRadius } from '../../src/foundation/input';

describe('foundation input', () => {
    test('inputBgColor', () => {
        expect(inputBgColor()).toEqual('#0000000d');
    });

    test('inputBorderRadius', () => {
        expect(inputBorderRadius()).toEqual('4px');
    });
});