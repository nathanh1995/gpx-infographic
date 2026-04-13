'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
};

const players = [
  { name: 'Marcus Bontempelli', team: 'WB', pos: 'MID', avg: 112.4, breakeven: 118, trend: '+4.1', price: '$1,024k' },
  { name: 'Zach Merrett', team: 'ESS', pos: 'MID', avg: 109.8, breakeven: 103, trend: '+2.8', price: '$995k' },
  { name: 'Rowan Marshall', team: 'STK', pos: 'RUC', avg: 106.3, breakeven: 96, trend: '+1.2', price: '$944k' },
  { name: 'Errol Gulden', team: 'SYD', pos: 'MID/FWD', avg: 104.7, breakeven: 90, trend: '+5.0', price: '$912k' },
  { name: 'Sam Flanders', team: 'GC', pos: 'MID/FWD', avg: 101.6, breakeven: 85, trend: '-0.4', price: '$876k' },
];

function Button({ children, variant = 'primary', size = 'md' }: ButtonProps) {
  const variantClass: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600',
    secondary: 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 border-transparent',
  };

  const sizeClass = size === 'sm' ? 'h-9 px-3 text-xs' : 'h-10 px-4 text-sm';

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl border font-medium transition-colors ${sizeClass} ${variantClass[variant]}`}
      type="button"
    >
      {children}
    </button>
  );
}

function TextInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      placeholder={placeholder}
      className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500"
    />
  );
}

function SelectInput({ options }: { options: string[] }) {
  return (
    <select className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-500">
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
}

function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)]">
      <header className="mb-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}

function Sidebar() {
  const nav = ['Overview', 'My Team', 'Trade Planner', 'Captaincy', 'Watchlist', 'Leagues'];

  return (
    <aside className="w-[236px] border-r border-slate-200 bg-white p-4">
      <div className="mb-6 flex h-11 items-center rounded-xl bg-slate-900 px-3 text-sm font-semibold text-white">AFL Fantasy</div>
      <p className="mb-3 px-2 text-xs font-medium uppercase tracking-wide text-slate-500">Main</p>
      <nav className="space-y-3">
        {nav.map((item, index) => {
          const isActive = index === 1;
          return (
            <button
              key={item}
              className={`flex h-10 w-full items-center rounded-xl px-3 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'}`}
              type="button"
            >
              <span className={`mr-3 h-2 w-2 rounded-full ${isActive ? 'bg-blue-600' : 'bg-slate-300'}`} />
              {item}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <p className="text-xs font-medium text-slate-500">Round 7 · Saturday Lockout</p>
        <h1 className="text-xl font-semibold text-slate-900">Fantasy Companion Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <TextInput placeholder="Search players, teams, stats" />
        <Button variant="secondary">Import Team</Button>
        <Button>Sync Live Scores</Button>
      </div>
    </header>
  );
}

function StatCard({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <Card title={label} action={<span className="text-xs font-medium text-slate-500">This week</span>}>
      <div className="space-y-2">
        <p className="text-2xl font-semibold leading-none text-slate-900">{value}</p>
        <p className={`text-xs font-medium ${delta.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{delta} vs last round</p>
      </div>
    </Card>
  );
}

function DataTable() {
  return (
    <Card
      title="Top Trade Targets"
      action={<Button size="sm" variant="ghost">See all</Button>}
    >
      <div className="mb-4 grid grid-cols-4 gap-4">
        <TextInput placeholder="Search players" />
        <SelectInput options={['All Positions', 'MID', 'DEF', 'RUC', 'FWD']} />
        <SelectInput options={['Price: Any', '< $600k', '$600k - $800k', '$800k+']} />
        <Button variant="secondary">Apply Filters</Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="h-11 px-4 text-left">Player</th>
              <th className="h-11 px-4 text-left">Team</th>
              <th className="h-11 px-4 text-right">Avg</th>
              <th className="h-11 px-4 text-right">Break-even</th>
              <th className="h-11 px-4 text-right">Trend</th>
              <th className="h-11 px-4 text-right">Price</th>
              <th className="h-11 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.name} className="h-12 border-t border-slate-100 text-slate-700 hover:bg-slate-50">
                <td className="px-4">
                  <p className="font-medium text-slate-900">{player.name}</p>
                  <p className="text-xs text-slate-500">{player.pos}</p>
                </td>
                <td className="px-4">{player.team}</td>
                <td className="px-4 text-right">{player.avg}</td>
                <td className="px-4 text-right">{player.breakeven}</td>
                <td className={`px-4 text-right font-medium ${player.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {player.trend}
                </td>
                <td className="px-4 text-right">{player.price}</td>
                <td className="px-4 text-right">
                  <Button size="sm">Add</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function FantasyDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="space-y-8 p-6">
            <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <StatCard label="Projected Team Score" value="2,143" delta="+76" />
              <StatCard label="Cash In Bank" value="$128k" delta="-12" />
              <StatCard label="Remaining Trades" value="27" delta="+1" />
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <DataTable />
              </div>
              <Card title="Captaincy Radar" action={<span className="text-xs text-blue-600">Auto updated</span>}>
                <div className="space-y-4">
                  {['Bontempelli · 133 proj', 'Merrett · 129 proj', 'Marshall · 124 proj'].map((entry) => (
                    <div key={entry} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                      <span className="text-sm font-medium text-slate-800">{entry}</span>
                      <Button size="sm" variant="secondary">Set VC/C</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
