export function groupBy<T, V extends string | number>(list: T[], keyGetter: (item: T) => V): Record<V, T[]> {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return Object.fromEntries(map);
}
