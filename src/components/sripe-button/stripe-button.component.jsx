import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({ price }) => {
    const stripePrice = price * 100;
    const publishKey = 'pk_test_eeDPRr5XhhVgWYTSbPWDqRzk00RY8DIUVT';

    const onToken = token => {
        console.log(token);
        alert('Payment successful');
    }

    return (
        <StripeCheckout
            label='Pay now'
            panelLabel='Pay now'
            name='CCRWN Clothing Ltd.'
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is €${price}`}
            amount={stripePrice}
            token={onToken}
            stripeKey={publishKey}
        />
    )
}

export default StripeButton;