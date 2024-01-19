import React, { useEffect } from "react";
import "./shippingAndDelivery.scss";

const ShippingAndDelivery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shipping-and-delivery-container">
      <h2 className="shipping-and-delivery-main-title">
        SHIPPING AND DELIVERY
      </h2>
      <p className="shipping-and-delivery-description">
        Shipping charges shall be added to your Order at the time of check-out.
        An estimated delivery time is displayed on in Your profile. Delivery
        could take a little longer for remote locations. You will receive an
        email with the tracking number as soon as the products are shipped.
        Orders are dispatched within 2 working days. In case of additional time,
        the users will be notified at the time of placing the order. The
        delivery and transit time of our customized products may vary based on
        the geographical location and distance of the recipient's address.
        Additionally, the presence of holidays, weekends, and other factors may
        impact the estimated delivery time. While we make every effort to
        provide accurate delivery estimates, we cannot guarantee specific
        delivery dates. Customers are advised to consider these variables when
        placing orders and allow for possible delays due to location, distance,
        holidays, and other unforeseen circumstances. We shall not be held
        liable for any inconvenience or loss arising from delays in delivery
        caused by factors beyond our control.. Delivery of all orders will be
        duly done to the address as mentioned by you at the time of placing the
        order. Products are not shipped on Sundays and public holidays. You are
        requested to enter the correct billing address and contact information.
        Make sure to also enter the correct shipping address (Street number and
        name, City, State, and Zip Code) as We are not liable for packages that
        are sent to the wrong address when the address information is not
        entered correctly.
      </p>
      <h2 className="shipping-and-delivery-main-title">RETURNS</h2>
      <p className="shipping-and-delivery-description">
        We value your satisfaction and want to ensure a smooth experience for
        you. In the event that you need to return a product, please take a
        moment to familiarize yourself with our Returns and Refunds Policy
        outlined below:
      </p>
      <p className="shipping-and-delivery-description">Returns Accepted</p>
      <p className="shipping-and-delivery-description">
        Returns Eligibility: We accept returns under the following
        circumstances:
      </p>

      <ol className="shipping-and-delivery-ordered-list">
        <li>
          Receipt of a short-expiry product: If you receive a product with an
          expiry date within 1 month.
        </li>
        <li>
          Receipt of product(s) damaged in transit: If the products you receive
          are visibly damaged or compromised during transit.
        </li>
        <li>Receipt of a product with a manufacturing defect</li>
      </ol>
      <p className="shipping-and-delivery-description">Refund Processing:</p>
      <ol className="shipping-and-delivery-ordered-list">
        <li>
          Immediate Store Credit: If the products are found to be damaged,
          spoiled, or expired, we will initiate an immediate store credit to
          your account.
        </li>
        <li>
          Full Refund: In cases where the material has expired, and the product
          is deemed unsuitable for consumption, a full refund will be processed
          within 7 working days.
        </li>
      </ol>
      <p className="shipping-and-delivery-description">
        Exchanges Not Allowed:
      </p>
      <p className="shipping-and-delivery-description">
        We regret to inform you that exchanges are not allowed under our refund
        policy.
      </p>
      <p className="shipping-and-delivery-description">Return Process:</p>
      <ol className="shipping-and-delivery-ordered-list">
        <li>
          If the goods are spoiled due to expiration, please contact our
          customer support team. We will arrange for the return of the products
          and cover the return shipping costs.
        </li>
      </ol>
      <p className="shipping-and-delivery-description">
        Refund Method and Timeline:
      </p>
      <ol className="shipping-and-delivery-ordered-list">
        <li>
          The refunded amount will be credited back to the original payment
          account used for the purchase.
        </li>
        <li>
          Please allow up to 7 working days for the refund to be processed and
          reflected in your account.
        </li>
      </ol>
      <p className="shipping-and-delivery-description">
        Please note that this refund policy is specific to the situations
        mentioned above. For any other concerns or inquiries, please contact our
        customer support team for further assistance.
      </p>
    </div>
  );
};

export default ShippingAndDelivery;
