// Frontend payment simulation for demo use.
export async function createPayment({
  tripId,
  travelers,
  method,
  amount,
  last4,
}) {
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Test card 4000 0000 0000 0002 simulates a declined card
  if (method === "card" && last4 === "0002") {
    return { status: "failed", message: "Your card was declined." };
  }

  const n = Math.floor(1000 + Math.random() * 9000);
  return {
    status: "success",
    bookingId: `#SIN-${n}`,
    transactionId: `txn_${Date.now()}`,
    method,
    tripId,
    travelers,
    amount,
  };
}
