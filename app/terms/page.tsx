import LegalPage from '@/components/legal-page';

export const metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions for using StreamBox.',
};

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" updated="July 2, 2026">
      <p>
        Welcome to StreamBox. By accessing or using our website, you agree to be bound by
        these Terms of Service. If you do not agree with any part of these terms, please
        do not use the site.
      </p>

      <h2>Use of the Service</h2>
      <p>
        StreamBox is provided for personal, non-commercial use. You agree not to misuse
        the service, interfere with its normal operation, or attempt to access it using a
        method other than the interface we provide.
      </p>

      <h2>Content</h2>
      <p>
        StreamBox does not host or store any media files on its servers. All content is
        provided by non-affiliated third parties. We are not responsible for the accuracy,
        legality, or availability of external content.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The StreamBox name, logo, and site design are the property of their respective
        owners. You may not copy, reproduce, or distribute any part of the site without
        permission.
      </p>

      <h2>Disclaimer of Warranties</h2>
      <p>
        The service is provided &quot;as is&quot; without warranties of any kind. We do not
        guarantee that the service will be uninterrupted, error-free, or free of harmful
        components.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, StreamBox shall not be liable for any
        damages arising from your use of, or inability to use, the service.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may revise these Terms of Service at any time. Continued use of the site after
        changes are posted constitutes acceptance of the updated terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these terms? Reach us at{' '}
        <a href="mailto:arparoycollection@gmail.com">arparoycollection@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
