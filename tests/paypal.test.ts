import { generateAccessToken, paypal } from "../lib/paypal";


//Tests to generate access token
test("should generate a paypal access token", async () => {
  const tokenResponse = await generateAccessToken();
  // console.log(tokenResponse);
  expect(typeof tokenResponse).toBe("string");
  expect(tokenResponse.length).toBeGreaterThan(0);
});

//Test to create paypal order
test("should create paypal order", async () => {
  // const token = generateAccessToken()
  const price = 10.00
  
  const orderResponse = await paypal.createOrder( price ) 
  // console.log(orderResponse)

  expect(orderResponse).toHaveProperty('id')
  expect(orderResponse).toHaveProperty('status')
  expect(orderResponse.status).toBe('CREATED')
})

//Test to capture mock order
test("simulate capturing paypal payment from order", async () => {
  const orderId = '100'

  const mockCapturePayment = jest
    .spyOn(paypal, 'capturePayment')
    .mockResolvedValue({
      status: 'COMPLETED'
    })

    const captureResponse = await paypal.capturePayment(orderId)
    expect(captureResponse).toHaveProperty('status')

    mockCapturePayment.mockRestore()
})