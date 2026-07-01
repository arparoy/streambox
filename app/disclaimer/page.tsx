import LegalPage from '@/components/legal-page';

export const metadata = {
  title: 'Disclaimer',
  description: 'Important disclaimers regarding the use of StreamBox.',
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="July 2, 2026">
      <p>
        The information and links provided on StreamBox are for general informational
        purposes only. By using this site, you acknowledge and agree to the disclaimers
        set out below.
      </p>

      <h2>No Files Stored</h2>
      <p>
        StreamBox does not store any files on its server. All contents are provided by
        non-affiliated third parties. We simply index publicly available links and do not
        upload, host, or distribute any media ourselves.
      </p>

      <h2>External Links</h2>
      <p>
        Our site may contain links to external websites that are not operated by us. We
        have no control over the content and practices of these sites and cannot accept
        responsibility for them.
      </p>

      <h2>Accuracy of Information</h2>
      <p>
        While we strive to keep information up to date and correct, we make no
        representations or warranties of any kind about the completeness, accuracy, or
        reliability of any content on the site.
      </p>

      <h2>Use at Your Own Risk</h2>
      <p>
        Any reliance you place on the material on this site is strictly at your own risk.
        We will not be liable for any loss or damage arising from the use of StreamBox.
      </p>

      <h2>Contact Us</h2>
      <p>
        For any questions regarding this disclaimer, contact us at{' '}
        <a href="mailto:arparoycollection@gmail.com">arparoycollection@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
