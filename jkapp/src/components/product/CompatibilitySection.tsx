interface CompatibilitySectionProps {
  models: string[]
}

export function CompatibilitySection({ models }: CompatibilitySectionProps) {
  return (
    <section className="px-margin-mobile mt-xl">
      <h3 className="font-headline-sm text-on-surface mb-md">
        Compatibility (Compatibilidades)
      </h3>
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
        <p className="font-body-md text-on-surface">{models.join(', ')}</p>
      </div>
    </section>
  )
}
