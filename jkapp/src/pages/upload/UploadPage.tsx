import { useState, useEffect, useRef } from 'react'
import * as XLSX from 'xlsx'
import { supabase } from '../../lib/supabase'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { BottomNavBar } from '../../components/layout/BottomNavBar'

// ── types ──────────────────────────────────────────────────────────────────

interface RawRow {
  '#'?: unknown
  'NUMERO DE PARTE'?: unknown
  'PRODUCTO'?: unknown
  'COMPATIBILIDADES'?: unknown
  'U'?: unknown
  'PRECIO'?: unknown
  'DUEÑO'?: unknown
  'CAJA #'?: unknown
  [key: string]: unknown
}

interface ParsedRow {
  numero_tarjeta: string
  modelo: string
  tipo_tarjeta: string
  compatibilidad: string
  cantidad: string
  precio: string
  dueno: string
  caja: string
  errors: string[]
}

// ── helpers ─────────────────────────────────────────────────────────────────

function str(v: unknown) { return v != null ? String(v).trim() : '' }
function norm(v: unknown) { return v != null ? String(v).trim().toUpperCase() : '' }

function parsePrice(v: unknown): number | null {
  const cleaned = str(v).replace(/[$\s,]/g, '')
  const n = parseFloat(cleaned)
  return isNaN(n) ? null : n
}

function parseRows(raw: RawRow[]): ParsedRow[] {
  return raw.map((row) => {
    const numero_tarjeta = str(row['#'])
    const modelo = norm(row['NUMERO DE PARTE'])
    const tipo_tarjeta = norm(row['PRODUCTO'])
    const compatibilidad = norm(row['COMPATIBILIDADES'])
    const cantidad = str(row['U'])
    const precio = str(row['PRECIO'])
    const dueno = norm(row['DUEÑO'])
    const caja = norm(row['CAJA #'])

    const errors: string[] = []
    if (!numero_tarjeta || isNaN(parseInt(numero_tarjeta))) errors.push('numero')
    if (isNaN(parseInt(cantidad)) || parseInt(cantidad) < 0) errors.push('cantidad')
    if (caja.length > 20) errors.push('caja muy larga')

    return { numero_tarjeta, modelo, tipo_tarjeta, compatibilidad, cantidad, precio, dueno, caja, errors }
  })
}

// ── component ────────────────────────────────────────────────────────────────

