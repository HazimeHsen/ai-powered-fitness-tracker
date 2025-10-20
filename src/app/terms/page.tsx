export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Terms of Service</h1>
      <p className="text-gray-700 text-sm">Last updated: {new Date().getFullYear()}</p>
      <section className="space-y-3 text-gray-800">
        <p>
          Welcome to our AI-powered fitness tracker. By using our service, you
          agree to the following terms. Replace this content with your legal
          terms.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use is subject to applicable laws.</li>
          <li>Your account is your responsibility.</li>
          <li>We may update these terms from time to time.</li>
        </ul>
      </section>
    </div>
  );
}


