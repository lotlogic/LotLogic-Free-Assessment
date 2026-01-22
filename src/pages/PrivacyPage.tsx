import Header from "@/components/layouts/Header";
import Heading from "@/components/ui/Heading";

export const AboutPage = () => {
  return (
    <>
      <Header />
      <main>
        <section>
          <div className="relative max-w-260 mx-auto rounded-md shadow-lg">
            <div className="bg-white p-10 md:px-16 md:pb-16">
              <Heading tag="h1" size="h1">
                Privacy Policy – LotLogic (operated by BlockPlanner Pty Ltd)
              </Heading>
              <div className="prose mt-6 md:mt-10">
                <p>
                  <strong>Effective Date:</strong> 18 September 2025
                </p>
                <p>
                  BlockPlanner Pty Ltd (ABN 78 688 846 915) (“BlockPlanner”,
                  “we”, “our”, “us”) owns and operates the LotLogic tool, which
                  is a registered trademark of BlockPlanner. LotLogic is a
                  digital product that helps buyers explore land lots and
                  request builder quotes through estate developer websites.
                </p>
                <p>
                  This Privacy Policy explains how BlockPlanner handles personal
                  information when you use the LotLogic demo quoting tool.
                </p>
                <p>
                  We are bound by the Privacy Act 1988 (Cth), including the
                  Australian Privacy Principles (APPs) and the 2024 reforms.
                </p>

                <h3>Contact details for privacy enquiries:</h3>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:privacy@blockplanner.com.au"
                    className="text-blue-600"
                  >
                    privacy@blockplanner.com.au
                  </a>
                  <br />
                  Post: Privacy Officer, BlockPlanner Pty Ltd, 30 Bougainville
                  St, Griffith ACT 2603
                </p>

                <h3>1. What is personal information</h3>
                <p>
                  “Personal information” has the meaning given in the Privacy
                  Act. It includes any information or opinion about an
                  identified individual, or an individual who is reasonably
                  identifiable, whether true or not, and whether recorded in a
                  material form or not.
                </p>

                <h3>2. Information we collect</h3>
                <p>
                  When you use the tool, we may collect the following categories
                  of personal information:
                </p>
                <ul className="list-disc pl-5 my-2 space-y-1">
                  <li>
                    <strong>Identifiers:</strong> name, email, phone, postal
                    address.
                  </li>
                  <li>
                    <strong>Property preferences:</strong> estate selection, lot
                    number, preferred house plans, design or feature requests.
                  </li>
                  <li>
                    <strong>Financial details:</strong> indicative budget or
                    price range.
                  </li>
                  <li>
                    <strong>Communications:</strong> any text you provide in
                    free-form fields.
                  </li>
                  <li>
                    <strong>Technical and usage data:</strong> IP address,
                    device details, browser type, site interactions, cookies,
                    analytics data.
                  </li>
                  <li>
                    <strong>Consent records:</strong> your opt-in or opt-out
                    choices for marketing and communications.
                  </li>
                  <li>
                    <strong>Children’s information:</strong> we do not knowingly
                    collect personal information from children. If you are under
                    18, parental or guardian consent is required before
                    submitting a request.
                  </li>
                </ul>
                <p>
                  We only collect information that is reasonably necessary for
                  our functions, and we take steps to ensure it is accurate,
                  complete, and up to date.
                </p>

                <h3>3. How we collect your information</h3>
                <p>
                  We collect personal information directly from you when you:
                </p>
                <ul className="list-disc pl-5 my-2 space-y-1">
                  <li>Submit the quote request form.</li>
                  <li>
                    Communicate with us, estate developers, or builders through
                    the tool.
                  </li>
                  <li>
                    Interact with the embedded website tool (cookies, analytics,
                    technical logs).
                  </li>
                </ul>
                <p>We may also receive information indirectly from:</p>
                <ul className="list-disc pl-5 my-2 space-y-1">
                  <li>Estate developers (lot details and status).</li>
                  <li>Builders (updates on quotes generated).</li>
                  <li>Service providers (analytics, hosting, support logs).</li>
                </ul>
                <p>
                  You can choose not to provide information, but if you do, we
                  may be unable to generate a quote or respond effectively to
                  your enquiry.
                </p>

                <h3>4. Purposes of collection and use</h3>
                <p>We collect, hold, and use your personal information to:</p>
                <ul className="list-disc pl-5 my-2 space-y-1">
                  <li>
                    Generate and deliver builder quotes based on your
                    preferences.
                  </li>
                  <li>
                    Share your details with estate developers and their
                    authorised sales teams so they can respond to your enquiry.
                  </li>
                  <li>
                    Share your details with selected builders so they can
                    prepare and deliver quotes.
                  </li>
                  <li>
                    Maintain records, monitor quality, and improve our services.
                  </li>
                  <li>
                    Conduct analytics, testing, and development of the tool.
                  </li>
                  <li>
                    Send marketing communications if you have opted in (with
                    clear opt-out at any time).
                  </li>
                  <li>Meet our legal and regulatory obligations.</li>
                  <li>
                    Manage risks, conduct audits, and run privacy impact
                    assessments where required.
                  </li>
                </ul>
                <p>
                  <strong>Trusted builders</strong> means third-party building
                  companies that have been approved by the estate developer or
                  BlockPlanner to participate in the quoting process. These
                  builders are independent organisations. They receive your
                  details only for the purpose of preparing and delivering a
                  quote and are expected to handle your personal information in
                  accordance with Australian privacy law.
                </p>

                <h3>5. Automated decision-making</h3>
                <p>BlockPlanner may use algorithms to assist with:</p>
                <ul className="list-disc pl-5 my-2 space-y-1">
                  <li>
                    Filtering plans and lots according to your stated
                    preferences.
                  </li>
                  <li>Suggesting or prioritising builders for matching.</li>
                  <li>Generating indicative cost ranges.</li>
                </ul>
                <p>
                  These tools do not make final binding decisions. Builders and
                  estate developers always review and issue the final quote. If
                  an automated process materially influences the quote you
                  receive, you can request human review.
                </p>

                <h3>6. Disclosure of information</h3>
                <p>We may disclose your information to:</p>
                <ul className="list-disc pl-5 my-2 space-y-1">
                  <li>
                    Estate developers hosting the tool and their sales teams.
                  </li>
                  <li>
                    Builder companies you select (or that are matched based on
                    your preferences) and their authorised representatives.
                  </li>
                  <li>
                    Third-party service providers that support our operations
                    (hosting, analytics, IT security, communications platforms).
                  </li>
                  <li>
                    Professional advisers, insurers, or regulators where
                    required by law.
                  </li>
                </ul>
                <p>
                  <strong>Cross-border disclosure</strong>
                </p>
                <p>
                  Some of our service providers store or process data outside
                  Australia. These may include the United States, Singapore, and
                  the European Union. We take reasonable steps to ensure that
                  overseas recipients comply with obligations substantially
                  similar to Australian privacy law.
                </p>

                <h3>7. Storage, security, and retention</h3>
                <p>
                  Your information is stored on secure servers operated by
                  BlockPlanner and trusted providers.
                </p>
                <p>
                  <strong>Safeguards include:</strong>
                </p>
                <ul className="list-disc pl-5 my-2 space-y-1">
                  <li>Encryption in transit and at rest.</li>
                  <li>Access controls and staff training.</li>
                  <li>Audit logging and monitoring.</li>
                  <li>Regular privacy and security assessments.</li>
                </ul>
                <p>
                  We retain personal information only as long as necessary for
                  quoting, support, or legal compliance. Indicative retention
                  periods:
                </p>
                <ul className="list-disc pl-5 my-2 space-y-1">
                  <li>Quote request data: up to 2 years.</li>
                  <li>Marketing opt-in records: until you withdraw consent.</li>
                  <li>System logs: up to 12 months.</li>
                </ul>
                <p>
                  When no longer required, information is securely deleted or
                  de-identified.
                </p>

                <h3>8. Access and correction</h3>
                <p>You may request:</p>
                <ul className="list-disc pl-5 my-2 space-y-1">
                  <li>Access to personal information we hold about you.</li>
                  <li>
                    Correction of information that is inaccurate, incomplete, or
                    out of date.
                  </li>
                </ul>
                <p>
                  Requests should be made to the Privacy Officer. We will
                  respond within 30 days and there is no charge for making a
                  request.
                </p>

                <h3>9. Complaints</h3>
                <p>
                  If you believe we have breached the APPs or this Privacy
                  Policy, you may lodge a complaint with our Privacy Officer
                  (see contact above). We will acknowledge receipt within 7 days
                  and provide a written response within 30 days.
                </p>
                <p>
                  If you are not satisfied with our handling of your complaint,
                  you may contact the Office of the Australian Information
                  Commissioner (OAIC):{" "}
                  <a
                    className="text-blue-600"
                    href="https://www.oaic.gov.au"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.oaic.gov.au
                  </a>
                  .
                </p>

                <h3>10. Notifiable Data Breaches</h3>
                <p>
                  If your information is involved in a data breach that is
                  likely to cause serious harm, we will notify you and the OAIC
                  in line with the Notifiable Data Breaches scheme.
                </p>

                <h3>11. Governance and accountability</h3>
                <p>
                  We maintain internal privacy policies and training for staff.
                  Our Privacy Officer oversees compliance, and senior management
                  reviews privacy risks and conducts audits. Where high-risk
                  activities are involved, we undertake Privacy Impact
                  Assessments.
                </p>

                <h3>12. Consent and withdrawal</h3>
                <p>
                  By submitting a quote request through the tool, you consent to
                  the collection, use, and disclosure of your information as
                  described in this policy.
                </p>
                <ul className="list-disc pl-5 my-2 space-y-1">
                  <li>Marketing communications require a separate opt-in.</li>
                  <li>
                    You may withdraw consent at any time by contacting us or
                    using unsubscribe links in marketing emails.
                  </li>
                </ul>

                <h3>13. Updates to this policy</h3>
                <p>
                  We may update this Privacy Policy periodically. Updated
                  versions will be posted on this page with a revised effective
                  date. For material changes, we will provide additional notice
                  (e.g. on the website or by email, if appropriate).
                </p>
                <p className="mt-10">
                  <strong>Last updated:</strong> 18 September 2025
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
