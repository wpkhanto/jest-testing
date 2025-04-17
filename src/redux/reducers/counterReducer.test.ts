// src/redux/reducers/counterReducer.test.ts
import counterReducer from './counterReducer';
import { increment, decrement, reset } from '../actions/counterActions';

describe('Counter Reducer', () => {
  // ทดสอบว่า reducer ส่งคืนค่าเริ่มต้นที่ถูกต้องเมื่อไม่มี state ถูกส่งมา
  test('should return the initial state', () => {
    // @ts-expect-error - เราส่ง undefined เพื่อทดสอบค่าเริ่มต้น
    expect(counterReducer(undefined, {})).toEqual({ count: 0 });
  });

  // ทดสอบการเพิ่มค่า counter เมื่อได้รับ action INCREMENT
  test('should handle INCREMENT', () => {
    // กรณีค่า counter เป็น 0
    expect(
      counterReducer({ count: 0 }, increment())
    ).toEqual({ count: 1 });

    // กรณีค่า counter เป็น 1
    expect(
      counterReducer({ count: 1 }, increment())
    ).toEqual({ count: 2 });
    
    // กรณีค่า counter เป็นลบ
    expect(
      counterReducer({ count: -1 }, increment())
    ).toEqual({ count: 0 });
  });

  // ทดสอบการลดค่า counter เมื่อได้รับ action DECREMENT
  test('should handle DECREMENT', () => {
    // กรณีค่า counter เป็น 1
    expect(
      counterReducer({ count: 1 }, decrement())
    ).toEqual({ count: 0 });

    // กรณีค่า counter เป็น 0
    expect(
      counterReducer({ count: 0 }, decrement())
    ).toEqual({ count: -1 });
    
    // กรณีค่า counter เป็นลบ
    expect(
      counterReducer({ count: -5 }, decrement())
    ).toEqual({ count: -6 });
  });

  // ทดสอบการรีเซ็ตค่า counter เมื่อได้รับ action RESET
  test('should handle RESET', () => {
    // กรณีค่า counter เป็นบวก
    expect(
      counterReducer({ count: 10 }, reset())
    ).toEqual({ count: 0 });
    
    // กรณีค่า counter เป็นลบ
    expect(
      counterReducer({ count: -10 }, reset())
    ).toEqual({ count: 0 });
    
    // กรณีค่า counter เป็น 0 อยู่แล้ว
    expect(
      counterReducer({ count: 0 }, reset())
    ).toEqual({ count: 0 });
  });
  
  // ทดสอบการไม่เปลี่ยนแปลง state เมื่อได้รับ action ที่ไม่รู้จัก
  test('should ignore unknown actions', () => {
    const initialState = { count: 5 };
    // เราส่ง action ที่ไม่มีในระบบเพื่อทดสอบ
    expect(
      counterReducer(initialState, { type: 'UNKNOWN_ACTION' })
    ).toEqual(initialState);
  });
});