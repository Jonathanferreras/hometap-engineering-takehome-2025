// utilized ChatGPT to add some modern UI styling consistancy
import React from "react";

export type PropertyDataset = {
  [key: string]: {
    normalizedAddress: string;
    squareFootage: number;
    lotSize: number;
    yearBuilt: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    roomCount: number;
    septicSystem: string;
    salePrice: number;
  };
};

type Provider = PropertyDataset[string];

const FIELDS: Array<{
  key: keyof Provider;
  label: string;
  format?: (v: any) => React.ReactNode;
}> = [
  {
    key: "squareFootage",
    label: "Square Footage",
    format: (v) => `${Number(v).toLocaleString()} sq ft`,
  },
  {
    key: "lotSize",
    label: "Lot Size (Acres)",
    format: (v) =>
      Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 }),
  },
  { key: "yearBuilt", label: "Year Built" },
  { key: "propertyType", label: "Property Type" },
  { key: "bedrooms", label: "Bedrooms" },
  { key: "bathrooms", label: "Bathrooms" },
  { key: "roomCount", label: "Room Count" },
  { key: "septicSystem", label: "Septic System" },
  {
    key: "salePrice",
    label: "Sale Price",
    format: (v) =>
      Number(v).toLocaleString(undefined, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
  },
];

export const PropertyTable = ({ data }: { data: PropertyDataset }) => {
  const providers = Object.keys(data);
  const address = data[providers[0]]?.normalizedAddress ?? "";

  return (
    <section className="motion-safe:animate-fade-in">
      <div className="mb-6 text-center">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Normalized Address
        </div>
        <div className="mt-1 text-sm text-slate-700">{address || "—"}</div>
      </div>
      <div className="relative overflow-x-auto">
        <div
          className="grid gap-y-2 gap-x-8 text-sm"
          style={{
            gridTemplateColumns: `200px repeat(${providers.length}, minmax(160px, 1fr))`,
          }}
        >
          <div className="h-6" />
          {providers.map((p) => (
            <div
              key={`head-${p}`}
              className="h-6 text-center font-semibold text-slate-700"
            >
              {p}
            </div>
          ))}

          {FIELDS.map(({ key, label, format }, idx) => (
            <React.Fragment key={String(key)}>
              <div
                className={`font-medium text-slate-700 py-2 pr-2 sticky left-0 bg-white ${
                  idx % 2 ? "bg-white" : "bg-slate-50/60"
                }`}
              >
                {label}
              </div>
              {providers.map((p) => {
                const raw = data[p]?.[key];
                const val =
                  raw == null || raw === ""
                    ? "—"
                    : format
                    ? format(raw)
                    : String(raw);

                return (
                  <div
                    key={`${p}-${String(key)}`}
                    className={`py-2 text-center text-slate-900 ${
                      idx % 2 ? "bg-white" : "bg-slate-50/60"
                    }`}
                  >
                    {val}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
