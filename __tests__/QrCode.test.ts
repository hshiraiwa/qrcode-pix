import { QrCodePix, QrCodePixParams } from '../src/index';

describe('QRCode PIX Generate', () => {
    it('Test validate version schema', async () => {
        const param: QrCodePixParams = {
            version: '02', //02 is not valid
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
        };
        expect(() => QrCodePix(param)).toThrow('Version not supported');
    });
    it('Test QrCode', async () => {
        const response = QrCodePix({
            version: '01',
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
        });
        await expect(response.base64()).resolves.toBe(qrCodeTest);
    });
    it('01 - Basic Payload', async () => {
        const response = QrCodePix({
            version: '01',
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
        });
        expect(response.payload()).toBe(
            '00020101021126380014br.gov.bcb.pix0116test@mail.com.br5204000053039865802BR5913Fulano de Tal6009SAO PAULO62070503***6304EA8F'
        );
    });
    it('02 - Basic - Currency', async () => {
        const response = QrCodePix({
            version: '01',
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
            currency: 986,
        });
        expect(response.payload()).toBe(
            '00020101021126380014br.gov.bcb.pix0116test@mail.com.br5204000053039865802BR5913Fulano de Tal6009SAO PAULO62070503***6304EA8F'
        );
    });
    it('03 - Basic - Value', async () => {
        const response = QrCodePix({
            version: '01',
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
            value: 100.99,
        });
        expect(response.payload()).toBe(
            '00020101021126380014br.gov.bcb.pix0116test@mail.com.br5204000053039865406100.995802BR5913Fulano de Tal6009SAO PAULO62070503***63044D9'
        );
    });
    it('04 - Basic - countryCode', async () => {
        const response = QrCodePix({
            version: '01',
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
            countryCode: 'BR',
        });
        expect(response.payload()).toBe(
            '00020101021126380014br.gov.bcb.pix0116test@mail.com.br5204000053039865802BR5913Fulano de Tal6009SAO PAULO62070503***6304EA8F'
        );
    });
    it('05 - Basic - cep', async () => {
        const response = QrCodePix({
            version: '01',
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
            cep: '85000100',
        });
        expect(response.payload()).toBe(
            '00020101021126380014br.gov.bcb.pix0116test@mail.com.br5204000053039865802BR5913Fulano de Tal6009SAO PAULO61088500010062070503***63047C4'
        );
    });
    it('06 - Basic - Transaction ID', async () => {
        const response = QrCodePix({
            version: '01',
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
            transactionId: 'my_transaction_id',
        });
        expect(response.payload()).toBe(
            '00020101021126380014br.gov.bcb.pix0116test@mail.com.br5204000053039865802BR5913Fulano de Tal6009SAO PAULO62210517my_transaction_id6304C356'
        );
    });
    it('07 - Basic - message', async () => {
        const response = QrCodePix({
            version: '01',
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
            message: 'is my message :)',
        });
        expect(response.payload()).toBe(
            '00020101021126580014br.gov.bcb.pix0116test@mail.com.br0216is my message :)5204000053039865802BR5913Fulano de Tal6009SAO PAULO62070503***6304A91E'
        );
    });
    it('08 - Basic - notRepeatPayment', async () => {
        const response = QrCodePix({
            version: '01',
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
            notRepeatPayment: true,
        });
        expect(response.payload()).toBe(
            '00020101021226380014br.gov.bcb.pix0116test@mail.com.br5204000053039865802BR5913Fulano de Tal6009SAO PAULO62070503***63047AA8'
        );
    });
    it('should not accept negative values', () => {
        const param: QrCodePixParams = {
            version: '01',
            key: 'test@mail.com.br',
            name: 'Fulano de Tal',
            city: 'SAO PAULO',
            value: -10,
        };
        expect(() => QrCodePix(param)).toThrow('Value must be a positive number');
    });
});

const qrCodeTest =
    'data:image/png;base64,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';
