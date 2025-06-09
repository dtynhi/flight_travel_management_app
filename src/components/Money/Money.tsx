interface IMoneyProp {
  currency?: string | null;
  amount?: number | string | null;
}

function Money({ currency, amount }: IMoneyProp) {
  if (!amount) {
    return null;
  }
  return (
    <div className='flex items-center gap-1'>
      <span>{amount}</span>
      {currency && <span>- {currency}</span>}
    </div>
  );
}

export default Money;
