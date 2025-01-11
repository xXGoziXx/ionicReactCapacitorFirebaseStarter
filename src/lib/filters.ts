
// export const handleFilters = (item: Post): boolean => {
//     const filters = FilterStore.activeFilters;
//     for (const filter in filters) {
//         if (filter === 'labels') {
//             return handleLabels(filters[filter], item);
//         }
//         if (filter === 'distance') {
//             // filter by distance
//         }
//     }
//     return false;
// };

// const handleLabels = (labelFilters: Label[], item: Post) => {
//     for (const label of labelFilters) {
//         if (item.metadata.labels?.includes(label)) {
//             return true;
//         }
//     }
//     return false;
// };
//// // // // // // // //