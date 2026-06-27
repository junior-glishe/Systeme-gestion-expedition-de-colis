// Endpoint non exposé par le backend Laravel ; renvoie une liste vide pour éviter les 404.
export const notificationsService = {
  list: async () => [],
  get: async () => null,
  create: async () => null,
  update: async () => null,
  remove: async () => null,
};
