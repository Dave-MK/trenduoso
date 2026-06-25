'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Entry = {
  id: string
  trade_date: string
  instrument: string
  direction: 'long' | 'short'
  entry_price: number | null
  exit_price: number | null
  size: number | null
  pnl: number | null
  rating: number | null
  notes: string | null
}

const INSTRUMENTS = ['EURUSD', 'GBPUSD', 'USDJPY', 'SPX', 'NAS100', 'GOLD', 'BTCUSD', 'ETHUSD', 'Other']

function RatingStars({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`text-lg leading-none transition-colors ${n <= value ? 'text-amber' : 'text-steel hover:text-amber/60'}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

function pnlColor(v: number | null) {
  if (v === null) return 'text-ghost'
  if (v > 0) return 'text-acuity-teal'
  if (v < 0) return 'text-bear-red'
  return 'text-ghost'
}

export function JournalClient({ initialEntries }: { initialEntries: Entry[] }) {
  const [entries, setEntries] = useState<Entry[]>(initialEntries)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const [form, setForm] = useState({
    trade_date: new Date().toISOString().slice(0, 10),
    instrument: 'EURUSD',
    direction: 'long' as 'long' | 'short',
    entry_price: '',
    exit_price: '',
    size: '',
    pnl: '',
    rating: 3,
    notes: '',
  })

  function set(key: string, value: string | number) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    setSaving(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setFormError('Not signed in.'); setSaving(false); return }

    const payload = {
      user_id: user.id,
      trade_date: form.trade_date,
      instrument: form.instrument,
      direction: form.direction,
      entry_price: form.entry_price ? parseFloat(form.entry_price) : null,
      exit_price: form.exit_price ? parseFloat(form.exit_price) : null,
      size: form.size ? parseFloat(form.size) : null,
      pnl: form.pnl ? parseFloat(form.pnl) : null,
      rating: form.rating,
      notes: form.notes || null,
    }

    const { data, error } = await supabase
      .from('journal_entries')
      .insert(payload)
      .select()
      .single()

    if (error) {
      setFormError(error.message)
      setSaving(false)
      return
    }

    setEntries((prev) => [data as Entry, ...prev])
    setShowForm(false)
    setSaving(false)
    setForm((f) => ({ ...f, entry_price: '', exit_price: '', size: '', pnl: '', notes: '' }))
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from('journal_entries').delete().eq('id', id)
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  const totalPnl = entries.reduce((s, e) => s + (e.pnl ?? 0), 0)
  const wins = entries.filter((e) => (e.pnl ?? 0) > 0).length
  const winRate = entries.length > 0 ? Math.round((wins / entries.length) * 100) : null

  return (
    <div>
      {/* Summary bar */}
      {entries.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total trades', value: String(entries.length),                             color: 'text-chalk' },
            { label: 'Win rate',     value: winRate !== null ? `${winRate}%` : '—',              color: winRate !== null && winRate >= 50 ? 'text-acuity-teal' : 'text-bear-red' },
            { label: 'Total P&L',    value: totalPnl !== 0 ? `${totalPnl > 0 ? '+' : ''}${totalPnl.toFixed(2)}` : '—', color: pnlColor(totalPnl) },
            { label: 'Avg rating',   value: entries.filter(e => e.rating).length > 0 ? (entries.reduce((s, e) => s + (e.rating ?? 0), 0) / entries.filter(e => e.rating).length).toFixed(1) + ' ★' : '—', color: 'text-amber' },
          ].map((s) => (
            <div key={s.label} className="bg-slate border border-steel rounded-xl p-4">
              <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-1">{s.label}</p>
              <p className={`font-mono font-medium text-xl ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add entry button */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] font-display font-medium tracking-widest text-ghost uppercase">
          {entries.length === 0 ? 'No entries yet' : `${entries.length} trade${entries.length !== 1 ? 's' : ''}`}
        </p>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-acuity-blue text-white font-display font-medium text-sm px-4 py-2 rounded-lg hover:bg-acuity-blue/90 transition-colors"
        >
          {showForm ? '× Cancel' : '+ Log trade'}
        </button>
      </div>

      {/* New entry form */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-slate border border-acuity-blue/40 rounded-xl p-6 mb-8 space-y-5">
          <h3 className="font-display font-semibold text-chalk text-base">New trade</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">Date</label>
              <input type="date" value={form.trade_date} onChange={(e) => set('trade_date', e.target.value)} required
                className="w-full bg-obsidian border border-steel rounded-lg px-3 py-2 text-chalk text-sm font-body focus:outline-none focus:border-acuity-blue transition-colors" />
            </div>
            <div>
              <label className="block text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">Instrument</label>
              <select value={form.instrument} onChange={(e) => set('instrument', e.target.value)}
                className="w-full bg-obsidian border border-steel rounded-lg px-3 py-2 text-chalk text-sm font-body focus:outline-none focus:border-acuity-blue transition-colors">
                {INSTRUMENTS.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">Direction</label>
              <div className="flex rounded-lg overflow-hidden border border-steel h-[38px]">
                {(['long', 'short'] as const).map((d) => (
                  <button key={d} type="button" onClick={() => set('direction', d)}
                    className={`flex-1 text-sm font-display font-medium transition-colors capitalize
                      ${form.direction === d
                        ? d === 'long' ? 'bg-acuity-teal text-white' : 'bg-bear-red text-white'
                        : 'bg-obsidian text-ghost hover:text-chalk'}`}
                  >{d}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: 'entry_price', label: 'Entry price' },
              { key: 'exit_price',  label: 'Exit price'  },
              { key: 'size',        label: 'Size / lots' },
              { key: 'pnl',         label: 'P&L (£)'     },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">{label}</label>
                <input type="number" step="any" value={(form as Record<string, string | number>)[key] as string}
                  onChange={(e) => set(key, e.target.value)} placeholder="—"
                  className="w-full bg-obsidian border border-steel rounded-lg px-3 py-2 text-chalk text-sm font-mono focus:outline-none focus:border-acuity-blue transition-colors" />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">Trade quality</label>
            <RatingStars value={form.rating} onChange={(v) => set('rating', v)} />
          </div>

          <div>
            <label className="block text-[10px] font-display font-medium tracking-widest text-ghost uppercase mb-1.5">Notes</label>
            <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={3} placeholder="Setup, execution notes, lessons learned…"
              className="w-full bg-obsidian border border-steel rounded-lg px-4 py-2.5 text-chalk text-sm font-body placeholder:text-muted focus:outline-none focus:border-acuity-blue transition-colors resize-none" />
          </div>

          {formError && <p className="text-bear-red text-[12px] font-body">{formError}</p>}

          <button type="submit" disabled={saving}
            className="bg-acuity-blue text-white font-display font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-acuity-blue/90 transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : 'Save trade'}
          </button>
        </form>
      )}

      {/* Entries list */}
      {entries.length === 0 ? (
        <div className="text-center py-16 border border-steel/50 border-dashed rounded-xl">
          <p className="text-3xl mb-3">📓</p>
          <p className="font-display font-semibold text-chalk text-base mb-1">Start your trade journal</p>
          <p className="text-ghost text-sm font-body">Log your first trade to begin tracking your edge.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((e) => (
            <div key={e.id} className="bg-slate border border-steel rounded-xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-[10px] font-display font-medium tracking-widest uppercase px-2 py-1 rounded
                    ${e.direction === 'long' ? 'text-acuity-teal bg-acuity-teal/10' : 'text-bear-red bg-bear-red/10'}`}>
                    {e.direction}
                  </span>
                  <span className="font-mono font-medium text-chalk text-sm">{e.instrument}</span>
                  <span className="text-ghost text-[12px] font-body">{e.trade_date}</span>
                  {e.rating && (
                    <span className="text-amber text-[12px]">{'★'.repeat(e.rating)}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {e.pnl !== null && (
                    <span className={`font-mono font-medium text-sm ${pnlColor(e.pnl)}`}>
                      {e.pnl > 0 ? '+' : ''}{e.pnl.toFixed(2)}
                    </span>
                  )}
                  <button onClick={() => handleDelete(e.id)}
                    className="text-ghost hover:text-bear-red text-sm font-body transition-colors p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                    ×
                  </button>
                </div>
              </div>
              {(e.entry_price || e.exit_price || e.size) && (
                <div className="flex gap-4 mt-2 text-[11px] text-ghost font-mono">
                  {e.entry_price && <span>Entry: {e.entry_price}</span>}
                  {e.exit_price  && <span>Exit: {e.exit_price}</span>}
                  {e.size        && <span>Size: {e.size}</span>}
                </div>
              )}
              {e.notes && <p className="mt-2 text-ghost text-[12px] font-body leading-relaxed">{e.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
