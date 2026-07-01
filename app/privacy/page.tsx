import LegalPage from '@/components/legal-page';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How StreamBox collects, uses, and protects your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2, 2026">
      <p>
        At StreamBox, your privacy matters to us. This Privacy Policy explains what
        information we collect, how we use it, and the choices you have. By using
        StreamBox, you agree to the practices described here.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect minimal information needed to operate the service. This may include
        basic usage data such as pages visited, device and browser type, and preferences
        you save locally (like your favorites and theme). We do not require you to create
        an account to browse the site.
      </p>

      <h2>How We Use Information</h2>
      <p>
        Information is used to improve site performance, understand which content is
        popular, remember your preferences, and keep the service secure. We do not sell
        your personal information to third parties.
      </p>

      <h2>Cookies and Local Storage</h2>
      <p>
        StreamBox uses local storage in your browser to remember settings such as your
        favorite titles and display preferences. You can clear this data at any time
        through your browser settings.
      </p>

      <h2>Third-Party Content</h2>
      <p>
        Some links and content may be provided by non-affiliated third parties. We are
        not responsible for the privacy practices of external sites. We encourage you to
        review their policies before sharing any information.
      </p>

      <h2>Data Security</h2>
      <p>
        We take reasonable measures to protect the information handled by the service.
        However, no method of transmission over the internet is completely secure, and we
        cannot guarantee absolute security.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on
        this page with an updated revision date.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, contact us at{' '}
        <a href="mailto:arparoycollection@gmail.com">arparoycollection@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
