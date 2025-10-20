export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="text-gray-700 text-sm">Last updated: {new Date().getFullYear()}</p>
      <section className="space-y-3 text-gray-800">
        <p>
          We value your privacy. This placeholder policy describes how we handle
          your data. Replace with your official policy.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We store account and workout data securely.</li>
          <li>We do not sell your personal information.</li>
          <li>You can request deletion of your account.</li>
        </ul>
      </section>
    </div>
  );
}


