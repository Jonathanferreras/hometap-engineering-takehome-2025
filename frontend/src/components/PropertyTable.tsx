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

const fieldNames = [
  "Square Footage",
  "Lot Size (Acres)",
  "Year Built",
  "Property Type",
  "Bedrooms",
  "Bathrooms",
  "Room Count",
  "Septic System",
  "Sale Price",
];

export const PropertyTable = ({ data }: { data: PropertyDataset }) => {
  const providers = Object.keys(data);
  const address = data[providers[0]].normalizedAddress;

  return (
    <div>
      <div className="flex justify-center mt-10 mb-10">
        <span className="font-bold">Normalized Address:</span> {address}
      </div>
      <div className="flex justify-center">
        <div className="mr-30">
          <div className="inline-block mb-5 h-5"></div>
          {fieldNames.map((fieldName) => (
            <div className="font-bold mb-3">{fieldName}</div>
          ))}
        </div>
        {providers.map((provider: string) => {
          const {
            squareFootage,
            lotSize,
            yearBuilt,
            propertyType,
            bedrooms,
            bathrooms,
            roomCount,
            septicSystem,
            salePrice,
          } = data[provider];

          return (
            <div className="mr-50 text-center">
              <div className="font-bold mb-5">{provider}</div>
              <div className="mb-3">{squareFootage}</div>
              <div className="mb-3">{lotSize}</div>
              <div className="mb-3">{yearBuilt}</div>
              <div className="mb-3">{propertyType}</div>
              <div className="mb-3">{bedrooms}</div>
              <div className="mb-3">{bathrooms}</div>
              <div className="mb-3">{roomCount}</div>
              <div className="mb-3">{septicSystem}</div>
              <div className="mb-3">{salePrice}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
