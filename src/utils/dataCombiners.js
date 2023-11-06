const mergeOnProperty = (primary, secondary, sharedProperty) => {
  return primary.map((primaryItem) => {
    const foundItem = secondary.find(
      (secondaryItem) =>
        secondaryItem[sharedProperty] === primaryItem[sharedProperty]
    );
    if (foundItem) {
      const { [sharedProperty]: _, ...otherDetails } = foundItem;
      return { ...primaryItem, ...otherDetails };
    }
    return primaryItem;
  });
};

const findSharedPropertyAndMerge = (result, dataset) => {
  const sharedProperty = Object.keys(dataset[0]).find(
    (key) => result[0][key] !== undefined
  );
  if (sharedProperty) {
    return mergeOnProperty(result, dataset, sharedProperty);
  }
  return result;
};

export const combineDatasets = (...datasets) => {
  if (datasets.length < 2) return datasets[0] || [];

  let result = datasets[0];
  for (let i = 1; i < datasets.length; i++) {
    result = findSharedPropertyAndMerge(result, datasets[i]);
  }
  return result;
};


