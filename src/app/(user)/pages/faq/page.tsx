"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold dark:text-gray-50 text-gray-900 sm:text-4xl mb-2">
          Shop Terms & Conditions
        </h1>
        <p className="text-lg dark:text-gray-200 text-gray-600">
          GENERAL TERMS AND CONDITIONS FOR SALE OF PRODUCTS AND SERVICES
        </p>
      </div>
      <MyAccordion />
    </div>
  );
};

export default FAQ;

const MyAccordion = () => {
  const faqItems = [
    {
      question: "Definitions & Interpretation",
      answer: (
        <div className="text-gray-700 dark:text-gray-400">
          <p className="mb-2">
            In the following Terms and Conditions of sale, unless the context
            requires otherwise:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>`&quot;`Shop`&quot;` means Shop Pty Ltd ABN 11 222 333 444;</li>
            <li>
              &quot;Customer&quot; means the person or corporation placing an
              order for the purchase of goods or services from Shop;
            </li>
            <li>
              &quot;Products&quot; means any goods, materials, equipment or
              services provided to the Customer by Shop;
            </li>
            <li>
              if the Customer comprises more than one person, each of those
              person&apos;s liability is joint and several;
            </li>
            <li>
              references to a party or a person includes any form of entity and
              their respective successors, assigns and representatives;
            </li>
            <li>
              for all periods and times specified in clauses 5 and 11, time is
              of the essence; and
            </li>
            <li>
              all references to currency are references to Australian dollars.
            </li>
          </ul>
        </div>
      ),
    },
    {
      question: "General Terms",
      answer: (
        <div className="text-gray-700 dark:text-gray-400 space-y-2">
          <p>
            By ordering the Products and/or accepting delivery of the Products
            from Shop, the Customer agrees that it is bound by these Terms and
            Conditions of sale. Customer orders, including orders placed via the
            internet, are subject to acceptance by Shop.
          </p>
          <p>
            The acceptance of the Customer&apos;s order by Shop is expressly
            made conditional upon the Customer&apos;s assent to these Terms and
            Conditions which will prevail notwithstanding anything that may be
            stated to the contrary on the Customer&apos;s order.
          </p>
          <p>
            Shop reserves the right to vary any of these terms at any time and
            any subsequent orders placed by the Customer will constitute an
            acceptance of the terms as varied.
          </p>
        </div>
      ),
    },
    {
      question: "Quotations",
      answer: (
        <p className="text-gray-700 dark:text-gray-400">
          Any quotation by Shop to the Customer will be open for acceptance by
          the Customer within the period stated in the quotation or, where no
          period is stated, within seven (7) days from the date of the
          quotation. Thereafter, prices stated in the quotation may be varied by
          Shop without notice to the Customer.
        </p>
      ),
    },
    {
      question: "Prices / Taxes",
      answer: (
        <div className="text-gray-700 dark:text-gray-400 space-y-2">
          <p>
            The prices charged by and payable to Shop will be the ruling prices
            applicable at the time of order placement, provided that the
            Products are accepted for delivery within a reasonable time. Prices
            are subject to change without notice.
          </p>
          <p>
            Recommended retail prices are provided for indicative purposes only
            and there is no obligation for Shop to comply with that
            recommendation.
          </p>
          <p>
            It as agreed that should the Customer fail for any reason to acquire
            the quantity of Products sold then without limiting Shop&apos; other
            rights and remedies the unit price charged for the goods sold may be
            amended to take into account any variation in the total quantity
            purchased by the Customer.
          </p>
          <p>
            Prices include GST, but do not include any other tax or duty, which
            is in addition to the price and is to be paid by the Customer at the
            time of payment for the Products.
          </p>
        </div>
      ),
    },
    {
      question: "Terms of Payment",
      answer: (
        <div className="text-gray-700 dark:text-gray-400 space-y-3">
          <p>
            Credit Card Payments may attract a surcharge, and Shop will inform
            the Customer if this is to be the case before processing the
            transaction.
          </p>
          <p>
            Unless otherwise agreed in writing by Shop, where Shop has not
            agreed in writing to provide commercial credit to the Customer, the
            total purchase price for Products supplied will be due for payment
            in cash prior to delivery.
          </p>
          <p>
            Where Shop has agreed in writing to provide commercial credit to the
            Customer, the Customer must make payments in accordance with the
            payment terms provided by Shop.
          </p>
          <p>
            Where Shop has approved the provision of a commercial credit
            arrangement with the Customer but has not provided notice of the
            payment terms to the Customer, the Customer must pay the total
            purchase price for Products supplied within seven days of the
            statement date.
          </p>
          <p>
            Credit Card Payment at an Invoice or transaction level may also be
            offered to the Customer as a stand-alone payment method, or in
            conjunction with Credit Card Direct Debit Authorisation.
          </p>
        </div>
      ),
    },
    {
      question: "Credit Accounts",
      answer: (
        <p className="text-gray-700 dark:text-gray-400">
          Any commercial credit arrangements that are provided to the Customer
          by Shop will continue until terminated by Shop at it sole discretion.
          In the event that Shop terminates the Customer&apos;s commercial
          credit arrangement, the Customer will be notified in writing and
          termination will take effect upon receipt of that notification by the
          Customer.
        </p>
      ),
    },
    {
      question: "Change of Ownership",
      answer: (
        <div className="text-gray-700 dark:text-gray-400 space-y-3">
          <p>
            Trading accounts are approved by Shop based on the information
            supplied and the representations made by the Customer. In the event
            that there is a change in ownership of the Customer, whether total
            or partial, the Customer must immediately provide written notice to
            Shop informing Shop of these changes.
          </p>
          <p>
            Until Shop receives written notice from the Customer of a change in
            ownership, the Customer (including where it is a company or trustee,
            each of the Directors thereof) holds Shop indemnified against any
            and all losses, unpaid accounts, interest, damages, costs, charges,
            fees and expenses incurred or suffered by Shop in trading with any
            person, company (including the same company but with a different
            shareholder or shareholders) or other entity (including a trust)
            which may have purchased the Customer&apos;s business or any
            interest in the Customer&apos;s business or any of the shares in the
            Customer and used the Customer&apos;s previously approved account
            for trading.
          </p>
          <p>
            Where a Customer has been authorised by Shop to make payments
            through Credit Card Direct Debit, the Customer must provide notice
            in writing at least five (5) days prior to any change in ownership
            of the business to allow Shop sufficient time to contact the new
            owner to obtain and confirm new Credit Card information if
            applicable.
          </p>
        </div>
      ),
    },
    {
      question: "Information on the Products supplied",
      answer: (
        <p className="text-gray-700 dark:text-gray-400">
          All descriptive specifications, illustrations, drawings, data,
          dimensions and weights furnished by Shop or otherwise contained in
          catalogues or other advertising material are approximate only and are
          intended to be merely a general description of the goods, are not
          incorporated within this agreement and no not form part of the
          description of the goods sold under this or any other agreement unless
          otherwise agreed to in writing by Shop in which case such information
          will be subject to recognised trade tolerances.
        </p>
      ),
    },
    {
      question: "Delivery",
      answer: (
        <div className="text-gray-700 dark:text-gray-400 space-y-2">
          <p>
            The means of delivering the Products to the Customer will be at
            Shop&apos; discretion. Shop reserves the right to deliver Products
            in part deliveries.
          </p>
          <p>
            In the event that Shop incurs additional costs for meeting special
            (i.e. Tasmania / Northern Territory Deliveries) or urgent delivery
            arrangements, these additional costs may be charged to the Customer
            and may include the cost of airfreight where it is not the normal
            method of delivery. The Customer agrees to accept delivery of the
            Products sold at any time during normal business hours.
          </p>
          <p>
            Shop will not be liable for any loss or damage resulting from any
            late delivery of the Products and late delivery will not entitle the
            Customer to rescind or repudiate the Customer&apos;s order for the
            Products.
          </p>
        </div>
      ),
    },
  ];
  return (
    <>
      {faqItems.map((item, index) => (
        <>
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className=" text-lg">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      ))}
    </>
  );
};
