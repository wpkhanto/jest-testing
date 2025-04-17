import {
    add,
    subtract,
    multiply,
    divide,
    calculateDiscount,
    calculateTax,
  } from './calculator';
  
  describe('Calculator Utility Functions', () => {
    describe('Basic Arithmetic', () => {
      test('adds two numbers correctly', () => {
        expect(add(1, 2)).toBe(3);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
      });
  
      test('subtracts two numbers correctly', () => {
        expect(subtract(5, 2)).toBe(3);
        expect(subtract(2, 5)).toBe(-3);
        expect(subtract(0, 0)).toBe(0);
      });
  
      test('multiplies two numbers correctly', () => {
        expect(multiply(2, 3)).toBe(6);
        expect(multiply(-2, 3)).toBe(-6);
        expect(multiply(-2, -3)).toBe(6);
        expect(multiply(0, 5)).toBe(0);
      });
  
      test('divides two numbers correctly', () => {
        expect(divide(6, 2)).toBe(3);
        expect(divide(5, 2)).toBe(2.5);
        expect(divide(-6, 2)).toBe(-3);
        expect(divide(-6, -2)).toBe(3);
      });
  
      test('throws error when dividing by zero', () => {
        expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
      });
    });
  
    describe('Business Calculations', () => {
      test('calculates discount correctly', () => {
        expect(calculateDiscount(100, 10)).toBe(90);
        expect(calculateDiscount(100, 0)).toBe(100);
        expect(calculateDiscount(100, 100)).toBe(0);
        expect(calculateDiscount(49.99, 15)).toBe(42.49);
      });
  
      test('throws error for invalid discount inputs', () => {
        expect(() => calculateDiscount(-100, 10)).toThrow('Invalid input values');
        expect(() => calculateDiscount(100, -10)).toThrow('Invalid input values');
        expect(() => calculateDiscount(100, 110)).toThrow('Invalid input values');
      });
  
      test('calculates tax correctly', () => {
        expect(calculateTax(100, 7)).toBe(107);
        expect(calculateTax(100, 0)).toBe(100);
        expect(calculateTax(49.99, 10)).toBe(54.99);
      });
  
      test('throws error for invalid tax inputs', () => {
        expect(() => calculateTax(-100, 7)).toThrow('Amount and tax rate must be positive');
        expect(() => calculateTax(100, -7)).toThrow('Amount and tax rate must be positive');
      });
  
      // ทดสอบกรณีทศนิยมซับซ้อน
      test('handles complex decimal calculations correctly', () => {
        // ตรวจสอบว่าการคำนวณส่วนลดให้ทศนิยม 2 ตำแหน่งอย่างถูกต้อง
        expect(calculateDiscount(33.33, 33.33)).toBe(22.22);
        
        // ตรวจสอบว่าการคำนวณภาษีให้ทศนิยม 2 ตำแหน่งอย่างถูกต้อง
        expect(calculateTax(45.67, 8.25)).toBe(49.44);
      });
    });
  });