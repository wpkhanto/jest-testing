# jest-testing

### === สร้างโปรเจคใหม่ด้วย Vite ===

```bash
npm create vite@latest jest-testing -- --template react-ts
cd jest-testing
npm install
```

### === ติดตั้ง Testing Library และ Jest ===

```bash
npm install --save-dev jest @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### === ติดตั้ง Babel เพื่อรองรับการทำงานร่วมกับ Jest ===

```bash
npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript identity-obj-proxy
```

### === ตั้งค่า Jest Configuration ===
สร้างไฟล์ `jest.config.js` ในโฟลเดอร์หลัก:

```js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
```

### === ตั้งค่า Babel ===
สร้างไฟล์ `.babelrc`:

```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }],
    "@babel/preset-typescript"
  ]
}
```

### === สร้างไฟล์ setupTests.ts ===
สร้างไฟล์ `src/setupTests.ts`:

```ts
import '@testing-library/jest-dom';
```

### === อัพเดทไฟล์ package.json เพื่อเพิ่ม script สำหรับรัน test ===

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "test": "jest",
  "test:watch": "jest --watch"
}
```

> หมายเหตุ

1. ESM vs CommonJS: เนื่องจาก Vite ใช้ ESM (ECMAScript Modules) โดยค่าเริ่มต้น ควรใช้ไฟล์ config แบบ `.mjs` หรือใส่ `"type": "module"` ใน package.json
2. การ Debug: หากเกิด `error module is not defined` ให้เปลี่ยนไฟล์ `jest.config.js` เป็น `jest.config.mjs` และใช้ syntax export แบบ ESM
3. การแก้ไขปัญหาอื่นๆ: อาจกำหนดค่าใน package.json แทนการใช้ไฟล์ jest.config โดยเพิ่ม:

```json
"jest": {
  "testEnvironment": "jsdom",
  "transform": {
    "^.+\\.(ts|tsx)$": "babel-jest"
  },
  "moduleNameMapper": {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"]
}
```

### === แนวทางการเขียน Unit Test ที่ดี ===

1. เขียนเทสที่ตรงกับความต้องการของผู้ใช้:
   - ทดสอบว่า Component ทำงานถูกต้องตามที่ผู้ใช้คาดหวัง
   - เน้นการทดสอบพฤติกรรม (behavior) มากกว่าการทดสอบการนำไปใช้ (implementation)

2. ใช้ data-testid เฉพาะเมื่อจำเป็น:
   - พยายามใช้ queries ที่ผู้ใช้สามารถโต้ตอบได้: getByRole, getByLabelText, getByText
   - ใช้ data-testid เมื่อไม่มีวิธีอื่นในการเข้าถึง element หรือเมื่อต้องการทำให้ test มีความเสถียรมากขึ้น

3. แยกเทสเป็นหน่วยย่อย:
   - แต่ละเทสควรทดสอบเฉพาะหนึ่งฟังก์ชันหรือหนึ่งพฤติกรรม
   - ตั้งชื่อเทสให้ชัดเจนเพื่อให้ทราบว่ากำลังทดสอบอะไร

4. ทำให้เทสอ่านง่าย:
   - ใช้รูปแบบ AAA (Arrange-Act-Assert) หรือ Given-When-Then
   - แบ่งเทสออกเป็นขั้นตอนที่ชัดเจน

5. ทดสอบทั้งกรณีปกติและกรณีผิดพลาด:
   - ทดสอบกรณีที่ Component ควรทำงานได้อย่างถูกต้อง
   - ทดสอบกรณีข้อผิดพลาดและการจัดการกับกรณีที่ไม่คาดคิด

6. ใช้ mock อย่างเหมาะสม:
   - Mock เฉพาะสิ่งที่จำเป็น (เช่น API calls, media queries)
   - พยายามทดสอบการทำงานจริงมากที่สุดเท่าที่เป็นไปได้

7. ระวังเรื่อง Async:
   - ใช้ waitFor หรือ findBy เมื่อต้องการทดสอบ component ที่มีการทำงานแบบ async
   - ตรวจสอบให้แน่ใจว่าข้อมูลถูกโหลดเสร็จสิ้นก่อนการตรวจสอบ

### === ตัวอย่าง Pattern สำหรับการเขียนเทส ===
```ts
describe('ComponentName', () => {
  // 1. Setup / Arrange - สร้าง mock, คำเตรียมข้อมูลทดสอบ
  const mockData = [...];
  const mockFunction = jest.fn();
  
  beforeEach(() => {
    // การเตรียมการก่อนแต่ละเทส (เช่น reset mocks)
    jest.clearAllMocks();
  });
  
  // 2. เขียนเทสสำหรับแต่ละฟังก์ชันหรือสิ่งที่ต้องการทดสอบ
  test('should render correctly with default props', () => {
    // Arrange - เตรียมข้อมูลสำหรับเทสนี้
    render(<Component prop1="value" />);
    
    // Act - ทำการกระทำที่ต้องการทดสอบ (ถ้าจำเป็น)
    // (ในกรณีนี้เทสเพียงแค่การ render จึงไม่มี Act)
    
    // Assert - ตรวจสอบผลลัพธ์
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
  
  test('should handle user interaction correctly', () => {
    // Arrange
    render(<Component onAction={mockFunction} />);
    
    // Act
    fireEvent.click(screen.getByRole('button'));
    
    // Assert
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
  
  // 3. เทสสำหรับกรณีข้อผิดพลาด
  test('should show error message when API fails', async () => {
    // Arrange - mock API error
    server.use(
      rest.get('/api/data', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    
    render(<Component />);
    
    // Act - ไม่ต้องทำอะไรเพราะ component จะเรียก API เองตอน render
    
    // Assert - รอให้ข้อความ error ปรากฏ
    expect(await screen.findByText('An error occurred')).toBeInTheDocument();
  });
});
```
