import Layout from "@/components/layout";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="container-page space-y-6 py-8">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card space-y-4">
            <div>
              <h3 className="text-lg font-semibold">YouTube OAuth</h3>
              <p className="text-sm text-foreground/60">Hubungkan akun YouTube untuk upload otomatis.</p>
            </div>
            <button className="button-primary w-full">Connect YouTube</button>
            <p className="text-xs text-foreground/60">OAuth2 resmi, refresh token terenkripsi.</p>
          </div>
          <div className="card space-y-4">
            <h3 className="text-lg font-semibold">Processing Config</h3>
            <div className="space-y-3">
              <label className="text-xs text-foreground/60">Hook mode</label>
              <select className="input">
                <option>Smart</option>
                <option>Aggressive</option>
              </select>
              <label className="text-xs text-foreground/60">Cleanup policy</label>
              <select className="input">
                <option>7 days</option>
                <option>14 days</option>
                <option>30 days</option>
              </select>
            </div>
            <button className="button-secondary w-full">Save Settings</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
