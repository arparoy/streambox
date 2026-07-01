import LegalPage from '@/components/legal-page';

export const metadata = {
  title: 'DMCA',
  description: 'StreamBox DMCA takedown and copyright policy.',
};

export default function DmcaPage() {
  return (
    <LegalPage title="DMCA Policy" updated="July 2, 2026">
      <p>
        StreamBox respects the intellectual property rights of others and expects its
        users to do the same. We comply with the Digital Millennium Copyright Act (DMCA)
        and will respond to valid takedown notices.
      </p>

      <h2>No Files Hosted</h2>
      <p>
        StreamBox does not host, store, or upload any media files on its servers. All
        content is indexed from or provided by non-affiliated third-party sources. We do
        not control this material.
      </p>

      <h2>Filing a Takedown Notice</h2>
      <p>
        If you believe content linked through our site infringes your copyright, please
        send a written notice that includes:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Identification of the copyrighted work you claim has been infringed.</li>
        <li>The specific URL or location of the allegedly infringing material.</li>
        <li>Your contact information (name, address, email, and phone number).</li>
        <li>
          A statement that you have a good-faith belief the use is not authorized by the
          copyright owner, its agent, or the law.
        </li>
        <li>
          A statement, under penalty of perjury, that the information is accurate and that
          you are the copyright owner or authorized to act on their behalf.
        </li>
        <li>Your physical or electronic signature.</li>
      </ul>

      <h2>Submitting Your Notice</h2>
      <p>
        Send complete DMCA notices to{' '}
        <a href="mailto:arparoycollection@gmail.com">arparoycollection@gmail.com</a>. Upon
        receiving a valid notice, we will promptly remove or disable access to the
        relevant links.
      </p>
    </LegalPage>
  );
}
