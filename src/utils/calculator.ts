export const add = (a: number, b: number): number => {
    return a + b;
  };
  
  export const subtract = (a: number, b: number): number => {
    return a - b;
  };
  
  export const multiply = (a: number, b: number): number => {
    return a * b;
  };
  
  export const divide = (a: number, b: number): number => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  };
  
  export const calculateDiscount = (price: number, discountPercentage: number): number => {
    if (price < 0 || discountPercentage < 0 || discountPercentage > 100) {
      throw new Error('Invalid input values');
    }
    
    const discount = (price * discountPercentage) / 100;
    return parseFloat((price - discount).toFixed(2));
  };
  
  export const calculateTax = (amount: number, taxRate: number): number => {
    if (amount < 0 || taxRate < 0) {
      throw new Error('Amount and tax rate must be positive');
    }
    
    const tax = (amount * taxRate) / 100;
    return parseFloat((amount + tax).toFixed(2));
  };