export function UploadPage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [rows, setRows] = useState<ParsedRow[]>([])

  const [tiposMap, setTiposMap] = useState<Map<string, number>>(new Map())
  const [inventariosMap, setInventariosMap] = useState<Map<string, number>>(new Map())

  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<{ ok: number; failed: number } | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      supabase.from('tipos_tarjeta').select('id_tipo_tarjeta, descripcion_tipo'),
      supabase.from('inventarios').select('id_inventario, descripcion_inventario'),
    ]).then(([tipos, inventarios]) => {
      setTiposMap(new Map(
        (tipos.data ?? []).map((t: any) => [t.descripcion_tipo.toLowerCase(), t.id_tipo_tarjeta])
      ))
      setInventariosMap(new Map(
        (inventarios.data ?? []).map((i: any) => [i.descripcion_inventario.toLowerCase(), i.id_inventario])
      ))
    })
  }, [])

  const processFile = (file: File) => {
    if (!file.name.match(/\.xlsx?$/i)) return
    setFileName(file.name)
    setResult(null)
    setUploadError(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const wb = XLSX.read(data, { type: 'array' })
      const ws = wb.Sheets[wb.SheetNames[0]]
      const raw = XLSX.utils.sheet_to_json<RawRow>(ws, { defval: '' })
      setRows(parseRows(raw))
    }
    reader.readAsArrayBuffer(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const validRows = rows.filter(r => r.errors.length === 0)
  const invalidRows = rows.filter(r => r.errors.length > 0)

  const handleUpload = async () => {
    if (!validRows.length) return
    setUploading(true)
    setUploadError(null)

    // Auto-crear tipos_tarjeta que no existan
    const localTiposMap = new Map(tiposMap)
    const missingTipos = [...new Set(
      validRows.map(r => r.tipo_tarjeta).filter(t => t && !localTiposMap.has(t.toLowerCase()))
    )]
    for (const desc of missingTipos) {
      const { data: ins, error: insErr } = await supabase
        .from('tipos_tarjeta').insert({ descripcion_tipo: desc }).select('id_tipo_tarjeta').single()
      if (ins) {
        localTiposMap.set(desc.toLowerCase(), ins.id_tipo_tarjeta)
      } else if (insErr) {
        const { data: ex } = await supabase
          .from('tipos_tarjeta').select('id_tipo_tarjeta').ilike('descripcion_tipo', desc).single()
        if (ex) localTiposMap.set(desc.toLowerCase(), ex.id_tipo_tarjeta)
        else setUploadError(`Error al crear tipo "${desc}": ${insErr.message}`)
      }
    }
    if (missingTipos.length > 0) setTiposMap(localTiposMap)

    // Auto-crear inventarios que no existan (incluido "sin caja" como fallback)
    const localInventariosMap = new Map(inventariosMap)
    const SIN_CAJA = 'N/A'
    const duenosEnUso = [...new Set(validRows.map(r => r.dueno || SIN_CAJA))]
    const missingDuenos = duenosEnUso.filter(d => !localInventariosMap.has(d.toLowerCase()))
    for (const desc of missingDuenos) {
      const { data: ins, error: insErr } = await supabase
        .from('inventarios').insert({ descripcion_inventario: desc }).select('id_inventario').single()
      if (ins) {
        localInventariosMap.set(desc.toLowerCase(), ins.id_inventario)
      } else if (insErr) {
        const { data: ex } = await supabase
          .from('inventarios').select('id_inventario').ilike('descripcion_inventario', desc).single()
        if (ex) localInventariosMap.set(desc.toLowerCase(), ex.id_inventario)
        else setUploadError(`Error al crear inventario "${desc}": ${insErr.message}`)
      }
    }
    if (missingDuenos.length > 0) setInventariosMap(localInventariosMap)

    // Construir registros para la BD
    const records = validRows.map(row => ({
      numero_tarjeta: parseInt(row.numero_tarjeta),
      modelo: row.modelo || null,
      tipo_tarjeta: row.tipo_tarjeta ? (localTiposMap.get(row.tipo_tarjeta.toLowerCase()) ?? null) : null,
      compatibilidad: row.compatibilidad || null,
      cantidad: parseInt(row.cantidad),
      precio: parsePrice(row.precio),
      caja: row.caja || null,
      inventario: localInventariosMap.get((row.dueno || SIN_CAJA).toLowerCase()) ?? null,
    }))

    let ok = 0, failed = 0
    const BATCH = 50
    for (let i = 0; i < records.length; i += BATCH) {
      const { error } = await supabase
        .from('tarjetas')
        .upsert(records.slice(i, i + BATCH), { onConflict: 'numero_tarjeta,inventario' })
      if (error) { failed += Math.min(BATCH, records.length - i); setUploadError(error.message) }
      else ok += Math.min(BATCH, records.length - i)
    }

    setResult({ ok, failed })
    setUploading(false)
    if (failed === 0) { setRows([]); setFileName(null) }
  }

  const COLS = ['ID', 'Número de parte', 'Producto', 'Dueño', 'Caja', 'Cantidad', 'Precio', 'Compatibilidades', 'Estado'] as const

  return (
    <div className="bg-background text-on-background min-h-screen pb-40">
      <TopAppBar title="Subir tarjetas" />

      <main className="px-margin-mobile pt-lg space-y-lg">

        {/* Drop zone */}
        <label
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-sm border-2 border-dashed rounded-2xl p-xl cursor-pointer transition-colors ${dragging ? 'border-primary bg-primary/5' : 'border-outline hover:bg-surface-container-low'
            }`}
        >
          <span className="material-symbols-outlined text-5xl text-primary">upload_file</span>
          <div className="text-center">
            <p className="font-headline-sm text-on-surface">
              {fileName ?? 'Arrastra el archivo o toca aquí'}
            </p>
            <p className="font-body-sm text-on-surface-variant mt-xs">
              {fileName ? `${rows.length} filas detectadas` : 'Formato .xlsx o .xls'}
            </p>
          </div>
          {fileName && (
            <span className="font-label-sm text-primary underline">Cambiar archivo</span>
          )}
          <input ref={inputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFileInput} />
        </label>

        {/* Result banner */}
        {result && (
          <div className={`flex items-center gap-sm rounded-xl p-md ${result.failed === 0 ? 'bg-green-50 text-green-800' : 'bg-error-container text-on-error-container'}`}>
            <span className="material-symbols-outlined shrink-0">{result.failed === 0 ? 'check_circle' : 'warning'}</span>
            <p className="font-body-md">
              {result.failed === 0
                ? `${result.ok} tarjetas cargadas correctamente.`
                : `${result.ok} cargadas, ${result.failed} fallaron.`}
            </p>
          </div>
        )}

        {uploadError && (
          <div className="flex items-center gap-sm bg-error-container text-on-error-container rounded-xl p-md">
            <span className="material-symbols-outlined text-error shrink-0">error</span>
            <span className="font-body-sm">{uploadError}</span>
          </div>
        )}

        {/* Summary chips */}
        {rows.length > 0 && (
          <div className="flex gap-sm flex-wrap">
            <span className="flex items-center gap-xs bg-primary-container text-on-primary-container font-label-sm px-md py-xs rounded-full">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              {validRows.length} válidas
            </span>
            {invalidRows.length > 0 && (
              <span className="flex items-center gap-xs bg-error-container text-on-error-container font-label-sm px-md py-xs rounded-full">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {invalidRows.length} con errores
              </span>
            )}
          </div>
        )}

        {/* Preview table */}
        {rows.length > 0 && (
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[700px]">
                <thead className="bg-surface-container border-b border-outline-variant">
                  <tr>
                    {COLS.map(col => (
                      <th key={col} className="px-md py-sm font-label-sm text-on-surface-variant whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => {
                    const ok = row.errors.length === 0
                    const err = (field: string) => row.errors.includes(field) ? 'text-error font-label-sm' : 'text-on-surface-variant'
                    return (
                      <tr key={i} className={`border-b border-outline-variant last:border-0 ${ok ? '' : 'bg-error-container/20'}`}>
                        <td className={`px-md py-sm font-body-sm ${err('numero')}`}>{row.numero_tarjeta || '—'}</td>
                        <td className="px-md py-sm font-body-sm text-on-surface">{row.modelo || <span className="text-on-surface-variant italic">vacío</span>}</td>
                        <td className="px-md py-sm font-body-sm text-on-surface-variant">{row.tipo_tarjeta || '—'}</td>
                        <td className="px-md py-sm font-body-sm text-on-surface-variant">{row.dueno || <span className="italic text-on-surface-variant opacity-60">sin caja</span>}</td>
                        <td className="px-md py-sm font-body-sm text-on-surface-variant">{row.caja || '—'}</td>
                        <td className={`px-md py-sm font-body-sm ${err('cantidad')}`}>{row.cantidad || '—'}</td>
                        <td className="px-md py-sm font-body-sm text-on-surface-variant">{row.precio || '—'}</td>
                        <td className="px-md py-sm font-body-sm text-on-surface-variant max-w-[140px] truncate">{row.compatibilidad || '—'}</td>
                        <td className="px-md py-sm">
                          {ok
                            ? <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
                            : <span className="font-label-sm text-error">{row.errors.join(', ')}</span>
                          }
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Action bar */}
      {rows.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 p-md bg-surface border-t border-outline-variant z-40">
          <button
            onClick={handleUpload}
            disabled={uploading || validRows.length === 0}
            className="w-full h-touch-target-min bg-primary text-on-primary rounded-xl font-headline-sm shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-60"
          >
            {uploading ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                Cargando...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">cloud_upload</span>
                Cargar {validRows.length} tarjeta{validRows.length !== 1 ? 's' : ''}
              </>
            )}
          </button>
        </div>
      )}

      <BottomNavBar />
    </div>
  )
}
